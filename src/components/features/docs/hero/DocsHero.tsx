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
  <div
    className="group flex min-w-0 items-center gap-2.5"
    style={topicStyle(color)}
  >
    <span
      className="
        topic-badge
        grid size-7 shrink-0 place-items-center
        rounded-lg
        border border-current/20
        bg-current/10
        shadow-[0_0_20px_currentColor]
        shadow-current/5
        transition-transform duration-300
        group-hover:-translate-y-0.5

      "
    >
      <Icon name={icon} size={14} />
    </span>

    <span className="min-w-0 leading-none">
      <span
        className={
          labelFirst
            ? "block text-[11px] font-medium text-foreground/85"
            : "block text-sm font-semibold tracking-tight text-foreground"
        }
      >
        {top}
      </span>

      <span className="mt-1.5 block whitespace-nowrap text-[11px] text-muted-foreground">
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

type DocsHeroProps = {
  stats: KnowledgeStats;
};

export const DocsHero = ({ stats }: DocsHeroProps) => {
  const articles = useCountUp(stats.articles, {
    duration: 1000,
  });

  const topics = useCountUp(stats.topics, {
    duration: 1100,
  });

  const words = useCountUp(stats.words, {
    duration: 1300,
  });

  const image = imagesConfig.heroImages.active;
  const { hero } = appConfig;

  return (
    <section
      className="
        relative isolate
        min-h-[300px]
        overflow-hidden
        bg-background
        sm:min-h-[310px]
        mb-5
      "
    >
      {/* Base atmospheric background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-20
          bg-[radial-gradient(circle_at_8%_35%,oklch(0.62_0.24_290_/_0.14),transparent_34%),radial-gradient(circle_at_48%_100%,oklch(0.55_0.24_310_/_0.08),transparent_38%)]
        "
      />

      {/* Left purple atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          -top-24
          -z-10
          size-80
          rounded-full
          bg-primary/15
          blur-[120px]
        "
      />

      {/* Small lower glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-[12%]
          -z-10
          size-64
          rounded-full
          bg-violet-500/10
          blur-[100px]
        "
      />

      {/* Decorative subtle grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          -z-10
          size-44
          opacity-20
          [background-image:radial-gradient(circle,oklch(0.75_0.2_290)_1px,transparent_1px)]
          [background-size:12px_12px]
          [mask-image:linear-gradient(to_bottom_right,black,transparent)]
        "
      />

      {/* Right-side hero image */}
      <div
        className="
          hero-photo
          absolute
          inset-y-0
          right-0
          -z-10
          w-full
          sm:w-[68%]
        "
      >
        <Image
          alt={image.alt}
          className="
            object-cover
            object-[62%_50%]
          "
          fill
          priority={image.priority}
          sizes="(max-width: 640px) 100vw, 680px"
          src={image.src}
        />

        {/* Main left-to-right blend */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-background
            via-background/90
            via-[32%]
            to-transparent
          "
        />

        {/* Extra soft blend around center */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-background/35
            via-transparent
            to-transparent
          "
        />

        {/* Top blend */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            top-0
            h-24
            bg-gradient-to-b
            from-background/35
            to-transparent
          "
        />

        {/* Bottom blend */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            bottom-0
            h-28
            bg-gradient-to-t
            from-background
            to-transparent
          "
        />

        {/* Very subtle color integration */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            bg-indigo-950/10
            mix-blend-multiply
          "
        />
      </div>

      {/* Content */}
      <div
        className="
          relative
          mx-auto
          min-h-[300px]
          max-w-7xl
          px-5
          sm:min-h-[310px]
          sm:px-8
          lg:px-10
        "
      >
        <div
          className="
            flex
            min-h-[300px]
            max-w-[38rem]
            flex-col
            justify-center
            py-8
            sm:min-h-[310px]
            sm:py-9
          "
        >
          {/* Eyebrow */}
          <p
            className="
              flex
              items-center
              gap-2.5
              text-[11px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-primary-soft
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-6
                bg-gradient-to-r
                from-primary
                to-primary
              "
            />

            {hero.eyebrow}
          </p>

          {/* Heading */}
          <h1
            className="
              mt-3
              max-w-[35rem]
              text-balance
              text-[2.45rem]
              font-bold
              leading-[1.03]
              tracking-[-0.05em]
              text-foreground
              sm:text-[2.9rem]
              lg:text-[3.1rem]
            "
          >
            {hero.title}
            <br />
            {hero.highlightPrefix}{" "}
            <span className="text-gradient">{hero.highlight}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="
              mt-4
              max-w-[25rem]
              text-sm
              leading-5
              text-muted-foreground
              sm:text-[14px]
              sm:leading-6
            "
          >
            {hero.subtitle}
          </p>

          {/* Stats */}
          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-x-6
              gap-y-4
              border-t
              border-border/30
              pt-4
              sm:gap-x-7
            "
          >
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
      </div>

      {/* Subtle bottom edge */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-primary/20
          to-transparent
        "
      />
    </section>
  );
};
