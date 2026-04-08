"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared";
import type { Industry } from "@/lib/industries";

export function IndustryFaqs({ industry }: { industry: Industry }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20">
      <div className="wrap">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="section-label">FAQ</span>
            <h2 className="mt-4 font-display text-[clamp(22px,3.5vw,34px)] font-extrabold tracking-[-0.03em] text-white">
              Common questions from {industry.shortName.toLowerCase()}
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto max-w-[720px] divide-y divide-white/[0.06]">
          {industry.faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-white"
              >
                <span className="font-display text-[14px] font-semibold leading-[1.5] text-white sm:text-[15px]">
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "mt-0.5 flex-shrink-0 text-dim transition-transform duration-300",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-[14px] leading-[1.75] text-body">
                    {faq.a}
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
