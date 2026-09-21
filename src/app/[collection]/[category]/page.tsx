import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocCard } from "@/components/features/docs/DocCard";
import { Breadcrumbs, Icon } from "@/components/ui";
import {
  getCategory,
  getCollection,
  getCollections,
  toSummary,
} from "@/packages/utils/loader";

type CategoryPageProps = {
  params: Promise<{ collection: string; category: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () =>
  getCollections().flatMap((collection) =>
    collection.categories.map((category) => ({
      collection: collection.key,
      category: category.key,
    })),
  );

export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const { collection, category: key } = await params;
  const category = getCategory(collection, key);
  if (!category) return {};

  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: `/${collection}/${category.key}` },
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { collection: collectionKey, category: key } = await params;
  const collection = getCollection(collectionKey);
  const category = getCategory(collectionKey, key);
  if (!collection || !category) notFound();

  return (
    <div className="animate-fade-up">
      <Breadcrumbs
        items={[
          { label: collection.title, href: `/${collection.key}` },
          { label: category.title },
        ]}
      />
      <header className="mb-8 flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon name={category.icon} size={24} />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {category.title}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {category.description}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {category.docs.length}{" "}
            {category.docs.length === 1 ? "guide" : "guides"}
          </p>
        </div>
      </header>

      <ul className="grid gap-4 md:grid-cols-2">
        {category.docs.map((doc) => (
          <li key={doc.id}>
            <DocCard doc={toSummary(doc)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
