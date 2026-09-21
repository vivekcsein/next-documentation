import type { MetadataRoute } from "next";
import { appConfig } from "@/packages/configs/app.config";

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${appConfig.url}/sitemap.xml`,
});

export default robots;
