import { notFound } from "next/navigation";
import ContentCategoryPage from "@/components/features/content/ContentCategoryPage";
import { docsContent } from "@/packages/content/docs.content";

interface DocsCategoryRouteProps {
  params: Promise<{
    category: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return docsContent.categories.map((category) => ({
    category: category.key,
  }));
}

const DocsCategoryRoute = async ({ params }: DocsCategoryRouteProps) => {
  const { category: categoryKey } = await params;

  const category = docsContent.categories.find(
    (item) => item.key === categoryKey,
  );

  if (!category) {
    notFound();
  }

  return <ContentCategoryPage config={docsContent} category={category} />;
};

export default DocsCategoryRoute;
