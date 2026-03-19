import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { ReferralTracker } from "@/components/referral-tracking";
import { MarketingShell } from "@/components/marketing-shell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tweakandbuild.com";

export const metadata: Metadata = {
  title: { default: "Tweak & Build — Premium Product Engineering Studio", template: "%s | Tweak & Build" },
  description: "We build high-converting websites, production-grade web apps, and automation systems for founders who ship. Fixed pricing. Senior engineers. Real outcomes.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Tweak & Build — Premium Product Engineering Studio",
    description: "High-converting websites, web apps, and automation. Engineered for founders who ship.",
    url: "/",
    siteName: "Tweak & Build",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tweak & Build — Premium Product Engineering Studio",
    description: "High-converting websites, web apps, and automation. Engineered for founders who ship.",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  other: {
    "theme-color": "#030305",
    "msapplication-TileColor": "#C8FF00",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter+Tight:ital,wght@0,400;0,500;0,600;1,400&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain min-h-screen">
        <Suspense fallback={null}>
          <ReferralTracker />
        </Suspense>
        <MarketingShell>{children}</MarketingShell>
      </body>
    </html>
  );
}
