import type { IconName } from "@/components/ui";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Doc = {
  /** `<collection>/<category>/<slug>` */
  id: string;
  collection: string;
  category: string;
  slug: string;
  href: string;
  title: string;
  description: string;
  /** ISO 8601 */
  createdAt: string;
  updatedAt: string;
  readingMinutes: number;
  keywords: string[];
  featured: boolean;
  order?: number;
  headings: TocItem[];
  /** Markdown body (first `# Heading` already removed when used as the title). */
  content: string;
};

/** Safe to pass to client components — no markdown body. */
export type DocSummary = Omit<Doc, "content">;

export type Category = {
  collection: string;
  key: string;
  title: string;
  description: string;
  icon: IconName;
  docs: Doc[];
};

/** A top-level section of the site: /docs, /code, /tutorials … */
export type Collection = {
  key: string;
  title: string;
  description: string;
  icon: IconName;
  /** Show in the header/footer navigation. */
  nav: boolean;
  categories: Category[];
};

export type CategorySummary = Omit<Category, "docs"> & { count: number };

export type CollectionSummary = Omit<Collection, "categories"> & {
  count: number;
  categoryCount: number;
};

export type SearchEntry = {
  id: string;
  href: string;
  title: string;
  description: string;
  collectionTitle: string;
  categoryTitle: string;
  keywords: string[];
  headings: TocItem[];
};
