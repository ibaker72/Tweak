"use client";
import { Reveal } from "./shared";

const industries = [
  "E-Commerce",
  "SaaS",
  "Health Tech",
  "Logistics",
  "Professional Services",
  "Retail",
];

const metrics = [
  {
    value: (
      <>
        <span className="text-neutral-500">48hrs</span>
        <span className="text-accent"> → </span>
        <span className="text-white">60sec</span>
      </>
    ),
    label: "Quoting process automated",
  },
  {
    value: <span className="text-white">&lt;1 week</span>,
    label: "Fastest product shipped",
  },
  {
    value: <span className="text-white">&lt;4hr</span>,
    label: "Average response time",
  },
  {
    value: <span className="text-white">100%</span>,
    label: "Code ownership, always",
  },
];

export function TrustStrip() {
  return (
    <section className="relative py-20 sm:py-28">
      {/* Full-width background break */}
      <div className="absolute inset-0 border-y border-white/[0.04] bg-surface-1/50" />

      <div className="wrap relative">
        {/* Proven Results strip */}
        <Reveal>
          <div>
            <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
              By the numbers
            </p>
            <div className="rounded-xl border border-white/5">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {metrics.map((m, i) => {
                  // Mobile 2x2: items 0,1 get bottom border; items 0,2 get right border
                  // Desktop 4-col: items 0,1,2 get right border
                  const classes = [
                    "px-6 py-6 md:px-8 md:py-7",
                    i % 2 === 0 ? "border-r border-white/5" : "",
                    i < 2 ? "border-b border-white/5 md:border-b-0" : "",
                    i < 3 ? "md:border-r" : "md:border-r-0",
                  ].filter(Boolean).join(" ");
                  return (
                  <div
                    key={i}
                    className={classes}
                  >
                    <div className="text-2xl font-bold leading-none tracking-tight md:text-3xl">
                      {m.value}
                    </div>
                    <p className="mt-2 text-sm text-neutral-400">{m.label}</p>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Industries */}
        <Reveal delay={0.35}>
          <div className="mt-12 border-t border-white/[0.06] pt-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                Industries:
              </span>
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-[5px] text-[12px] font-medium text-white/45 transition-colors duration-200 hover:text-white/65"
                  style={{ boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.04)" }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
