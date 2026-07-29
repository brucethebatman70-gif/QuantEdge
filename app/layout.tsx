import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { brand } from "@/config/brand";
import { AppProvider } from "@/providers/app-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: brand.seo.title,
    template: `%s | ${brand.name}`,
  },
  description: brand.seo.description,
  keywords: brand.seo.keywords,
  manifest: "/manifest.json",
    openGraph: {
      title: brand.seo.title,
      description: brand.seo.description,
      siteName: brand.name,
      locale: brand.metrics.locale,
      type: "website",
      images: [{ url: "/images/og-image.svg", width: 1200, height: 630 }],
    },
  twitter: {
    card: "summary_large_image",
    title: brand.seo.title,
    description: brand.seo.description,
    site: brand.seo.twitterHandle,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0f" },
  ],
};

export const dynamic = "force-static";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
