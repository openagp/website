---
title: What is AGP?
description: AGP is a vendor-neutral protocol for governing AI agents — standardizing what an agent is allowed to do, who authorized it, and what it actually did.
---

**AGP — the Agent Governance Protocol — is a cross-vendor standard for governing AI agents.**

It defines a small set of signed, schema-defined messages that flow between a customer's **governance plane** and an agent **vendor**, so that one policy can be enforced — and one audit trail produced — across every AI agent vendor a customer uses.

## The analogy

The way **SAML** standardized *"who is this user"* across identity vendors, and **MCP** standardized *"what tools can an agent call"* across model vendors, **AGP** standardizes:

> *"What is this agent allowed to do, who said so, and what did it actually do?"*

## Why it needs to exist

Enterprises are deploying dozens of AI agents across many vendors. Today, each vendor has:

- its **own audit format** (every trust center, log, and signal differs);
- its **own policy surface**, if any;
- its **own identity model** — no shared concept of "this agent acts on behalf of this human, under this policy, until revoked."

The customer needs a *unified* view and cannot get one, because no two vendors agree on what an "agent action" even looks like. This is exactly the problem identity had before SAML. AGP is the protocol that makes the wires interoperate.

## The core actors

| Actor | Role |
|---|---|
| **Customer** | The organization running agents. Owns policy, receives events. |
| **Vendor** | Provides agent capability. Receives policy, emits events. |
| **Plane** | The customer's governance control plane that authors policy and ingests events. |
| **Registry** | Public directory of conformant actors and their public keys. |
| **Auditor** | Read-only consumer of signed events — internal compliance, external auditor, or regulator. |

## What makes it trustworthy

Every message that carries authority is **Ed25519-signed** and canonicalized with **RFC 8785 (JCS)**, so the same bytes are produced in every language — see [ADR 0001](/spec/adr-0001/). An auditor can verify a vendor really emitted an event, and a vendor can verify a policy really came from the customer, **without trusting the plane in between**.

## Next

- [How it works](/learn/how-it-works/) — the three protocol flows.
- [Conformance levels](/learn/conformance/) — L1, L2, L3.
- [The specification](/spec/) — the full v0.1 working draft.
