"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus, Package, Code2, HelpCircle, MessageSquare, Upload, Send, Loader2, CreditCard, Wallet, Layers, Rocket } from "lucide-react";
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
        <Reveal>
          <div className="mx-auto mb-6 max-w-[600px] text-center">
            <span className="section-label">Pricing</span>
            <h2 className="section-title mt-4">Two ways to get started</h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-body">Choose the path that fits your project. Same quality, same team, different starting points.</p>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.08}>
          <div className="mx-auto mb-14 flex max-w-[720px] flex-col justify-center gap-3 sm:flex-row">
            {([
              { id: "quick" as const, icon: Package, label: "Quick Build", sub: "You have a design or spec. Flat rate, guaranteed turnaround." },
              { id: "custom" as const, icon: Code2, label: "Custom Project", sub: "You need strategy + build. Discovery, proposal, milestones." },
            ]).map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); setStatus("idle"); }}
                className={cn(
                  "flex flex-1 items-start gap-3.5 rounded-2xl border-[1.5px] p-5 text-left transition-all duration-300",
                  tab === t.id
                    ? "border-accent bg-accent/[0.04]"
                    : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.1]"
                )}>
                <div className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all",
                  tab === t.id ? "bg-accent" : "bg-white/[0.04]"
                )}>
                  <t.icon size={18} className={tab === t.id ? "text-surface-0" : "text-dim"} />
                </div>
                <div>
                  <div className={cn("text-[15px] font-bold", tab === t.id ? "text-white" : "text-gray-400")}>{t.label}</div>
                  <div className={cn("mt-1 text-[12px] leading-[1.6]", tab === t.id ? "text-body" : "text-dim")}>{t.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Quick Build */}
        {tab === "quick" && (
          <Reveal delay={0.1}>
            <div className="mx-auto max-w-[1000px]">
              <div className="mb-10 grid gap-4 md:grid-cols-3">
                {tiers.map(q => (
                  <div key={q.name} className={cn(
                    "relative flex h-full flex-col rounded-2xl border-[1.5px] p-7 transition-all",
                    q.popular
                      ? "border-accent/80 bg-accent/[0.03] shadow-[0_0_40px_rgba(200,255,0,0.06)]"
                      : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.1]"
                  )}>
                    {q.popular && (
                      <>
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                        <div className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-surface-0 shadow-[0_2px_12px_rgba(200,255,0,0.2)]">
                          Most Popular
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-2.5">
                      {q.name === "Multi Page" && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.06]">
                          <Layers size={14} className="text-accent" />
                        </div>
                      )}
                      {q.name === "Full Site" && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06]">
                          <Rocket size={14} className="text-cyan-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-display text-[17px] font-bold text-white">{q.name}</h3>
                        {q.name === "Multi Page" && (
                          <p className="font-mono text-[10px] text-accent/60">Best for growing brands</p>
                        )}
                        {q.name === "Full Site" && (
                          <p className="font-mono text-[10px] text-cyan-400/60">Flagship build</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-display text-[42px] font-black tracking-tight text-white">{q.price}</span>
                      <span className="text-[13px] text-dim">flat rate</span>
                    </div>
                    <div className="mb-4 mt-1 font-mono text-[11px] text-accent">{q.time}</div>

                    <div className={cn(
                      "mb-5 flex items-center gap-2 rounded-xl border px-3 py-2",
                      q.popular
                        ? "border-accent/[0.12] bg-accent/[0.04]"
                        : "border-white/[0.05] bg-white/[0.02]"
                    )}>
                      <Wallet size={12} className="flex-shrink-0 text-accent" />
                      <span className="font-mono text-[10px] leading-tight text-gray-400">{q.payment}</span>
                    </div>

                    <div className="flex-1 border-t border-white/[0.06] pt-5">
                      {q.features.map(f => (
                        <div key={f} className="flex items-start gap-2.5 py-[5px] text-[13px] text-gray-300">
                          <Check size={13} className="mt-[3px] flex-shrink-0 text-accent" />{f}
                        </div>
                      ))}
                      <div className="mt-3 border-t border-white/[0.04] pt-3">
                        {q.excluded.map(f => (
                          <div key={f} className="flex items-start gap-2.5 py-[3px] text-[12px] text-dim">
                            <Minus size={11} className="mt-[3px] flex-shrink-0 text-white/[0.12]" />{f}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCheckout(q.name)}
                      disabled={checkoutLoading === q.name}
                      className={cn(
                        "mt-6 flex items-center justify-center gap-2 rounded-full py-3 text-[13px] font-semibold transition-all disabled:opacity-60",
                        q.popular ? "btn-v w-full !px-0" : "btn-o w-full !px-0"
                      )}>
                      {checkoutLoading === q.name ? (
                        <><Loader2 size={14} className="animate-spin" /> Processing...</>
                      ) : (
                        <><CreditCard size={14} /> {q.buttonLabel}</>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {[
                  "Fixed pricing — no hourly billing",
                  "Source code delivered after final payment",
                  "Revision rounds included",
                ].map(t => (
                  <span key={t} className="flex items-center gap-2 text-[12px] text-dim">
                    <Check size={11} className="text-accent/60" />{t}
                  </span>
                ))}
              </div>

              <div className="relative mx-auto max-w-[580px] overflow-hidden rounded-2xl border border-accent/[0.1] bg-white/[0.015] p-8">
                <div className="mb-1 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/[0.15] bg-accent/[0.06]">
                    <HelpCircle size={16} className="text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">Not sure which tier fits?</h3>
                </div>
                <p className="mb-6 text-[13px] text-dim">Tell us about your project and we&apos;ll recommend the right package. No commitment.</p>
                {status === "success" ? (
                  <div className="py-8 text-center">
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
          </Reveal>
        )}

        {/* Custom Project */}
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
