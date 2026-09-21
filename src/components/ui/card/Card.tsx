import type { ComponentProps, ReactNode } from "react";

import { InteractiveCard } from "@/components/ui/card/InteractiveCard";
import { SecondaryCard } from "@/components/ui/card/SecondaryCard";

export type CardVariant = "primary" | "secondary";

type InteractiveCardProps = ComponentProps<typeof InteractiveCard>;
type SecondaryCardProps = ComponentProps<typeof SecondaryCard>;

export type CardProps = {
  variant?: CardVariant;
  children: ReactNode;
} & Omit<InteractiveCardProps & SecondaryCardProps, "children">;

const Card = ({ variant = "secondary", children, ...props }: CardProps) => {
  if (variant === "primary") {
    return <InteractiveCard {...props}>{children}</InteractiveCard>;
  }

  return <SecondaryCard {...props}>{children}</SecondaryCard>;
};

export default Card;
