// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://openagp.io',
	integrations: [
		starlight({
			title: 'OpenAGP',
			description:
				'The Agent Governance Protocol — an open, vendor-neutral standard for what an AI agent is allowed to do, who said so, and what it actually did.',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: false,
			},
			customCss: [
				'@fontsource-variable/inter/index.css',
				'@fontsource-variable/newsreader/index.css',
				'@fontsource-variable/newsreader/standard-italic.css',
				'@fontsource-variable/jetbrains-mono/index.css',
				'./src/styles/custom.css',
			],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/openagp',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/openagp/website/edit/main/',
			},
			sidebar: [
				{
					label: 'Learn',
					items: [
						{ label: 'What is AGP?', slug: 'learn/what-is-agp' },
						{ label: 'How it works', slug: 'learn/how-it-works' },
						{ label: 'Conformance levels', slug: 'learn/conformance' },
					],
				},
				{
					label: 'Case studies',
					items: [
						{ label: 'Overview', slug: 'case-studies' },
						{ label: 'Blocking PII exfiltration (L2)', slug: 'case-studies/pii-exfiltration' },
						{ label: 'Surviving an EU AI Act audit', slug: 'case-studies/eu-ai-act-audit' },
						{ label: 'Cross-vendor incident (lineage)', slug: 'case-studies/multi-vendor-incident' },
						{ label: 'Human-approving a wire transfer (L3)', slug: 'case-studies/realtime-approval' },
					],
				},
				{
					label: 'Adopt',
					items: [
						{ label: 'For vendors', slug: 'adopt/vendors' },
						{ label: 'For customers', slug: 'adopt/customers' },
						{ label: 'For auditors', slug: 'adopt/auditors' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Specification', slug: 'spec' },
						{ label: 'Signature canonicalization (ADR 0001)', slug: 'spec/adr-0001' },
						{ label: 'Registry', slug: 'registry' },
					],
				},
				{
					label: 'Community',
					items: [{ label: 'Get involved', slug: 'community/contribute' }],
				},
			],
		}),
	],
});
