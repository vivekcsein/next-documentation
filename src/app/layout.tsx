import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { SearchProvider } from "@/components/features/search/SearchProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { adScriptSrc } from "@/packages/configs/ads.config";
import { appConfig } from "@/packages/configs/app.config";
import { getSearchIndex } from "@/packages/utils/loader";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.url),
  title: {
    default: `${appConfig.name} — ${appConfig.tagline}`,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  applicationName: appConfig.name,
  authors: [{ name: appConfig.author }],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    siteName: appConfig.name,
    locale: appConfig.locale,
    title: appConfig.name,
    description: appConfig.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#14141c" },
  ],
};

type RootLayoutProps = { children: ReactNode };

const RootLayout = ({ children }: RootLayoutProps) => (
  <html
    className={`${GeistSans.variable} ${GeistMono.variable}`}
    lang="en"
    suppressHydrationWarning
  >
    <body className="flex min-h-svh flex-col font-sans antialiased">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        <SearchProvider index={getSearchIndex()}>
          <a
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            href="#main"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main className="flex-1" id="main">
            {children}
          </main>
          <SiteFooter />
        </SearchProvider>
      </ThemeProvider>
      {adScriptSrc && (
        <Script
          async
          crossOrigin="anonymous"
          src={adScriptSrc}
          strategy="afterInteractive"
        />
      )}
    </body>
  </html>
);

export default RootLayout;
