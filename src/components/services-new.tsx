"use client";
import { Rocket, Zap, Globe, Bot, ArrowRight, Check } from "lucide-react";
import { Reveal } from "./shared";

const services = [
  {
    icon: Rocket,
    title: "Web Applications",
    tagline: "Full-stack products that run your business",
    desc: "SaaS dashboards, internal tools, client portals. Auth, payments, real-time data, and the custom logic that makes your product work.",
    tags: ["Next.js", "React", "Tailwind UI", "Supabase", "Stripe"],
  },
  {
    icon: Zap,
    title: "Landing Pages & Funnels",
    tagline: "Pages that turn traffic into revenue",
    desc: "Conversion-engineered from the first pixel. Fast load, sharp messaging, strategic CTAs.",
    tags: ["Tailwind UI", "SEO", "A/B Testing", "Analytics"],
  },
  {
    icon: Globe,
    title: "E-Commerce & Storefronts",
    tagline: "Custom shopping experiences that sell",
    desc: "Headless builds, Shopify, and WooCommerce platforms your team can manage.",
    tags: ["Shopify", "Headless", "Custom Themes"],
  },
  {
    icon: Bot,
    title: "Automation & AI Systems",
    tagline: "Eliminate the work that slows you down",
    desc: "We connect your tools, automate repetitive workflows, and build AI-powered systems that save your team hours every week.",
    tags: ["OpenAI", "n8n", "Custom APIs", "Integrations"],
  },
];

const deliveryTraits = [
  "Mobile-first builds",
  "SEO from day one",
  "Performance optimized",
  "WCAG accessible",
  "Fully documented handoff",
];

export function ServicesNew() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="wrap relative z-10">
        <Reveal>
          {/* Centered Header Block */}
          <div className="mx-auto mb-12 flex max-w-[680px] flex-col items-center text-center sm:mb-16">
            <span className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent sm:text-[11px]">
              What We Build
            </span>
            <h2 className="font-display text-[clamp(32px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-white">
              Four disciplines. <span className="text-white/40">One team that delivers all of them.</span>
            </h2>
          </div>
        </Reveal>

        {/* Bento grid */}
        <div className="mx-auto max-w-5xl grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-5">
          {services.map((sv, i) => (
            <Reveal key={sv.title} delay={i * 0.06} className="h-full">
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.01] p-7 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.02] lg:p-9"
                style={{
                  boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                }}
              >
                {/* Subtle hover glow matching standard pricing cards */}
                <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon + title row */}
                <div className="relative mb-6 flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] shadow-sm transition-colors duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.06]">
                    <sv.icon size={18} className="text-white/70 transition-colors duration-300 group-hover:text-white/90" />
                  </div>
                  <div>
                    <h3 className="font-display text-[20px] font-bold tracking-tight text-white sm:text-[22px]">{sv.title}</h3>
                    <p className="mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-accent/80">{sv.tagline}</p>
                  </div>
                </div>

                <p className="relative mb-8 flex-1 text-[13.5px] leading-[1.65] text-white/70">{sv.desc}</p>

                <div className="relative mt-auto flex flex-wrap gap-2 border-t border-white/[0.06] pt-6 transition-colors duration-300 group-hover:border-white/[0.08]">
                  {sv.tags.map((t) => (
                    <span 
                      key={t} 
                      className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Hover arrow */}
                <ArrowRight
                  size={14}
                  className="absolute right-7 top-7 text-white/30 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100 lg:right-9 lg:top-9"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Delivery strip */}
        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
            {deliveryTraits.map((trait) => (
              <span key={trait} className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.015] px-3.5 py-1.5 text-[11px] font-medium text-white/50">
                <Check size={10} className="text-accent/80" strokeWidth={3} />
                {trait}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}