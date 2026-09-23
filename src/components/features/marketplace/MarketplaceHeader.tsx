"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Icon } from "@/components/ui";
import { marketplaceConfig } from "@/packages/configs/marketplace.config";
import { useMarketplaceCart } from "@/packages/hooks/use-marketplace-cart";
import { cn } from "@/packages/utils/cn";

const iconButton =
  "grid size-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary/40 hover:bg-muted";

export const MarketplaceHeader = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { count } = useMarketplaceCart();
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight"
          href="/marketplace"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Icon name="box" size={16} />
          </span>
          {marketplaceConfig.name}
        </Link>

        <nav
          aria-label="Marketplace"
          className="hidden items-center gap-8 text-sm font-medium md:flex"
        >
          {marketplaceConfig.nav.map((item) => (
            <Link
              className={cn(
                "relative py-1 transition-colors hover:text-foreground",
                item.active
                  ? "text-foreground after:absolute after:-bottom-[21px] after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-primary"
                  : "text-muted-foreground",
              )}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3">
          <label className="relative hidden w-full max-w-xs sm:block">
            <span className="sr-only">Search templates</span>
            <Icon
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              name="search"
              size={16}
            />
            <input
              className="h-10 w-full rounded-full border border-border bg-card/60 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground hover:border-primary/40 focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={marketplaceConfig.searchPlaceholder}
              type="search"
              value={query}
            />
          </label>

          <button
            aria-label="Toggle dark mode"
            className={iconButton}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            type="button"
          >
            <Icon className="dark:hidden" name="moon" size={17} />
            <Icon className="hidden dark:block" name="sun" size={17} />
          </button>

          <Link
            aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
            className={cn(iconButton, "relative")}
            href={marketplaceConfig.cart.href}
          >
            <Icon name="shopping-cart" size={17} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid size-4.5 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
