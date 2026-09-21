# Changes — docs app redesign + multi-section content

## What changed
- **Multiple sections, zero routing work**: content lives in `src/content/<section>/<category>/<slug>.md`. Every top-level folder becomes a section (`/docs`, `/code`, `/tutorials` …) with its own index, sidebar and header/footer link, served by one dynamic route `app/[collection]/…`. Existing `/docs/...` URLs are unchanged. Unknown top-level paths 404.
- **Auto-discovery**: docs are read from the content folders. The hand-maintained registry (`docs.content.ts`, `*.docs.ts`) is gone.
- **Headings**: title = first `# Heading` in the .md → front-matter `title` → `docDefaults` in `content.config.ts` → file name. The leading H1 is removed from the body so it isn't shown twice. Description falls back to the first paragraph.
- **Findability**: ⌘K / Ctrl K / `/` command palette (titles, keywords, section headings, deep links), `/docs` library with topic chips + live filter, left sidebar tree, "On this page" scroll-spy, breadcrumbs, prev/next, related guides, reading progress.
- **Copy**: every code block has a language label + Copy button; "Copy page" (as Markdown) and "Copy link" per doc; all text stays selectable.
- **Ads**: config-driven AdSense — sticky right rail + in-article (mid, after 4+ sections) + end of article. Off unless `NEXT_PUBLIC_ADSENSE_CLIENT` is set; nothing renders in production when off (previously a placeholder box always showed).
- **SEO**: real metadata per page, canonical URLs, OG article tags, JSON-LD `Article`, `sitemap.xml`, `robots.txt`, `feed.xml` (RSS).
- **Design**: new OKLCH token set (light/dark via `next-themes`), Geist self-hosted via `geist` (no Google Fonts fetch at build), responsive down to mobile.
- Own syntax-highlight palette (removed phantom `highlight.js` CSS import). Old unused nav/footer/drawer CSS and `sparkverse-theme.css` removed.

## Notes
- `best-guide-to-make-real-money.md` is marked `draft: true` (it's a topic bank, not a finished doc); it shows in dev, not in production.
- The two registered docs got front-matter (description, keywords, date, `featured`) migrated from the old registry. Adjust `date` if wrong.
- Added `src/docs/others/how-to-add-a-doc.md` as author documentation and a demo of code blocks; delete freely.
- Site name/tagline/hero copy: `src/packages/config/site.config.ts`. Set `NEXT_PUBLIC_SITE_URL` in production.
- No more `LayoutProps` (needed typegen) → `typecheck` works on a fresh clone.

## Removed
`src/components/**` (old), `src/styles/**` (old), `src/packages/content/{docs.content,code.content,docs/*,code/*}.ts`,
`src/packages/utils/{content-card,get-content,get-file}.ts`, `src/types/content.d.ts`,
`src/app/docs/**` (replaced by `src/app/[collection]/**`). Docs moved from `src/docs/` to `src/content/docs/`.

## New deps
`gray-matter`, `github-slugger`, `rehype-slug`, `geist`.

## Verified
`biome check` clean · `tsc` clean · `next build` OK (all pages static); also tested with temporary `/code` and `/tutorials` sections (nav, sidebar, cross-section search, 404s) · browser-tested: copy button, copy page, ⌘K/`/` search + Enter, TOC ids match rendered headings, no horizontal scroll at 390px.
