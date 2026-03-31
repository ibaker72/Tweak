"use client";

import Link from "next/link";
import { ArrowRight, Blocks, Check, Network, Rocket, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";
import type { LucideIcon } from "lucide-react";

type StudioTier = {
  name: string;
  price: string;
  subheader: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
  icon: LucideIcon;
  accentDotClass: string;
  accentTextClass: string;
  accentBorderClass: string;
  accentBorderHoverClass: string;
  accentIconBgClass: string;
  accentStrokeGlowClass: string;
  accentCheckClass: string;
  ctaClass: string;
};

const studioPricingTiers: StudioTier[] = [
  {
    name: "Landing Pages",
    price: "$1,500/mo or $2,500 fixed",
    subheader: "High-converting entry points and ongoing web partnerships.",
    features: [
      "Conversion-first layout",
      "Next.js implementation",
      "Technical SEO setup",
      "Continuous design sprints",
    ],
    ctaLabel: "Start Building",
    ctaHref: "/contact?tier=Landing%20Pages%20%26%20WaaS",
    icon: Rocket,
    accentDotClass: "bg-teal-300",
    accentTextClass: "text-teal-200",
    accentBorderClass: "border-teal-400/30",
    accentBorderHoverClass: "group-hover:border-teal-400/80",
    accentIconBgClass: "bg-teal-300/10",
    accentStrokeGlowClass: "shadow-[0_0_10px_rgba(45,212,191,0.12)]",
    accentCheckClass: "text-teal-300",
    ctaClass:
      "border border-teal-300/25 bg-teal-300/8 text-teal-100 hover:border-teal-200/40 hover:bg-teal-300/15",
  },
  {
    name: "SaaS Development",
    price: "Milestone-Based",
    subheader: "For founders launching complete, scalable software products.",
    features: [
      "Full-stack MVPs",
      "Auth & Payment Integration",
      "Database Architecture",
      "Admin Dashboards",
    ],
    ctaLabel: "Book a Strategy Call",
    ctaHref: "/contact?tier=SaaS%20Development",
    icon: Blocks,
    accentDotClass: "bg-indigo-300",
    accentTextClass: "text-indigo-200",
    accentBorderClass: "border-indigo-400/30",
    accentBorderHoverClass: "group-hover:border-indigo-400/80",
    accentIconBgClass: "bg-indigo-300/10",
    accentStrokeGlowClass: "shadow-[0_0_10px_rgba(129,140,248,0.12)]",
    accentCheckClass: "text-indigo-300",
    ctaClass:
      "border border-indigo-300/25 bg-indigo-300/8 text-indigo-100 hover:border-indigo-200/40 hover:bg-indigo-300/15",
  },
  {
    name: "Custom Engineering",
    price: "Custom Scope",
    subheader: "Complex system builds, AI workflows, and dedicated senior delivery.",
    features: [
      "Complex Web Apps",
      "Custom APIs & Integrations",
      "AI & Automation Workflows",
      "100% Code Ownership",
    ],
    ctaLabel: "Discuss Custom Engineering",
    ctaHref: "/contact?tier=Custom%20Engineering",
    featured: true,
    badge: "Recommended",
    icon: Network,
    accentDotClass: "bg-lime-300",
    accentTextClass: "text-lime-200",
    accentBorderClass: "border-lime-400/55",
    accentBorderHoverClass: "group-hover:border-lime-400/90",
    accentIconBgClass: "bg-lime-300/10",
    accentStrokeGlowClass: "shadow-[0_0_12px_rgba(163,230,53,0.16)]",
    accentCheckClass: "text-lime-300",
    ctaClass: "bg-lime-300 text-zinc-950 hover:bg-lime-200",
  },
  {
    name: "Growth",
    price: "Monthly Retainer",
    subheader: "Search and growth systems that compound pipeline and demand.",
    features: [
      "Technical SEO Audits",
      "Content Strategy",
      "Conversion Rate Optimization (CRO)",
      "Engineering Iterations",
    ],
    ctaLabel: "Scale Your Product",
    ctaHref: "/contact?tier=SEO%20%26%20Growth",
    icon: TrendingUp,
    accentDotClass: "bg-amber-300",
    accentTextClass: "text-amber-200",
    accentBorderClass: "border-amber-400/30",
    accentBorderHoverClass: "group-hover:border-amber-400/80",
    accentIconBgClass: "bg-amber-300/10",
    accentStrokeGlowClass: "shadow-[0_0_10px_rgba(251,191,36,0.12)]",
    accentCheckClass: "text-amber-300",
    ctaClass:
      "border border-amber-300/25 bg-amber-300/8 text-amber-100 hover:border-amber-200/40 hover:bg-amber-300/15",
  },
];

function TierFeatureItem({ text, accentCheckClass }: { text: string; accentCheckClass: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300">
      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", accentCheckClass)} strokeWidth={2.2} />
      <span>{text}</span>
    </li>
  );
}

function TierCard({ tier, index }: { tier: StudioTier; index: number }) {
  const TierIcon = tier.icon;

  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        aria-label={`${tier.name} pricing`}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-10",
          "bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:-translate-y-1",
          tier.accentBorderClass,
          tier.accentBorderHoverClass,
          tier.accentStrokeGlowClass,
          tier.featured && "lg:scale-[1.03]",
        )}
      >
        {tier.badge && (
          <span className="absolute right-8 top-8 inline-flex rounded-full border border-lime-400/60 bg-lime-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-lime-200">
            {tier.badge}
          </span>
        )}

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start gap-3">
            <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10", tier.accentIconBgClass)}>
              <TierIcon className={cn("h-5 w-5", tier.accentTextClass)} strokeWidth={2} />
            </span>
            <div className={cn("mt-2 h-1.5 w-1.5 rounded-full", tier.accentDotClass)} />
          </div>

          <div className={cn("space-y-3", tier.badge ? "mt-4" : "mt-5")}>
            <h3 className="text-2xl font-bold tracking-tight text-white">{tier.name}</h3>
            <p className="text-3xl font-bold leading-tight text-white">{tier.price}</p>
            <p className="text-sm leading-relaxed text-zinc-400">{tier.subheader}</p>
          </div>

          <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
            {tier.features.map((feature) => (
              <TierFeatureItem key={feature} text={feature} accentCheckClass={tier.accentCheckClass} />
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <Link
              href={tier.ctaHref}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
                tier.featured ? "focus-visible:ring-lime-300/60" : "focus-visible:ring-white/40",
                tier.ctaClass,
              )}
            >
              {tier.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function PricingTiers() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.06),transparent_40%)]" />

      <div className="wrap relative">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
                Premium Pricing
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                Built for serious operators
              </span>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Product engineering tiers designed for scale.
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
                Compare every engagement model at a glance. No tabs, no hidden options—just clear scope,
                senior execution, and escalation paths as your product grows.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {studioPricingTiers.map((tier, index) => (
              <TierCard key={tier.name} tier={tier} index={index} />
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-8 text-center backdrop-blur-md sm:px-10">
              <p className="text-lg leading-relaxed text-zinc-200 sm:text-xl">
                &ldquo;We needed a working platform for an investor demo and they delivered in under a week. It looked
                and felt like something that had been in development for months.&rdquo;
              </p>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.08em] text-zinc-400">
                David Morales — CTO
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
