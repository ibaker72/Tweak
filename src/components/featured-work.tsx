"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./shared";

type FeaturedProject = {
  slug: string;
  title: string;
  status: "LIVE" | "IN DEV";
  industry: string;
  tagline: string;
  description: string;
  metrics: [string, string];
  stack: string[];
  image: string;
  href: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    slug: "create3dparts",
    title: "Create3DParts.com",
    status: "LIVE",
    industry: "E-Commerce Platform · 2025",
    tagline: "Real-time 3D printing quoting engine with instant pricing.",
    description:
      "Real-time 3D printing quoting engine with instant pricing and Stripe checkout. Replaced a 48-hour manual process.",
    metrics: ["Quote time: 48hrs → 60sec", "Orders: +35% month one"],
    stack: ["Next.js", "TypeScript", "Stripe", "AWS S3"],
    image: "/proof/create3dparts/home.png",
    href: "/work/create3dparts",
  },
  {
    slug: "leadsandsaas",
    title: "LeadsAndSaaS",
    status: "LIVE",
    industry: "SaaS Platform · 2025",
    tagline: "Multi-tenant platform for agent management and lead distribution.",
    description:
      "Multi-tenant platform consolidating agent management, asset storage, and lead distribution into one product.",
    metrics: ["Lead response: 4hrs → 15min", "Onboarding: 3 days → 4hrs"],
    stack: ["Next.js", "Supabase", "OpenAI", "Vercel"],
    image: "/proof/leadsandsaas/overview.png",
    href: "/work/leadsandsaas",
  },
  {
    slug: "kommison",
    title: "Kommison.com",
    status: "IN DEV",
    industry: "Affiliate & Commission Platform · 2025",
    tagline: "Commission tracking with automated payouts and campaign analytics.",
    description:
      "Affiliate and commission management platform with real-time tracking, automated payouts, and multi-tier campaign analytics.",
    metrics: ["Status: In development", "Payout automation: Real-time"],
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe Connect"],
    image: "/proof/create3dparts/dashboard.png",
    href: "/work/kommison",
  },
  {
    slug: "speedwaymotorsllc",
    title: "SpeedwayMotorsLLC.com",
    status: "LIVE",
    industry: "Automotive Dealership · 2025",
    tagline: "Full dealership website with inventory management and financing tools.",
    description:
      "Modern dealership website for Speedway Motors LLC featuring real-time inventory sync, online financing applications, and lead capture optimized for local SEO.",
    metrics: ["Online leads: +40%", "Inventory sync: Real-time"],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    image: "/proof/leadsandsaas/agents.png",
    href: "/work/speedwaymotorsllc",
  },
];

export function FeaturedWork() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="wrap">
        <Reveal>
          <div className="mb-16 flex flex-col gap-4 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-label">Selected work</span>
              <h2 className="mt-5 font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                Real projects.<br />Measurable outcomes.
              </h2>
              <p className="mt-4 max-w-[420px] text-[15px] leading-[1.7] text-body">
                Every build is measured by business impact, not just code quality.
              </p>
            </div>
            <Link
              href="/work"
              className="group flex items-center gap-2 self-start rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-dim transition-all duration-200 hover:border-white/[0.12] hover:text-white sm:self-auto"
            >
              All case studies{" "}
              <ArrowUpRight
                size={12}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
          {featuredProjects.map((project, i) => {
            const isExpanded = expandedCard === project.slug;
            const isLive = project.status === "LIVE";

            return (
              <Reveal key={project.slug} delay={i * 0.08}>
                <article className="group relative h-[300px] overflow-hidden rounded-2xl border border-white/[0.07] bg-surface-0/50 sm:rounded-3xl md:h-[360px] lg:h-[400px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1320px) 45vw, 620px"
                    priority={i < 2}
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15 transition-all duration-300 ease-out group-hover:from-black/90 group-hover:via-black/80 group-hover:to-black/45 md:group-hover:from-black/85 md:group-hover:via-black/70 md:group-hover:to-black/40" />

                  <div className="absolute left-4 top-4 z-20 md:left-5 md:top-5">
                    <span
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-[5px] font-mono text-[10px] tracking-[0.08em] ${
                        isLive
                          ? "border-emerald-400/25 bg-surface-0/70 text-emerald-300"
                          : "border-amber-400/30 bg-surface-0/70 text-amber-300"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-400" : "bg-amber-400"}`} />
                      {project.status}
                    </span>
                  </div>

                  <div className="absolute right-4 top-4 z-20 md:right-5 md:top-5">
                    <span className="rounded-full border border-white/10 bg-surface-0/70 px-3 py-[5px] font-mono text-[10px] tracking-[0.06em] text-white/80">
                      {project.industry}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-5 lg:p-6">
                    <h3 className="font-display text-[24px] font-bold tracking-[-0.03em] text-white md:text-[28px]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-white/80 md:text-[14px]">{project.tagline}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="inline-flex items-center rounded-full border border-white/15 bg-black/35 px-2.5 py-1 font-mono text-[10px] text-white/90"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    <div className="hidden translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:block">
                      <p className="mt-3 max-w-[90%] text-[13px] leading-[1.6] text-white/90">{project.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span key={tech} className="tag bg-white/[0.08] text-white/90 backdrop-blur-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={project.href}
                        className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:text-accent"
                      >
                        View case study <ArrowUpRight size={12} />
                      </Link>
                    </div>

                    <div className="mt-3 md:hidden">
                      <button
                        type="button"
                        onClick={() => setExpandedCard(isExpanded ? null : project.slug)}
                        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white/85"
                      >
                        {isExpanded ? "Hide details" : "Show details"}
                        <ChevronDown size={12} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isExpanded ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-[13px] leading-[1.6] text-white/90">{project.description}</p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                              <span key={tech} className="tag bg-white/[0.08] text-white/90 backdrop-blur-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <Link
                            href={project.href}
                            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white"
                          >
                            View case study <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
