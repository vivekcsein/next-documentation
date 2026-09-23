import type { Metadata } from "next";
import Link from "next/link";
import { CartView } from "@/components/features/marketplace/CartView";
import { MarketplaceFooter } from "@/components/features/marketplace/MarketplaceFooter";
import { MarketplaceHeader } from "@/components/features/marketplace/MarketplaceHeader";
import { Icon } from "@/components/ui";
import { marketplaceConfig } from "@/packages/configs/marketplace.config";

export const metadata: Metadata = {
  title: `Cart — ${marketplaceConfig.name}`,
  robots: { index: false },
};

const CartPage = () => (
  <>
    <MarketplaceHeader />
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10" id="main">
      <Link
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        href="/marketplace"
      >
        <Icon name="arrow-left" size={15} />
        Continue browsing
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Your Cart</h1>
      <p className="mt-1.5 text-muted-foreground">
        Review your templates, then check out over WhatsApp.
      </p>

      <div className="mt-8">
        <CartView />
      </div>
    </main>
    <MarketplaceFooter />
  </>
);

export default CartPage;
