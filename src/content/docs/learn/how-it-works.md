---
title: How it works
description: AGP defines three flows between a customer's governance plane and an agent vendor — event emission, policy delivery, and real-time decisions.
---

AGP defines **three flows** between a customer's **plane** and an agent **vendor**. A vendor implements one or more and declares its [conformance level](/learn/conformance/). The same customer policy then works across every conformant vendor.

<div class="cards">
  <div class="card"><span class="level">Flow B · L2</span><br/><strong>Policy</strong><br/>Plane → Vendor<br/><code>POST /agp/v0/policy</code><br/><sub>signed YAML policy → <code>202 + policy_hash</code></sub></div>
  <div class="card"><span class="level">Flow C · L3</span><br/><strong>Real-time decision</strong><br/>Vendor ⇄ Plane<br/><code>POST /agp/v0/decision</code><br/><sub>allowed | blocked in ≤300ms</sub></div>
  <div class="card"><span class="level">Flow A · L1</span><br/><strong>Events</strong> (always)<br/>Vendor → Plane<br/><code>POST /agp/v0/events</code><br/><sub>signed canonical event</sub></div>
</div>

## Flow A — Event emission (L1)

**Vendor → Plane.** The vendor emits an AGP-canonical, signed event for every agent action — a tool call, a model response, a data write. This is the minimum viable level of AGP support and gives the customer passive observability with verifiable provenance.

A canonical event records the actor (vendor, agent, hashed human principal), the action (type, tool, target, input/output hashes), the policy decision applied, lineage, and an Ed25519 signature.

## Flow B — Policy delivery (L2)

**Plane → Vendor.** The customer authors one policy in the AGP policy DSL and the plane pushes it, signed, to each vendor. The vendor evaluates incoming actions against the policy and stamps the resulting decision (`allowed` / `blocked` / `logged_only`) and the `policy_hash` onto every event — so the customer can prove exactly which policy version was in force.

## Flow C — Real-time decision (L3)

**Vendor → Plane → Vendor, synchronously.** For high-stakes actions a vendor cannot self-decide, it calls back to the plane with the proposed action and the plane returns `allowed | blocked` within a budget (default 300 ms). If the plane is unreachable, the vendor applies the fallback declared in policy and records that the fallback was used.

## Identity and trust

Every actor has at least one Ed25519 keypair. Public keys are advertised via a `.well-known/agp` discovery document and registered in the [public registry](/registry/). Events are signed by the vendor; policies by the customer; decision responses by the plane. The exact signing and verification protocol is specified byte-for-byte in [ADR 0001](/spec/adr-0001/).

## See it run

The [`acme-walkthrough`](https://github.com/openagp/examples/tree/main/acme-walkthrough) example runs the whole sequence end-to-end in about 0.2 seconds — policy delivery → action attempt → decision → signed event → ledger anchor — producing three signed JSON artifacts you can verify independently. [Try it →](/adopt/vendors/)
