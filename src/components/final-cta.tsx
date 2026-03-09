"use client";
import Link from "next/link";
import { ArrowRight, Mail, Clock, Shield, Check } from "lucide-react";
import { Reveal } from "./shared";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Background: subtle grid + accent wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,255,0,0.03),transparent)]" />

      <div className="container mx-auto px-6">
        <Reveal>
          <div className="mx-auto max-w-[680px] text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/[0.05] px-3 py-1 sm:mb-7 sm:px-4 sm:py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] font-medium text-accent sm:text-[11px]">Accepting projects</span>
            </div>

            <h2 className="font-display text-[clamp(30px,7vw,60px)] font-black leading-[0.95] tracking-[-0.045em] text-white sm:text-[clamp(34px,5.5vw,60px)]">
              Ready to build
              <br />
              something real?
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.7] text-body sm:mt-6 sm:text-[16px] sm:leading-[1.75]">
              Fixed pricing. Senior engineers. A clear process from day one. Tell us what
              you&apos;re building and we&apos;ll show you how we&apos;d approach it.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
              <Link href="/contact" className="btn-v w-full justify-center py-2.5 text-[13px] sm:w-auto sm:py-3 sm:text-[14px]">
                Start a project <ArrowRight size={14} />
              </Link>
              <Link href="/#pricing" className="btn-o w-full justify-center py-2.5 text-[13px] sm:w-auto sm:py-3 sm:text-[14px]">
                View pricing
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mx-auto mt-8 grid max-w-[540px] grid-cols-3 gap-1.5 sm:mt-12 sm:gap-2.5">
              {[
                { icon: Shield, text: "Milestone-based billing" },
                { icon: Check, text: "Fixed-price proposals" },
                { icon: Clock, text: "Response in under 4 hours" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.015] px-2.5 py-2 sm:gap-2 sm:px-4 sm:py-2.5"
                >
                  <item.icon size={11} className="flex-shrink-0 text-accent/70 sm:h-3 sm:w-3" />
                  <span className="text-[10px] font-medium text-white/50 sm:text-[11px]">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="mailto:hello@tweakandbuild.com"
                className="inline-flex items-center gap-2 text-[13px] text-dim transition-colors duration-200 hover:text-white"
              >
                <Mail size={13} className="text-accent/60" /> hello@tweakandbuild.com
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
