---
layout: page
title: Roadmap
description: ReDoor public roadmap and implementation status covering standards alignment, privacy-track execution, key custody, release integrity, and contributor entry points.
permalink: /roadmap/
eyebrow: Roadmap
lead: The roadmap is contributor-facing by design. It tracks the hardening program, privacy research, release integrity work, and service-plane execution without pretending unfinished work is done.
body_class: roadmap
schema_type: CollectionPage
hero_panel:
  label: Current status
  value: Synced to 2026-03-19 public docs
  detail: This page mirrors the active work and milestone map published in the upstream repository.
hero_actions:
  - label: View Status
    url: /status/
    style: primary
  - label: Contributor Docs
    url: /docs/
    style: ghost
  - label: Issues
    url: https://github.com/reiidoda/ReDoor/issues
    external: true
    style: ghost
breadcrumbs:
  - title: Home
    url: /
  - title: Roadmap
    url: /roadmap/
keywords:
  - public roadmap
  - security hardening roadmap
  - release integrity program
  - contributor entry points
---
<section class="section">
  <div class="shell page-content">
    <section class="page-section" data-reveal>
      <article class="status-source premium-panel">
        <p class="section-label">Current Project Status</p>
        <h2>{{ site.data.roadmap.current_status.label }}</h2>
        <p>{{ site.data.roadmap.current_status.body }}</p>
      </article>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Current Focus</p>
        <h2>Visible priorities rather than vague ambition.</h2>
      </div>

      <div class="roadmap-grid">
        {% for group in site.data.roadmap.current_focus %}
          <article class="roadmap-card">
            <p class="roadmap-card__label">Active track</p>
            <h3>{{ group.title }}</h3>
            <ul class="link-list">
              {% for item in group.items %}
                <li>{{ item }}</li>
              {% endfor %}
            </ul>
          </article>
        {% endfor %}
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Milestone Map</p>
        <h2>Standards, privacy, and hardening are tracked separately.</h2>
      </div>

      <div class="card-grid">
        {% for item in site.data.roadmap.milestones %}
          <article class="status-card">
            <p class="status-card__label">{{ item.name }}</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
            <span class="pill {% if item.status contains 'Completed' %}status-chip--implemented{% else %}status-chip--progress{% endif %}">{{ item.status }}</span>
          </article>
        {% endfor %}
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Release Integrity And Quality Program</p>
        <h2>Engineering seriousness extends beyond page copy.</h2>
      </div>

      <div class="card-grid">
        {% for item in site.data.roadmap.quality_program %}
          <article class="feature-card">
            <p class="feature-card__label">Quality track</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
          </article>
        {% endfor %}
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Contributor Entry Points</p>
        <h2>Open surfaces for new contributors.</h2>
      </div>

      <div class="card-grid">
        {% for item in site.data.roadmap.entry_points %}
          <article class="doc-card">
            <p class="doc-card__label">{{ item.label }}</p>
            <h3>{{ item.label }}</h3>
            <p>{{ item.detail }}</p>
          </article>
        {% endfor %}
      </div>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Working Agreements</p>
        <h2>How roadmap changes are supposed to land.</h2>
      </div>

      <ul class="rich-list">
        <li>Open an issue or confirm an existing issue before broad cross-component changes.</li>
        <li>Keep security-relevant PRs aligned with the public control matrix.</li>
        <li>Update docs in the same PR when behavior, policy, or contributor workflow changes.</li>
        <li>Treat rollback, telemetry, and operational response as part of the deliverable for security work.</li>
      </ul>
    </section>
  </div>
</section>
