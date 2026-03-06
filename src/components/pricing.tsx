"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus, Package, Code2, HelpCircle, MessageSquare, Upload, Send, Loader2, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, Tilt } from "./shared";
import { tiers, budgetOptions, timelineOptions } from "@/lib/data";

export function Pricing() {
  const [tab, setTab] = useState<"quick" | "custom">("quick");
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", timeline: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", timeline: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
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
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setCheckoutLoading(null);
    }
  };

  return (
    <section id="pricing" className="bg-gradient-to-b from-surface-0 via-surface-1 to-surface-1 py-24 sm:py-28">
      <div className="wrap">
        <Reveal><div className="mx-auto mb-5 max-w-[600px] text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-v-light">Work with us</span>
          <h2 className="mt-2 font-display text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">Two ways to get started</h2>
          <p className="mt-3 text-base leading-[1.7] text-body">Choose the path that fits. Same quality, same team, different starting points.</p>
        </div></Reveal>

        {/* Tabs */}
        <Reveal delay={0.08}><div className="mx-auto mb-12 flex max-w-[700px] flex-col justify-center gap-3 sm:flex-row">
          {([
            { id: "quick" as const, icon: Package, label: "Quick Build", sub: "You have a design or spec. Flat rate, guaranteed turnaround." },
            { id: "custom" as const, icon: Code2, label: "Custom Project", sub: "You need strategy + build. Discovery, proposal, milestones." },
          ]).map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setStatus("idle"); }}
              className={cn("flex flex-1 items-start gap-3.5 rounded-[18px] border-[1.5px] p-5 text-left transition-all duration-300",
                tab === t.id ? "border-v bg-gradient-to-br from-v/[0.06] to-cyan/[0.03] shadow-[0_8px_40px_rgba(139,92,246,0.1),inset_0_1px_0_rgba(139,92,246,0.12)]" : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.1]")}>
              <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] transition-all",
                tab === t.id ? "bg-gradient-to-br from-v to-v-deep shadow-[0_0_20px_rgba(139,92,246,0.25)]" : "bg-white/[0.04]")}>
                <t.icon size={18} className={tab === t.id ? "text-white" : "text-dim"} />
              </div>
              <div>
                <div className={cn("text-[15px] font-bold", tab === t.id ? "text-white" : "text-gray-400")}>{t.label}</div>
                <div className={cn("mt-1 text-[12px] leading-[1.6]", tab === t.id ? "text-body" : "text-dim")}>{t.sub}</div>
              </div>
            </button>
          ))}
        </div></Reveal>

        {/* Quick Build */}
        {tab === "quick" && <Reveal delay={0.1}><div className="mx-auto max-w-[1000px]">
          <div className="mb-10 grid gap-4 md:grid-cols-3">
            {tiers.map(q => (
              <Tilt key={q.name}>
                <div className={cn("relative flex h-full flex-col rounded-[20px] border-2 p-7 transition-all",
                  q.popular ? "border-v bg-gradient-to-b from-v/[0.05] to-surface-1 shadow-[0_0_48px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(139,92,246,0.12)]" : "border-white/[0.05] hover:border-white/[0.1]")}
                  style={{ background: q.popular ? undefined : "linear-gradient(170deg, #0C0C14, #111119)" }}>
                  {q.popular && <div className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-v to-cyan px-4 py-1 text-[10px] font-bold text-white">POPULAR</div>}
                  <h3 className="font-display text-[17px] font-bold text-white">{q.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-display text-[40px] font-black tracking-tight text-white">{q.price}</span>
                    <span className="text-[13px] text-dim">flat rate</span>
                  </div>
                  <div className="mt-1 mb-5 font-mono text-[11px] text-cyan">{q.time}</div>
                  <div className="flex-1 border-t border-white/[0.06] pt-5">
                    {q.features.map(f => <div key={f} className="flex items-start gap-2.5 py-[5px] text-[13px] text-gray-300"><Check size={13} className="mt-[3px] flex-shrink-0 text-cyan" />{f}</div>)}
                    <div className="mt-3 border-t border-white/[0.04] pt-3">
                      {q.excluded.map(f => <div key={f} className="flex items-start gap-2.5 py-[3px] text-[12px] text-dim"><Minus size={11} className="mt-[3px] flex-shrink-0 text-white/[0.12]" />{f}</div>)}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCheckout(q.name)}
                    disabled={checkoutLoading === q.name}
                    className={cn("mt-6 flex items-center justify-center gap-2 rounded-[14px] py-3 text-[13px] font-semibold transition-all disabled:opacity-60",
                      q.popular ? "btn-v w-full !px-0" : "btn-o w-full !px-0")}>
                    {checkoutLoading === q.name ? (
                      <><Loader2 size={14} className="animate-spin" /> Processing...</>
                    ) : (
                      <><CreditCard size={14} /> Buy {q.name}</>
                    )}
                  </button>
                </div>
              </Tilt>
            ))}
          </div>

          {/* Not sure form */}
          <div className="relative mx-auto max-w-[580px] overflow-hidden rounded-[20px] border border-v/[0.12] p-8" style={{ background: "linear-gradient(170deg, #0C0C14, #111119)" }}>
            <div className="absolute left-8 right-8 top-0 h-[2px] rounded bg-gradient-to-r from-transparent via-v/30 via-50% to-transparent" />
            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-cyan/[0.15] bg-cyan/[0.06]"><HelpCircle size={16} className="text-cyan-light" /></div>
              <h3 className="font-display text-lg font-bold text-white">Not sure which tier fits?</h3>
            </div>
            <p className="mb-6 text-[13px] text-dim">Tell us about your project and we&apos;ll recommend the right package. No commitment.</p>
            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl border border-v/[0.2] bg-v/[0.06]"><Check size={20} className="text-v-light" /></div>
                <p className="font-display text-lg font-bold text-white">Got it!</p>
                <p className="mt-1 text-sm text-body">We&apos;ll review and recommend within 24 hours.</p>
                <button onClick={reset} className="mt-5 text-[13px] font-semibold text-cyan transition-colors hover:text-cyan-light">Submit another →</button>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3"><div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Name *</label><input className="field" placeholder="Jane Smith" value={form.name} onChange={s("name")} /></div>
                <div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Email *</label><input className="field" type="email" placeholder="jane@co.com" value={form.email} onChange={s("email")} /></div></div>
                <div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Describe your project *</label><textarea className="field" rows={3} placeholder="What are you building? Include links to designs, references, or a rough description." value={form.message} onChange={s("message")} /></div>
                <p className="flex items-center gap-1.5 text-[12px] text-dim"><Upload size={11} /> You can send files after we respond</p>
                <button onClick={submit} disabled={status === "loading"} className="btn-v w-full justify-center disabled:opacity-60">{status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <MessageSquare size={14} />}{status === "loading" ? "Sending..." : "Get a recommendation"}</button>
              </div>
            )}
          </div>
        </div></Reveal>}

        {/* Custom */}
        {tab === "custom" && <Reveal delay={0.1}><div className="mx-auto grid max-w-[820px] gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h3 className="mb-5 font-display text-[24px] font-bold text-white">What you get</h3>
            {["Free 30 min strategy call","Fixed-price proposal within 72 hours","Weekly progress with live previews","Full source code ownership","30 to 60 days post-launch support","Milestone-based billing"].map(f => (
              <div key={f} className="flex items-start gap-3 py-2.5 text-sm text-gray-300">
                <div className="mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-md border border-v/[0.15] bg-gradient-to-br from-v/[0.08] to-cyan/[0.03]"><Check size={12} className="text-cyan" /></div>{f}
              </div>
            ))}
            <div className="mt-6 rounded-[14px] border border-v/[0.15] bg-gradient-to-br from-v/[0.06] to-cyan/[0.03] p-5">
              <p className="text-sm text-gray-300"><strong className="text-white">Starting at $5,000.</strong> Most projects fall between $5k and $25k.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-white/[0.06] p-7" style={{ background: "linear-gradient(170deg, #0C0C14, #111119)" }}>
            <h3 className="font-display text-[17px] font-bold text-white">Tell us about your project</h3>
            <p className="mb-5 mt-1 text-[12px] text-dim">We respond within one business day.</p>
            {status === "success" ? (
              <div className="py-8 text-center"><Check size={28} className="mx-auto mb-2.5 text-cyan" /><p className="font-display text-[17px] font-bold text-white">Inquiry received!</p><p className="mt-1 text-sm text-body">Our team will respond within 24 hours.</p><button onClick={reset} className="mt-4 text-[13px] font-semibold text-cyan">Submit another →</button></div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5"><div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Name *</label><input className="field" placeholder="Jane Smith" value={form.name} onChange={s("name")} /></div><div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Email *</label><input className="field" type="email" placeholder="jane@co.com" value={form.email} onChange={s("email")} /></div></div>
                <div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Company</label><input className="field" placeholder="Acme Inc." value={form.company} onChange={s("company")} /></div>
                <div className="grid grid-cols-2 gap-2.5"><div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Budget</label><select className={cn("field",form.budget?"text-white":"text-[#252530]")} value={form.budget} onChange={s("budget")}><option value="" disabled>Select</option>{budgetOptions.map(o=><option key={o} value={o}>{o}</option>)}</select></div><div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Timeline</label><select className={cn("field",form.timeline?"text-white":"text-[#252530]")} value={form.timeline} onChange={s("timeline")}><option value="" disabled>Select</option>{timelineOptions.map(o=><option key={o} value={o}>{o}</option>)}</select></div></div>
                <div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">What do you need? *</label><textarea className="field" rows={3} placeholder="Describe the problem, goals, and requirements." value={form.message} onChange={s("message")} /></div>
                <button onClick={submit} disabled={status === "loading"} className="btn-v w-full justify-center disabled:opacity-60">{status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} />}{status === "loading" ? "Sending..." : "Submit inquiry"}</button>
              </div>
            )}
          </div>
        </div></Reveal>}
      </div>
    </section>
  );
}
