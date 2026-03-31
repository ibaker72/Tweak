"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";
import { pricingTiers, type PricingTier } from "@/lib/pricing-data";

/* ─── Badge ─── */
function PopularBadge() {
  return (
    <span className="absolute -top-3 right-4 z-10 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-surface-0">
      Most Popular
    </span>
  );
}

/* ─── Card ─── */
function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const isPopular = tier.popular;

  return (
    <Reveal delay={index * 0.09}>
      <article
        aria-label={`${tier.name} pricing tier`}
        className={cn(
          "group relative flex h-full flex-col rounded-lg border p-6",
          "transition-all duration-300",
          isPopular
            ? "border-accent/25 bg-white/[0.03] shadow-[0_0_40px_rgba(200,255,0,0.04)]"
            : "border-white/[0.06] bg-white/[0.015]",
          isPopular && "lg:scale-[1.02] lg:z-10",
        )}
        style={{
          boxShadow: isPopular
            ? "0 0 40px rgba(200,255,0,0.04), inset 0 1px 0 rgba(255,255,255,0.03)"
            : "inset 0 1px 0 rgba(255,255,255,0.02)",
        }}
      >
        {/* Accent top border for popular */}
        {isPopular && (
          <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-lg bg-accent" />
        )}

        {isPopular && <PopularBadge />}

        {/* Tag */}
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-body">
          {tier.tag}
        </p>

        {/* Name */}
        <h3 className="mt-2 font-display text-[20px] font-bold leading-tight text-white">
          {tier.name}
        </h3>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="font-display text-[32px] font-extrabold leading-none tracking-tight text-white">
            {tier.price}
          </span>
          {tier.priceSuffix && (
            <span className="text-[14px] text-body">{tier.priceSuffix}</span>
          )}
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-white/[0.06]" />

        {/* Includes */}
        <ul className="flex-1 space-y-3">
          {tier.includes.map((item) => (
            <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-white/60">
              <Check
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                strokeWidth={2.5}
              />
              {item}
            </li>
          ))}
        </ul>

        {/* Meta pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] tracking-[0.03em] text-white/35">
            {tier.scope}
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] tracking-[0.03em] text-white/35">
            {tier.turnaround}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={tier.ctaHref}
          className={cn(
            "mt-5 flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
            isPopular
              ? "bg-accent text-surface-0 shadow-[0_1px_2px_rgba(0,0,0,0.15),0_0_0_1px_rgba(200,255,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(200,255,0,0.2),0_2px_8px_rgba(200,255,0,0.12)]"
              : "border border-white/[0.12] bg-white/[0.02] text-white hover:-translate-y-0.5 hover:border-white/[0.22] hover:bg-white/[0.04]",
          )}
        >
          {tier.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </article>
    </Reveal>
  );
}

/* ─── Section ─── */
export function PricingTiers() {
  return (
    <section id="pricing" className="relative py-28 sm:py-32">
      <div className="wrap">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <span className="section-label">Pricing</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="section-title mt-5">
              Transparent pricing.{" "}
              <span className="text-body">No discovery overhead.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-[15px] leading-relaxed text-body sm:text-[16px]">
              Every engagement is scoped, priced, and delivered with clarity.
            </p>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pricingTiers.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.5}>
          <div className="mt-16 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
            <p className="text-[14px] text-body">
              Need something custom?
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-white transition-colors hover:text-accent"
            >
              Let&apos;s talk
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span className="hidden h-4 w-px bg-white/[0.12] sm:block" />
            <Link
              href="/tools/cost-calculator"
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-white transition-colors hover:text-accent"
            >
              Try our cost calculator
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
