import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer, BackToTop } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { ExitIntentPopup } from "@/components/marketing/exit-intent-popup";

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
      <body className="grain min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <ExitIntentPopup />
        <ChatWidget />
      </body>
    </html>
  );
}
