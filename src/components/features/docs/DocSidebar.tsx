"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { IconName } from "@/components/ui";
import { Icon } from "@/components/ui";
import { cn } from "@/packages/utils/cn";

export type SidebarCategory = {
  key: string;
  title: string;
  icon: IconName;
  docs: { id: string; title: string; href: string }[];
};

type DocSidebarProps = {
  collection: { key: string; title: string };
  categories: SidebarCategory[];
};

export const DocSidebar = ({ collection, categories }: DocSidebarProps) => {
  const pathname = usePathname();
  const base = `/${collection.key}`;
  const activeCategory = categories.find(
    (category) =>
      pathname === `${base}/${category.key}` ||
      pathname.startsWith(`${base}/${category.key}/`),
  )?.key;

  return (
    <nav aria-label="Documentation" className="space-y-1">
      <Link
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
          pathname === base
            ? "bg-accent text-accent-foreground"
            : "text-foreground hover:bg-muted",
        )}
        href={base}
      >
        <Icon name="book" size={16} /> All {collection.title}
      </Link>

      {categories.map((category) => (
        <details
          className="group"
          key={category.key}
          open={!activeCategory || category.key === activeCategory}
        >
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors marker:hidden hover:bg-muted [&::-webkit-details-marker]:hidden">
            <Icon
              className="text-muted-foreground"
              name={category.icon}
              size={16}
            />
            <span className="flex-1">{category.title}</span>
            <Icon
              className="text-muted-foreground transition-transform group-open:rotate-180"
              name="chevron-down"
              size={14}
            />
          </summary>

          <ul className="ml-[1.15rem] mt-1 space-y-0.5 border-l border-border pl-3">
            <li>
              <Link
                className={cn(
                  "block rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  pathname === `${base}/${category.key}`
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
                href={`${base}/${category.key}`}
              >
                Overview
              </Link>
            </li>
            {category.docs.map((doc) => {
              const isActive = pathname === doc.href;
              return (
                <li key={doc.id}>
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-2.5 py-1.5 text-sm leading-snug transition-colors",
                      isActive
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                    href={doc.href}
                  >
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </nav>
  );
};

/** Collapsible "Browse docs" for screens without the left sidebar. */
export const MobileDocNav = ({ collection, categories }: DocSidebarProps) => {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close the drawer whenever the route changes
  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <details
      className="mb-6 rounded-xl border border-border bg-card lg:hidden"
      ref={ref}
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
        <Icon name="book" size={16} /> Browse {collection.title}
        <Icon className="ml-auto" name="chevron-down" size={14} />
      </summary>
      <div className="border-t border-border p-2">
        <DocSidebar categories={categories} collection={collection} />
      </div>
    </details>
  );
};
