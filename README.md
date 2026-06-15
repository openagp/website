# openagp/website

Source for **[openagp.io](https://openagp.io)** — the OpenAGP project site. Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## What's here

- Marketing landing page + "Learn" and "Adopt" guides (original content).
- **Specification pages pulled from [`openagp/spec`](https://github.com/openagp/spec) at build time** — see [`scripts/sync-spec.mjs`](scripts/sync-spec.mjs). The site never forks the spec; `src/content/docs/spec/` is a build artifact and is git-ignored.
- A **live registry browser** ([`src/components/RegistryBrowser.astro`](src/components/RegistryBrowser.astro)) that reads `actors/*.json` from the public [`openagp/registry`](https://github.com/openagp/registry) at runtime, so new entries appear without a rebuild.

## Develop

```bash
npm install
npm run dev      # runs sync-spec, then astro dev on http://localhost:4321
```

`npm run sync-spec` pulls the latest spec content on demand. It also runs automatically before `dev` and `build`.

## Build

```bash
npm run build    # prebuild sync-spec -> astro build -> dist/
npm run preview  # serve the production build locally
```

## Deploy — Cloudflare Pages

openagp.io is managed on Cloudflare. To serve this repo:

1. **Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git** → pick `openagp/website`.
2. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. **Custom domains → add `openagp.io`** (and `www`). Cloudflare already holds the DNS, so this is one click — then **remove the existing redirect rule** that points openagp.io at GitHub.

Every push to `main` redeploys. Because the spec is fetched at build time, a spec change is reflected on the next site build (or any redeploy).

## License

Site content CC BY 4.0; code Apache-2.0. Rendered spec text remains under the [spec's CC BY 4.0](https://github.com/openagp/spec).
