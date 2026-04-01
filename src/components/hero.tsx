"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./shared";
import { siteConfig } from "@/lib/config";

const servicePills = ["Websites", "Web Apps", "Automation"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-black/72" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.18),rgba(0,0,0,0.84)_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/80" />

      {/* NEW: Text Contrast Vignette (Dark glow directly behind the text) */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,0,0,0.4),transparent)]" />

      {/* Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(200,255,0,0.06),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(200,255,0,0.02),transparent)]" />

      <div className="wrap relative z-10 flex min-h-[100dvh] flex-col justify-center pb-12 pt-24 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
        
        {/* CHANGED: Added mx-auto, flex-col, items-center, and text-center to lock everything to the middle */}
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center text-center">
          <Reveal>
            <div className="mb-6 sm:mb-10">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/12 bg-emerald-400/[0.03] px-3.5 py-[6px] backdrop-blur-sm sm:border-emerald-400/15 sm:bg-emerald-400/[0.04] sm:px-4 sm:py-1.5"
                style={{ boxShadow: "inset 0 0.5px 0 rgba(52,211,153,0.06), 0 1px 2px rgba(0,0,0,0.15)" }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] font-medium tracking-[0.06em] text-emerald-400/80 sm:text-[11px] sm:text-emerald-400/90">
                  {siteConfig.availability}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            {/* CHANGED: Hid the <br/> on mobile using 'sm:hidden' so it's a 1-liner on desktop */}
            <h1 className="max-w-[800px] text-balance font-display text-[clamp(44px,14vw,118px)] font-black leading-[0.9] tracking-[-0.05em] text-white sm:text-[clamp(68px,10vw,118px)]">
              Ship
              <br className="sm:hidden" />
              <span className="gradient-text sm:ml-4">your vision.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            {/* CHANGED: Added mx-auto to center the paragraph block */}
            <p className="mx-auto mt-5 max-w-[600px] text-pretty text-[15px] leading-[1.7] text-white/72 sm:mt-7 sm:text-[18px] lg:text-[19px]">
              Product engineering studio for founders who need websites, web apps, and automation systems built fast, built right, and built to convert.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mobile-rail mt-6 sm:mt-8 sm:flex-wrap sm:justify-center sm:gap-2.5 sm:overflow-visible sm:pb-0">
              {servicePills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex shrink-0 snap-start items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[11px] font-medium tracking-[0.08em] text-white/60 backdrop-blur-sm sm:text-[12px]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* CHANGED: Ensure the button group is centered */}
            <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-v justify-center px-6 py-3 text-[13px] sm:px-8 sm:py-3.5 sm:text-[14px]">
                Start a project <ArrowRight size={14} />
              </Link>
              <Link
                href="#work"
                className="btn-o justify-center px-6 py-3 text-[13px] backdrop-blur-sm sm:px-7 sm:py-3.5 sm:text-[14px]"
              >
                See our work
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mobile-rail mt-7 sm:mt-10 sm:grid sm:w-full sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0">
              <div className="mobile-rail-card rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-left sm:w-auto sm:max-w-none">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">Fastest launch</p>
                <p className="mt-1 text-[14px] font-semibold text-white">&lt; 1 week delivery</p>
              </div>
              <div className="mobile-rail-card rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-left sm:w-auto sm:max-w-none">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">Response SLA</p>
                <p className="mt-1 text-[14px] font-semibold text-white">&lt; 4 hours avg</p>
              </div>
              <div className="mobile-rail-card rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-left sm:w-auto sm:max-w-none">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">Ownership</p>
                <p className="mt-1 text-[14px] font-semibold text-white">100% handoff ready</p>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
