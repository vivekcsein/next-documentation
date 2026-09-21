import { useId } from "react";
import { Icon, type IconName } from "@/components/ui";
import type { TopicColor } from "@/packages/configs/content.config";
import { cn } from "@/packages/utils/cn";
import { topicStyle } from "@/packages/utils/topic";

type ArticleArtProps = {
  color: TopicColor;
  icon: IconName;
  /** Small tile without the glass plates (thumbnails). */
  compact?: boolean;
  className?: string;
};

/** Generated cover art for docs without an `image` — glass plates + glowing icon. */
export const ArticleArt = ({
  color,
  icon,
  compact = false,
  className,
}: ArticleArtProps) => {
  const uid = useId().replace(/:/g, "");

  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden", className)}
      style={topicStyle(color)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_55%,color-mix(in_oklab,var(--topic)_38%,transparent),transparent_75%)]" />

      {!compact && (
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 420 260"
        >
          <defs>
            <linearGradient id={`${uid}-s`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#5eead4" />
              <stop offset="0.5" stopColor="#7c6cff" />
              <stop offset="1" stopColor="#e04fff" />
            </linearGradient>
          </defs>
          {[0, 1, 2].map((layer) => (
            <g
              key={layer}
              opacity={1 - layer * 0.22}
              transform={`translate(0 ${layer * 26})`}
            >
              <path
                d="M210 44 L338 108 L210 172 L82 108 Z"
                fill="rgba(124,108,255,0.10)"
                stroke={`url(#${uid}-s)`}
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
              <path
                d="M82 108 L82 120 L210 184 L338 120 L338 108"
                fill="none"
                stroke={`url(#${uid}-s)`}
                strokeLinejoin="round"
                strokeOpacity="0.6"
                strokeWidth="1.2"
              />
            </g>
          ))}
        </svg>
      )}

      <div
        className={cn(
          "topic-tile absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center",
          compact
            ? "size-10 rounded-xl"
            : "top-[40%] size-[4.5rem] rounded-2xl ring-1 ring-white/20",
        )}
      >
        <Icon name={icon} size={compact ? 20 : 34} strokeWidth={1.75} />
      </div>
    </div>
  );
};
