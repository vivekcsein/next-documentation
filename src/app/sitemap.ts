import type { MetadataRoute } from "next";
import { appConfig } from "@/packages/configs/app.config";
import { getAllDocs, getCollections } from "@/packages/utils/loader";

const sitemap = (): MetadataRoute.Sitemap => {
  const docs = getAllDocs();
  const collections = getCollections();

  return [
    {
      url: appConfig.url,
      lastModified: docs[0]?.updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...collections.flatMap((collection) => [
      {
        url: `${appConfig.url}/${collection.key}`,
        lastModified: collection.categories[0]?.docs[0]?.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      ...collection.categories.map((category) => ({
        url: `${appConfig.url}/${collection.key}/${category.key}`,
        lastModified: category.docs[0]?.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ]),
    ...docs.map((doc) => ({
      url: `${appConfig.url}${doc.href}`,
      lastModified: doc.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
};

export default sitemap;
