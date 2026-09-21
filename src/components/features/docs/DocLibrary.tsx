"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui";
import { cn } from "@/packages/utils/cn";
import { searchDocs } from "@/packages/utils/search";
import type { CategorySummary, DocSummary } from "@/types/app";
import { useSearch } from "../search/SearchProvider";
import { DocCard } from "./DocCard";

type DocLibraryProps = {
  docs: DocSummary[];
  categories: CategorySummary[];
};

/** /docs — every guide in one place, filterable by topic and by typing. */
export const DocLibrary = ({ docs, categories }: DocLibraryProps) => {
  const { index } = useSearch();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const titles = useMemo(
    () => new Map(categories.map((item) => [item.key, item.title])),
    [categories],
  );

  const visible = useMemo(() => {
    const inCategory = docs.filter(
      (doc) => category === "all" || doc.category === category,
    );
    if (query.trim() === "") return inCategory;

    const byId = new Map(inCategory.map((doc) => [doc.id, doc]));
    return searchDocs(index, query, 100)
      .map((hit) => byId.get(hit.entry.id))
      .filter((doc): doc is DocSummary => doc !== undefined);
  }, [docs, index, query, category]);

  const chips = [
    { key: "all", title: "All", count: docs.length },
    ...categories.map(({ key, title, count }) => ({ key, title, count })),
  ];

  return (
    <div>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          name="search"
          size={18}
        />
        <input
          aria-label="Filter guides"
          className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-base outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter guides by title, topic or keyword…"
          type="search"
          value={query}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            aria-pressed={category === chip.key}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              category === chip.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
            key={chip.key}
            onClick={() => setCategory(chip.key)}
            type="button"
          >
            {chip.title} <span className="opacity-70">{chip.count}</span>
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-muted-foreground">
        {visible.length} {visible.length === 1 ? "guide" : "guides"}
        {query.trim() && <> matching “{query.trim()}”</>}
      </p>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Nothing matches. Try a broader word, or switch to “All”.
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {visible.map((doc) => (
            <li key={doc.id}>
              <DocCard categoryTitle={titles.get(doc.category)} doc={doc} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
