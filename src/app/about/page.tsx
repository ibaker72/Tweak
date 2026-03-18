"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Gauge, Users, Code2 } from "lucide-react";
import { Reveal } from "@/components/shared";

const values = [
  {
    icon: Target,
    title: "Outcome obsessed",
    desc: "Every feature ties back to a business metric. More leads, higher revenue, lower churn. If it doesn’t move the needle, we don’t build it.",
  },
  {
    icon: Gauge,
    title: "Speed without shortcuts",
    desc: "Clean architecture, TypeScript, tested code, production-grade infrastructure from day one.",
  },
  {
    icon: Users,
    title: "Senior talent only",
    desc: "No junior devs learning on your project. No account managers playing telephone. You work directly with the engineers.",
  },
  {
    icon: Code2,
    title: "Radical transparency",
    desc: "Weekly updates, live preview links, and honest conversations. We tell you when something isn’t working.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <span className="section-label">About</span>
            <h1 className="mt-5 font-display text-[clamp(32px,5vw,52px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              A studio built for
              <br />
              founders who ship
            </h1>
          </Reveal>

          <div className="divider mt-10" />

          <Reveal delay={0.1}>
            <div className="mt-10 space-y-5 text-[15px] leading-[1.8] text-body">
              <p>
                <strong className="text-white">Tweak & Build</strong> is a product
                engineering studio founded by{" "}
                <strong className="text-white">Iyad Baker</strong> under{" "}
                <strong className="text-white">Bedrock Alliance LLC</strong>. We
                design and build web applications, landing pages, SaaS
                platforms, and automation systems for businesses that need
                measurable results.
              </p>
              <p>
                We exist because too many agencies are broken. They staff
                projects with junior developers, hide behind account managers,
                bill by the hour to incentivize slowness, and deliver template
                work at custom prices. We built Tweak & Build to be the
                opposite.
              </p>
              <p>
                Our model: senior engineers working directly with clients on
                fixed-price engagements with weekly transparency. Every project
                gets a dedicated lead, a clear scope, and a guarantee that if we
                don&apos;t deliver, you don&apos;t pay.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="mb-8 mt-20 font-display text-[20px] font-bold tracking-[-0.02em] text-white">
              How we operate
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={0.15 + i * 0.05}>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-accent/[0.12] bg-accent/[0.06]">
                    <v.icon size={16} className="text-accent/70" />
                  </div>
                  <div>
                    <h3 className="font-display text-[15px] font-bold text-white">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.75] text-body">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="card mt-20 rounded-2xl p-5 sm:p-7 md:p-8">
              <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-5 md:grid-cols-[140px_minmax(0,1fr)] md:gap-7">
                <div className="self-start">
                  <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
                    <Image
                      src="/iyad-baker.webp"
                      alt="Iyad Baker, Founder and Lead Product Engineer at Tweak & Build"
                      width={220}
                      height={340}
                      priority
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0 self-center">
                  <h3 className="font-display text-[30px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[34px] md:text-[20px] md:leading-tight">
                    Iyad Baker
                  </h3>

                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim sm:text-[11px] md:text-[11px]">
                    Founder & Lead Product Engineer
                  </p>

                  <p className="mt-4 text-[15px] leading-[1.9] text-body sm:text-[15px] md:mt-5 md:text-[15px] md:leading-[1.8]">
                    I build high-performance websites, internal tools, and
                    growth systems for businesses that need more than just
                    design. My work combines product thinking, engineering, and
                    conversion-focused execution — from marketing sites to
                    custom SaaS platforms.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div
              className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 text-center sm:p-10"
              style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}
            >
              <h3 className="font-display text-[20px] font-bold tracking-[-0.02em] text-white">
                Ready to work with us?
              </h3>
              <p className="mt-2 text-[14px] text-body">
                Let&apos;s talk about your project.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/contact" className="btn-v justify-center">
                  Get in touch <ArrowRight size={14} />
                </Link>
                <Link href="/work" className="btn-o justify-center">
                  See our work
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}