import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { z } from "zod";
import {
  categoryConfig,
  collectionConfig,
  docDefaults,
  fallbackCategory,
  fallbackCollection,
  reservedCollections,
} from "@/packages/configs/content.config";
import type {
  Category,
  CategorySummary,
  Collection,
  CollectionSummary,
  Doc,
  DocSummary,
  SearchEntry,
} from "../../types/app";
import {
  buildExcerpt,
  extractHeadings,
  extractLeadingHeading,
  humanize,
  readingMinutes,
} from "./parse";

/**
 * Filesystem-driven content:
 *
 *   src/content/<collection>/<category>/<slug>.md
 *                                    →  /<collection>/<category>/<slug>
 *
 * Drop a .md file in a folder and it is published. New folders become new
 * sections/categories. Files/folders starting with `_` or `.` are ignored;
 * `draft: true` hides a doc in production builds.
 */
const CONTENT_ROOT = path.join(process.cwd(), "src/content");
const SAFE_NAME = /^[a-z0-9][a-z0-9-]*$/;

const keywordsSchema = z
  .union([z.array(z.coerce.string()), z.string()])
  .transform((value) =>
    (Array.isArray(value) ? value : value.split(","))
      .map((keyword) => keyword.trim())
      .filter(Boolean),
  );

const frontmatterSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  keywords: keywordsSchema.optional(),
  order: z.number().optional(),
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
});

const assertSafeName = (name: string, file: string) => {
  if (!SAFE_NAME.test(name)) {
    throw new Error(
      `Invalid name "${name}" (${file}). Use lowercase kebab-case, e.g. "my-new-guide.md".`,
    );
  }
};

const byNewest = (a: Doc, b: Doc) => b.updatedAt.localeCompare(a.updatedAt);

const byOrderThenNewest = (a: Doc, b: Doc) => {
  if (a.order !== undefined && b.order !== undefined && a.order !== b.order) {
    return a.order - b.order;
  }
  if (a.order !== undefined && b.order === undefined) return -1;
  if (a.order === undefined && b.order !== undefined) return 1;
  return byNewest(a, b);
};

const listDirs = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith("_") &&
        !entry.name.startsWith("."),
    )
    .map((entry) => entry.name);

const readDoc = (
  collection: string,
  category: string,
  fileName: string,
): Doc | null => {
  const slug = fileName.replace(/\.md$/, "");
  const file = path.join(CONTENT_ROOT, collection, category, fileName);
  assertSafeName(slug, file);

  const parsed = matter(fs.readFileSync(file, "utf-8"));
  const result = frontmatterSchema.safeParse(parsed.data);

  if (!result.success) {
    throw new Error(
      `Invalid front-matter in ${collection}/${category}/${fileName}:\n${z.prettifyError(result.error)}`,
    );
  }

  const meta = result.data;
  if (meta.draft && process.env.NODE_ENV !== "production") {
    console.warn(`"${collection}/${category}/${slug}" is marked as draft.`);
  }

  const id = `${collection}/${category}/${slug}`;
  const defaults = docDefaults[id];
  const { title: headingTitle, body } = extractLeadingHeading(parsed.content);

  // Title: first "# Heading" in the file → front-matter → config default → filename
  const title = headingTitle ?? meta.title ?? defaults?.title ?? humanize(slug);

  // Description: front-matter → first paragraph → config default → category text
  const description =
    meta.description ??
    (buildExcerpt(body) ||
      defaults?.description ||
      categoryConfig[`${collection}/${category}`]?.description ||
      fallbackCategory.description);

  const modified = fs.statSync(file).mtime;
  const createdAt = (meta.date ?? meta.updated ?? modified).toISOString();
  const updatedAt = (meta.updated ?? meta.date ?? modified).toISOString();

  return {
    id,
    collection,
    category,
    slug,
    href: `/${collection}/${category}/${slug}`,
    title,
    description,
    createdAt,
    updatedAt,
    readingMinutes: readingMinutes(body),
    keywords: meta.keywords ?? [],
    featured: meta.featured ?? false,
    order: meta.order,
    headings: extractHeadings(body),
    content: body,
  };
};

const readCategory = (collection: string, key: string): Category => {
  const dir = path.join(CONTENT_ROOT, collection, key);
  assertSafeName(key, dir);
  const meta = categoryConfig[`${collection}/${key}`];

  const docs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".md") &&
        !entry.name.startsWith("_"),
    )
    .map((entry) => readDoc(collection, key, entry.name))
    .filter((doc): doc is Doc => doc !== null)
    .sort(byOrderThenNewest);

  return {
    collection,
    key,
    title: meta?.title ?? humanize(key),
    description: meta?.description ?? fallbackCategory.description,
    icon: meta?.icon ?? fallbackCategory.icon,
    docs,
  };
};

const collectionNav = (key: string) => collectionConfig[key]?.nav ?? true;

export const getCollections = cache((): Collection[] => {
  if (!fs.existsSync(CONTENT_ROOT)) return [];

  return listDirs(CONTENT_ROOT)
    .map((key) => {
      assertSafeName(key, path.join(CONTENT_ROOT, key));
      if (reservedCollections.has(key)) {
        throw new Error(
          `"${key}" is reserved and can't be a content folder (src/content/${key}).`,
        );
      }
      const meta = collectionConfig[key];

      return {
        key,
        title: meta?.title ?? humanize(key),
        description: meta?.description ?? fallbackCollection.description,
        icon: meta?.icon ?? fallbackCollection.icon,
        nav: collectionNav(key),
        categories: listDirs(path.join(CONTENT_ROOT, key))
          .map((category) => readCategory(key, category))
          .filter((category) => category.docs.length > 0)
          .sort((a, b) => {
            const orderA = categoryConfig[`${key}/${a.key}`]?.order ?? 50;
            const orderB = categoryConfig[`${key}/${b.key}`]?.order ?? 50;
            return orderA - orderB || a.title.localeCompare(b.title);
          }),
      } satisfies Collection;
    })
    .filter((collection) => collection.categories.length > 0)
    .sort((a, b) => {
      const orderA = collectionConfig[a.key]?.order ?? 50;
      const orderB = collectionConfig[b.key]?.order ?? 50;
      return orderA - orderB || a.title.localeCompare(b.title);
    });
});

export const getCollection = (key: string): Collection | undefined =>
  getCollections().find((collection) => collection.key === key);

export const getCategory = (
  collectionKey: string,
  key: string,
): Category | undefined =>
  getCollection(collectionKey)?.categories.find(
    (category) => category.key === key,
  );

export const getCollectionDocs = (collectionKey: string): Doc[] =>
  (getCollection(collectionKey)?.categories ?? [])
    .flatMap((category) => category.docs)
    .sort(byNewest);

/** Every published doc across all collections, newest first. */
export const getAllDocs = cache((): Doc[] =>
  getCollections()
    .flatMap((collection) =>
      collection.categories.flatMap((category) => category.docs),
    )
    .sort(byNewest),
);

export const getDoc = (
  collection: string,
  category: string,
  slug: string,
): Doc | undefined =>
  getCategory(collection, category)?.docs.find((doc) => doc.slug === slug);

export const toSummary = ({ content: _content, ...summary }: Doc): DocSummary =>
  summary;

export const getCollectionSummaries = (): CollectionSummary[] =>
  getCollections().map(({ categories, ...collection }) => ({
    ...collection,
    categoryCount: categories.length,
    count: categories.reduce((sum, category) => sum + category.docs.length, 0),
  }));

export const getCategorySummaries = (
  collectionKey: string,
): CategorySummary[] =>
  (getCollection(collectionKey)?.categories ?? []).map(
    ({ docs, ...category }) => ({ ...category, count: docs.length }),
  );

/** `<collection>/<category>` → category title, for labelling cards. */
export const getCategoryTitles = (): Record<string, string> =>
  Object.fromEntries(
    getCollections().flatMap((collection) =>
      collection.categories.map((category) => [
        `${collection.key}/${category.key}`,
        category.title,
      ]),
    ),
  );

export const getLatestDocs = (limit: number): DocSummary[] =>
  getAllDocs().slice(0, limit).map(toSummary);

export const getFeaturedDocs = (limit: number): DocSummary[] =>
  getAllDocs()
    .filter((doc) => doc.featured)
    .slice(0, limit)
    .map(toSummary);

export const getAdjacentDocs = (doc: Doc) => {
  const siblings = getCategory(doc.collection, doc.category)?.docs ?? [];
  const index = siblings.findIndex((item) => item.id === doc.id);

  return {
    previous: index > 0 ? toSummary(siblings[index - 1]) : undefined,
    next:
      index >= 0 && index < siblings.length - 1
        ? toSummary(siblings[index + 1])
        : undefined,
  };
};

/** Same category, then same collection, ranked by shared keywords, then newest. */
export const getRelatedDocs = (doc: Doc, limit = 3): DocSummary[] => {
  const keywords = new Set(
    doc.keywords.map((keyword) => keyword.toLowerCase()),
  );

  return getAllDocs()
    .filter((other) => other.id !== doc.id)
    .map((other) => ({
      other,
      score:
        (other.collection === doc.collection ? 1 : 0) +
        (other.category === doc.category && other.collection === doc.collection
          ? 2
          : 0) +
        other.keywords.filter((keyword) => keywords.has(keyword.toLowerCase()))
          .length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || byNewest(a.other, b.other))
    .slice(0, limit)
    .map(({ other }) => toSummary(other));
};

export const getSearchIndex = cache((): SearchEntry[] => {
  const collections = new Map(getCollections().map((c) => [c.key, c.title]));
  const categories = getCategoryTitles();

  return getAllDocs().map((doc) => ({
    id: doc.id,
    href: doc.href,
    title: doc.title,
    description: doc.description,
    collectionTitle: collections.get(doc.collection) ?? doc.collection,
    categoryTitle:
      categories[`${doc.collection}/${doc.category}`] ?? doc.category,
    keywords: doc.keywords,
    headings: doc.headings,
  }));
});
