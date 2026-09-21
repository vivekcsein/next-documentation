import Link from "next/link";
import { Icon, type IconName } from "@/components/ui";
import type { TopicColor } from "@/packages/configs/content.config";
import { topicStyle } from "@/packages/utils/topic";

type CategoryCardProps = {
  href: string;
  title: string;
  icon: IconName;
  color: TopicColor;
  count: number;
};

/** "Browse by Topic" tile. */
export const CategoryCard = ({
  href,
  title,
  icon,
  color,
  count,
}: CategoryCardProps) => (
  <Link
    className="topic-card group flex h-[58px] items-center gap-3 rounded-xl px-[15px]"
    href={href}
    style={topicStyle(color)}
  >
    <span className="topic-tile grid size-10 shrink-0 place-items-center rounded-[10px]">
      <Icon name={icon} size={19} />
    </span>
    <span className="min-w-0 flex-1 leading-none">
      <span className="block truncate text-sm font-semibold text-foreground">
        {title}
      </span>
      <span className="mt-1.5 block text-xs text-muted-foreground">
        {count} {count === 1 ? "article" : "articles"}
      </span>
    </span>
    <Icon
      className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
      name="arrow-right"
      size={18}
    />
  </Link>
);
