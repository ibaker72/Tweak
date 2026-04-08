import { Reveal } from "@/components/shared";
import type { Industry } from "@/lib/industries";

export function IndustryResults({ industry }: { industry: Industry }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="wrap">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-accent/10 bg-accent/[0.03] px-8 py-12 sm:px-12">
            <div className="mb-10 max-w-[500px]">
              <span className="section-label">Results</span>
              <h2 className="mt-4 font-display text-[clamp(22px,3vw,32px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
                Numbers that matter
              </h2>
              <p className="mt-3 text-[14px] leading-[1.7] text-body">
                What clients in your industry typically see after launching with us.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {industry.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-[clamp(28px,4vw,40px)] font-black leading-none tracking-[-0.04em] text-accent">
                      {stat.value}
                    </span>
                    <span className="text-[12px] leading-[1.5] text-body">
                      {stat.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
