"use client";
import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Code2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";

const tracks = [
  {
    label: "For teams with a design or clear spec",
    name: "Rapid Build",
    range: "$2,500 – $8,000",
    rangeUnit: null,
    subtext: "Fixed rate · Typical turnaround: 1–3 weeks",
    description:
      "You bring the design, wireframes, or a detailed brief. We build it — fast, responsive, and production-ready. Flat rate locked before we start.",
    tags: ["Page count", "CMS integration", "E-commerce", "Third-party integrations", "Revision rounds"],
    payment: "Paid upfront or 50/50 split depending on scope.",
    cta: "Get your fixed quote",
    primary: false,
    refs: null,
  },
  {
    label: "For founders who need strategy + build",
    name: "Custom Engineering",
    range: "$8,000 – $30,000+",
    rangeUnit: null,
    subtext: "Milestone billing · Typical timeline: 3–8 weeks",
    description:
      "Full-cycle product engineering — from discovery and architecture through development, QA, and launch. We challenge assumptions, optimize for conversion, and deliver a product that performs.",
    tags: ["Product complexity", "Custom features", "API integrations", "AI / automation", "Design from scratch"],
    payment: "Milestone-based: 40% to start · 30% midpoint · 30% before launch.",
    cta: "Book a strategy call",
    primary: true,
    refs: [
      {
        name: "Create3DParts",
        type: "E-Commerce Platform",
        result: "Quote time: 48hrs → 60sec",
        href: "/work/create3dparts",
      },
      {
        name: "LeadsAndSaaS",
        type: "SaaS Platform",
        result: "Shipped in under 1 week",
        href: "/work/leadsandsaas",
      },
    ],
  },
  {
    label: "For products that need ongoing iteration",
    name: "Growth Retainer",
    range: "$2,000 – $5,000",
    rangeUnit: "/month",
    subtext: "Monthly · Cancel anytime",
    description:
      "Your product launched — now it needs to grow. Ongoing development, feature additions, performance optimization, and priority support on a predictable monthly budget.",
    tags: ["Feature development", "Bug fixes & maintenance", "Performance optimization", "Priority support", "Weekly iterations"],
    payment: "Billed monthly. No long-term contracts.",
    cta: "Explore a retainer",
    primary: false,
    refs: null,
  },
];

const trustItems = [
  { icon: Lock, text: "Fixed pricing on every engagement" },
  { icon: ShieldCheck, text: "Milestone refund guarantee" },
  { icon: Code2, text: "Full code ownership on delivery" },
  { icon: Clock, text: "Response in under 4 hours" },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="wrap">
        {/* Section heading */}
        <Reveal>
          <div className="mx-auto mb-12 max-w-[560px] text-center">
            <span className="section-label">Pricing</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.5vw,42px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              Investment
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-body">
              Transparent pricing for every stage. Fixed quotes, milestone billing, and a refund guarantee on every engagement.
            </p>
          </div>
        </Reveal>

        {/* Three-track cards */}
        <div className="mx-auto grid max-w-[1060px] gap-5 md:grid-cols-3">
          {tracks.map((track, i) => (
            <Reveal key={track.name} delay={0.06 + i * 0.06}>
              <div
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[20px] border-[1.5px] transition-all duration-300",
                  track.primary
                    ? "border-accent/40 shadow-[0_0_40px_rgba(200,255,0,0.04),0_0_0_1px_rgba(200,255,0,0.02)_inset] hover:border-accent/55 hover:shadow-[0_0_50px_rgba(200,255,0,0.07)]"
                    : "border-white/[0.08] hover:border-white/[0.16] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)]",
                )}
                style={{ background: track.primary ? "rgba(200,255,0,0.015)" : "rgba(255,255,255,0.012)" }}
              >
                {/* Top accent line */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent",
                    track.primary ? "via-accent/50" : "via-white/[0.08]",
                  )}
                />

                {/* "Most projects" label for primary */}
                {track.primary && (
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-accent/70">
                      Most projects
                    </span>
                  </div>
                )}

                {/* Card content */}
                <div className="flex flex-1 flex-col px-7 pb-7 pt-7">
                  {/* Label */}
                  <span className="font-mono text-[10px] tracking-[0.04em] text-dim">
                    {track.label}
                  </span>

                  {/* Track name */}
                  <h3 className="mt-2 font-display text-[20px] font-bold text-white">
                    {track.name}
                  </h3>

                  {/* Price range — hero element */}
                  <div className="mt-5">
                    <span className="font-display text-[clamp(28px,4vw,36px)] font-black leading-none tracking-[-0.03em] text-white">
                      {track.range}
                    </span>
                    {track.rangeUnit && (
                      <span className="ml-1 text-[14px] font-medium text-white/30">
                        {track.rangeUnit}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-dim">{track.subtext}</p>

                  {/* Description */}
                  <p className="mt-5 text-[13px] leading-[1.7] text-body">{track.description}</p>

                  {/* Scope tags */}
                  <div className="mt-5">
                    <span className="mb-2.5 block font-mono text-[9px] uppercase tracking-[0.1em] text-white/20">
                      {track.name === "Growth Retainer" ? "Typically includes" : "What determines your price"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {track.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[11px] text-dim"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Payment note */}
                  <p className="mt-4 font-mono text-[10px] leading-[1.6] text-dim">
                    {track.payment}
                  </p>

                  {/* Mini case study refs (Custom Engineering only) */}
                  {track.refs && (
                    <div className="mt-5 space-y-2">
                      {track.refs.map((ref) => (
                        <Link
                          key={ref.name}
                          href={ref.href}
                          className="group/ref flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 transition-all hover:border-accent/[0.15] hover:bg-accent/[0.02]"
                        >
                          <div className="min-w-0">
                            <span className="block text-[12px] font-semibold text-white">
                              {ref.name}
                              <span className="ml-1.5 font-normal text-dim">— {ref.type}</span>
                            </span>
                            <span className="block font-mono text-[10px] text-accent/60">
                              {ref.result}
                            </span>
                          </div>
                          <ArrowRight
                            size={11}
                            className="ml-2 flex-shrink-0 text-dim transition-all group-hover/ref:translate-x-0.5 group-hover/ref:text-accent"
                          />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-auto pt-6">
                    <Link
                      href="/contact"
                      className={cn(
                        "flex w-full items-center justify-center gap-2 rounded-[10px] py-3.5 text-[13px] font-bold transition-all",
                        track.primary
                          ? "bg-accent text-surface-0 shadow-[0_1px_2px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(200,255,0,0.2)]"
                          : "border border-white/[0.14] bg-white/[0.04] text-white hover:-translate-y-0.5 hover:border-white/[0.24] hover:bg-white/[0.07]",
                      )}
                    >
                      {track.cta} <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust strip */}
        <Reveal delay={0.25}>
          <div className="mx-auto mt-10 flex max-w-[900px] flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustItems.map((item) => (
              <span key={item.text} className="flex items-center gap-2 text-[12px] text-dim">
                <item.icon size={13} className="text-accent/50" />
                {item.text}
              </span>
            ))}
          </div>
        </Reveal>

        {/* "Not sure where you fit?" CTA */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-16 max-w-[480px] text-center">
            <h3 className="font-display text-[22px] font-bold text-white">
              Not sure where you fit?
            </h3>
            <p className="mt-3 text-[14px] leading-[1.7] text-body">
              Tell us what you&apos;re building. We&apos;ll recommend the right track and send you a fixed quote within 72 hours.
            </p>
            <Link href="/contact" className="btn-v mt-6 inline-flex">
              Start a conversation <ArrowRight size={13} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
