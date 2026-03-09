"use client";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Tilt } from "./shared";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section className="relative overflow-hidden py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(139,92,246,0.04),transparent_50%)]" />

      <div className="wrap relative">
        <Reveal>
          <div className="mb-14">
            <span className="section-label">Client proof</span>
            <h2 className="section-title mt-3">What clients valued most</h2>
            <p className="mt-4 max-w-[420px] text-[15px] leading-[1.7] text-body">
              Speed, clarity, and execution — from recent engagements.
            </p>
          </div>
        </Reveal>

        {/* Featured proof card */}
        <Reveal delay={0.08}>
          <Tilt>
            <div className="mx-auto mb-6 max-w-[800px]">
              <div
                className="relative overflow-hidden rounded-[22px] border border-white/[0.06] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_24px_48px_-12px_rgba(0,0,0,0.4)] sm:p-10"
                style={{ background: "linear-gradient(170deg, rgba(139,92,246,0.035), rgba(12,12,22,0.96))" }}
              >
                {/* Top edge line */}
                <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-v/[0.15] to-transparent" />

                {/* Engagement tags */}
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-mono text-[10px] text-gray-400">
                    {featured.engagement}
                  </span>
                  <span className="rounded-lg border border-v/[0.12] bg-v/[0.04] px-3 py-1 font-mono text-[10px] text-v-light">
                    {featured.result}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-[18px] font-medium leading-[1.75] text-gray-200 sm:text-[20px] sm:leading-[1.7]">
                  &ldquo;{featured.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="mt-8 flex items-center gap-4 border-t border-white/[0.05] pt-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-v/[0.15] bg-gradient-to-br from-v/[0.1] to-v/[0.03]">
                    <span className="font-display text-[12px] font-bold text-v-light">
                      {featured.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-[14px] font-bold text-white">{featured.name}</p>
                    <p className="font-mono text-[11px] text-dim">{featured.title}</p>
                  </div>
                  <span className="ml-auto hidden rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-1 font-mono text-[10px] text-dim sm:inline-block">
                    {featured.project}
                  </span>
                </div>
              </div>
            </div>
          </Tilt>
        </Reveal>

        {/* Supporting proof cards */}
        <div className="mx-auto grid max-w-[800px] gap-4 sm:grid-cols-2">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={0.15 + i * 0.08}>
              <Tilt className="h-full">
                <div
                  className="flex h-full flex-col rounded-[20px] border border-white/[0.06] p-7 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_20px_40px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-white/[0.09]"
                  style={{ background: "linear-gradient(170deg, rgba(14,14,24,0.95), rgba(10,10,18,0.98))" }}
                >
                  {/* Tags */}
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-[3px] font-mono text-[9px] text-gray-400">
                      {t.engagement}
                    </span>
                    <span className="rounded-md border border-v/[0.1] bg-v/[0.03] px-2.5 py-[3px] font-mono text-[9px] text-v-light">
                      {t.result}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="flex-1 text-[14px] leading-[1.8] text-gray-300">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Attribution */}
                  <div className="mt-6 flex items-center gap-3 border-t border-white/[0.05] pt-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01]">
                      <span className="font-display text-[10px] font-bold text-gray-300">
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-[13px] font-bold text-white">{t.name}</p>
                      <p className="font-mono text-[10px] text-dim">{t.title}</p>
                    </div>
                    <span className="ml-auto hidden rounded-md border border-white/[0.04] bg-white/[0.015] px-2 py-[3px] font-mono text-[9px] text-dim sm:inline-block">
                      {t.project}
                    </span>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
