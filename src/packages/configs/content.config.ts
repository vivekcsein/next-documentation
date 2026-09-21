import type { IconName } from "@/components/ui";

/** Accent colours for topics (dots, icon tiles, card tints, badges). */
export const topicPalette = {
  sky: "#38bdf8",
  green: "#34d399",
  orange: "#fb923c",
  violet: "#8b7bff",
  magenta: "#d946ef",
  blue: "#4f8cff",
  rose: "#fb4f7a",
  teal: "#2dd4bf",
  amber: "#fbbf24",
} as const;

export type TopicColor = keyof typeof topicPalette;

/** Used, in order, for categories that don't set a `color`. */
export const fallbackTopicColors: readonly TopicColor[] = [
  "sky",
  "green",
  "orange",
  "violet",
  "magenta",
  "blue",
  "rose",
];

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
  code: {
    title: "Code",
    description: "Snippets, patterns and cheat-sheets you can copy and paste.",
    order: 2,
    icon: "code",
  },
};

export type CategoryMeta = {
  title: string;
  description: string;
  /** Lower first inside its collection. */
  order: number;
  icon: IconName;
  /** Accent colour; defaults to a rotating palette. */
  color?: TopicColor;
};

/** Keyed by `<collection>/<category>`. */
export const categoryConfig: Readonly<Record<string, CategoryMeta>> = {
  "docs/top-content": {
    title: "Business",
    description:
      "Guides on freelancing, job hunting and getting paid for your skills.",
    order: 1,
    icon: "trending-up",
    color: "orange",
  },
  "docs/interview": {
    title: "Interview",
    description:
      "Question banks with clear answers for JavaScript, React and Next.js interviews.",
    order: 2,
    icon: "target",
    color: "magenta",
  },
  "docs/others": {
    title: "Other Resources",
    description:
      "Additional guides, references and resources that don't fit a bigger category yet.",
    order: 99,
    icon: "file-text",
    color: "rose",
  },
  "code/general": {
    title: "Snippets",
    description: "Copy-ready code snippets and cheat-sheets.",
    order: 1,
    icon: "code",
    color: "sky",
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
  "bookmarks",
]);

/**
 * DEFAULT title/description for a doc, keyed by `<collection>/<category>/<slug>`.
 * Only used when the markdown file has no `# Heading` (title) or no
 * front-matter/intro paragraph (description).
 */
export const docDefaults: Readonly<
  Record<string, { title?: string; description?: string }>
> = {};
