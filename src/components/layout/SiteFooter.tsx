import Link from "next/link";
import { appConfig } from "@/packages/configs/app.config";
import { getCollectionSummaries } from "@/packages/utils/loader";

export const SiteFooter = () => {
  const sections = getCollectionSummaries().filter(({ nav }) => nav);

  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {appConfig.name}. {appConfig.tagline}.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-5">
          {sections.map((section) => (
            <Link
              className="hover:text-foreground"
              href={`/${section.key}`}
              key={section.key}
            >
              {section.title}
            </Link>
          ))}
          <a className="hover:text-foreground" href="/feed.xml">
            RSS
          </a>
          <a className="hover:text-foreground" href="/sitemap.xml">
            Sitemap
          </a>
        </nav>
      </div>
    </footer>
  );
};
