"use client";
import Link from "next/link";
import { ArrowRight, Mail, Clock, Shield, Check } from "lucide-react";
import { Reveal } from "./shared";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Background: subtle grid + accent wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,255,0,0.035),transparent)]" />

      <div className="wrap">
        <Reveal>
          <div className="mx-auto max-w-[720px] text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/[0.05] px-4 py-1.5 sm:mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] font-medium text-accent sm:text-[11px]">Accepting projects</span>
            </div>

            <h2 className="font-display text-[clamp(34px,8vw,64px)] font-black leading-[0.92] tracking-[-0.045em] text-white sm:text-[clamp(38px,6vw,64px)]">
              Ready to build
              <br />
              <span className="gradient-text">something real?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[500px] text-[15px] leading-[1.7] text-body sm:mt-7 sm:text-[17px] sm:leading-[1.75]">
              Fixed pricing. Senior engineers. A clear process from day one. Tell us what
              you&apos;re building and we&apos;ll show you how we&apos;d approach it.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
              <Link href="/contact" className="btn-v w-full justify-center py-3 text-[14px] sm:w-auto sm:px-8 sm:py-3.5 sm:text-[15px]">
                Start a project <ArrowRight size={14} />
              </Link>
              <Link href="/#pricing" className="btn-o w-full justify-center py-3 text-[14px] sm:w-auto sm:px-7 sm:py-3.5">
                View pricing
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mx-auto mt-10 grid max-w-[560px] grid-cols-3 gap-2 sm:mt-14 sm:gap-3">
              {[
                { icon: Shield, text: "Milestone-based billing" },
                { icon: Check, text: "Fixed-price proposals" },
                { icon: Clock, text: "Response in under 4 hours" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.015] px-3 py-2.5 sm:gap-2 sm:px-4"
                >
                  <item.icon size={12} className="flex-shrink-0 text-accent/60" />
                  <span className="text-[10px] font-medium text-white/45 sm:text-[11px]">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 sm:mt-14">
              <a
                href="mailto:hello@tweakandbuild.com"
                className="inline-flex items-center gap-2 text-[13px] text-dim transition-colors duration-200 hover:text-white"
              >
                <Mail size={13} className="text-accent/50" /> hello@tweakandbuild.com
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
