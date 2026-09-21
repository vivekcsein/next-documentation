# VivekCSE Docs

Blog / docs / content site. Next.js 16 · React 19 · Tailwind 4 · Bun.

```bash
bun install
bun run dev
```

## Content structure

```
src/content/<section>/<category>/<slug>.md   →   /<section>/<category>/<slug>
```

| You create                     | You get                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| a `.md` file                   | a page (home, sidebar, search, sitemap, RSS)                                                  |
| a new folder in a section      | a new category                                                                                |
| a new folder in `src/content/` | a new top-level section (`/code`, `/tutorials`, …) with its own page, sidebar and header link |

No routes or registries to edit. Optional titles/icons/order live in `src/packages/config/content.config.ts`.

- **Title** = first `# Heading` in the file → front-matter `title` → `docDefaults` → file name.
- **Description** = front-matter `description` → first paragraph.
- Names must be lowercase kebab-case. Files/folders starting with `_` are ignored; `draft: true` hides a doc in production. `api`, `admin`, `feed`, `sitemap`, `robots` are reserved section names.
- Front-matter is optional: `description`, `date`, `updated`, `keywords`, `featured`, `order`, `draft`. See `src/content/docs/others/how-to-add-a-doc.md`.

## Ads

Copy `.env.example` → `.env.local` and fill the AdSense values. Placements live in `src/packages/config/ads.config.ts` (right rail + inside long articles). With no env set, ads render nothing in production and a dashed placeholder in dev.

## Scripts

`bun run verify` — lint, format, check, typecheck. `bun run build` — static production build.
