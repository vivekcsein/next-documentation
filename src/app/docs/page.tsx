import ContentIndexPage from "@/components/features/content/ContentIndexPage";
import { docsContent } from "@/packages/content/docs.content";

const DocsPage = () => {
  return (
    <ContentIndexPage
      config={docsContent}
      badge="Developer Documentation"
      sectionHeading="Browse my Research & Development"
    />
  );
};

export default DocsPage;
