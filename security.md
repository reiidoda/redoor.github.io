---
layout: page
title: Security
description: ReDoor security model covering goals, threat posture, hardening direction, implemented and planned controls, and disclosure process.
permalink: /security/
eyebrow: Security Model
lead: "ReDoor treats security as an explicit engineering program: concrete controls, threat-model deltas, visible residual risks, and a public status taxonomy for what is implemented versus planned."
body_class: security
schema_type: TechArticle
hero_panel:
  label: Status taxonomy
  value: Implemented / In Progress / Planned
  detail: Claims on this page are categorized instead of flattened into a single marketing voice.
hero_actions:
  - label: View Status
    url: /status/
    style: primary
  - label: View Control Matrix
    url: https://github.com/reiidoda/ReDoor/blob/main/docs/security/control-matrix.csv
    external: true
    style: ghost
  - label: Disclosure Policy
    url: https://github.com/reiidoda/ReDoor/blob/main/SECURITY.md
    external: true
    style: ghost
breadcrumbs:
  - title: Home
    url: /
  - title: Security
    url: /security/
keywords:
  - security model
  - zero-click-resistant messaging design
  - metadata-resistant messaging
  - volatile client state
---
<section class="section">
  <div class="shell page-content">
    <section class="page-section" data-reveal>
      <article class="quote-panel premium-panel">
        <p class="eyebrow">Reality check</p>
        <p>
          No internet messaging system can guarantee universal untraceability or withstand every endpoint compromise.
          ReDoor’s direction is to reduce attack surface, raise attacker cost, and fail closed at unsafe boundaries.
        </p>
      </article>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Security Goals</p>
        <h2>What the project is trying to protect.</h2>
      </div>

      <div class="two-column">
        <article class="panel-card">
          <p class="panel-card__label">Goals</p>
          <ul class="link-list">
            {% for item in site.data.security.goals %}
              <li>{{ item }}</li>
            {% endfor %}
          </ul>
        </article>

        <article class="panel-card">
          <p class="panel-card__label">Current protection focus</p>
          <ul class="link-list">
            {% for item in site.data.security.protects %}
              <li>{{ item }}</li>
            {% endfor %}
          </ul>
        </article>
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Threat and Claim Boundaries</p>
        <h2>What ReDoor does not claim to solve.</h2>
      </div>

      <ul class="rich-list">
        {% for item in site.data.security.does_not_claim %}
          <li>{{ item }}</li>
        {% endfor %}
      </ul>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Status Taxonomy</p>
        <h2>Current controls versus ongoing or future work.</h2>
      </div>

      <div class="three-column">
        <article class="status-card">
          <div class="pill status-chip--implemented">Implemented</div>
          <h3>Shipping baseline</h3>
          <ul class="link-list">
            {% for item in site.data.security.status_taxonomy.implemented %}
              <li><strong>{{ item.title }}</strong> {{ item.detail }}</li>
            {% endfor %}
          </ul>
        </article>

        <article class="status-card">
          <div class="pill status-chip--progress">In Progress</div>
          <h3>Active public work</h3>
          <ul class="link-list">
            {% for item in site.data.security.status_taxonomy.in_progress %}
              <li><strong>{{ item.title }}</strong> {{ item.detail }}</li>
            {% endfor %}
          </ul>
        </article>

        <article class="status-card">
          <div class="pill status-chip--planned">Planned</div>
          <h3>Next hardening direction</h3>
          <ul class="link-list">
            {% for item in site.data.security.status_taxonomy.planned %}
              <li><strong>{{ item.title }}</strong> {{ item.detail }}</li>
            {% endfor %}
          </ul>
        </article>
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Hardening Tracks</p>
        <h2>Beyond message secrecy alone.</h2>
      </div>

      <div class="card-grid">
        {% for item in site.data.security.hardening_tracks %}
          <article class="feature-card">
            <p class="feature-card__label">Workstream</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
          </article>
        {% endfor %}
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Current Controls Matrix</p>
        <h2>Visible standards alignment.</h2>
      </div>

      <div class="comparison-table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Control</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Owner</th>
              <th scope="col">Tracked issue</th>
            </tr>
          </thead>
          <tbody>
            {% for item in site.data.security.controls_matrix %}
              <tr>
                <th scope="row"><code>{{ item.id }}</code></th>
                <td>{{ item.name }}</td>
                <td>
                  {% assign status_class = 'status-chip--progress' %}
                  {% if item.status == 'Implemented' %}
                    {% assign status_class = 'status-chip--implemented' %}
                  {% elsif item.status == 'Planned' %}
                    {% assign status_class = 'status-chip--planned' %}
                  {% endif %}
                  <span class="pill {{ status_class }}">{{ item.status }}</span>
                </td>
                <td>{{ item.owner }}</td>
                <td>{{ item.issue | default: "—" }}</td>
              </tr>
            {% endfor %}
          </tbody>
        </table>
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Disclosure</p>
        <h2>Security trust-building through precision, not hype.</h2>
      </div>

      <div class="card-grid">
        <article class="doc-card">
          <p class="doc-card__label">Responsible disclosure</p>
          <h3>Security policy</h3>
          <p>Potential vulnerabilities should go through private channels rather than public issues.</p>
          <a class="doc-link__meta" href="{{ site.data.security.disclosure.policy_url }}" target="_blank" rel="noopener noreferrer">Open upstream policy</a>
        </article>

        <article class="doc-card">
          <p class="doc-card__label">Operational process</p>
          <h3>Security runbook</h3>
          <p>Incident handling, response detail, and operator-facing guidance are public documentation artifacts.</p>
          <a class="doc-link__meta" href="{{ site.data.security.disclosure.runbook_url }}" target="_blank" rel="noopener noreferrer">Open runbook</a>
        </article>

        <article class="doc-card">
          <p class="doc-card__label">Standards baseline</p>
          <h3>Standards profile</h3>
          <p>NIST CSF, SSDF, OWASP ASVS, OWASP MASVS, and SLSA are used as public framing for controls and evidence.</p>
          <a class="doc-link__meta" href="{{ site.data.security.disclosure.standards_url }}" target="_blank" rel="noopener noreferrer">Open standards profile</a>
        </article>

        <article class="doc-card">
          <p class="doc-card__label">Related pages</p>
          <h3>Architecture, status, and roadmap</h3>
          <p>Security claims are connected directly to the current architecture and the live public execution surface.</p>
          <div class="cta-group">
            <a class="button button-ghost" href="{{ '/architecture/' | relative_url }}">Architecture</a>
            <a class="button button-ghost" href="{{ '/status/' | relative_url }}">Status</a>
            <a class="button button-ghost" href="{{ '/roadmap/' | relative_url }}">Roadmap</a>
          </div>
        </article>
      </div>
    </section>
  </div>
</section>
