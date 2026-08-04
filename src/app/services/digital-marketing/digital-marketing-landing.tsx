"use client";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Search,
  Share2,
  Linkedin,
  Target,
  LineChart,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/shared";
import { FinalCTA } from "@/components/final-cta";

const channels = [
  {
    icon: Search,
    name: "Google Ads",
    detail: "Search · Performance Max · Display",
    desc: "Capture high-intent demand the moment people search. Tight keyword strategy, conversion-focused ad copy, and Performance Max campaigns tuned around real booked-call data.",
  },
  {
    icon: Share2,
    name: "Meta Ads",
    detail: "Facebook · Instagram",
    desc: "Audience-driven creative for local services and DTC. We test offers and hooks weekly so creative fatigue never quietly drains your budget.",
  },
  {
    icon: Linkedin,
    name: "LinkedIn Ads",
    detail: "B2B targeting · Lead gen forms",
    desc: "For B2B teams selling into specific titles, industries, or company sizes. Sponsored content and lead-gen forms wired into your CRM from day one.",
  },
];

const included = [
  "Conversion tracking and GA4 / GTM setup",
  "Pixel and server-side event configuration",
  "Landing page strategy and CRO recommendations",
  "Ad creative direction and weekly creative iteration",
  "Audience research and keyword strategy",
  "Weekly performance reporting in plain English",
  "Monthly strategy review and roadmap",
  "Direct Slack or email with a senior strategist",
];

const philosophy = [
  {
    icon: Target,
    title: "Booked calls, not clicks",
    desc: "We optimize against the metric that actually pays your bills. Clicks and impressions are diagnostics — not the goal.",
  },
  {
    icon: LineChart,
    title: "Tracking before spend",
    desc: "We refuse to scale ad spend on broken tracking. GA4, server-side events, and CRM tie-back come first.",
  },
  {
    icon: Sparkles,
    title: "Creative on a cadence",
    desc: "Fresh hooks, offers, and angles tested every week. Winning ads scale; losing ads die fast.",
  },
];

export function DigitalMarketingLanding() {
  return (
    <main className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,255,0,0.04),transparent)]" />
        <div className="wrap relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="section-label">Digital Marketing & Advertising</span>
              <h1 className="mt-5 font-display text-[clamp(34px,6vw,64px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
                More qualified leads.
                <br />
                <span className="text-body">Less wasted spend.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-body sm:text-[16px]">
                Paid campaigns across Google, Meta, and LinkedIn — engineered to book real
                meetings. Tracking, landing pages, and creative iteration all included.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact?tier=Digital%20Marketing%20and%20Advertising"
                  className="btn-v !px-6 !py-3 !text-[14px]"
                >
                  Book a strategy call <ArrowRight size={14} />
                </Link>
                <Link
                  href="/audit"
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-3 text-[13px] font-medium text-white/70 transition-all hover:border-white/[0.16] hover:text-white"
                >
                  Get a free site audit first
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="relative py-12 sm:py-20">
        <div className="wrap">
          <Reveal>
            <div className="max-w-2xl">
              <span className="section-label">Channels we run</span>
              <h2 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                Three channels. <span className="text-body">One unified funnel.</span>
              </h2>
              <p className="mt-4 text-[14px] leading-[1.7] text-body sm:text-[15px]">
                We don&apos;t bolt on channels for the sake of it. Each one earns its place based on
                where your buyers actually decide.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {channels.map((channel, i) => {
              const ChannelIcon = channel.icon;
              return (
                <Reveal key={channel.name} delay={i * 0.08}>
                  <div
                    className="group flex h-full flex-col rounded-2xl border border-white/[0.06] p-6 transition-all duration-300 hover:border-white/[0.12]"
                    style={{
                      background: "rgba(255,255,255,0.012)",
                      boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                    }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.05]">
                      <ChannelIcon size={16} className="text-accent" />
                    </div>
                    <h3 className="mt-4 font-display text-[19px] font-bold tracking-[-0.01em] text-white">
                      {channel.name}
                    </h3>
                    <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-accent/[0.10] bg-accent/[0.03] px-3 py-1">
                      <div className="h-1 w-1 rounded-full bg-accent/70" />
                      <span className="font-mono text-[10px] font-medium text-accent/80">
                        {channel.detail}
                      </span>
                    </div>
                    <p className="mt-4 text-[13.5px] leading-[1.75] text-body">{channel.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-12 sm:py-20">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[400px,1fr] lg:gap-16">
            <Reveal>
              <div>
                <span className="section-label">How we run ads</span>
                <h2 className="mt-4 font-display text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
                  Built on what
                  <br />
                  <span className="text-body">actually moves revenue.</span>
                </h2>
              </div>
            </Reveal>
            <div className="space-y-4">
              {philosophy.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div
                      className="flex gap-5 rounded-2xl border border-white/[0.06] p-6"
                      style={{
                        background: "rgba(255,255,255,0.012)",
                        boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset",
                      }}
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-surface-0">
                        <ItemIcon size={16} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[13.5px] leading-[1.75] text-body">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="relative py-12 sm:py-20">
        <div className="wrap">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="section-label">What&apos;s included</span>
              <h2 className="mt-4 font-display text-[clamp(26px,3.5vw,38px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                Everything in one retainer.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[14px] leading-[1.7] text-body">
                No surprise add-ons. No separate invoices for tracking, creative, or strategy.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.012] px-4 py-3"
                >
                  <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={3} />
                  <span className="text-[13.5px] leading-[1.6] text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Pricing recap */}
      <section className="relative py-12 sm:py-16">
        <div className="wrap">
          <Reveal>
            <div
              className="mx-auto max-w-3xl rounded-2xl border border-accent/[0.18] p-8 text-center sm:p-10"
              style={{
                background: "rgba(200,255,0,0.02)",
                boxShadow:
                  "0 1px 0 rgba(200,255,0,0.04) inset, 0 4px 32px -8px rgba(0,0,0,0.3)",
              }}
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.06]">
                <Megaphone size={16} className="text-accent" />
              </div>
              <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/80">
                Monthly engagement
              </p>
              <h3 className="mt-2 font-display text-[clamp(26px,3.6vw,36px)] font-extrabold tracking-tight text-white">
                Built around your market and growth target
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[13px] leading-[1.7] text-white/60 sm:text-[14px]">
                Management and strategy are scoped to your goals. Ad spend stays separate,
                billed direct from each ad platform. Month-to-month after the first 90 days.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact?tier=Digital%20Marketing%20and%20Advertising"
                  className="btn-v !px-6 !py-3 !text-[14px]"
                >
                  Run Ads with Us <ArrowRight size={14} />
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/70 transition-colors hover:text-white"
                >
                  See all solutions <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
