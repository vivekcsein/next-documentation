import Link from "next/link";
import type { IconName } from "@/components/ui";
import { Icon } from "@/components/ui";

type CategoryCardProps = {
  href: string;
  title: string;
  description: string;
  icon: IconName;
  count: number;
};

/** Card for a collection (section) or a category. */
export const CategoryCard = ({
  href,
  title,
  description,
  icon,
  count,
}: CategoryCardProps) => (
  <Link
    className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
    href={href}
  >
    <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
      <Icon name={icon} size={20} />
    </span>
    <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
      {title}
    </h3>
    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
      {description}
    </p>
    <p className="mt-auto flex items-center justify-between pt-2 text-xs font-medium text-muted-foreground">
      <span>
        {count} {count === 1 ? "guide" : "guides"}
      </span>
      <Icon
        className="transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        name="arrow-right"
      />
    </p>
  </Link>
);
