import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/features/ads-sense/AdSlot";
import { DocActions } from "@/components/features/docs/DocActions";
import { DocPager } from "@/components/features/docs/DocPager";
import { DocToc } from "@/components/features/docs/DocToc";
import { RelatedDocs } from "@/components/features/docs/RelatedDocs";
import { Markdown } from "@/components/features/markdown/Markdown";
import { Breadcrumbs, Icon, ProgressBar } from "@/components/ui";
import { Badge } from "@/components/ui/badge/Badge";
import { appConfig } from "@/packages/configs/app.config";
import { formatDate, formatReadingTime } from "@/packages/utils/format";
import {
  getAdjacentDocs,
  getAllDocs,
  getCategory,
  getCategoryTitles,
  getCollection,
  getDoc,
  getRelatedDocs,
} from "@/packages/utils/loader";

type DocPageProps = {
  params: Promise<{ collection: string; category: string; slug: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllDocs().map(({ collection, category, slug }) => ({
    collection,
    category,
    slug,
  }));

export const generateMetadata = async ({
  params,
}: DocPageProps): Promise<Metadata> => {
  const { collection, category, slug } = await params;
  const doc = getDoc(collection, category, slug);
  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description,
    keywords: doc.keywords,
    alternates: { canonical: doc.href },
    openGraph: {
      type: "article",
      title: doc.title,
      description: doc.description,
      url: doc.href,
      publishedTime: doc.createdAt,
      modifiedTime: doc.updatedAt,
    },
  };
};

/** Show a mid-article ad only when the article is long enough to deserve one. */
const MID_AD_MIN_SECTIONS = 4;

const DocPage = async ({ params }: DocPageProps) => {
  const {
    collection: collectionKey,
    category: categoryKey,
    slug,
  } = await params;
  const doc = getDoc(collectionKey, categoryKey, slug);
  const collection = getCollection(collectionKey);
  const category = getCategory(collectionKey, categoryKey);
  if (!doc || !collection || !category) notFound();

  const { previous, next } = getAdjacentDocs(doc);
  const related = getRelatedDocs(doc);
  const titles = getCategoryTitles();

  const sections = doc.headings.filter((heading) => heading.level === 2);
  const midAdId =
    sections.length >= MID_AD_MIN_SECTIONS ? sections[2]?.id : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc.title,
    description: doc.description,
    datePublished: doc.createdAt,
    dateModified: doc.updatedAt,
    url: `${appConfig.url}${doc.href}`,
    author: { "@type": "Organization", name: appConfig.author },
    publisher: { "@type": "Organization", name: appConfig.author },
    keywords: doc.keywords.join(", "),
  };

  return (
    <div className="gap-10 xl:grid xl:grid-cols-[minmax(0,1fr)_17.5rem]">
      <ProgressBar />

      <article className="min-w-0 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: collection.title, href: `/${collection.key}` },
            {
              label: category.title,
              href: `/${collection.key}/${category.key}`,
            },
            { label: doc.title },
          ]}
        />

        <header className="animate-fade-up">
          <Badge variant="primary">{category.title}</Badge>
          <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
            {doc.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {doc.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Icon name="calendar" size={14} />
              Updated{" "}
              <time dateTime={doc.updatedAt}>{formatDate(doc.updatedAt)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="clock" size={14} />
              {formatReadingTime(doc.readingMinutes)}
            </span>
          </div>

          <div className="mt-5 border-b border-border pb-6">
            <DocActions markdown={doc.content} title={doc.title} />
          </div>
        </header>

        {doc.headings.length > 0 && (
          <details className="mt-6 rounded-xl border border-border bg-card xl:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
              <Icon name="outline" size={16} /> On this page
              <Icon className="ml-auto" name="chevron-down" size={14} />
            </summary>
            <DocToc className="px-4 pb-4" items={doc.headings} />
          </details>
        )}

        <div className="mt-8">
          <Markdown
            content={doc.content}
            inlineAd={<AdSlot className="my-10" slot="inArticle" />}
            inlineAdBeforeId={midAdId}
          />
        </div>

        <AdSlot className="mt-12" slot="inArticle" />
        <DocPager next={next} previous={previous} />
        <RelatedDocs docs={related} titles={titles} />
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-[calc(var(--header-h)+1.5rem)] space-y-8">
          <DocToc
            className="max-h-[50svh] overflow-y-auto"
            items={doc.headings}
          />
          <AdSlot slot="rail" />
        </div>
      </aside>

      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: serialised JSON-LD, "<" escaped below
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </div>
  );
};

export default DocPage;
