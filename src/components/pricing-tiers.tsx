"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";

type StudioTier = {
  name: string;
  price: string;
  subheader: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
};

const studioPricingTiers: StudioTier[] = [
  {
    name: "Landing Pages & WaaS",
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
  },
  {
    name: "SEO & Growth",
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
  },
];

function TierFeatureItem({ text, featured }: { text: string; featured?: boolean }) {
  return (
    <li className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300">
      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-lime-300" : "text-zinc-500")} strokeWidth={2.2} />
      <span>{text}</span>
    </li>
  );
}

function TierCard({ tier, index }: { tier: StudioTier; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        aria-label={`${tier.name} pricing`}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8",
          "bg-white/[0.02] backdrop-blur-md",
          "transition-all duration-300",
          tier.featured
            ? "border-lime-400/50 shadow-[0_0_0_1px_rgba(163,230,53,0.25),0_28px_80px_rgba(163,230,53,0.12)] lg:scale-105"
            : "border-white/10 hover:border-white/25",
        )}
      >
        {tier.badge && (
          <span className="absolute left-8 top-6 inline-flex rounded-full border border-lime-300/40 bg-lime-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-lime-200">
            {tier.badge}
          </span>
        )}

        <div className={cn(tier.badge ? "pt-7" : "pt-1")}>
          <h3 className="text-2xl font-semibold tracking-tight text-white">{tier.name}</h3>
          <p className="mt-4 text-2xl font-semibold leading-tight text-white">{tier.price}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{tier.subheader}</p>
        </div>

        <ul className="mt-7 flex-1 space-y-3 border-t border-white/10 pt-6">
          {tier.features.map((feature) => (
            <TierFeatureItem key={feature} text={feature} featured={tier.featured} />
          ))}
        </ul>

        <Link
          href={tier.ctaHref}
          className={cn(
            "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
            tier.featured
              ? "bg-lime-300 text-zinc-950 hover:bg-lime-200"
              : "border border-white/15 bg-white/[0.03] text-zinc-200 hover:border-white/30 hover:bg-white/[0.06]",
          )}
        >
          {tier.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.article>
    </Reveal>
  );
}

export function PricingTiers() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(163,230,53,0.11),transparent_40%)]" />

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
