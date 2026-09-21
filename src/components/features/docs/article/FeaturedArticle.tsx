import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import Image from "next/image";

import {
  InteractiveCard,
  InteractiveCardContent,
} from "@/components/ui/card/InteractiveCard";

export function FeaturedArticle() {
  return (
    <InteractiveCard
      className="min-h-75 lg:min-h-80"
      aria-label="The Complete Guide to Web Authentication"
    >
      {/* Background image */}
      <Image
        src="/images/blog/authentication.webp"
        alt=""
        fill
        data-card-image
        sizes="(max-width: 1024px) 100vw, 900px"
        className="object-cover object-center"
      />

      {/* Image overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-background via-background/75 to-background/20"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent"
      />

      {/* Content */}
      <InteractiveCardContent className="justify-between p-5 sm:p-6 lg:p-7">
        <div className="max-w-[52%]">
          {/* Category */}
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-medium text-cyan-300">
            Backend
          </span>

          {/* Title */}
          <h2 className="mt-3 max-w-md text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            The Complete Guide to Web Authentication
          </h2>

          {/* Description */}
          <p className="mt-2 max-w-lg text-sm leading-5 text-muted-foreground">
            Learn how to build secure and scalable authentication systems using
            modern techniques, with real-world examples.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-3.5" />
              32 min read
            </span>

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              Sep 18, 2026
            </span>
          </div>

          <button
            type="button"
            className="group/button inline-flex items-center gap-2 rounded-full border border-primary/50 bg-background/40 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Read Guide
            <span data-card-arrow>
              <ArrowRight className="size-3.5" />
            </span>
          </button>
        </div>
      </InteractiveCardContent>
    </InteractiveCard>
  );
}
