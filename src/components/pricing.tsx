"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus, Package, Code2, HelpCircle, MessageSquare, Upload, Send, Loader2, CreditCard, Wallet, Layers, Rocket, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./shared";
import { tiers, budgetOptions, timelineOptions } from "@/lib/data";

export function Pricing() {
  const [tab, setTab] = useState<"quick" | "custom">("quick");
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", timeline: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const s = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  const submit = async () => { setStatus("loading"); try { await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, type: tab }) }); } catch {} setStatus("success"); };
  const reset = () => { setStatus("idle"); setForm({ name: "", email: "", company: "", budget: "", timeline: "", message: "" }); };

  const handleCheckout = async (tierName: string) => {
    setCheckoutLoading(tierName);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: tierName }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setCheckoutLoading(null);
    }
  };

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="wrap">
        {/* ── Section heading — compact, connected ── */}
        <Reveal>
          <div className="mx-auto mb-8 max-w-[520px] text-center">
            <span className="section-label">Pricing</span>
            <h2 className="mt-4 font-display text-[clamp(26px,3.5vw,42px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              Two ways to get started
            </h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-body">
              Choose the path that fits your project. Same quality, same team, different starting points.
            </p>
          </div>
        </Reveal>

        {/* ── Tab selector — elevated to match card system ── */}
        <Reveal delay={0.08}>
          <div className="mx-auto mb-10 flex max-w-[700px] flex-col justify-center gap-3 sm:flex-row">
            {([
              { id: "quick" as const, icon: Package, label: "Quick Build", sub: "You have a design or spec. Flat rate, guaranteed turnaround." },
              { id: "custom" as const, icon: Code2, label: "Custom Project", sub: "You need strategy + build. Discovery, proposal, milestones." },
            ]).map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); setStatus("idle"); }}
                className={cn(
                  "group/tab relative flex flex-1 items-start gap-3.5 overflow-hidden rounded-[16px] border-[1.5px] p-5 text-left transition-all duration-300",
                  tab === t.id
                    ? "border-accent/50 shadow-[0_0_30px_rgba(200,255,0,0.04),0_0_0_1px_rgba(200,255,0,0.02)_inset]"
                    : "border-white/[0.07] hover:border-white/[0.12]"
                )}
                style={{ background: tab === t.id ? "rgba(200,255,0,0.02)" : "rgba(255,255,255,0.012)" }}
              >
                {/* Top edge glow for active tab */}
                {tab === t.id && (
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                )}
                <div className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border transition-all",
                  tab === t.id
                    ? "border-accent/20 bg-accent shadow-[0_2px_8px_rgba(200,255,0,0.15)]"
                    : "border-white/[0.08] bg-white/[0.03]"
                )}>
                  <t.icon size={17} className={tab === t.id ? "text-surface-0" : "text-white/30"} />
                </div>
                <div>
                  <div className={cn("text-[15px] font-bold transition-colors", tab === t.id ? "text-white" : "text-gray-400")}>{t.label}</div>
                  <div className={cn("mt-1 text-[12px] leading-[1.6] transition-colors", tab === t.id ? "text-body" : "text-dim")}>{t.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Quick Build ── */}
        {tab === "quick" && (
          <Reveal delay={0.1}>
            <div className="mx-auto max-w-[1000px]">
              <div className="mb-8 grid gap-5 md:grid-cols-3">
                {tiers.map(q => {
                  /* Per-tier identity — unified system with distinct accents */
                  const tierMeta = {
                    "Single Page": {
                      icon: FileText,
                      iconColor: "text-accent/60",
                      iconBorder: "border-accent/[0.12]",
                      iconBg: "bg-accent/[0.04]",
                      sublabel: "Perfect for launches",
                      sublabelColor: "text-white/30",
                      headerGradient: "from-white/[0.025] to-transparent",
                      badgeLabel: null,
                      borderClass: "border-white/[0.08] hover:border-white/[0.15]",
                      topGlowClass: "via-white/[0.06]",
                      dividerClass: "bg-gradient-to-r from-transparent via-white/[0.06] to-transparent",
                      paymentBorder: "border-white/[0.06] bg-white/[0.02]",
                      paymentIcon: "text-white/25",
                      checkBg: "bg-accent/[0.06]",
                      checkColor: "text-accent/70",
                      timelineIcon: "text-white/20",
                      timelineText: "text-white/30",
                      ctaWrap: "border-white/[0.05] bg-white/[0.01]",
                      ctaBtn: "border border-white/[0.14] bg-white/[0.04] text-white hover:-translate-y-0.5 hover:border-white/[0.24] hover:bg-white/[0.07]",
                    },
                    "Multi Page": {
                      icon: Layers,
                      iconColor: "text-accent",
                      iconBorder: "border-accent/20",
                      iconBg: "bg-accent/[0.08]",
                      sublabel: "Best for growing brands",
                      sublabelColor: "text-accent/45",
                      headerGradient: "from-accent/[0.035] to-transparent",
                      badgeLabel: "Most Popular",
                      borderClass: "border-accent/50 shadow-[0_0_50px_rgba(200,255,0,0.05),0_0_0_1px_rgba(200,255,0,0.03)_inset]",
                      topGlowClass: "via-accent/50",
                      dividerClass: "bg-gradient-to-r from-transparent via-accent/20 to-transparent",
                      paymentBorder: "border-accent/[0.10] bg-accent/[0.03]",
                      paymentIcon: "text-accent/50",
                      checkBg: "bg-accent/[0.08]",
                      checkColor: "text-accent",
                      timelineIcon: "text-accent/50",
                      timelineText: "text-accent/65",
                      ctaWrap: "border-accent/[0.08] bg-accent/[0.02]",
                      ctaBtn: "bg-accent text-surface-0 shadow-[0_1px_2px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(200,255,0,0.2)]",
                    },
                    "Full Site": {
                      icon: Rocket,
                      iconColor: "text-accent/80",
                      iconBorder: "border-accent/[0.15]",
                      iconBg: "bg-accent/[0.06]",
                      sublabel: "Flagship build",
                      sublabelColor: "text-white/30",
                      headerGradient: "from-white/[0.03] to-transparent",
                      badgeLabel: "Premium",
                      borderClass: "border-white/[0.12] hover:border-white/[0.20] shadow-[0_0_40px_rgba(255,255,255,0.02)]",
                      topGlowClass: "via-white/[0.10]",
                      dividerClass: "bg-gradient-to-r from-transparent via-white/[0.08] to-transparent",
                      paymentBorder: "border-white/[0.06] bg-white/[0.02]",
                      paymentIcon: "text-white/30",
                      checkBg: "bg-accent/[0.06]",
                      checkColor: "text-accent/70",
                      timelineIcon: "text-white/25",
                      timelineText: "text-white/35",
                      ctaWrap: "border-white/[0.06] bg-white/[0.015]",
                      ctaBtn: "border border-accent/30 bg-accent/[0.06] text-accent hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/[0.12]",
                    },
                  }[q.name]!;

                  const TierIcon = tierMeta.icon;

                  return (
                    <div key={q.name} className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-[20px] border-[1.5px] transition-all duration-300",
                      tierMeta.borderClass
                    )}
                    style={{ background: "rgba(255,255,255,0.012)" }}
                    >
                      {/* Top edge glow */}
                      <div className={cn(
                        "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent",
                        tierMeta.topGlowClass
                      )} />

                      {/* Badge */}
                      {tierMeta.badgeLabel && (
                        <div className={cn(
                          "absolute -top-px left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em]",
                          q.popular
                            ? "bg-accent text-surface-0 shadow-[0_2px_16px_rgba(200,255,0,0.25)]"
                            : "border border-white/[0.15] bg-[#0c0c14] text-white/60 shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                        )}>
                          {tierMeta.badgeLabel}
                        </div>
                      )}

                      {/* Header zone */}
                      <div className={cn(
                        "relative px-7 pb-5 pt-8",
                        tierMeta.badgeLabel && "pt-10"
                      )}>
                        <div className={cn(
                          "pointer-events-none absolute inset-0 bg-gradient-to-b",
                          tierMeta.headerGradient
                        )} />

                        <div className="relative">
                          {/* Icon + title */}
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border",
                              tierMeta.iconBorder,
                              tierMeta.iconBg
                            )}>
                              <TierIcon size={16} className={tierMeta.iconColor} />
                            </div>
                            <div>
                              <h3 className="font-display text-[18px] font-bold text-white">{q.name}</h3>
                              <p className={cn("mt-0.5 font-mono text-[10px] tracking-wide", tierMeta.sublabelColor)}>
                                {tierMeta.sublabel}
                              </p>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="mt-5 flex items-baseline gap-2">
                            <span className="font-display text-[44px] font-black leading-none tracking-tight text-white">{q.price}</span>
                            <span className="text-[12px] font-medium text-white/20">flat rate</span>
                          </div>

                          {/* Timeline */}
                          <div className="mt-2 flex items-center gap-1.5">
                            <Clock size={11} className={tierMeta.timelineIcon} />
                            <span className={cn("font-mono text-[11px]", tierMeta.timelineText)}>{q.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="mx-7">
                        <div className={cn("h-px", tierMeta.dividerClass)} />
                      </div>

                      {/* Body zone */}
                      <div className="flex flex-1 flex-col px-7 pb-7 pt-5">
                        {/* Payment info */}
                        <div className={cn(
                          "mb-5 flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5",
                          tierMeta.paymentBorder
                        )}>
                          <Wallet size={12} className={cn("flex-shrink-0", tierMeta.paymentIcon)} />
                          <span className="font-mono text-[10px] leading-tight text-gray-400">{q.payment}</span>
                        </div>

                        {/* Features */}
                        <div className="flex-1 space-y-0.5">
                          <div className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/20">Included</div>
                          {q.features.map(f => (
                            <div key={f} className="flex items-start gap-2.5 py-[5px]">
                              <div className={cn(
                                "mt-[2px] flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px]",
                                tierMeta.checkBg
                              )}>
                                <Check size={10} className={tierMeta.checkColor} />
                              </div>
                              <span className="text-[13px] leading-[1.5] text-gray-300">{f}</span>
                            </div>
                          ))}

                          {q.excluded.length > 0 && (
                            <div className="mt-3 border-t border-white/[0.04] pt-3">
                              {q.excluded.map(f => (
                                <div key={f} className="flex items-start gap-2.5 py-[3px]">
                                  <div className="mt-[2px] flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] bg-white/[0.02]">
                                    <Minus size={9} className="text-white/[0.10]" />
                                  </div>
                                  <span className="text-[12px] text-dim">{f}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* CTA zone */}
                        <div className={cn("mt-7 rounded-xl border p-3", tierMeta.ctaWrap)}>
                          <button
                            onClick={() => handleCheckout(q.name)}
                            disabled={checkoutLoading === q.name}
                            className={cn(
                              "flex w-full items-center justify-center gap-2 rounded-[10px] py-3.5 text-[13px] font-bold transition-all disabled:opacity-60",
                              tierMeta.ctaBtn
                            )}>
                            {checkoutLoading === q.name ? (
                              <><Loader2 size={14} className="animate-spin" /> Processing...</>
                            ) : (
                              <><CreditCard size={14} /> {q.buttonLabel}</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Benefit row */}
              <div className="mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {[
                  "Fixed pricing — no hourly billing",
                  "Source code delivered after final payment",
                  "Revision rounds included",
                ].map(t => (
                  <span key={t} className="flex items-center gap-2 text-[12px] text-dim">
                    <Check size={11} className="text-accent/50" />{t}
                  </span>
                ))}
              </div>

              {/* ── Recommendation form — designed closing module ── */}
              <div className="relative mx-auto max-w-[580px] overflow-hidden rounded-[20px] border-[1.5px] border-white/[0.10] shadow-[0_0_40px_rgba(0,0,0,0.15)]"
                style={{ background: "rgba(255,255,255,0.015)" }}
              >
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                {/* Header area */}
                <div className="relative border-b border-white/[0.06] px-8 pb-5 pt-7">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/[0.15] bg-accent/[0.06]">
                      <HelpCircle size={16} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-[17px] font-bold text-white">Not sure which tier fits?</h3>
                      <p className="mt-0.5 text-[12px] text-body">Tell us about your project — we&apos;ll recommend the right package.</p>
                    </div>
                  </div>
                </div>

                {/* Form body */}
                <div className="px-8 pb-8 pt-6">
                  {status === "success" ? (
                    <div className="py-6 text-center">
                      <div className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/[0.2] bg-accent/[0.06]">
                        <Check size={20} className="text-accent" />
                      </div>
                      <p className="font-display text-lg font-bold text-white">Got it!</p>
                      <p className="mt-1 text-sm text-body">We&apos;ll review and recommend within 24 hours.</p>
                      <button onClick={reset} className="mt-5 text-[13px] font-semibold text-accent transition-colors hover:text-white">Submit another &rarr;</button>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Name *</label>
                          <input className="field" placeholder="Jane Smith" value={form.name} onChange={s("name")} />
                        </div>
                        <div>
                          <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Email *</label>
                          <input className="field" type="email" placeholder="jane@co.com" value={form.email} onChange={s("email")} />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Describe your project *</label>
                        <textarea className="field" rows={3} placeholder="What are you building? Include links to designs, references, or a rough description." value={form.message} onChange={s("message")} />
                      </div>
                      <p className="flex items-center gap-1.5 text-[12px] text-dim"><Upload size={11} /> You can send files after we respond</p>
                      <button onClick={submit} disabled={status === "loading"} className="btn-v w-full justify-center disabled:opacity-60">
                        {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <MessageSquare size={14} />}
                        {status === "loading" ? "Sending..." : "Get a recommendation"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── Custom Project ── */}
        {tab === "custom" && (
          <Reveal delay={0.1}>
            <div className="mx-auto grid max-w-[880px] gap-10 md:grid-cols-2 md:items-start">
              <div>
                <h3 className="mb-6 font-display text-[24px] font-bold text-white">What you get</h3>
                {[
                  "Free 30 min strategy call",
                  "Fixed-price proposal within 72 hours",
                  "Weekly progress with live previews",
                  "Full source code ownership",
                  "30 to 60 days post-launch support",
                  "Milestone-based billing",
                ].map(f => (
                  <div key={f} className="flex items-start gap-3 py-2.5 text-[14px] text-gray-300">
                    <div className="mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-md border border-accent/[0.15] bg-accent/[0.06]">
                      <Check size={12} className="text-accent" />
                    </div>
                    {f}
                  </div>
                ))}

                <div className="mt-7 rounded-2xl border border-accent/[0.12] bg-accent/[0.04] p-6">
                  <p className="text-[14px] text-gray-300">
                    <strong className="text-white">Starting at $5,000.</strong> Most projects fall between $5k and $25k. Fixed-price proposals always — no hourly billing.
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Wallet size={14} className="text-accent" />
                    <h4 className="font-display text-[14px] font-bold text-white">How projects are structured</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { pct: "40%", label: "Deposit", desc: "Project kicks off", color: "#C8FF00", w: "40%" },
                      { pct: "30%", label: "Midpoint", desc: "Approved build preview", color: "#06B6D4", w: "30%" },
                      { pct: "30%", label: "Final", desc: "Before launch & handoff", color: "#22C55E", w: "30%" },
                    ].map(m => (
                      <div key={m.label}>
                        <div className="mb-1.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
                            <span className="font-mono text-[11px] font-medium text-white">{m.pct} {m.label}</span>
                          </div>
                          <span className="font-mono text-[10px] text-dim">{m.desc}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.04]">
                          <div className="h-full rounded-full transition-all" style={{ width: m.w, background: `linear-gradient(90deg, ${m.color}80, ${m.color}40)` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[11px] leading-[1.6] text-dim">
                    Source code, credentials, and full documentation transfer after final payment. Clear scope, clear milestones, no surprises.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7">
                <h3 className="font-display text-[17px] font-bold text-white">Tell us about your project</h3>
                <p className="mb-5 mt-1 text-[12px] text-dim">We respond within one business day.</p>
                {status === "success" ? (
                  <div className="py-8 text-center">
                    <Check size={28} className="mx-auto mb-2.5 text-accent" />
                    <p className="font-display text-[17px] font-bold text-white">Inquiry received!</p>
                    <p className="mt-1 text-sm text-body">We&apos;ll respond within 24 hours.</p>
                    <button onClick={reset} className="mt-4 text-[13px] font-semibold text-accent transition-colors hover:text-white">Submit another &rarr;</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Name *</label>
                        <input className="field" placeholder="Jane Smith" value={form.name} onChange={s("name")} />
                      </div>
                      <div>
                        <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Email *</label>
                        <input className="field" type="email" placeholder="jane@co.com" value={form.email} onChange={s("email")} />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Company</label>
                      <input className="field" placeholder="Acme Inc." value={form.company} onChange={s("company")} />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Budget</label>
                        <select className={cn("field", form.budget ? "text-white" : "text-[#252530]")} value={form.budget} onChange={s("budget")}>
                          <option value="" disabled>Select</option>
                          {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Timeline</label>
                        <select className={cn("field", form.timeline ? "text-white" : "text-[#252530]")} value={form.timeline} onChange={s("timeline")}>
                          <option value="" disabled>Select</option>
                          {timelineOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">What do you need? *</label>
                      <textarea className="field" rows={3} placeholder="Describe the problem, goals, and requirements." value={form.message} onChange={s("message")} />
                    </div>
                    <button onClick={submit} disabled={status === "loading"} className="btn-v w-full justify-center disabled:opacity-60">
                      {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} />}
                      {status === "loading" ? "Sending..." : "Submit inquiry"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
