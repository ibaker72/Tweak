"use client";
import { Reveal, Counter } from "./shared";

const clientNames = ["Create3DParts", "LeadsAndSaaS", "Meridian Health", "Atlas Freight", "Kommison"];

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
    num: 48,
    suffix: "hrs → 60sec",
    display: (
      <>
        <span className="text-white">60sec</span>
      </>
    ),
    label: "Quoting process automated",
    highlight: true,
  },
  {
    num: 1,
    suffix: "",
    display: <span className="text-white">&lt;1 week</span>,
    label: "Fastest product shipped",
    highlight: false,
  },
  {
    num: 4,
    suffix: "",
    display: <span className="text-white">&lt;4hr</span>,
    label: "Average response time",
    highlight: false,
  },
  {
    num: 100,
    suffix: "",
    display: (
      <span className="text-white">
        <Counter end={100} suffix="%" />
      </span>
    ),
    label: "Code ownership, always",
    highlight: false,
  },
];

export function TrustStrip() {
  return (
    <section className="relative py-14 sm:py-16">
      {/* Full-width background break */}
      <div className="absolute inset-0 border-y border-white/[0.04] bg-surface-1/50" />

      <div className="wrap relative">
        {/* Row 1: Social proof logos */}
        <Reveal>
          <div className="mb-8">
            <p className="mb-4 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-dim sm:mb-5 sm:text-[10px]">
              Trusted by founders at
            </p>
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

        {/* Row 2: Stats */}
        <Reveal delay={0.1}>
          <div>
            <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
              By the numbers
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.01]" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset, 0 8px 32px rgba(0,0,0,0.15)" }}>
              <div className="grid grid-cols-2 md:grid-cols-4">
                {metrics.map((m, i) => {
                  const classes = [
                    "px-6 py-7 md:px-8 md:py-9 transition-colors duration-300 hover:bg-white/[0.015]",
                    i % 2 === 0 ? "border-r border-white/[0.05]" : "",
                    i < 2 ? "border-b border-white/[0.05] md:border-b-0" : "",
                    i < 3 ? "md:border-r" : "md:border-r-0",
                    m.highlight ? "relative" : "",
                  ].filter(Boolean).join(" ");
                  return (
                    <div key={i} className={classes}>
                      {m.highlight && (
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,255,0,0.02),transparent_70%)]" />
                      )}
                      <div className="relative text-[26px] font-bold leading-none tracking-tight md:text-[30px]">
                        {m.display}
                      </div>
                      <p className="mt-2.5 text-[13px] text-body/70">{m.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Row 3: Industries as compact pill row */}
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
            <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
              Industries:
            </span>
            {industries.map((ind) => (
              <span
                key={ind}
                className="rounded-full border border-white/[0.06] bg-white/[0.015] px-3.5 py-[6px] text-[12px] font-medium text-white/40 transition-all duration-200 hover:border-white/[0.1] hover:text-white/65"
                style={{ boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.04)" }}
              >
                {ind}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
