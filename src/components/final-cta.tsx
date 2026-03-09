"use client";
import Link from "next/link";
import { ArrowRight, Mail, Clock, Shield, Check } from "lucide-react";
import { Reveal } from "./shared";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
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
          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/[0.05] px-4 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] font-medium text-accent">Accepting projects</span>
            </div>

            <h2 className="font-display text-[clamp(34px,5.5vw,60px)] font-black leading-[0.95] tracking-[-0.045em] text-white">
              Ready to build
              <br />
              something real?
            </h2>
            <p className="mx-auto mt-6 max-w-[480px] text-[16px] leading-[1.75] text-body">
              Fixed pricing. Senior engineers. A clear process from day one. Tell us what
              you&apos;re building and we&apos;ll show you how we&apos;d approach it.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-v justify-center">
                Start a project <ArrowRight size={15} />
              </Link>
              <Link href="/#pricing" className="btn-o justify-center">
                View pricing
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mx-auto mt-12 grid max-w-[540px] grid-cols-1 gap-2.5 sm:grid-cols-3">
              {[
                { icon: Shield, text: "Milestone-based billing" },
                { icon: Check, text: "Fixed-price proposals" },
                { icon: Clock, text: "Response in under 4 hours" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.015] px-4 py-2.5"
                >
                  <item.icon size={12} className="flex-shrink-0 text-accent/70" />
                  <span className="text-[11px] font-medium text-white/50">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="mailto:iyadbaker.dev@gmail.com"
                className="inline-flex items-center gap-2 text-[13px] text-dim transition-colors duration-200 hover:text-white"
              >
                <Mail size={13} className="text-accent/60" /> iyadbaker.dev@gmail.com
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
