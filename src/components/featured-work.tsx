"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    slug: "voltgrid",
title: "VoltGrid",
status: "LIVE",
industry: "Mobile Game · 2025",
tagline: "Fast-paced arcade gameplay with electric visuals and full-screen action.",
description:
  "Arcade-style mobile game designed and built with responsive full-screen gameplay, energetic visual feedback, and a polished, mobile-friendly game experience.",
metrics: ["Gameplay: Full-screen", "Experience: Mobile-friendly"],
stack: ["Next.js", "TypeScript", "Canvas", "Tailwind CSS"],
image: "/proof/voltgrid/cover.png",
href: "/work/voltgrid",
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
  return (
    <section id="work" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_70%_15%,rgba(200,255,0,0.06),transparent_60%)]" />

      <div className="wrap relative">
        <Reveal>
          <div className="mb-7 flex flex-col gap-5 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[740px]">
              <span className="section-label">Selected Work</span>
              <h2 className="section-title mt-3">Real projects. Measurable outcomes.</h2>
              <p className="mt-3 max-w-[560px] text-[14px] leading-[1.6] text-body sm:text-[15px]">
                Product engineering engagements focused on measurable business lift, delivered with production-grade precision.
              </p>
            </div>

            <Link
              href="/work"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:text-white"
            >
              All case studies
              <ArrowUpRight
                size={12}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {featuredProjects.map((project, i) => {
            const isLive = project.status === "LIVE";
            return (
              <Reveal key={project.slug} delay={i * 0.05} className="w-[86vw] max-w-[360px] shrink-0 snap-start">
                <Link
                  href={project.href}
                  className="group relative block h-[320px] overflow-hidden rounded-2xl border border-white/[0.09] bg-surface-1/70"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="86vw"
                    className="object-cover object-center opacity-70 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/45" />

                  <div className="absolute inset-0 z-10 flex flex-col p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] ${
                          isLive
                            ? "border-emerald-300/30 bg-black/40 text-emerald-300"
                            : "border-amber-300/30 bg-black/40 text-amber-300"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-300" : "bg-amber-300"}`} />
                        {project.status}
                      </span>

                      <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 font-mono text-[9px] tracking-[0.06em] text-white/75">
                        {project.industry}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <h3 className="text-balance font-display text-[22px] font-bold leading-[1.08] tracking-[-0.025em] text-white">
                        {project.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.55] text-white/82">{project.tagline}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.metrics.slice(0, 2).map((metric) => (
                          <span
                            key={metric}
                            className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.07] px-2 py-[4px] font-mono text-[9px] text-white/90"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>

                      <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white/85 transition-colors group-hover:text-accent">
                        View details <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="hidden grid-cols-2 gap-4 md:grid lg:gap-5">
          {featuredProjects.map((project, i) => {
            const isLive = project.status === "LIVE";
            return (
              <Reveal key={project.slug} delay={i * 0.06}>
                <Link
                  href={project.href}
                  className="group relative block h-[340px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-surface-1/70 lg:h-[360px]"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 560px"
                    priority={i < 2}
                    className="object-cover object-center opacity-65 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/75 to-black/35 transition-all duration-300 group-hover:from-black/90 group-hover:via-black/72" />
                  <div className="absolute inset-0 bg-[radial-gradient(700px_260px_at_20%_100%,rgba(200,255,0,0.1),transparent_58%)] opacity-70" />

                  <div className="absolute inset-0 z-10 flex flex-col p-5 lg:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-3 py-[5px] font-mono text-[9px] uppercase tracking-[0.08em] ${
                            isLive
                              ? "border-emerald-300/30 bg-black/35 text-emerald-300"
                              : "border-amber-300/30 bg-black/35 text-amber-300"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-300" : "bg-amber-300"}`} />
                          {project.status}
                        </span>
                        <span className="rounded-full border border-white/15 bg-black/30 px-3 py-[5px] font-mono text-[9px] tracking-[0.06em] text-white/80">
                          {project.industry}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto max-w-[92%]">
                      <h3 className="text-balance font-display text-[28px] font-bold leading-[1.04] tracking-[-0.03em] text-white lg:text-[30px]">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-[1.6] text-white/82">{project.tagline}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.metrics.slice(0, 2).map((metric) => (
                          <span
                            key={metric}
                            className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 font-mono text-[10px] text-white/90"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>

                      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white/85 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent">
                        View case study <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
