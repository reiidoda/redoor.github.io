# Content Update Workflow

This site should stay aligned with the upstream `ReDoor` repository rather than drifting into standalone marketing copy.

## Source Documents

The primary upstream documents for this site are:

- `README.md`
- `SYSTEM_DESIGN.md`
- `SECURITY.md`
- `docs/architecture.md`
- `docs/threat_model.md`
- `docs/ROADMAP.md`
- `docs/OPEN_SOURCE_STATUS.md`
- `docs/security/STANDARDS_PROFILE.md`
- `docs/security/control-matrix.csv`
- selected hardening docs under `docs/security/`

## Update Process

1. Review the upstream docs in `../ReDoor` or on GitHub.
2. Update the relevant `_data/*.yml` file first.
3. Update any route-level narrative in the page or blog post only when the data model is not enough.
4. If the change affects navigation, schema, or shared copy, update the appropriate include or layout.
5. Rebuild and rerun validation:

```bash
bundle exec jekyll build
npm run validate:links
npm run validate:structure
npm run validate:schema
npm run test:visual
npm run test:a11y
```

## Comparison Page Rule

The comparison page is the main place where external-product claims appear.

- Keep claims high-level and architecture-focused.
- Do not invent capabilities or claim maturity that ReDoor does not document.
- Re-check non-ReDoor product facts against current official public sources before changing the matrix.
- When unsure, prefer softer phrasing such as “stronger operationally” or “more centralized trust model” over brittle feature trivia.

## Blog Workflow

- new articles go in `_posts/`
- set `title`, `description`, `date`, `image`, `tags`, `read_time`, and `breadcrumbs`
- keep internal links pointing to local routes first, then upstream GitHub docs when needed

## Visual Baselines

If intentional design changes shift the screenshots:

```bash
bundle exec jekyll build
npm run test:visual:update
```

Commit only the updated files under `tests/visual/baseline/`.

