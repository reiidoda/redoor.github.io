# ReDoor Project Website

Static GitHub Pages site for the ReDoor project.

The site is built as a Jekyll-based technical product and documentation surface, not a generic open-source landing page.
It mirrors the current public ReDoor docs while presenting the project through a higher-trust, editorial product lens.

## Routes

- `/`
- `/architecture/`
- `/security/`
- `/compare/`
- `/roadmap/`
- `/blog/`
- `/blog/why-secure-messaging-needs-more-than-e2ee/`
- `/docs/`
- `/status/`
- `/404.html`

## Local Development

Install Ruby gems:

```bash
bundle install
```

Install Node tooling:

```bash
npm install
```

Run the local Jekyll server:

```bash
bundle exec jekyll serve
```

## Validation

Build the site:

```bash
bundle exec jekyll build
```

Run validation and regression checks:

```bash
npm run validate:links
npm run validate:structure
npm run validate:visual-smoke
npm run validate:schema
npm run test:visual
npm run test:a11y
```

## Content Sources

This site should stay aligned with the upstream ReDoor repository:

- `../ReDoor/README.md`
- `../ReDoor/SYSTEM_DESIGN.md`
- `../ReDoor/SECURITY.md`
- `../ReDoor/docs/architecture.md`
- `../ReDoor/docs/threat_model.md`
- `../ReDoor/docs/ROADMAP.md`
- `../ReDoor/docs/OPEN_SOURCE_STATUS.md`
- `../ReDoor/docs/security/STANDARDS_PROFILE.md`
- `../ReDoor/docs/security/control-matrix.csv`

## Maintenance Docs

- [Site architecture](docs/architecture.md)
- [Content update workflow](docs/content-workflow.md)
