import type { IconName } from "@/components/ui";

/**
 * Content layout (nothing to register — folders ARE the structure):
 *
 *   src/content/<collection>/<category>/<slug>.md
 *                 │            │          └─ page   → /<collection>/<category>/<slug>
 *                 │            └─ category (group inside a section)
 *                 └─ collection = a top-level section → /<collection>
 *
 * New folder = new section / category. Everything below is OPTIONAL polish;
 * an unlisted folder gets a title derived from its name.
 */

export type CollectionMeta = {
  title: string;
  description: string;
  /** Lower first in navigation. Unlisted collections sort after, A→Z. */
  order: number;
  icon: IconName;
  /** Show in header/footer navigation. Default true. */
  nav?: boolean;
};

export const collectionConfig: Readonly<Record<string, CollectionMeta>> = {
  docs: {
    title: "Docs",
    description:
      "Guides on freelancing, job hunting and getting paid for your skills.",
    order: 1,
    icon: "book",
  },
  // Example — uncomment after creating src/content/code/…
  // code: {
  //   title: "Code",
  //   description: "Snippets, patterns and cheat-sheets you can copy and paste.",
  //   order: 2,
  //   icon: "file",
  // },
};

export type CategoryMeta = {
  title: string;
  description: string;
  /** Lower first inside its collection. */
  order: number;
  icon: IconName;
};

/** Keyed by `<collection>/<category>`. */
export const categoryConfig: Readonly<Record<string, CategoryMeta>> = {
  "docs/top-content": {
    title: "Top Content",
    description:
      "Our most useful guides on freelancing, job hunting and getting paid for your skills.",
    order: 1,
    icon: "trending-up",
  },
  "docs/others": {
    title: "Other Resources",
    description:
      "Additional guides, references and resources that don't fit a bigger category yet.",
    order: 99,
    icon: "folder",
  },
};

export const fallbackCollection = {
  description: "Guides and references in this section.",
  icon: "book",
} as const satisfies { description: string; icon: IconName };

export const fallbackCategory = {
  description: "Guides and references in this category.",
  icon: "folder",
} as const satisfies { description: string; icon: IconName };

/** Top-level URL segments that content folders may not use. */
export const reservedCollections: ReadonlySet<string> = new Set([
  "api",
  "admin",
  "feed",
  "sitemap",
  "robots",
]);

/**
 * DEFAULT title/description for a doc, keyed by `<collection>/<category>/<slug>`.
 * Only used when the markdown file has no `# Heading` (title) or no
 * front-matter/intro paragraph (description).
 */
export const docDefaults: Readonly<
  Record<string, { title?: string; description?: string }>
> = {};
