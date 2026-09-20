import type { ContentConfig } from "@/types/content";

export { getFilePath } from "../utils/get-file";

export type CodeCategory = "arrayInJs";

export const codeContent: ContentConfig<CodeCategory> = {
  key: "CODE",
  title: "Code",
  description:
    "Explore organized guides, references, tutorials, and resources to help you learn, build, and work more effectively.",
  slug: "code",
  path: "code",
  categories: [
    {
      key: "arrayInJs",
      title: "Array in JavaScript",
      description:
        "Guides, references, tutorials, and resources to help you learn, build, and work more effectively.",
      children: [],
    },
  ],
};
