import type { Metadata } from "next";
import { AuditLanding } from "./audit-landing";

export const metadata: Metadata = {
  title: "Instant Website Audit — Free Site Analysis",
  description:
    "Get a fast, plain-English breakdown of your site's performance, SEO, trust signals, and conversion readiness. Free, no signup required.",
  openGraph: {
    title: "Instant Website Audit — Free Site Analysis",
    description:
      "Get a fast, plain-English breakdown of your site's performance, SEO, trust signals, and conversion readiness.",
  },
};

export default function AuditPage() {
  return <AuditLanding />;
}
