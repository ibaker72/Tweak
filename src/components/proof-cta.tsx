"use client";

import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { Reveal } from "./shared";
import { trackEvent } from "@/lib/analytics";

export function ProofCTA() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-28">
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(200,255,0,0.05),transparent)]" />

      <div className="wrap relative">
        <Reveal>
          <div
            className="relative mx-auto max-w-[860px] overflow-hidden rounded-3xl border border-white/[0.08] p-7 sm:p-12"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.008))",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 60px rgba(0,0,0,0.32)",
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(200,255,0,0.4), transparent)",
              }}
            />

            {/* Corner glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/[0.06] blur-[80px]" />

            <div className="relative text-center">
              <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-accent/15 bg-accent/[0.05] px-3.5 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] font-medium tracking-[0.08em] text-accent sm:text-[11px]">
                  Real builds, real proof
                </span>
              </div>

              <h2 className="font-display text-[clamp(28px,5.5vw,48px)] font-black leading-[0.98] tracking-[-0.04em] text-white">
                Want proof before
                <br />
                <span className="gradient-text">you book?</span>
              </h2>

              <p className="mx-auto mt-4 max-w-[520px] text-[13.5px] leading-[1.7] text-body sm:mt-5 sm:text-[15px] sm:leading-[1.75]">
                Ask to see live demos, screenshots, automations, and real
                project walkthroughs from recent Tweak &amp; Build projects.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:mt-9 sm:flex-row sm:gap-3">
                <Link
                  href="/contact#calendly"
                  className="btn-v w-full justify-center py-2.5 text-[13px] sm:w-auto sm:px-7 sm:py-3.5 sm:text-[14px]"
                  onClick={() =>
                    trackEvent("book_call_click", { source: "work_proof_cta" })
                  }
                >
                  Book a 15-min Build Call <ArrowRight size={14} />
                </Link>
                <Link
                  href="#proof-vault"
                  className="btn-o w-full justify-center py-2.5 text-[13px] sm:w-auto sm:px-7 sm:py-3.5 sm:text-[14px]"
                >
                  <FolderOpen size={14} className="opacity-80" />
                  View Proof Vault
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
