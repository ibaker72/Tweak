"use client";
import Link from "next/link";
import { ArrowRight, Circle } from "lucide-react";
import { Reveal } from "./shared";

const clientNames = ["Create3DParts", "LeadsAndSaaS", "Meridian Health", "Atlas Freight", "Vow Studios"];

const liveProjects = [
  { name: "Create3DParts.com", tag: "E-Commerce", result: "+35% orders" },
  { name: "LeadsAndSaaS", tag: "SaaS Platform", result: "Shipped in 5wk" },
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

      <div className="wrap relative flex min-h-[100dvh] flex-col justify-center pb-12 pt-20 sm:pb-16 sm:pt-24 lg:pb-24 lg:pt-28">
        {/* Top bar: status + availability */}
        <Reveal>
          <div className="mb-5 flex flex-wrap items-center gap-3 sm:mb-8">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 sm:px-3.5 sm:py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] font-medium text-emerald-400 sm:text-[11px]">Accepting projects</span>
            </div>
          </div>
        </Reveal>

        {/* Main headline area */}
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1fr,460px] lg:items-center lg:gap-16">
          {/* Left: copy */}
          <div>
            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(36px,8.5vw,76px)] font-black leading-[0.94] tracking-[-0.045em] text-white sm:text-[clamp(40px,7vw,76px)]">
                We build
                <br />
                <span className="text-accent">digital products</span>
                <br />
                that perform.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-[480px] text-[15px] leading-[1.7] text-body sm:mt-7 sm:text-[16px] sm:leading-[1.75] lg:text-[17px]">
                Tweak &amp; Build is a product engineering studio for founders and businesses
                who need websites, web apps, and automation systems built fast, built right,
                and built to convert.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
                <Link href="/contact" className="btn-v justify-center py-2.5 text-[13px] sm:py-3 sm:text-[14px] sm:justify-start">
                  Start a project <ArrowRight size={14} />
                </Link>
                <Link href="#work" className="btn-o justify-center py-2.5 text-[13px] sm:py-3 sm:text-[14px] sm:justify-start">
                  See our work
                </Link>
              </div>
            </Reveal>

            {/* Client logos row */}
            <Reveal delay={0.24}>
              <div className="mt-8 border-t border-white/[0.06] pt-5 sm:mt-12 sm:pt-7">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-dim sm:mb-3.5">Shipped for</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-2">
                  {clientNames.map((name) => (
                    <span key={name} className="font-display text-[12px] font-semibold text-white/30 transition-colors duration-200 hover:text-white/60 sm:text-[13px]">
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
              <div className="overflow-hidden rounded-2xl border border-white/[0.10] bg-surface-1 shadow-2xl shadow-black/25">
                {/* Monitor header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-3.5">
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
                      className="group flex items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-white/[0.02]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent/[0.08] font-mono text-[12px] font-bold text-accent/80">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="truncate text-[13px] font-semibold text-white">{proj.name}</span>
                          <span className="flex-shrink-0 rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[9px] text-white/40">
                            {proj.tag}
                          </span>
                        </div>
                        <div className="mt-1 font-mono text-[11px] text-accent/60">{proj.result}</div>
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
                    <div key={stat.label} className={`px-6 py-4 ${i < 2 ? "border-r border-white/[0.04]" : ""}`}>
                      <div className="font-display text-[18px] font-black tracking-[-0.02em] text-white">{stat.val}</div>
                      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-dim">{stat.label}</div>
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
