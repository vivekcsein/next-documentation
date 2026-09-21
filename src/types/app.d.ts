import type { IconName } from "@/components/ui";
import type { TopicColor } from "@/packages/configs/content.config";

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
  /** Optional cover image path (front-matter `image`). */
  image?: string;
  /** Higher = shown earlier in "Popular" (front-matter `popularity`). */
  popularity: number;
  wordCount: number;
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
  color: TopicColor;
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

export type CategoryInfo = { title: string; color: TopicColor };

export type KnowledgeStats = {
  articles: number;
  topics: number;
  words: number;
  /** ISO 8601 of the most recently updated doc */
  lastUpdated?: string;
};
