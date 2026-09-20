import type { ContentConfig } from "@/types/content";
import { othersDocs, topContentDocs } from "./docs";

export { getFilePath } from "../utils/get-file";

export type DocsCategory = "top-content" | "others";

export const docsContent: ContentConfig<DocsCategory> = {
  key: "DOCS",
  title: "Documentation",
  description:
    "Explore organized guides, references, tutorials, and resources to help you learn, build, and work more effectively.",
  slug: "docs",
  path: "docs",

  categories: [
    {
      key: "top-content",
      title: "Top Content",
      description:
        "Guides, resources, and practical documentation covering best practices, tips, and tricks for various aspects of software development, engineering, and business.",
      children: topContentDocs,
    },
    {
      key: "others",
      title: "Other Resources",
      description:
        "Additional guides, references, tutorials, and useful resources that do not fit into the primary documentation categories.",
      children: othersDocs,
    },
  ],
};
