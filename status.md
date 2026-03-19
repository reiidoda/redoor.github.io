---
layout: page
title: Status
description: ReDoor project status summary derived from the current public status board, roadmap, and control matrix in the upstream repository.
permalink: /status/
eyebrow: Project Status
lead: "This page compresses the upstream open-source status board into a public summary: what recently landed, what is actively being worked, and which control areas are fully implemented versus partial."
body_class: status
schema_type: CollectionPage
hero_panel:
  label: Last synced
  value: 2026-03-19
  detail: Derived from docs/OPEN_SOURCE_STATUS and docs/security/control-matrix in the upstream repository.
hero_actions:
  - label: Public Roadmap
    url: /roadmap/
    style: primary
  - label: Open Issues
    url: https://github.com/reiidoda/ReDoor/issues
    external: true
    style: ghost
  - label: Security Model
    url: /security/
    style: ghost
breadcrumbs:
  - title: Home
    url: /
  - title: Status
    url: /status/
keywords:
  - project status
  - open source status board
  - implementation status
---
<section class="section">
  <div class="shell page-content">
    <section class="page-section" data-reveal>
      <article class="status-source premium-panel">
        <p class="section-label">Source Of Truth</p>
        <h2>Public status is intentionally documented.</h2>
        <p>
          Canonical tracker:
          <a href="{{ site.data.status.source_of_truth.canonical_tracker }}" target="_blank" rel="noopener noreferrer">{{ site.data.status.source_of_truth.canonical_tracker }}</a>.
          Last synced {{ site.data.status.source_of_truth.last_synced }} by {{ site.data.status.source_of_truth.update_owner }}.
        </p>
      </article>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Recently Completed</p>
        <h2>Work that has already landed publicly.</h2>
      </div>
      <ul class="rich-list">
        {% for item in site.data.status.recently_completed %}
          <li>{{ item }}</li>
        {% endfor %}
      </ul>
    </section>

    <section class="page-section" data-reveal>
      <div class="page-section__header">
        <p class="section-label">Active Public Work</p>
        <h2>The live priorities now.</h2>
      </div>

      <div class="roadmap-grid">
        {% for group in site.data.status.active_work %}
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
        <p class="section-label">Control Summary</p>
        <h2>Implemented versus partial standards alignment.</h2>
      </div>

      <div class="status-grid">
        {% for item in site.data.status.control_summary %}
          <article class="status-card">
            <p class="status-card__label"><code>{{ item.id }}</code></p>
            <h3>{{ item.name }}</h3>
            {% assign status_class = 'status-chip--progress' %}
            {% if item.status == 'Implemented' %}
              {% assign status_class = 'status-chip--implemented' %}
            {% endif %}
            <span class="pill {{ status_class }}">{{ item.status }}</span>
          </article>
        {% endfor %}
      </div>
    </section>
  </div>
</section>
