import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: { default: "Tweak & Build — Product Engineering Studio", template: "%s | Tweak & Build" },
  description: "We engineer web applications, landing pages, and automation systems for businesses ready to grow. Fixed pricing. Senior engineers. No surprises.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tweakandbuild.com"),
  openGraph: { title: "Tweak & Build — Product Engineering Studio", description: "Web apps, landing pages, and automation. Engineered for growth.", url: "/", siteName: "Tweak & Build", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: "Tweak & Build", description: "Product engineering studio." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="grain min-h-screen"><Navbar /><main>{children}</main><Footer /></body>
    </html>
  );
}
