"use client";

import { BookOpen, CalendarDays, FileText, Layers3 } from "lucide-react";
import Image from "next/image";

import { imagesConfig } from "@/packages/configs/images.config";
import { useCountUp } from "@/packages/hooks/use-count-up";

type HeroStatProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

function HeroStat({ icon, value, label }: HeroStatProps) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <div className="text-sm font-semibold leading-none text-foreground">
          {value}
        </div>

        <div className="mt-1 text-[10px] leading-none text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}

function formatCompactNumber(value: number): string {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}K`;
  }

  return value.toString();
}

export function DocsHero() {
  const articles = useCountUp(26, {
    duration: 1200,
  });

  const topics = useCountUp(8, {
    duration: 1400,
  });

  const words = useCountUp(124, {
    duration: 1600,
  });

  const activeHeroImage = imagesConfig.heroImages.active;

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-[35%] top-0 size-72 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="absolute right-0 top-1/2 size-96 -translate-y-1/2 rounded-full bg-violet-500/5 blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
        {/* Content */}
        <div className="relative flex min-h-90 flex-col justify-center px-5 py-12 sm:px-8 lg:min-h-107.5 lg:px-12 xl:px-16">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                Knowledge Base
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-balance text-4xl font-bold tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[3.7rem] lg:leading-[0.98] xl:text-[4.15rem]">
              Things I’ve learned
              <br />
              building{" "}
              <span className="gradient bg-clip-text text-transparent">
                on the web.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              A growing collection of guides, notes, and resources on
              development, freelancing, careers and more.
            </p>

            {/* Stats */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <HeroStat
                icon={<FileText className="size-3.5" />}
                value={articles.toString()}
                label="Articles"
              />

              <HeroStat
                icon={<Layers3 className="size-3.5" />}
                value={topics.toString()}
                label="Topics"
              />

              <HeroStat
                icon={<BookOpen className="size-3.5" />}
                value={`${formatCompactNumber(words)}K`}
                label="Words"
              />

              <HeroStat
                icon={<CalendarDays className="size-3.5" />}
                value="Sep 21"
                label="Last Updated"
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative min-h-70 overflow-hidden lg:min-h-107.5">
          {/* Image */}
          <Image
            src={activeHeroImage.src}
            alt={activeHeroImage.alt}
            fill
            priority={activeHeroImage.priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />

          {/* Left fade */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-background via-background/70 to-transparent"
          />

          {/* Bottom fade */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background via-background/20 to-transparent"
          />

          {/* Overall image tint */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-primary/5 mix-blend-screen"
          />
        </div>
      </div>
    </section>
  );
}
