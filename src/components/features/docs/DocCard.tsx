import Link from "next/link";
import { Icon } from "@/components/ui";
import { Badge } from "@/components/ui/badge/Badge";
import { cn } from "@/packages/utils/cn";
import { formatDate, formatReadingTime } from "@/packages/utils/format";
import type { DocSummary } from "@/types/app";

type DocCardProps = {
  doc: DocSummary;
  categoryTitle?: string;
  className?: string;
};

export const DocCard = ({ doc, categoryTitle, className }: DocCardProps) => (
  <Link
    className={cn(
      "group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card",
      className,
    )}
    href={doc.href}
  >
    <div className="flex flex-wrap items-center gap-2">
      {categoryTitle && <Badge variant="primary">{categoryTitle}</Badge>}
      {doc.featured && (
        <Badge variant="outline">
          <Icon name="sparkles" size={12} /> Featured
        </Badge>
      )}
    </div>

    <h3 className="text-lg font-semibold leading-snug tracking-tight text-card-foreground transition-colors group-hover:text-primary">
      {doc.title}
    </h3>

    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
      {doc.description}
    </p>

    <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <Icon name="clock" size={13} /> {formatReadingTime(doc.readingMinutes)}
      </span>
      <span aria-hidden="true">·</span>
      <time dateTime={doc.updatedAt}>{formatDate(doc.updatedAt)}</time>
      <Icon
        className="ml-auto transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        name="arrow-right"
      />
    </div>
  </Link>
);
