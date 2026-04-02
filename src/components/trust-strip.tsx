"use client";

import { Reveal, Counter } from "./shared";

const clientNames = [
  "Create3DParts",
  "LeadsAndSaaS",
  "Meridian Health",
  "Atlas Freight",
  "voltgrid",
];

export function TrustStrip() {
  return (
    <section className="relative py-10 sm:py-16">
      <div className="absolute inset-0 border-y border-white/[0.04] bg-surface-1/40" />

      <div className="wrap relative flex flex-col items-center">

        {/* LOGOS — MINIMAL / QUIET */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 opacity-50">
            {clientNames.map((name) => (
              <span
                key={name}
                className="font-display text-[12px] sm:text-[13px] text-white/40 tracking-tight"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>

        {/* METRICS — INLINE (NO BOXES) */}
        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 gap-y-6 gap-x-8 sm:flex sm:items-center sm:justify-center sm:gap-12">

            {/* ITEM */}
            <div className="text-center">
              <div className="text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">
                60sec
              </div>
              <p className="mt-1 text-[11px] text-white/40">
                quoting automated
              </p>
            </div>

            <div className="text-center">
              <div className="text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">
                &lt;1 week
              </div>
              <p className="mt-1 text-[11px] text-white/40">
                product shipped
              </p>
            </div>

            <div className="text-center">
              <div className="text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">
                &lt;4hr
              </div>
              <p className="mt-1 text-[11px] text-white/40">
                response time
              </p>
            </div>

            <div className="text-center">
              <div className="text-[22px] sm:text-[26px] font-semibold text-white tracking-tight">
                <Counter end={100} suffix="%" />
              </div>
              <p className="mt-1 text-[11px] text-white/40">
                code ownership
              </p>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}