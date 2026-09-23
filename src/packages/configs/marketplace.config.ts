import type { MarketplaceProduct } from "@/types/marketplace";

/** Accent colors for category badges and card chrome. */
export const marketplaceColors = {
  violet: "#8548fe",
  teal: "#14b8a6",
  indigo: "#6366f1",
  pink: "#ec4899",
  blue: "#3b82f6",
} as const;

export type MarketplaceColor = keyof typeof marketplaceColors;

export const marketplaceConfig = Object.freeze({
  name: "DevKit",
  nav: [
    { label: "Home", href: "/marketplace" },
    { label: "Templates", href: "/marketplace", active: true },
    { label: "Blog", href: "/marketplace#blog" },
    { label: "About", href: "/marketplace#about" },
  ],
  hero: {
    eyebrow: "Templates",
    title: "Beautiful HTML Templates",
    highlight: "for Modern Ideas.",
    subtitle:
      "Launch faster with professionally designed HTML landing page templates. Clean code, modern design, and ready to customize.",
    note: "Launch your next big idea.",
    features: [
      { icon: "zap", label: "Production ready" },
      { icon: "monitor", label: "Fully responsive" },
      { icon: "sliders", label: "Easy to customize" },
      { icon: "shield", label: "One-time payment" },
    ] as const,
  },
  comingSoon: {
    title: "More Templates\nComing Soon",
    subtitle: "We're working on new, amazing templates.\nStay tuned!",
  },
  searchPlaceholder: "Search templates...",
  cart: {
    href: "/marketplace/cart",
    /**
     * Business WhatsApp number, digits only, country code first, no "+" or
     * spaces (E.164 without the plus) — e.g. "15551234567" for a US number.
     * REPLACE with a real number before going live.
     */
    whatsappNumber: "15551234567",
  },
});

/**
 * The catalog. Each product's `previewHref` points at a self-contained HTML
 * file under /public/templates — "Preview" opens it directly, no build step.
 */
export const marketplaceProducts: MarketplaceProduct[] = [
  {
    slug: "bill-buddy",
    title: "Bill Buddy",
    category: "SaaS",
    color: "violet",
    price: 29,
    description:
      "A modern billing and subscription management landing page for SaaS businesses.",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    previewHref: "/templates/bill-buddy/index.html",
    addedAt: "2026-09-20",
    preview: {
      siteName: "Bill Buddy",
      heading: "Smarter Billing",
      headingAccent: "for Growing Businesses",
      cta: "Get Started",
      chrome: "dark",
    },
  },
  {
    slug: "the-tax-guru",
    title: "The Tax Guru",
    category: "Finance",
    color: "teal",
    price: 24,
    description:
      "A clean and professional landing page for tax filing services and consultants.",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    previewHref: "/templates/the-tax-guru/index.html",
    addedAt: "2026-09-19",
    preview: {
      siteName: "The Tax Guru",
      heading: "Stress-Free",
      headingAccent: "Tax Filing Made Simple",
      cta: "File Your Taxes",
      chrome: "light",
    },
  },
  {
    slug: "finflow",
    title: "FinFlow",
    category: "Business",
    color: "indigo",
    price: 29,
    description:
      "A modern landing page for financial management and analytics platforms.",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    previewHref: "/templates/finflow/index.html",
    addedAt: "2026-09-18",
    preview: {
      siteName: "FinFlow",
      heading: "Simplify Your",
      headingAccent: "Financial Operations",
      cta: "Get Started",
      chrome: "dark",
    },
  },
  {
    slug: "shopverse",
    title: "ShopVerse",
    category: "E-commerce",
    color: "pink",
    price: 24,
    description:
      "A stylish e-commerce landing page for modern brands and online stores.",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    previewHref: "/templates/shopverse/index.html",
    addedAt: "2026-09-17",
    preview: {
      siteName: "ShopVerse",
      heading: "Modern Commerce",
      headingAccent: "for Modern Brands",
      cta: "Shop Now",
      chrome: "light",
    },
  },
  {
    slug: "pixelpro",
    title: "PixelPro",
    category: "Portfolio",
    color: "blue",
    price: 19,
    description:
      "A minimal portfolio landing page for designers and creative professionals.",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    previewHref: "/templates/pixelpro/index.html",
    addedAt: "2026-09-16",
    preview: {
      siteName: "PixelPro",
      heading: "Design",
      headingAccent: "that makes an impact.",
      cta: "View Work",
      chrome: "dark",
    },
  },
];
