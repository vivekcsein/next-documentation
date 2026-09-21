import Link from "next/link";
import { SearchTrigger } from "@/components/features/search/SearchTrigger";
import { appConfig } from "@/packages/configs/app.config";
import { getCollectionSummaries } from "@/packages/utils/loader";
import { ThemeToggle } from "./ThemeToggle";

export const SiteHeader = () => {
  const sections = getCollectionSummaries().filter(({ nav }) => nav);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container-page flex h-(--header-h) items-center gap-4">
        <Link
          className="flex items-center gap-2.5 font-semibold tracking-tight"
          href="/"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-xs">
            {appConfig.name.charAt(0)}
          </span>
          <span className="hidden sm:block">{appConfig.name}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-2 flex items-center gap-1 overflow-x-auto"
        >
          {sections.map((section) => (
            <Link
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              href={`/${section.key}`}
              key={section.key}
            >
              {section.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
