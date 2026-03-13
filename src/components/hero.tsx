"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Circle } from "lucide-react";
import { Reveal, Counter } from "./shared";
import { siteConfig } from "@/lib/config";

const clientNames = ["Create3DParts", "LeadsAndSaaS", "Meridian Health", "Atlas Freight", "Kommison"];

const liveProjects = [
  { name: "Create3DParts.com", tag: "E-Commerce", result: "+35% orders" },
  { name: "LeadsAndSaaS", tag: "SaaS Platform", result: "Shipped in <1wk" },
  { name: "Meridian Health", tag: "Patient Portal", result: "-40% no-shows" },
];

const codeLines = [
  { text: "const product = await build({", color: "text-white/70" },
  { text: '  client: "your-startup",', color: "text-accent/70" },
  { text: "  quality: \"production\",", color: "text-accent/70" },
  { text: "  timeline: \"weeks-not-months\",", color: "text-accent/70" },
  { text: "  ownership: 1.0,", color: "text-accent/70" },
  { text: "});", color: "text-white/70" },
  { text: "", color: "" },
  { text: "// → deployed to production ✓", color: "text-emerald-400/60" },
];

function TypingCode() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    codeLines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 600 + i * 280));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="font-mono text-[11px] leading-[2] sm:text-[12px]">
      {codeLines.map((line, i) => (
        <div
          key={i}
          className={`${line.color} transition-all duration-300`}
          style={{
            opacity: i < visibleLines ? 1 : 0,
            transform: i < visibleLines ? "translateY(0)" : "translateY(6px)",
          }}
        >
          {line.text || "\u00A0"}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* Accent radial glow - top */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(200,255,0,0.04),transparent)]" />
      {/* Secondary glow - bottom right for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(200,255,0,0.015),transparent)]" />

      <div className="wrap relative flex min-h-[100dvh] flex-col justify-center pb-10 pt-24 sm:pb-16 sm:pt-24 lg:pb-24 lg:pt-28">
        {/* Top bar: status + availability */}
        <Reveal>
          <div className="mb-8 sm:mb-10">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/12 bg-emerald-400/[0.03] px-3.5 py-[6px] sm:border-emerald-400/15 sm:bg-emerald-400/[0.04] sm:px-4 sm:py-1.5"
              style={{ boxShadow: "inset 0 0.5px 0 rgba(52,211,153,0.06), 0 1px 2px rgba(0,0,0,0.15)" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] font-medium tracking-[0.06em] text-emerald-400/80 sm:text-[11px] sm:text-emerald-400/90">{siteConfig.availability}</span>
              <span className="hidden h-3 w-px bg-emerald-400/15 sm:inline-block" />
              <span className="hidden font-mono text-[10px] text-emerald-400/50 sm:inline">{siteConfig.openSlots} slots open for {siteConfig.currentQuarter}</span>
            </div>
          </div>
        </Reveal>

        {/* Main headline area */}
        <div className="grid gap-12 sm:gap-14 lg:grid-cols-[1fr,480px] lg:items-center lg:gap-20">
          {/* Left: copy */}
          <div>
            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(44px,11vw,80px)] font-black leading-[0.9] tracking-[-0.045em] text-white sm:text-[clamp(42px,7vw,80px)] sm:leading-[0.92] sm:tracking-[-0.05em]">
                We build
                <br />
                <span className="gradient-text">digital products</span>
                <br />
                that perform.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[360px] text-[15px] leading-[1.7] text-body/90 sm:mt-8 sm:max-w-[480px] sm:text-[17px] sm:leading-[1.75] sm:text-body lg:text-[18px]">
                Product engineering studio for founders who need websites, web apps, and automation systems built fast, built right, and built to convert.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex gap-3 sm:mt-10 sm:flex-row sm:items-center">
                <Link href="/contact" className="btn-v justify-center px-6 py-3 text-[13px] sm:px-8 sm:py-3.5 sm:text-[14px]">
                  Start a project <ArrowRight size={14} />
                </Link>
                <Link href="#work" className="btn-o justify-center px-6 py-3 text-[13px] sm:px-7 sm:py-3.5 sm:text-[14px]">
                  See our work
                </Link>
              </div>
            </Reveal>

            {/* Micro-proof metrics inline */}
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/[0.06] pt-7 sm:mt-12 sm:gap-10 sm:pt-8">
                {[
                  { value: 12, suffix: "+", label: "Products shipped" },
                  { value: 35, suffix: "%", label: "Avg. conversion lift" },
                  { value: 100, suffix: "%", label: "Code ownership" },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-[28px] font-black tracking-[-0.03em] text-white sm:text-[32px]">
                      <Counter end={m.value} suffix={m.suffix} />
                    </div>
                    <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-dim sm:text-[10px]">{m.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: Studio terminal + live feed */}
          <Reveal delay={0.15}>
            <div className="relative">
              {/* Glow behind card */}
              <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(200,255,0,0.03),transparent_70%)]" />

              {/* Outer container - studio monitor */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-surface-1 shadow-[0_16px_64px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)_inset] sm:rounded-2xl">
                {/* Monitor header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3 sm:px-6 sm:py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-accent/30" />
                    </div>
                    <span className="ml-2 font-mono text-[11px] font-medium text-white/40">tweak-studio</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-30" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <span className="font-mono text-[10px] text-accent/60">Live</span>
                  </div>
                </div>

                {/* Code block section */}
                <div className="border-b border-white/[0.04] px-5 py-5 sm:px-6 sm:py-6">
                  <TypingCode />
                </div>

                {/* Project rows */}
                <div className="divide-y divide-white/[0.04]">
                  {liveProjects.map((proj, i) => (
                    <div
                      key={proj.name}
                      className="group flex items-center gap-3.5 px-5 py-4 transition-colors duration-200 hover:bg-white/[0.02] sm:gap-4 sm:px-6"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent/[0.08] font-mono text-[11px] font-bold text-accent/80 sm:h-10 sm:w-10">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-[13px] font-semibold text-white sm:text-[14px]">{proj.name}</span>
                          <span
                            className="flex-shrink-0 rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-[2px] font-mono text-[9px] tracking-[0.03em] text-white/30"
                          >
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
                    <div key={stat.label} className={`px-5 py-4 sm:px-6 ${i < 2 ? "border-r border-white/[0.04]" : ""}`}>
                      <div className="font-display text-[18px] font-black tracking-[-0.02em] text-white sm:text-[20px]">{stat.val}</div>
                      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-dim">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Shipped for - client logos */}
        <Reveal delay={0.3}>
          <div className="mt-16 border-t border-white/[0.04] pt-8 sm:mt-20 sm:pt-10">
            <p className="mb-4 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-dim sm:mb-5 sm:text-[10px]">Trusted by founders at</p>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3">
              {clientNames.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.015] px-4 py-2 font-display text-[12px] font-semibold text-white/25 transition-all duration-300 hover:border-white/[0.1] hover:text-white/50 sm:px-5 sm:py-2 sm:text-[13px]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
