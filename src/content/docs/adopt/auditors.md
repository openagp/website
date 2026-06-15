---
title: For auditors
description: AGP produces standardized, cryptographically verifiable evidence of agent behavior that you can check without trusting any vendor.
---

AGP turns agent governance evidence from "trust the vendor's log" into **signed artifacts you can verify yourself**.

## Why it matters for assurance

Every regulatory framework now in motion — EU AI Act, NIST AI RMF, ISO 42001, HIPAA AI guidance — demands evidence that an organization's AI systems behaved within policy. Without a cross-vendor standard, that evidence is assembled by hand from incompatible logs and ultimately rests on each vendor's word.

AGP makes the evidence **mechanical and verifiable**:

- **Signed events.** Every agent action is recorded as an Ed25519-signed canonical event. You verify the signature against the vendor's registered public key — forgery requires key compromise.
- **Policy provenance.** Each event carries the `policy_hash` that governed it, so you can prove which policy version was enforced at the moment of the action.
- **Hash-chained ledger.** Events join an append-only, hash-chained store; reordering or deletion is detectable.
- **Independent verification.** Verification works without trusting the plane or the vendor — you only need the registry of public keys and the [canonicalization rules](/spec/adr-0001/).

## A worked example

In the [acme-walkthrough](https://github.com/openagp/examples/tree/main/acme-walkthrough), Acme blocks an external email through the full flow and emits a signed event. An auditor two weeks later can cite that event as evidence of automated policy enforcement under EU AI Act Article 14 (Human Oversight) — and verify it independently, because the event is signed, chained, and checkable without trusting the plane.

## What to ask for

When evaluating an organization's agent governance, ask:

1. Which vendors are **AGP-conformant**, and at what [level](/learn/conformance/)? (Check the [registry](/registry/).)
2. Can they produce **signed events** with `policy_hash` for a given time window?
3. Does the **signature verify** against the vendor's registered key?

If the answers are yes, the evidence is standardized and independently verifiable — no bespoke integration required.
