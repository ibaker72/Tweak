"use client";
import { Reveal } from "@/components/shared";
import { ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";

export function HomepageAuditCTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,255,0,0.03),transparent)]" />

            <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                <BarChart3 size={26} className="text-accent" />
              </div>

              <div className="flex-1">
                <h2 className="font-display text-[clamp(22px,3.5vw,32px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
                  Free Instant Website Audit
                </h2>
                <p className="mt-3 max-w-lg text-[15px] leading-[1.7] text-body lg:max-w-none">
                  Get a plain-English score for your site&apos;s performance, SEO, trust signals, and conversion readiness.
                </p>
              </div>

              <Link
                href="/audit"
                className="btn-v flex-shrink-0 !px-7 !py-3.5 !text-[15px]"
              >
                Run the Audit <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
