import ContentTemplate from "@/components/features/content/ContentTemplate";
import { docsContent } from "@/packages/content/docs.content";

export interface DocsPageProps {
  params: Promise<{
    category: string;
    slug: string[];
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return docsContent.categories.flatMap((category) =>
    category.children.map((doc) => ({
      category: category.key,
      slug: [doc.slug],
    })),
  );
}

const DocsTemplateRoute = async ({ params }: DocsPageProps) => {
  const { category, slug } = await params;

  return <ContentTemplate slug={[category, ...slug]} config={docsContent} />;
};

export default DocsTemplateRoute;
