"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer, BackToTop } from "@/components/footer";

const ChatWidget = dynamic(
  () => import("@/components/chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
);
const ExitIntentPopup = dynamic(
  () => import("@/components/marketing/exit-intent-popup").then((m) => m.ExitIntentPopup),
  { ssr: false }
);

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
      <main className="w-full max-w-full overflow-x-clip">{children}</main>
      <Footer />
      <BackToTop />
      <ExitIntentPopup />
      <ChatWidget />
    </>
  );
}
