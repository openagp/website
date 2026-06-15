---
title: Get involved
description: How to contribute to OpenAGP — the repos, the contribution model, and the best places to start.
---

AGP is an open protocol and welcomes contributions from anyone — vendors implementing receivers, customers writing policies, researchers, and engineers fixing typos.

## Talk to us

- **Discussions** — design questions, "how do I model X?", introductions: [github.com/openagp/spec/discussions](https://github.com/openagp/spec/discussions)
- **Issues** — bugs and scoped work, per repo.
- **Security** — never file a public issue; see each repo's `SECURITY.md`.

## The repos

| Repo | What lives there |
|---|---|
| [`spec`](https://github.com/openagp/spec) | The protocol spec, JSON Schemas, fixtures, ADRs, test vectors |
| [`sdk-python`](https://github.com/openagp/sdk-python) | Reference Python SDK |
| [`sdk-typescript`](https://github.com/openagp/sdk-typescript) | Reference TypeScript SDK |
| [`cts`](https://github.com/openagp/cts) | `agp-cts` conformance test suite (Go) |
| [`registry`](https://github.com/openagp/registry) | Public directory of conformant actors |
| [`examples`](https://github.com/openagp/examples) | End-to-end worked examples |

## Where to start, by profile

- **First-time / casual** → [`examples`](https://github.com/openagp/examples) and [`spec` fixtures](https://github.com/openagp/spec/tree/main/fixtures). Look for [`good first issue`](https://github.com/search?q=org%3Aopenagp+is%3Aopen+label%3A%22good+first+issue%22&type=issues).
- **Sustained code contributor** → the SDKs. Changes that touch bytes/canonicalization must land in **both** SDKs in lockstep; CI fails if they diverge.
- **Strategic / design** → [`spec`](https://github.com/openagp/spec). The open RFCs (policy DSL grammar, registry governance, CTS administration) are the highest-leverage questions waiting for a champion.
- **Go / crypto / conformance** → [`cts`](https://github.com/openagp/cts). A third independent implementation is what makes AGP a real protocol.
- **A new organization adopting AGP** → [`registry`](https://github.com/openagp/registry). One PR with your signed actor entry.

## The contribution model

- **DCO sign-off, no CLA.** Every commit is signed off: `git commit -s`.
- **Editorial PRs** (typos, formatting) merge on single-maintainer review.
- **Substantive spec changes** go through a decision record with a 2-week comment period; **breaking changes**, 4 weeks.

See [CONTRIBUTING.md](https://github.com/openagp/.github/blob/main/CONTRIBUTING.md) and [GOVERNANCE.md](https://github.com/openagp/.github/blob/main/GOVERNANCE.md) for the full process and the roadmap to vendor-neutral governance.
