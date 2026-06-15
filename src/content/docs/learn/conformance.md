---
title: Conformance levels
description: AGP defines three conformance levels — L1 (events), L2 (governance), and L3 (real-time decisions) — that a vendor declares and proves with the conformance test suite.
---

A vendor declares how much of AGP it implements as a **conformance level**. Customers can require a minimum level in procurement, and vendors advertise their level in a `.well-known/agp` discovery document.

<div class="cards">
  <div class="card">
    <span class="level">L1 — Events</span>
    <p><strong>Flow A.</strong> Emit signed canonical events for every agent action.</p>
    <p><em>Customer gets:</em> passive observability with verifiable provenance — every action recorded and cryptographically attributable.</p>
    <p><strong>Cost to ship: ≤ 1 engineer-week.</strong></p>
  </div>
  <div class="card">
    <span class="level">L2 — Governance</span>
    <p><strong>Flow A + Flow B.</strong> Also accept and apply customer policy.</p>
    <p><em>Customer gets:</em> one policy DSL enforced inside every conformant vendor; every event stamped with the <code>policy_hash</code> in force.</p>
    <p><strong>Cost: + ~1 engineer-week.</strong></p>
  </div>
  <div class="card">
    <span class="level">L3 — Real-time</span>
    <p><strong>Flow A + Flow B + Flow C.</strong> Also gate high-stakes actions via a synchronous decision callback.</p>
    <p><em>Customer gets:</em> high-stakes actions gated by the plane in &lt;300ms. Human-in-the-loop becomes a protocol primitive.</p>
    <p><strong>Cost: + ~2 engineer-weeks.</strong></p>
  </div>
</div>

## Proving conformance

Every implementation must pass the **Conformance Test Suite** before claiming a level. `agp-cts` is a single static Go binary that validates schema conformance, signature correctness, policy-hash echoing, and decision-budget compliance, then emits a **signed conformance report**.

```bash
# Validate your implementation against the shared cross-language vectors
agp-cts vectors

# (v0.2) Black-box probe of a live endpoint
agp-cts validate-vendor --endpoint https://api.yourcompany.com/agp/v0/
```

Anyone can verify a conformance report — there is no central authority. Vendors that pass list themselves in the [registry](/registry/) with their level, and customers discover them there.

## Versioning guarantees

- **Additive-only at minor versions.** v0.1 → v0.2 may add fields; existing fields never change meaning.
- **Breaking changes only at major versions**, with a 12-month deprecation runway supporting both versions.
- **Graceful unknown-field handling.** Receivers ignore fields they don't understand (and log a warning) rather than rejecting the message.
