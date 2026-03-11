"use client";
import Link from "next/link";
import { ArrowRight, Circle } from "lucide-react";
import { Reveal } from "./shared";
import { siteConfig } from "@/lib/config";

const clientNames = ["Create3DParts", "LeadsAndSaaS", "Meridian Health", "Atlas Freight", "Vow Studios"];

const liveProjects = [
  { name: "Create3DParts.com", tag: "E-Commerce", result: "+35% orders" },
  { name: "LeadsAndSaaS", tag: "SaaS Platform", result: "Shipped in <1wk" },
  { name: "Meridian Health", tag: "Patient Portal", result: "-40% no-shows" },
];

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* Top gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(200,255,0,0.035),transparent)]" />

      <div className="wrap relative flex min-h-[100dvh] flex-col justify-center pb-10 pt-24 sm:pb-16 sm:pt-24 lg:pb-24 lg:pt-28">
        {/* Top bar: status + availability */}
        <Reveal>
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-2.5 py-1 sm:gap-2 sm:border-emerald-400/20 sm:bg-emerald-400/[0.06] sm:px-3.5 sm:py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[9px] font-medium text-emerald-400/80 sm:text-[11px] sm:text-emerald-400">{siteConfig.availability}</span>
            </div>
          </div>
        </Reveal>

        {/* Main headline area */}
        <div className="grid gap-12 sm:gap-12 lg:grid-cols-[1fr,460px] lg:items-center lg:gap-16">
          {/* Left: copy */}
          <div>
            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(42px,11vw,76px)] font-black leading-[0.92] tracking-[-0.04em] text-white sm:text-[clamp(40px,7vw,76px)] sm:leading-[0.94] sm:tracking-[-0.045em]">
                We build
                <br />
                <span className="text-accent">digital products</span>
                <br />
                that perform.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[340px] text-[14px] leading-[1.65] text-body/90 sm:mt-7 sm:max-w-[480px] sm:text-[16px] sm:leading-[1.75] sm:text-body lg:text-[17px]">
                Tweak &amp; Build is a product engineering studio for founders and businesses
                who need websites, web apps, and automation systems built fast, built right,
                and built to convert.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 flex gap-3 sm:mt-8 sm:flex-row sm:items-center">
                <Link href="/contact" className="btn-v justify-center px-6 py-2.5 text-[13px] sm:px-7 sm:py-3 sm:text-[14px]">
                  Start a project <ArrowRight size={14} />
                </Link>
                <Link href="#work" className="btn-o justify-center px-6 py-2.5 text-[13px] sm:px-7 sm:py-3 sm:text-[14px]">
                  See our work
                </Link>
              </div>
            </Reveal>

            {/* Shipped for */}
            <Reveal delay={0.24}>
              <div className="mt-10 border-t border-white/[0.06] pt-6 sm:mt-12 sm:pt-7">
                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-dim sm:mb-3.5 sm:text-[10px] sm:tracking-[0.14em]">Shipped for</p>
                <div className="grid grid-cols-2 gap-x-1.5 gap-y-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-2">
                  {clientNames.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center justify-center rounded-md border border-white/[0.05] bg-white/[0.02] px-2.5 py-1.5 font-display text-[11px] font-semibold text-white/25 transition-colors duration-200 hover:text-white/50 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-[13px] sm:text-white/30 sm:hover:text-white/60"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: live studio feed */}
          <Reveal delay={0.15}>
            <div className="relative">
              {/* Outer container - studio monitor */}
              <div className="overflow-hidden rounded-2xl border border-white/[0.10] bg-surface-1 shadow-2xl shadow-black/25 sm:rounded-2xl">
                {/* Monitor header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3 sm:px-6 sm:py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Circle size={6} fill="#C8FF00" className="text-accent" />
                    <span className="font-mono text-[11px] font-medium text-white/50">Studio feed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-30" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <span className="font-mono text-[10px] text-accent/60">Live</span>
                  </div>
                </div>

                {/* Project rows */}
                <div className="divide-y divide-white/[0.04]">
                  {liveProjects.map((proj, i) => (
                    <div
                      key={proj.name}
                      className="group flex items-center gap-3.5 px-5 py-[18px] transition-colors duration-200 hover:bg-white/[0.02] sm:gap-4 sm:px-6 sm:py-4"
                    >
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/[0.08] font-mono text-[13px] font-bold text-accent/80 sm:h-10 sm:w-10 sm:rounded-[10px] sm:text-[12px]">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-[14px] font-semibold text-white sm:text-[13px]">{proj.name}</span>
                          <span className="flex-shrink-0 rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[9px] text-white/40">
                            {proj.tag}
                          </span>
                        </div>
                        <div className="mt-1.5 font-mono text-[11px] text-accent/60 sm:mt-1">{proj.result}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom stats bar */}
                <div className="grid grid-cols-3 border-t border-white/[0.06] bg-white/[0.01]">
                  {[
                    { val: "12+", label: "Shipped" },
                    { val: "<4hr", label: "Response" },
                    { val: "100%", label: "Ownership" },
                  ].map((stat, i) => (
                    <div key={stat.label} className={`px-5 py-[18px] sm:px-6 sm:py-4 ${i < 2 ? "border-r border-white/[0.04]" : ""}`}>
                      <div className="font-display text-[20px] font-black tracking-[-0.02em] text-white sm:text-[18px]">{stat.val}</div>
                      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-dim sm:mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
