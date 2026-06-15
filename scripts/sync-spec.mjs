// Pull canonical spec content from github.com/openagp/spec at build time so the
// website's spec pages are never a stale fork. Runs in predev/prebuild.
//
// Network-resilient: on fetch failure it keeps an existing file, or writes a
// stub that links to GitHub — so the build never breaks on a transient outage.

import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'content', 'docs', 'spec');
const RAW = 'https://raw.githubusercontent.com/openagp/spec/main';

/** @type {{src:string, out:string, title:string, description:string}[]} */
const SOURCES = [
	{
		src: `${RAW}/concept-and-spec.md`,
		out: 'index.md',
		title: 'Specification (v0.1 working draft)',
		description: 'The full AGP v0.1 protocol specification — concepts, message schemas, conformance levels, and security model.',
	},
	{
		src: `${RAW}/decisions/0001-signature-canonicalization.md`,
		out: 'adr-0001.md',
		title: 'ADR 0001 — Signature canonicalization',
		description: 'How AGP produces identical signature bytes in every language: RFC 8785 JCS + Ed25519 detached signatures.',
	},
];

const yamlEscape = (s) => s.replace(/"/g, '\\"');

/** Strip the first H1 (Starlight renders the frontmatter title as the heading)
 *  and rewrite the spec's internal relative links to site/GitHub URLs. */
function transform(md) {
	const lines = md.split('\n');
	const h1 = lines.findIndex((l) => /^#\s/.test(l));
	if (h1 !== -1) {
		lines.splice(h1, 1);
		while (lines[h1] === '') lines.splice(h1, 1); // trim blank lines after
	}
	let body = lines.join('\n');
	// ADR / decision links -> rendered ADR page
	body = body.replace(/\]\((?:\.\.\/)*decisions\/0001-signature-canonicalization\.md\)/g, '](/spec/adr-0001/)');
	// same-doc anchors: (concept-and-spec.md#section) -> (#section)
	body = body.replace(/\]\((?:\.\.\/)*concept-and-spec\.md(#[^)]+)\)/g, ']($1)');
	// schema / fixture / other repo-relative links -> GitHub
	body = body.replace(/\]\((?:\.\.\/)*((?:schemas|fixtures|test-vectors|decisions)\/[^)]+)\)/g, '](https://github.com/openagp/spec/blob/main/$1)');
	return body;
}

async function exists(p) {
	try {
		await access(p);
		return true;
	} catch {
		return false;
	}
}

async function run() {
	await mkdir(OUT, { recursive: true });
	for (const s of SOURCES) {
		const target = join(OUT, s.out);
		const fm = `---\ntitle: "${yamlEscape(s.title)}"\ndescription: "${yamlEscape(s.description)}"\n---\n\n`;
		try {
			const res = await fetch(s.src);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const md = await res.text();
			const note = `\n\n---\n\n*This page is rendered from [\`openagp/spec\`](https://github.com/openagp/spec) at build time — it is always in sync with the canonical source.*\n`;
			await writeFile(target, fm + transform(md) + note);
			console.log(`synced ${s.out} from ${s.src}`);
		} catch (err) {
			if (await exists(target)) {
				console.warn(`WARN: could not fetch ${s.src} (${err.message}); keeping existing ${s.out}`);
			} else {
				const stub = `${fm}The canonical source could not be fetched at build time.\n\nRead it directly on GitHub: [${s.src}](${s.src}).\n`;
				await writeFile(target, stub);
				console.warn(`WARN: could not fetch ${s.src} (${err.message}); wrote stub ${s.out}`);
			}
		}
	}
}

run();
