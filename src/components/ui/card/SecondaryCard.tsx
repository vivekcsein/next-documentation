import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { cn } from "@/packages/utils/cn";

type SecondaryCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  interactive?: boolean;
};

const SecondaryCard = forwardRef<HTMLDivElement, SecondaryCardProps>(
  ({ children, className, interactive = true, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn(
          "group relative isolate overflow-hidden",
          "rounded-(--radius)",
          "border border-border/70",
          "bg-card",
          "text-card-foreground",
          "shadow-xs",

          interactive && [
            "transition-[border-color,box-shadow,transform]",
            "duration-300 ease-out",
            "hover:-translate-y-0.5",
            "hover:border-primary/30",
            "hover:shadow-card",
          ],

          className,
        )}
        {...props}
      >
        {/* Ambient hover glow */}
        {interactive && (
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -right-20 -top-20",
              "size-40 rounded-full",
              "bg-primary/8 blur-3xl",
              "opacity-0 transition-opacity duration-500",
              "group-hover:opacity-100",
            )}
          />
        )}

        {/* Top accent line */}
        {interactive && (
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-px",
              "bg-linear-to-r from-transparent via-primary/60 to-transparent",
              "opacity-0 transition-opacity duration-300",
              "group-hover:opacity-100",
            )}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </article>
    );
  },
);

SecondaryCard.displayName = "SecondaryCard";

type SecondaryCardHeaderProps = {
  children: ReactNode;
  className?: string;
};

function SecondaryCardHeader({
  children,
  className,
}: SecondaryCardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      {children}
    </div>
  );
}

type SecondaryCardIconProps = {
  children: ReactNode;
  className?: string;
};

function SecondaryCardIcon({ children, className }: SecondaryCardIconProps) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center",
        "rounded-lg",
        "border border-border/70",
        "bg-muted/50",
        "text-muted-foreground",
        "transition-[background-color,border-color,color,transform]",
        "duration-300",
        "group-hover:border-primary/20",
        "group-hover:bg-primary/10",
        "group-hover:text-primary",
        "group-hover:scale-105",
        className,
      )}
    >
      {children}
    </div>
  );
}

type SecondaryCardCategoryProps = {
  children: ReactNode;
  className?: string;
};

function SecondaryCardCategory({
  children,
  className,
}: SecondaryCardCategoryProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center",
        "rounded-full",
        "border border-primary/15",
        "bg-primary/8",
        "px-2 py-0.5",
        "text-[10px] font-medium",
        "leading-4 text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}

type SecondaryCardTitleProps = {
  children: ReactNode;
  className?: string;
};

function SecondaryCardTitle({ children, className }: SecondaryCardTitleProps) {
  return (
    <h3
      className={cn(
        "text-base font-semibold tracking-tight",
        "text-card-foreground",
        "transition-colors duration-300",
        "group-hover:text-primary",
        className,
      )}
    >
      {children}
    </h3>
  );
}

type SecondaryCardDescriptionProps = {
  children: ReactNode;
  className?: string;
};

function SecondaryCardDescription({
  children,
  className,
}: SecondaryCardDescriptionProps) {
  return (
    <p className={cn("text-sm leading-6", "text-muted-foreground", className)}>
      {children}
    </p>
  );
}

type SecondaryCardFooterProps = {
  children: ReactNode;
  className?: string;
};

function SecondaryCardFooter({
  children,
  className,
}: SecondaryCardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4",
        "border-t border-border/60",
        "pt-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

type SecondaryCardMetaProps = {
  children: ReactNode;
  className?: string;
};

function SecondaryCardMeta({ children, className }: SecondaryCardMetaProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        "text-xs text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

export {
  SecondaryCard,
  SecondaryCardCategory,
  SecondaryCardDescription,
  SecondaryCardFooter,
  SecondaryCardHeader,
  SecondaryCardIcon,
  SecondaryCardMeta,
  SecondaryCardTitle,
};
