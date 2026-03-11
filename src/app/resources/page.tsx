import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/shared";
import { Calculator, FileCheck, BookOpen, FolderOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free tools, guides, and resources to help founders build better digital products. Website cost calculator, launch checklist, and more.",
  openGraph: {
    title: "Free Tools & Guides | Tweak & Build",
    description: "Free tools, guides, and resources to help founders build better digital products.",
  },
};

const resources = [
  {
    title: "Website Cost Calculator",
    description: "Get an instant estimate for your project based on similar builds we've delivered.",
    icon: Calculator,
    tag: "Interactive Tool",
    tagColor: "border-accent/[0.2] bg-accent/[0.06] text-accent/80",
    href: "/tools/website-cost-calculator",
    cta: "Use tool",
  },
  {
    title: "Website Launch Checklist",
    description: "27 things to check before going live — SEO, performance, security, and accessibility.",
    icon: FileCheck,
    tag: "Free Guide",
    tagColor: "border-cyan-400/[0.2] bg-cyan-400/[0.06] text-cyan-400/80",
    href: "#launch-checklist",
    cta: "Download",
  },
  {
    title: "Technical Stack Decision Guide",
    description: "Next.js vs Remix vs Astro — which framework fits your project and why it matters.",
    icon: BookOpen,
    tag: "Guide",
    tagColor: "border-v/[0.2] bg-v/[0.06] text-v-light",
    href: "/blog",
    cta: "Read",
  },
  {
    title: "Case Studies Collection",
    description: "See how we've built for e-commerce, SaaS, healthcare, and logistics companies.",
    icon: FolderOpen,
    tag: "Case Studies",
    tagColor: "border-gold/[0.2] bg-gold/[0.06] text-gold",
    href: "/work",
    cta: "Browse",
  },
];

export default function ResourcesPage() {
  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        <Reveal>
          <div className="mx-auto mb-14 max-w-[560px] text-center">
            <span className="section-label">Resources</span>
            <h1 className="section-title mt-4">Free tools & guides</h1>
            <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-[1.7] text-body">
              Everything we wish we had when we started building products. Free, no strings attached.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-[900px] gap-5 sm:grid-cols-2">
          {resources.map((resource, i) => (
            <Reveal key={resource.title} delay={i * 0.06}>
              <Link
                href={resource.href}
                className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/[0.15] hover:shadow-[0_8px_32px_rgba(200,255,0,0.04)]"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors group-hover:border-accent/[0.2] group-hover:bg-accent/[0.06]">
                    <resource.icon
                      size={20}
                      className="text-dim transition-colors group-hover:text-accent"
                    />
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 font-mono text-[10px] ${resource.tagColor}`}
                  >
                    {resource.tag}
                  </span>
                </div>

                <h3 className="font-display text-[18px] font-bold text-white">{resource.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-[1.7] text-body">
                  {resource.description}
                </p>

                <div className="mt-5 flex items-center gap-2 font-display text-[13px] font-semibold text-accent/80 transition-colors group-hover:text-accent">
                  {resource.cta}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
