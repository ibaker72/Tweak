import type { Metadata } from "next";
import { DigitalMarketingLanding } from "./digital-marketing-landing";

export const metadata: Metadata = {
  title: "Digital Marketing & Advertising — Google, Meta, LinkedIn Ads",
  description:
    "Full-funnel paid ad management across Google, Meta, and LinkedIn. Built to book qualified meetings, not chase vanity clicks. Tracking, landing pages, and weekly iteration included.",
  openGraph: {
    title: "Digital Marketing & Advertising — Tweak & Build",
    description:
      "Paid ad campaigns engineered to book real meetings. Google, Meta, and LinkedIn — managed end-to-end.",
  },
};

export default function DigitalMarketingPage() {
  return <DigitalMarketingLanding />;
}
