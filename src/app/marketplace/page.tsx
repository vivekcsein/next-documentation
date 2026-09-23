import type { Metadata } from "next";
import MarketplaceApp from "@/components/features/marketplace/MarketplaceApp";
import { MarketplaceFooter } from "@/components/features/marketplace/MarketplaceFooter";
import { MarketplaceHeader } from "@/components/features/marketplace/MarketplaceHeader";
import { marketplaceConfig } from "@/packages/configs/marketplace.config";

export const metadata: Metadata = {
  title: `${marketplaceConfig.name} — ${marketplaceConfig.hero.title} ${marketplaceConfig.hero.highlight}`,
  description: marketplaceConfig.hero.subtitle,
  alternates: { canonical: "/marketplace" },
};

const MarketplacePage = () => (
  <>
    <MarketplaceHeader />
    <MarketplaceApp />
    <MarketplaceFooter />
  </>
);

export default MarketplacePage;
