---
description: Add a new guide in under a minute — create a markdown file, and it is published, searchable and listed automatically.
date: 2026-09-21
keywords: [docs, markdown, frontmatter, authoring, how to]
order: 1
---

# How to add a new doc

Every guide on this site is a plain `.md` file. There is no registry to edit and no config to touch — create the file and it appears on the home page, in the sidebar, in search and in the sitemap.

## 1. Create the file

The folder path is the URL. A file can sit directly inside a collection (no category), or inside a category sub-folder:

```text
src/content/
├── articles/
│   └── how-i-structure-a-nextjs-project.md   →  /articles/how-i-structure-a-nextjs-project
├── docs/
│   ├── vercel/
│   │   └── deployment.md                     →  /docs/vercel/deployment
│   ├── frontend/
│   │   └── react.md                          →  /docs/frontend/react
│   └── others/
│       └── how-to-add-a-doc.md               →  /docs/others/how-to-add-a-doc
├── tutorials/
│   └── build-auth-with-nextjs.md             →  /tutorials/build-auth-with-nextjs
└── resources/
    └── javascript-cheatsheet.md              →  /resources/javascript-cheatsheet
```

Use lowercase kebab-case names. A new top-level folder is a whole new section (`/docs`, `/tutorials`, `/resources`, …) with its own index page — no code changes. A sub-folder inside it is a **category**, used for grouping, the sidebar's Topics list, and the filter chips on `/content/all` — it's optional, and a file with no category folder still gets its own page.

## 2. Write a heading

The first `# Heading` in the file becomes the page title. If there is none, the `title` from front-matter is used, then the default from `content.config.ts`, then the file name.

```md
# My guide title

A short intro paragraph — it doubles as the description in search and Google.
```

## 3. Optional front-matter

Everything here is optional. Skip it entirely if you like.

```yaml
---
description: One sentence for cards, search and SEO.
date: 2026-09-21        # first published
updated: 2026-10-02     # last meaningful edit
keywords: [freelance, clients]
featured: true          # shows in "Start here" on the home page
order: 1                # lower = earlier inside its category
draft: true             # hidden in production builds
---
```

## Code blocks are copy-ready

Any fenced block gets a language label and a one-click copy button.

```ts
type Doc = {
  slug: string;
  title: string;
};

export const getDoc = (slug: string): Doc | undefined =>
  docs.find((doc) => doc.slug === slug);
```

```bash
bun run dev
bun run build
```

Inline `code`, tables and task lists work too:

| Field | Required | Default |
|---|---|---|
| `title` | no | first `# Heading` |
| `description` | no | first paragraph |
| `date` | no | file modified time |

- [x] Write the guide
- [ ] Share it

## Turning on ads

Set `NEXT_PUBLIC_ADSENSE_CLIENT` and the slot ids in your environment. Ads appear in the right rail and inside long articles — nothing else to change.

## Next steps

Run `bun run dev`, open the page, and use `/` to search for it. The knowledge-base home lives at `/content` (and at `/`); the full filterable, paginated list of everything is at `/content/all`.
