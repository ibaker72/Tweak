import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { Reveal } from "@/components/shared";
import type { Industry } from "@/lib/industries";

export function IndustryCta({ industry }: { industry: Industry }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="wrap">
        <Reveal>
          <div className="mx-auto max-w-[620px] text-center">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Zap size={22} />
            </div>
            <h2 className="font-display text-[clamp(24px,4vw,40px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              {industry.ctaHeadline}
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[14px] leading-[1.75] text-body sm:text-[15px]">
              {industry.ctaSubtext}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/audit" className="btn-v gap-2 !px-7 !py-3.5 !text-[14px]">
                <Zap size={14} />
                Run free audit
              </Link>
              <Link href="/contact" className="btn-o gap-2 !px-7 !py-3.5 !text-[14px]">
                Talk to us
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
