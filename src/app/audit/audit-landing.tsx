"use client";
import { Reveal } from "@/components/shared";
import { AuditURLInput } from "@/components/audit/url-input";
import { BarChart3, Target, Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: BarChart3,
    title: "Score Breakdown",
    description: "6 key scores from Performance to Trust, each explained in plain English.",
  },
  {
    icon: Target,
    title: "Strengths & Weaknesses",
    description: "See exactly what's working and what's costing you leads.",
  },
  {
    icon: Lightbulb,
    title: "Quick Wins & Roadmap",
    description: "Prioritized fixes ranked by effort vs. impact.",
  },
];

const audiences = ["Local businesses", "Service providers", "Agencies & freelancers"];

export function AuditLanding() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(200,255,0,0.04),transparent)]" />
        <div className="wrap page-header pb-16 text-center sm:pb-20">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/[0.05] px-4 py-1.5">
              <span className="text-accent text-[13px]">✦</span>
              <span className="font-mono text-[11px] text-accent/80">
                Free · No signup required · 30 seconds
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-[clamp(36px,8vw,72px)] font-black leading-[0.95] tracking-[-0.045em] text-white">
              Instant Website
              <br />
              <span className="gradient-text">Audit</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[540px] text-[16px] leading-[1.7] text-body sm:text-[17px]">
              Get a fast, plain-English breakdown of your site&apos;s performance, SEO, trust signals, and conversion readiness.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <AuditURLInput />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="relative py-20 sm:py-28">
        <div className="wrap">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="section-label">What you&apos;ll get</span>
              <h2 className="mt-5 section-title">
                A complete picture in <span className="gradient-text">30 seconds</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="card p-7 text-center h-full">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                    <f.icon size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display text-[16px] font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-body">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="relative py-16 sm:py-24">
        <div className="wrap text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,4vw,36px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              Built for business owners, not developers.
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {audiences.map((a) => (
                <span key={a} className="tag !text-[12px] !px-4 !py-1.5">{a}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust / Authority */}
      <section className="relative pb-24 sm:pb-32">
        <div className="wrap text-center">
          <Reveal>
            <div className="mx-auto max-w-lg">
              <p className="text-[15px] leading-[1.7] text-body">
                Built by <span className="font-semibold text-white">TweakAndBuild</span> — we turn underperforming websites into lead machines.
              </p>
              <Link
                href="/"
                className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-accent/70 hover:text-accent transition-colors"
              >
                Learn what we do <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
