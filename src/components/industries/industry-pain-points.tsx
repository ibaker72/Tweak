import { AlertCircle } from "lucide-react";
import { Reveal } from "@/components/shared";
import type { Industry } from "@/lib/industries";

export function IndustryPainPoints({ industry }: { industry: Industry }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="wrap">
        <Reveal>
          <div className="mb-12 max-w-[560px]">
            <span className="section-label">The problem</span>
            <h2 className="mt-4 font-display text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              {industry.problemStatement}
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {industry.painPoints.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.07}>
              <div className="card flex gap-4 p-5">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                    <AlertCircle size={15} />
                  </div>
                </div>
                <div>
                  <p className="font-display text-[14px] font-bold text-white">
                    {point.title}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-body">
                    {point.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
