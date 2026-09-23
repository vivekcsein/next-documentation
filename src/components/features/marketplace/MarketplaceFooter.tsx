import { marketplaceConfig } from "@/packages/configs/marketplace.config";

export const MarketplaceFooter = () => (
  <footer className="border-t border-border/70">
    <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {marketplaceConfig.name}. Handcrafted HTML
        templates for builders.
      </p>
      <p>Prices in USD · One-time payment, unlimited projects.</p>
    </div>
  </footer>
);
