import Link from "next/link";
import { CategoryCard } from "@/components/features/docs/CategoryCard";
import { DocCard } from "@/components/features/docs/DocCard";
import { SearchTrigger } from "@/components/features/search/SearchTrigger";
import { Icon } from "@/components/ui";
import { Badge } from "@/components/ui/badge/Badge";
import { appConfig } from "@/packages/configs/app.config";
import {
  getCategoryTitles,
  getCollectionSummaries,
  getFeaturedDocs,
  getLatestDocs,
} from "@/packages/utils/loader";

const Home = () => {
  const collections = getCollectionSummaries();
  const titles = getCategoryTitles();
  const featured = getFeaturedDocs(3);
  const latest = getLatestDocs(6);
  const totalGuides = collections.reduce((sum, c) => sum + c.count, 0);

  return (
    <>
      <section className="hero-backdrop relative isolate overflow-hidden border-b border-border">
        <div aria-hidden="true" className="grid-fade absolute inset-0 -z-10" />
        <div className="container-page animate-fade-up flex flex-col items-center py-20 text-center sm:py-28">
          <Badge className="mb-6" variant="primary">
            <Icon name="sparkles" size={13} /> {appConfig.hero.badge}
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            {appConfig.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
            {appConfig.hero.subtitle}
          </p>

          <div className="mt-9 flex w-full justify-center">
            <SearchTrigger variant="hero" />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {totalGuides} {totalGuides === 1 ? "guide" : "guides"} across{" "}
            {collections.length}{" "}
            {collections.length === 1 ? "section" : "sections"}
          </p>
        </div>
      </section>

      <div className="container-page space-y-16 py-14">
        {featured.length > 0 && (
          <section aria-labelledby="featured-heading">
            <h2
              className="text-2xl font-semibold tracking-tight"
              id="featured-heading"
            >
              Start here
            </h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((doc) => (
                <li key={doc.id}>
                  <DocCard
                    categoryTitle={titles[`${doc.collection}/${doc.category}`]}
                    doc={doc}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="topics-heading">
          <h2
            className="text-2xl font-semibold tracking-tight"
            id="topics-heading"
          >
            Browse by section
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <li key={collection.key}>
                <CategoryCard
                  count={collection.count}
                  description={collection.description}
                  href={`/${collection.key}`}
                  icon={collection.icon}
                  title={collection.title}
                />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="latest-heading">
          <div className="flex items-end justify-between">
            <h2
              className="text-2xl font-semibold tracking-tight"
              id="latest-heading"
            >
              Latest guides
            </h2>
            {collections.length === 1 && (
              <Link
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                href={`/${collections[0].key}`}
              >
                View all <Icon name="arrow-right" size={14} />
              </Link>
            )}
          </div>
          <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((doc) => (
              <li key={doc.id}>
                <DocCard
                  categoryTitle={titles[`${doc.collection}/${doc.category}`]}
                  doc={doc}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Home;
