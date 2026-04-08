"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { Reveal } from "@/components/shared";
import type { Industry } from "@/lib/industries";

export function IndustryHero({ industry }: { industry: Industry }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-v/[0.06] blur-[120px]" />
      </div>

      <div className="wrap relative">
        <Reveal>
          <div className="mx-auto max-w-[760px] text-center">
            <span className="section-label">{industry.shortName}</span>
            <h1 className="mt-5 font-display text-[clamp(30px,5vw,58px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              {industry.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-[600px] text-[15px] leading-[1.75] text-body sm:text-[16px]">
              {industry.subheadline}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/audit" className="btn-v gap-2 !px-6 !py-3 !text-[14px]">
                <Zap size={14} />
                Free site audit
              </Link>
              <Link href="/contact" className="btn-o gap-2 !px-6 !py-3 !text-[14px]">
                Start a project
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
