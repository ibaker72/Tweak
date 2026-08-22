"use client";

import { useState, useMemo } from "react";
import {
  ArrowRight,
  Zap,
  Layers,
  RefreshCcw,
  Palette,
  Megaphone,
  Lightbulb,
  Users,
  FileText,
  UserCheck,
  Link2,
  File,
  Mail,
  LayoutDashboard,
  MessageCircle,
  Unlock,
  ChevronDown,
  Send,
  Loader2,
  Check,
  DollarSign,
  Calculator,
  Handshake,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared";
import { ESTIMATED_REFERRAL_OPTIONS, HONEYPOT_FIELD } from "@/lib/partners/types";

/* ─── Partner Personas ─── */
const personas = [
  { icon: Palette, title: "Brand Designers", desc: "You design the brand - we build the site. Earn on every client you refer for development." },
  { icon: Megaphone, title: "Marketing Consultants", desc: "Your clients need a web presence that converts. Send them our way and earn on the build." },
  { icon: Lightbulb, title: "Startup Advisors & Coaches", desc: "Founders in your network need MVPs and websites. Make the intro, earn the commission." },
  { icon: Users, title: "Community Operators", desc: "You run events, groups, or co-working spaces. Turn your network into recurring income." },
  { icon: FileText, title: "Copywriters & Content Creators", desc: "You write the copy — we build the site it lives on. A natural partnership." },
  { icon: UserCheck, title: "Past Clients", desc: "You\u2019ve seen the quality firsthand. Refer a friend, earn a commission." },
  { icon: Handshake, title: "Freelance Closers & Sales Agents", desc: "You know how to qualify and close. Earn 30% on deals you help bring across the line." },
  { icon: TrendingUp, title: "Operators with Founder Networks", desc: "You\u2019re already in the room with decision-makers. Monetize the introductions you\u2019re already making." },
];

/* ─── How it works ─── */
const steps = [
  {
    num: "01",
    title: "Apply & get approved",
    desc: "Submit a quick application. We review within 48 hours and send you your unique referral link, a partner kit, and intro templates.",
  },
  {
    num: "02",
    title: "Make the introduction",
    desc: "When you meet someone who needs a website, web app, or product built \u2014 send them to tweakandbuild.com using your unique link. Or introduce us directly via email.",
  },
  {
    num: "03",
    title: "We close & deliver",
    desc: "We handle the strategy call, proposal, and the entire build. You don\u2019t need to sell, scope, or manage anything. We keep you updated on status.",
  },
  {
    num: "04",
    title: "You get paid",
    desc: "When the client pays, your commission is paid within Net 30. Track everything in your partner dashboard.",
  },
];

/* ─── Partner Toolkit ─── */
const toolkit = [
  { icon: Link2, title: "Unique referral link", desc: "Personalized URL with 90-day attribution tracking" },
  { icon: File, title: "Partner one-pager", desc: "PDF you can share with prospects \u2014 our services, pricing, and results" },
  { icon: Mail, title: "Intro email templates", desc: "Pre-written emails to make warm introductions" },
  { icon: LayoutDashboard, title: "Partner dashboard", desc: "Track your referrals, conversions, and earnings" },
  { icon: MessageCircle, title: "Direct line to Iyad", desc: "Priority communication for partner questions" },
  { icon: Unlock, title: "No exclusivity", desc: "Work with anyone \u2014 no non-compete, no restrictions" },
];

/* ─── FAQ ─── */
const partnerFaqs = [
  {
    q: "How much can I realistically earn?",
    a: "Our average project is $8,000\u2013$15,000. At 20% commission, one referral per month puts $1,600\u2013$3,000 in your pocket. Sales Partners earning 30% can clear $2,400\u2013$4,500 per referral. Active partners typically earn $5,000\u2013$15,000 per quarter.",
  },
  {
    q: "What\u2019s the difference between Referral and Sales Partner?",
    a: "Referral Partners (20%) make the warm introduction \u2014 we handle everything from there. Sales Partners (30%) actively help qualify the lead and guide them through pricing and commitment. The 30% tier is unlocked after closing 2 qualified deals or generating $15,000+ in referred revenue.",
  },
  {
    q: "Do I need to sell or close deals?",
    a: "Not as a Referral Partner. You make the introduction \u2014 we handle the strategy call, proposal, pricing, and the entire project. Sales Partners who want higher commissions can be more involved in the close.",
  },
  {
    q: "When do I get paid?",
    a: "Net 30 after we receive cleared payment from the client. For milestone-based projects, you earn as each milestone is paid. For retainers, you earn monthly for up to 6 months.",
  },
  {
    q: "How do I track my referrals?",
    a: "Every partner gets a unique referral link with a 90-day attribution window. If they click your link today and submit an inquiry 60 days later, you still get credit. You can also introduce clients directly via email \u2014 we\u2019ll manually attribute the referral.",
  },
  {
    q: "Is there a minimum number of referrals required?",
    a: "No minimums, no quotas. Refer one client a year or ten a month \u2014 you earn on every one.",
  },
  {
    q: "How do I unlock the 30% Sales Partner tier?",
    a: "Close 2 qualified deals or generate $15,000+ in referred revenue. Once unlocked, the 30% rate applies to all future referrals. Final tier approval is at Tweak & Build\u2019s discretion.",
  },
  {
    q: "Can I refer myself?",
    a: "The partner program is for referring others. If you need development work yourself, reach out through our contact page and we\u2019ll scope it directly.",
  },
];

/* ─── Referral Estimate Options ─── */
/**
 * Referral buckets come from the shared constant so the form, the server
 * schema, and the database CHECK constraint can never drift apart.
 */
const referralOptions = ESTIMATED_REFERRAL_OPTIONS;

const EMPTY_APPLICATION = {
  name: "",
  email: "",
  company: "",
  website: "",
  description: "",
  howYouMeet: "",
  estimatedReferrals: "",
  /** Honeypot — must stay empty. See HONEYPOT_FIELD. */
  [HONEYPOT_FIELD]: "",
};

/* ─── Service configs for calculator ─── */
type ServiceKey = "rapid" | "custom" | "retainer";
const serviceConfigs: Record<ServiceKey, { label: string; min: number; max: number; step: number; isRetainer: boolean }> = {
  rapid: { label: "Rapid Build", min: 2500, max: 8000, step: 500, isRetainer: false },
  custom: { label: "Custom Engineering", min: 5000, max: 50000, step: 1000, isRetainer: false },
  retainer: { label: "Growth Retainer", min: 1000, max: 10000, step: 500, isRetainer: true },
};

/* ─── Commission Calculator Component ─── */
function CommissionCalculator() {
  const [service, setService] = useState<ServiceKey>("custom");
  const config = serviceConfigs[service];
  const defaultValue = Math.round((config.min + config.max) / 2 / config.step) * config.step;
  const [values, setValues] = useState<Record<ServiceKey, number>>({
    rapid: 5000,
    custom: 27000,
    retainer: 5500,
  });

  const value = values[service];
  const setValue = (v: number) => setValues((prev) => ({ ...prev, [service]: v }));

  const calc = (rate: number) => {
    const commission = value * rate;
    if (config.isRetainer) {
      return { monthly: commission, total: commission * 6 };
    }
    return { total: commission };
  };

  const referral = calc(0.2);
  const sales = calc(0.3);

  const fmt = (n: number) =>
    n >= 1000
      ? "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : "$" + n;

  return (
    <section className="py-24 sm:py-32">
      <Reveal>
        <div className="mx-auto mb-14 max-w-[560px] text-center">
          <span className="section-label">
            <Calculator size={10} className="text-accent" />
            Commission Calculator
          </span>
          <h2 className="section-title mt-4">See what a deal is worth</h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-body">
            Choose a service, adjust the deal size, and instantly see your earnings at both partner tiers.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto max-w-[680px]">
          {/* Service selector pills */}
          <div className="mb-8 flex justify-center gap-2">
            {(Object.entries(serviceConfigs) as [ServiceKey, typeof config][]).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => setService(key)}
                className={cn(
                  "rounded-full border px-5 py-2 font-mono text-[11px] font-medium transition-all duration-200",
                  service === key
                    ? "border-accent/30 bg-accent/[0.08] text-accent"
                    : "border-white/[0.06] bg-white/[0.02] text-dim hover:border-white/[0.12] hover:text-white/60",
                )}
              >
                {cfg.label}
              </button>
            ))}
          </div>

          {/* Value controls */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-dim">
                {config.isRetainer ? "Monthly value" : "Project value"}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-display text-[24px] font-black tracking-[-0.02em] text-white">
                  {fmt(value)}
                </span>
                {config.isRetainer && (
                  <span className="text-[13px] text-dim">/mo</span>
                )}
              </div>
            </div>
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="calc-slider w-full"
            />
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-dim">
              <span>{fmt(config.min)}</span>
              <span>{fmt(config.max)}{config.isRetainer ? "/mo" : ""}</span>
            </div>
          </div>

          {/* Result cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Referral Partner card */}
            <div
              className="rounded-[18px] border-[1.5px] border-white/10 p-6 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.012)" }}
            >
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Referral Partner</div>
              <div className="mb-3 font-mono text-[11px] text-body">20% commission</div>
              <div className="font-display text-[32px] font-black tracking-[-0.03em] text-white">
                {fmt(referral.total)}
              </div>
              {config.isRetainer && referral.monthly !== undefined && (
                <p className="mt-1 font-mono text-[11px] text-body">
                  {fmt(referral.monthly)}/mo &times; 6 months
                </p>
              )}
              {!config.isRetainer && (
                <p className="mt-1 font-mono text-[11px] text-dim">per project</p>
              )}
            </div>

            {/* Sales Partner card (featured) */}
            <div
              className="rounded-[18px] border-[1.5px] border-accent/40 p-6 transition-all duration-200"
              style={{
                background: "rgba(200,255,0,0.015)",
                boxShadow: "0 0 40px rgba(200,255,0,0.04), inset 0 0 0 1px rgba(200,255,0,0.02)",
              }}
            >
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.06em] text-accent/70">Sales Partner</div>
              <div className="mb-3 font-mono text-[11px] text-accent/60">30% commission</div>
              <div className="font-display text-[32px] font-black tracking-[-0.03em] text-accent">
                {fmt(sales.total)}
              </div>
              {config.isRetainer && sales.monthly !== undefined && (
                <p className="mt-1 font-mono text-[11px] text-accent/60">
                  {fmt(sales.monthly)}/mo &times; 6 months
                </p>
              )}
              {!config.isRetainer && (
                <p className="mt-1 font-mono text-[11px] text-accent/50">per project</p>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════ */
export default function PartnersPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_APPLICATION);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<string | null>(null);

  const s = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setForm((p) => ({ ...p, [k]: value }));
    // Clear the inline error as soon as the offending field is edited.
    if (errorField === k) {
      setErrorField(null);
      setErrorMessage(null);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return; // guard against double submits
    setStatus("loading");
    setErrorMessage(null);
    setErrorField(null);

    try {
      const res = await fetch("/api/partner-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        field?: string;
      };

      if (res.ok && data.success) {
        // Only clear the form once the application is genuinely persisted.
        setForm(EMPTY_APPLICATION);
        setStatus("success");
        return;
      }

      setErrorMessage(data.error || "Something went wrong. Please try again.");
      setErrorField(data.field ?? null);
      setStatus("error");
    } catch {
      setErrorMessage(
        "We couldn't reach the server. Please check your connection and try again.",
      );
      setStatus("error");
    }
  };

  const fieldError = (k: string) =>
    errorField === k && errorMessage ? (
      <p className="mt-1.5 text-[12px] text-red-400">{errorMessage}</p>
    ) : null;

  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        {/* ══════════════════════════════════════════════════
            SECTION 1 — Hero
        ══════════════════════════════════════════════════ */}
        <Reveal>
          <div className="mx-auto max-w-[720px] text-center">
            <span className="section-label">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Partner Network
            </span>
            <h1 className="mt-5 font-display text-[clamp(32px,5vw,56px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              Earn up to 30% when you bring the right clients.
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.75] text-body">
              A premium partner program for people who already have trust with founders, operators, and service businesses. Make the introduction or help close the deal &mdash; either way, you get paid.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#apply" className="btn-v w-full justify-center sm:w-auto">
                Apply to partner <ArrowRight size={13} />
              </a>
              <a href="#commission" className="btn-o sm:w-auto">
                See commission structure
              </a>
            </div>
          </div>
        </Reveal>

        {/* Trust bullets */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 flex max-w-[700px] flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {[
              "Fixed pricing clients can understand",
              "We handle proposals, delivery, and execution",
              "Net 30 payouts with clear attribution",
            ].map((bullet) => (
              <div key={bullet} className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.08]">
                  <Check size={8} className="text-accent" />
                </div>
                <span className="font-mono text-[11px] text-body">{bullet}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="divider mt-16" />

        {/* ══════════════════════════════════════════════════
            SECTION 2 — Partner Tiers
        ══════════════════════════════════════════════════ */}
        <section id="tiers" className="scroll-mt-24 py-24 sm:py-32">
          <Reveal>
            <div className="mx-auto mb-14 max-w-[560px] text-center">
              <span className="section-label">Partner Tiers</span>
              <h2 className="section-title mt-4">Choose how involved you want to be</h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-body">
                Some partners make the introduction. Others help qualify and close. Both models are rewarded.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto grid max-w-[780px] items-stretch gap-5 md:grid-cols-2">
            {/* Referral Partner — 20% */}
            <Reveal delay={0.06}>
              <div
                className="group relative flex h-full flex-col overflow-visible rounded-[20px] border-[1.5px] border-white/10 px-7 pb-7 pt-8 transition-all duration-300 hover:border-white/[0.18] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                style={{ background: "rgba(255,255,255,0.012)" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                <span className="mb-4 inline-block w-fit rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-dim">
                  Referral Partner
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[clamp(48px,6vw,64px)] font-black leading-none tracking-[-0.04em] text-white">
                    20%
                  </span>
                </div>
                <p className="mt-2 font-display text-[15px] font-semibold text-white/70">
                  You introduce. We close.
                </p>
                <p className="mt-4 text-[13px] leading-[1.7] text-body">
                  Send us a warm lead through your partner link or direct email intro. We handle discovery, proposal, close, and delivery. You earn 20% on closed business.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "Best for connectors and network-driven partners",
                    "No sales call or proposal handling required",
                    "Earn on approved, attributed deals",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[12px] leading-[1.6] text-body">
                      <Check size={12} className="mt-0.5 flex-shrink-0 text-white/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Sales Partner — 30% (featured) */}
            <Reveal delay={0.12}>
              <div
                className="group relative flex h-full flex-col overflow-visible rounded-[20px] border-[1.5px] border-accent/40 px-7 pb-7 pt-8 transition-all duration-300 hover:border-accent/55 hover:shadow-[0_8px_40px_rgba(200,255,0,0.06)]"
                style={{
                  background: "rgba(200,255,0,0.015)",
                  boxShadow: "0 0 40px rgba(200,255,0,0.04), inset 0 0 0 1px rgba(200,255,0,0.02)",
                }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                {/* Featured badge */}
                <div className="absolute -top-[11px] left-1/2 z-10 -translate-x-1/2">
                  <span
                    className="whitespace-nowrap rounded-full border border-accent/25 bg-[#0a0a12] px-3.5 py-[3px] font-mono text-[9px] font-medium uppercase tracking-[0.06em] text-accent/80"
                    style={{ boxShadow: "inset 0 0.5px 0 rgba(200,255,0,0.1), 0 1px 4px rgba(0,0,0,0.3)" }}
                  >
                    Premium tier
                  </span>
                </div>
                <span className="mb-4 inline-block w-fit rounded-full border border-accent/15 bg-accent/[0.06] px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-accent/70">
                  Sales Partner
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[clamp(48px,6vw,64px)] font-black leading-none tracking-[-0.04em] text-accent">
                    30%
                  </span>
                </div>
                <p className="mt-2 font-display text-[15px] font-semibold text-accent/70">
                  You qualify and help close. We build.
                </p>
                <p className="mt-4 text-[13px] leading-[1.7] text-body">
                  For trusted partners who can guide the lead through pricing and commitment. Close 2 qualified deals or generate $15,000+ in referred revenue to unlock the 30% rate on future referrals.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "Best for consultants, closers, and strategic partners",
                    "Higher upside for active involvement",
                    "Premium tier unlocked through proven performance",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[12px] leading-[1.6] text-body">
                      <Check size={12} className="mt-0.5 flex-shrink-0 text-accent/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-[600px] text-center font-mono text-[11px] leading-[1.6] text-dim">
              Final tier approval is at Tweak &amp; Build&apos;s discretion to maintain partner quality.
            </p>
          </Reveal>
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════════════════
            SECTION 3 — Earnings by Service Type
        ══════════════════════════════════════════════════ */}
        <section id="commission" className="scroll-mt-24 py-24 sm:py-32">
          <Reveal>
            <div className="mx-auto mb-14 max-w-[560px] text-center">
              <span className="section-label">
                <DollarSign size={10} className="text-accent" />
                Earnings by Engagement
              </span>
              <h2 className="section-title mt-4">What a closed deal is worth to you</h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-body">
                Transparent commission ranges across our core offers.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto grid max-w-[1060px] items-stretch gap-5 md:grid-cols-3">
            {/* Rapid Build */}
            <Reveal delay={0.06}>
              <div
                className="group relative flex h-full flex-col overflow-visible rounded-[20px] border-[1.5px] border-white/10 px-7 pb-7 pt-7 transition-all duration-300 hover:border-white/[0.18] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                style={{ background: "rgba(255,255,255,0.012)" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                <Zap className="mb-4 h-8 w-8 text-neutral-500" strokeWidth={1.5} />
                <h3 className="font-display text-[20px] font-bold text-white">Rapid Build</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="font-display text-[clamp(24px,3vw,30px)] font-black leading-none tracking-[-0.03em] text-white">
                    $2,500 &ndash; $8,000
                  </span>
                </div>
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
                    <span className="font-mono text-[11px] text-body">20%</span>
                    <span className="font-mono text-[12px] font-semibold text-white">$500 &ndash; $1,600</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-accent/[0.12] bg-accent/[0.04] px-3.5 py-2.5">
                    <span className="font-mono text-[11px] text-accent/70">30%</span>
                    <span className="font-mono text-[12px] font-semibold text-accent">$750 &ndash; $2,400</span>
                  </div>
                </div>
                <p className="mt-auto pt-5 font-mono text-[10px] leading-[1.6] text-dim">1&ndash;3 week turnaround</p>
              </div>
            </Reveal>

            {/* Custom Engineering */}
            <Reveal delay={0.12}>
              <div
                className="group relative flex h-full flex-col overflow-visible rounded-[20px] border-[1.5px] border-accent/40 px-7 pb-7 pt-7 transition-all duration-300 hover:border-accent/55 hover:shadow-[0_8px_40px_rgba(200,255,0,0.06)]"
                style={{
                  background: "rgba(200,255,0,0.015)",
                  boxShadow: "0 0 40px rgba(200,255,0,0.04), inset 0 0 0 1px rgba(200,255,0,0.02)",
                }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                <Layers className="mb-4 h-8 w-8 text-accent/50" strokeWidth={1.5} />
                <h3 className="font-display text-[20px] font-bold text-white">Custom Engineering</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="font-display text-[clamp(24px,3vw,30px)] font-black leading-none tracking-[-0.03em] text-white">
                    $8,000 &ndash; $30,000+
                  </span>
                </div>
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
                    <span className="font-mono text-[11px] text-body">20%</span>
                    <span className="font-mono text-[12px] font-semibold text-white">$1,600 &ndash; $6,000+</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-accent/[0.12] bg-accent/[0.04] px-3.5 py-2.5">
                    <span className="font-mono text-[11px] text-accent/70">30%</span>
                    <span className="font-mono text-[12px] font-semibold text-accent">$2,400 &ndash; $9,000+</span>
                  </div>
                </div>
                <p className="mt-auto pt-5 font-mono text-[10px] leading-[1.6] text-dim">3&ndash;8 week delivery window</p>
              </div>
            </Reveal>

            {/* Growth Retainer */}
            <Reveal delay={0.18}>
              <div
                className="group relative flex h-full flex-col overflow-visible rounded-[20px] border-[1.5px] border-white/10 px-7 pb-7 pt-7 transition-all duration-300 hover:border-white/[0.18] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                style={{ background: "rgba(255,255,255,0.012)" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                <RefreshCcw className="mb-4 h-8 w-8 text-neutral-500" strokeWidth={1.5} />
                <h3 className="font-display text-[20px] font-bold text-white">Growth Retainer</h3>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-display text-[clamp(24px,3vw,30px)] font-black leading-none tracking-[-0.03em] text-white">
                    $2,000 &ndash; $5,000
                  </span>
                  <span className="text-[clamp(12px,1.5vw,15px)] font-medium text-white/30">/month</span>
                </div>
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
                    <span className="font-mono text-[11px] text-body">20%</span>
                    <span className="font-mono text-[12px] font-semibold text-white">$400 &ndash; $1,000/mo</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-accent/[0.12] bg-accent/[0.04] px-3.5 py-2.5">
                    <span className="font-mono text-[11px] text-accent/70">30%</span>
                    <span className="font-mono text-[12px] font-semibold text-accent">$600 &ndash; $1,500/mo</span>
                  </div>
                </div>
                <p className="mt-auto pt-5 font-mono text-[10px] leading-[1.6] text-dim">Commission capped at 6 months</p>
              </div>
            </Reveal>
          </div>

          {/* Payout policy strip */}
          <Reveal delay={0.25}>
            <div className="mx-auto mt-10 flex max-w-[860px] flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-white/[0.04] bg-white/[0.015] px-6 py-4 text-center font-mono text-[10px] leading-[1.6] text-dim">
              <span>Net 30 after cleared client payment</span>
              <span className="hidden text-white/10 sm:inline">&middot;</span>
              <span>90-day attribution window</span>
              <span className="hidden text-white/10 sm:inline">&middot;</span>
              <span>Retainer commissions capped at 6 months</span>
              <span className="hidden text-white/10 sm:inline">&middot;</span>
              <span>Paid via Stripe or PayPal</span>
            </div>
          </Reveal>
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════════════════
            SECTION 4 — Commission Calculator
        ══════════════════════════════════════════════════ */}
        <CommissionCalculator />

        <div className="divider" />

        {/* ══════════════════════════════════════════════════
            SECTION 5 — How It Works
        ══════════════════════════════════════════════════ */}
        <section id="how-it-works" className="scroll-mt-24 py-24 sm:py-32">
          <Reveal>
            <div className="mx-auto mb-14 max-w-[520px] text-center">
              <span className="section-label">Process</span>
              <h2 className="section-title mt-4">How it works</h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-body">
                Four steps. You make an introduction, we handle everything else.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto max-w-[720px] space-y-3">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div
                  className="relative overflow-hidden rounded-[18px] border border-white/[0.05] p-6"
                  style={{ background: "linear-gradient(170deg, rgba(200,255,0,0.02), rgba(14,14,24,0.9))" }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                  <div className="mb-3 flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.08]">
                      <span className="font-mono text-[13px] font-bold text-accent">{step.num}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-[13px] leading-[1.7] text-body">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════════════════
            SECTION 6 — Who This Is For
        ══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32">
          <Reveal>
            <div className="mx-auto mb-14 max-w-[560px] text-center">
              <span className="section-label">For You</span>
              <h2 className="section-title mt-4">Built for people who already talk to our clients</h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-body">
                You don&apos;t need to be a salesperson. You just need to know people who need things built.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto grid max-w-[800px] gap-4 sm:grid-cols-2">
            {personas.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div
                  className="flex items-start gap-4 rounded-[18px] border border-white/[0.05] p-5 transition-all duration-200 hover:border-white/[0.12]"
                  style={{ background: "rgba(255,255,255,0.012)" }}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-accent/15 bg-accent/[0.06]">
                    <p.icon size={18} className="text-accent/70" />
                  </div>
                  <div>
                    <h3 className="font-display text-[15px] font-bold text-white">{p.title}</h3>
                    <p className="mt-1 text-[13px] leading-[1.65] text-body">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════════════════
            SECTION 7 — What Partners Get
        ══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32">
          <Reveal>
            <div className="mx-auto mb-14 max-w-[520px] text-center">
              <span className="section-label">Toolkit</span>
              <h2 className="section-title mt-4">Your partner toolkit</h2>
            </div>
          </Reveal>

          <div className="mx-auto grid max-w-[800px] gap-4 sm:grid-cols-2">
            {toolkit.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <div className="flex items-start gap-4 rounded-[16px] border border-white/[0.05] p-5" style={{ background: "rgba(255,255,255,0.012)" }}>
                  <item.icon size={18} className="mt-0.5 flex-shrink-0 text-accent/60" />
                  <div>
                    <h4 className="text-[14px] font-semibold text-white">{item.title}</h4>
                    <p className="mt-0.5 text-[13px] text-body">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════════════════
            SECTION 8 — FAQ
        ══════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-[780px]">
            <Reveal>
              <div className="mb-14 text-center">
                <span className="section-label">FAQ</span>
                <h2 className="section-title mt-4">Common questions</h2>
              </div>
            </Reveal>
            <div className="space-y-2">
              {partnerFaqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.03}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-all duration-200",
                      faqOpen === i ? "border-accent/[0.15] bg-accent/[0.02]" : "border-white/[0.05] bg-white/[0.015]",
                    )}
                  >
                    <button
                      suppressHydrationWarning
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-[18px] text-left"
                    >
                      <span className={cn("text-[15px] font-semibold", faqOpen === i ? "text-white" : "text-gray-300")}>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={cn("flex-shrink-0 transition-transform duration-300", faqOpen === i ? "rotate-180 text-accent" : "text-dim")}
                      />
                    </button>
                    <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: faqOpen === i ? 300 : 0 }}>
                      <p className="px-6 pb-5 text-sm leading-[1.75] text-body">{faq.a}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════════════════
            SECTION 9 — Application Form
        ══════════════════════════════════════════════════ */}
        <section id="apply" className="scroll-mt-24 py-24 sm:py-32">
          <Reveal>
            <div className="mx-auto mb-10 max-w-[520px] text-center">
              <span className="section-label">Apply</span>
              <h2 className="section-title mt-4">Apply to the partner network</h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-body">
                Takes 2 minutes. We review every application within 48 hours.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto max-w-[560px]">
              <div className="card overflow-hidden rounded-2xl p-6 sm:p-8">
                {status === "success" ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] border border-accent/[0.15] bg-accent/[0.06]">
                      <Check size={18} className="text-accent" />
                    </div>
                    <p className="font-display text-[17px] font-bold text-white">Application received!</p>
                    <p className="mt-1.5 text-[13px] text-dim">
                      We&apos;ll review it and get back to you within 48 hours with your referral link and partner kit.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-3.5">
                    {/* Honeypot: hidden from people and screen readers, irresistible to naive bots. */}
                    <div aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                      <label htmlFor={HONEYPOT_FIELD}>Do not fill this in</label>
                      <input
                        id={HONEYPOT_FIELD}
                        name={HONEYPOT_FIELD}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form[HONEYPOT_FIELD]}
                        onChange={s(HONEYPOT_FIELD)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Full name *</label>
                        <input className="field" placeholder="Jane Smith" value={form.name} onChange={s("name")} required />
                        {fieldError("name")}
                      </div>
                      <div>
                        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Email *</label>
                        <input className="field" type="email" placeholder="jane@company.com" value={form.email} onChange={s("email")} required />
                        {fieldError("email")}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Company / brand</label>
                        <input className="field" placeholder="Acme Inc." value={form.company} onChange={s("company")} />
                        {fieldError("company")}
                      </div>
                      <div>
                        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Website or LinkedIn</label>
                        <input className="field" placeholder="linkedin.com/in/jane" value={form.website} onChange={s("website")} />
                        {fieldError("website")}
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">How would you describe what you do? *</label>
                      <textarea className="field" rows={2} placeholder="Brand designer, marketing consultant, startup advisor..." value={form.description} onChange={s("description")} required />
                      {fieldError("description")}
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">How do you typically meet potential clients for us? *</label>
                      <textarea className="field" rows={2} placeholder="Through my design clients, startup community events..." value={form.howYouMeet} onChange={s("howYouMeet")} required />
                      {fieldError("howYouMeet")}
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Estimated referrals per quarter *</label>
                      <select
                        className={cn("field", form.estimatedReferrals ? "text-white" : "text-white/[0.15]")}
                        value={form.estimatedReferrals}
                        onChange={s("estimatedReferrals")}
                        required
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {referralOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      {fieldError("estimatedReferrals")}
                    </div>
                    {/* Form-level error: shown when the failure isn't tied to one field
                        (server/database failure, network failure, rate limit). */}
                    {status === "error" && !errorField && (
                      <p role="alert" className="rounded-lg border border-red-400/20 bg-red-400/[0.06] px-3 py-2.5 text-[13px] text-red-400">
                        {errorMessage || "Something went wrong. Please try again."}
                      </p>
                    )}
                    <button type="submit" disabled={status === "loading"} className="btn-v w-full justify-center disabled:opacity-60">
                      {status === "loading" ? <Loader2 size={15} className="animate-spin" /> : <Send size={13} />}
                      {status === "loading" ? "Submitting..." : "Submit application"}
                    </button>
                  </form>
                )}
              </div>
              {status !== "success" && (
                <p className="mt-4 text-center font-mono text-[11px] text-dim">
                  We review every application personally. You&apos;ll hear back within 48 hours with your referral link and partner kit.
                </p>
              )}
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
