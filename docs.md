---
layout: page
title: Docs
description: ReDoor documentation hub linking the architecture, security, protocol, roadmap, release-integrity, and contributor documents in the upstream repository.
permalink: /docs/
eyebrow: Documentation Hub
lead: This site is the narrative front door. The upstream repository remains the canonical source for source code, issue tracking, detailed protocol notes, and operational documents.
body_class: docs
schema_type: CollectionPage
hero_panel:
  label: Canonical source
  value: GitHub repository and public docs
  detail: The site routes readers into the upstream repo instead of trying to replace it.
hero_actions:
  - label: View on GitHub
    url: https://github.com/reiidoda/ReDoor
    external: true
    style: primary
  - label: Open Status
    url: /status/
    style: ghost
  - label: Open Roadmap
    url: /roadmap/
    style: ghost
breadcrumbs:
  - title: Home
    url: /
  - title: Docs
    url: /docs/
keywords:
  - ReDoor documentation
  - security standards profile
  - release integrity
  - threat model
---
<section class="section">
  <div class="shell page-content">
    {% for group in site.data.docs_links.groups %}
      <section class="page-section" data-reveal>
        <div class="page-section__header">
          <p class="section-label">Documentation Group</p>
          <h2>{{ group.title }}</h2>
        </div>

        <div class="docs-grid">
          {% for item in group.items %}
            <article class="doc-card">
              <p class="doc-card__label">{{ group.title }}</p>
              <h3>{{ item.label }}</h3>
              <p>{{ item.detail }}</p>
              <a
                class="doc-link__meta"
                href="{% if item.external %}{{ item.url }}{% else %}{{ item.url | relative_url }}{% endif %}"
                {% if item.external %}target="_blank" rel="noopener noreferrer"{% endif %}
              >
                {% if item.external %}Open upstream doc{% else %}Open local page{% endif %}
              </a>
            </article>
          {% endfor %}
        </div>
      </section>
    {% endfor %}
  </div>
</section>
