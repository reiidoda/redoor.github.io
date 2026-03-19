# Site Architecture

This repository builds the GitHub Pages site for ReDoor as a static Jekyll site.

## Structure

- `_data/`
  - project content and navigation live here so copy changes do not require editing templates
- `_includes/`
  - shared partials for SEO, header, footer, breadcrumbs, page hero, and article cards
- `_layouts/`
  - `default`, `page`, and `post`
- page routes
  - `index.html`, `architecture.md`, `security.md`, `compare.md`, `roadmap.md`, `docs.md`, `status.md`, `blog/index.html`, `404.html`
- `_posts/`
  - editorial articles rendered with the `post` layout
- `assets/css/`
  - tokens, layout primitives, component styles, and page-level styles
- `assets/js/`
  - lightweight navigation, reveal, and blog filtering behavior
- `assets/img/`
  - brand assets, diagrams, and social cover images
- `scripts/`
  - local validation and regression tooling
- `tests/visual/`
  - committed Playwright baselines plus generated current and diff captures

## Content Model

The site content is intentionally data-driven.

- `homepage.yml` controls hero callouts, differentiators, stack strip, and trust links.
- `architecture.yml` controls system overview cards, end-to-end flow, and trust-boundary table rows.
- `security.yml` controls goals, claims, status taxonomy, hardening tracks, and control-summary rows.
- `compare.yml` controls the comparison matrix and audience recommendations.
- `roadmap.yml` controls active focus areas, milestones, quality program, and contributor entry points.
- `docs_links.yml` controls the docs hub card groups.
- `status.yml` mirrors the upstream status board in a compact website-friendly format.

## SEO and Schema

`_includes/seo.html` is the main schema and canonical source.

- root page emits `WebSite` and `SoftwareSourceCode`
- page routes emit `WebPage`, `CollectionPage`, or `TechArticle` based on front matter
- posts emit `Article`
- breadcrumbs emit `BreadcrumbList` when `breadcrumbs` is present in front matter

## Design System

The design system uses a dark premium visual language with:

- shared tokens in `assets/css/tokens.css`
- common layout primitives in `assets/css/layout.css`
- reusable component CSS under `assets/css/components/`
- route-specific adjustments under `assets/css/pages/`

The homepage hero is intentionally product-facing rather than portfolio-facing, but it follows the same disciplined structure:
clear headline, restrained motion, architectural visual on the right, and strong routing into deeper pages.

## Validation

The repository carries the same quality philosophy as the reference site.

- `npm run validate:links`
- `npm run validate:external-links`
- `npm run validate:structure`
- `npm run validate:visual-smoke`
- `npm run validate:schema`
- `npm run test:visual`
- `npm run test:a11y`

CI runs these checks before deployment.
