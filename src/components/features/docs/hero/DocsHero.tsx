"use client";

import Image from "next/image";
import { Icon, type IconName } from "@/components/ui";
import { appConfig } from "@/packages/configs/app.config";
import type { TopicColor } from "@/packages/configs/content.config";
import { imagesConfig } from "@/packages/configs/images.config";
import { useCountUp } from "@/packages/hooks/use-count-up";
import { topicStyle } from "@/packages/utils/topic";
import type { KnowledgeStats } from "@/types/app";

type HeroStatProps = {
  icon: IconName;
  color: TopicColor;
  top: string;
  bottom: string;
  /** Label above value (used by "Last Updated"). */
  labelFirst?: boolean;
};

const HeroStat = ({ icon, color, top, bottom, labelFirst }: HeroStatProps) => (
  <div className="flex min-w-0 items-center gap-2.5" style={topicStyle(color)}>
    <span className="topic-badge grid size-[26px] shrink-0 place-items-center rounded-md">
      <Icon name={icon} size={14} />
    </span>
    <span className="min-w-0 leading-none">
      <span
        className={
          labelFirst
            ? "block text-xs text-foreground/85"
            : "block text-sm font-semibold text-foreground"
        }
      >
        {top}
      </span>
      <span className="mt-1.5 block text-xs text-muted-foreground">
        {bottom}
      </span>
    </span>
  </div>
);

const formatWords = (words: number) =>
  words >= 1000 ? `${Math.round(words / 1000)}K` : String(words);

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "UTC",
});

type DocsHeroProps = { stats: KnowledgeStats };

export const DocsHero = ({ stats }: DocsHeroProps) => {
  const articles = useCountUp(stats.articles, { duration: 1000 });
  const topics = useCountUp(stats.topics, { duration: 1100 });
  const words = useCountUp(stats.words, { duration: 1300 });
  const image = imagesConfig.heroImages.active;
  const { hero } = appConfig;

  return (
    <section className="relative isolate min-h-[265px] overflow-hidden sm:min-h-[265px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-10 size-72 rounded-full bg-primary/15 blur-[110px]"
      />

      <div className="hero-photo absolute inset-y-0 right-0 -z-10 w-full opacity-40 sm:w-[64%] sm:opacity-100">
        <Image
          alt={image.alt}
          className="object-cover object-[62%_50%]"
          fill
          priority={image.priority}
          sizes="(max-width: 640px) 100vw, 560px"
          src={image.src}
        />
      </div>

      <div className="relative max-w-[26rem] pb-8 pt-6 sm:pb-0">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-soft">
          {hero.eyebrow}
        </p>

        <h1 className="mt-3 text-balance text-[2.35rem] font-bold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-[2.7rem]">
          {hero.title}
          <br />
          {hero.highlightPrefix}{" "}
          <span className="text-gradient">{hero.highlight}</span>
        </h1>

        <p className="mt-4 max-w-[21.5rem] text-sm leading-5 text-muted-foreground">
          {hero.subtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
          <HeroStat
            bottom="Articles"
            color="sky"
            icon="file-text"
            top={String(articles)}
          />
          <HeroStat
            bottom="Topics"
            color="teal"
            icon="layers"
            top={String(topics)}
          />
          <HeroStat
            bottom="Words"
            color="green"
            icon="book-open"
            top={formatWords(words)}
          />
          {stats.lastUpdated && (
            <HeroStat
              bottom={dateFormatter.format(new Date(stats.lastUpdated))}
              color="rose"
              icon="calendar"
              labelFirst
              top="Last Updated"
            />
          )}
        </div>
      </div>
    </section>
  );
};
