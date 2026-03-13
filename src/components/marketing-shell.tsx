"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer, BackToTop } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { ExitIntentPopup } from "@/components/marketing/exit-intent-popup";

const EXCLUDED_PREFIXES = ["/client-portal", "/admin", "/login", "/reset-password"];

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p));

  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <ExitIntentPopup />
      <ChatWidget />
    </>
  );
}
