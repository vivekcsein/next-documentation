"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui";
import { cn } from "@/packages/utils/cn";
import { useSearch } from "./SearchProvider";

const subscribe = () => () => {};
const getIsApple = () => /Mac|iPhone|iPad/.test(navigator.platform);

type SearchTriggerProps = {
  variant?: "header" | "hero";
  className?: string;
};

export const SearchTrigger = ({
  variant = "header",
  className,
}: SearchTriggerProps) => {
  const { open } = useSearch();
  const isApple = useSyncExternalStore(subscribe, getIsApple, () => false);
  const hero = variant === "hero";

  return (
    <button
      aria-label="Search documentation"
      className={cn(
        "group flex items-center gap-3 border border-border bg-card text-left text-muted-foreground transition hover:border-primary/40 hover:text-foreground",
        hero
          ? "h-14 w-full max-w-xl rounded-2xl px-5 text-base shadow-card"
          : "h-9 rounded-lg px-3 text-sm sm:w-64",
        className,
      )}
      onClick={open}
      type="button"
    >
      <Icon name="search" size={hero ? 20 : 16} />
      <span className={cn("flex-1", !hero && "hidden sm:block")}>
        Search docs…
      </span>
      <kbd
        className={cn(
          "hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[0.7rem] font-medium sm:block",
          hero && "text-xs",
        )}
      >
        {isApple ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
};
