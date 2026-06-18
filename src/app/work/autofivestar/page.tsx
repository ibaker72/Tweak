import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { CaseStudy } from "@/components/work/case-study";

export const metadata: Metadata = {
  title: {
    absolute:
      "AutoFiveStar Case Study | Reputation Management SaaS Built by Tweak & Build",
  },
  description:
    "A Tweak & Build SaaS case study showing how AutoFiveStar was built as a review automation and reputation management platform for dealerships and local businesses.",
  openGraph: {
    title: "AutoFiveStar — Reputation Management SaaS",
    description:
      "Review automation, customer feedback routing, Google review capture, and SaaS workflow infrastructure built by Tweak & Build.",
    url: "/work/autofivestar",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoFiveStar — Reputation Management SaaS",
    description:
      "Review automation, customer feedback routing, Google review capture, and SaaS workflow infrastructure built by Tweak & Build.",
  },
  alternates: {
    canonical: "/work/autofivestar",
  },
};

export default function AutoFiveStarCaseStudyPage() {
  const project = projects.find((p) => p.slug === "autofivestar");
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
