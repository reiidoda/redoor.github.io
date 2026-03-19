---
layout: page
title: Architecture
description: ReDoor architecture deep dive covering system overview, trust boundaries, message flow, relay blind forwarding, directory resolution, and evidence submission.
permalink: /architecture/
eyebrow: Architecture
lead: "ReDoor splits into five runtime planes so trust boundaries stay explicit: client runtime, iOS shell, relay transport, directory discovery, and blockchain-backed evidence."
body_class: architecture
schema_type: TechArticle
hero_panel:
  label: Source alignment
  value: Derived from README, SYSTEM_DESIGN, and docs/architecture
  detail: This page stays grounded in the public repository’s current component responsibilities and message flow.
hero_actions:
  - label: Read Security
    url: /security/
    style: primary
  - label: Documentation Hub
    url: /docs/
    style: ghost
  - label: GitHub
    url: https://github.com/reiidoda/ReDoor
    external: true
    style: ghost
breadcrumbs:
  - title: Home
    url: /
  - title: Architecture
    url: /architecture/
keywords:
  - secure messaging architecture
  - X3DH implementation direction
  - Double Ratchet messaging
  - untrusted relay architecture
---
<section class="section">
  <div class="shell page-content">
    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">System Overview</p>
        <h2>Five runtime planes, one narrow responsibility each.</h2>
        <p>
          The ReDoor monorepo is service-oriented at runtime. The client and app shell hold the trusted edge.
          Relay, directory, and evidence services are separate operational planes with distinct security roles.
        </p>
      </div>

      <figure class="diagram-frame">
        <img
          src="{{ '/assets/img/diagrams/architecture-topology.svg' | relative_url }}"
          alt="Architecture diagram showing the iOS app and client runtime on the left, an untrusted relay plane in the center, and the directory plus blockchain evidence planes on the right."
          width="1280"
          height="760"
          loading="lazy"
          decoding="async"
        >
        <figcaption>ReDoor’s public runtime topology: trusted edges, untrusted relay middle, and separate discovery and evidence planes.</figcaption>
      </figure>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Component Responsibilities</p>
        <h2>Where each service stops.</h2>
      </div>

      <div class="card-grid">
        {% for item in site.data.architecture.overview %}
          <article class="feature-card">
            <p class="feature-card__label">{{ item.path }}</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
          </article>
        {% endfor %}
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">End-To-End Flow</p>
        <h2>Message transport is opaque in the middle and stateful only at the edges.</h2>
      </div>

      <div class="two-column">
        <figure class="diagram-frame">
          <img
            src="{{ '/assets/img/diagrams/message-flow.svg' | relative_url }}"
            alt="Sequence diagram showing key resolution, opaque relay transport, receiver-side in-memory decryption, and blockchain commitment submission."
            width="1280"
            height="860"
            loading="lazy"
            decoding="async"
          >
          <figcaption>The public message path from prekeys through relay delivery and evidence submission.</figcaption>
        </figure>

        <div class="flow-list">
          {% for item in site.data.architecture.message_flow %}
            <article class="flow-step">
              <div class="flow-step__index">{{ item.step }}</div>
              <div class="flow-step__body">
                <h3>{{ item.title }}</h3>
                <p>{{ item.detail }}</p>
              </div>
            </article>
          {% endfor %}
        </div>
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Trust Boundaries</p>
        <h2>Where plaintext exists, and where it should not.</h2>
      </div>

      <div class="comparison-table-wrap">
        <table class="trust-table">
          <thead>
            <tr>
              <th scope="col">Boundary</th>
              <th scope="col">Trusted for</th>
              <th scope="col">Not trusted for</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {% for row in site.data.architecture.trust_boundaries %}
              <tr>
                <th scope="row">{{ row.boundary }}</th>
                <td>{{ row.trusted_for }}</td>
                <td>{{ row.not_trusted_for }}</td>
                <td>{{ row.notes }}</td>
              </tr>
            {% endfor %}
          </tbody>
        </table>
      </div>
      <p class="table-note">The relay, directory, and blockchain planes are intentionally not treated as places where plaintext should live.</p>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Plaintext Residency</p>
        <h2>Device memory is the intended plaintext boundary.</h2>
      </div>

      <div class="card-grid">
        {% for item in site.data.architecture.plaintext_zones %}
          <article class="callout premium-panel">
            <p class="eyebrow">{{ item.label }}</p>
            <p>{{ item.detail }}</p>
          </article>
        {% endfor %}
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Architectural Constraints</p>
        <h2>The current system makes explicit tradeoffs.</h2>
      </div>

      <ul class="rich-list">
        <li>
          <strong>No global account authority.</strong>
          Identity verification is not framed around a centralized verification service.
        </li>
        <li>
          <strong>High-security paths expect onion or mix routing.</strong>
          Strict anonymity mode is treated as a policy boundary, not a marketing extra.
        </li>
        <li>
          <strong>Volatile behavior is a product requirement.</strong>
          The mobile shell and runtime are built around wipe and duress flows rather than durable chat history as the primary posture.
        </li>
        <li>
          <strong>Integrity evidence is deliberate persistence.</strong>
          The blockchain plane is the one place where durable history is intentional, because it stores commitments rather than message content.
        </li>
      </ul>
    </section>
  </div>
</section>
