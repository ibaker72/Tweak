"use client";
import { useState, useEffect } from "react";
import { Mail, Clock, Shield, Send, Loader2, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { budgetOptions, timelineOptions, tiers } from "@/lib/data";

export default function ContactPage() {
  const [tierParam, setTierParam] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", timeline: "", tier: "", message: "" });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTierParam(params.get("tier"));
  }, []);
  const [status, setStatus] = useState<"idle"|"loading"|"success">("idle");
  useEffect(() => { if (tierParam) setForm(p => ({ ...p, tier: tierParam })); }, [tierParam]);
  const s = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  const submit = async () => { setStatus("loading"); try { await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); } catch {} setStatus("success"); };

  return (
    <div className="pb-24 pt-36 sm:pt-40">
      <div className="wrap">
        {/* Page header */}
        <Reveal>
          <div className="mx-auto max-w-[640px] text-center">
            <span className="section-label">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Contact
            </span>
            <h1 className="mt-5 font-display text-[clamp(32px,5vw,52px)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              Let&apos;s get started
            </h1>
            <p className="mx-auto mt-4 max-w-[460px] text-[15px] leading-[1.75] text-body">
              Book a strategy call or submit your project details. We respond within one business day.
            </p>
            <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-5 text-[13px] text-dim">
              <a href="mailto:hello@tweakandbuild.com" className="flex items-center gap-2 transition-colors duration-200 hover:text-white">
                <Mail size={13} className="text-accent/60" /> hello@tweakandbuild.com
              </a>
              <span className="hidden h-3 w-px bg-white/[0.08] sm:block" />
              <span className="flex items-center gap-2">
                <Clock size={13} className="text-accent/60" /> Responds within 4 hours
              </span>
            </div>
          </div>
        </Reveal>

        {/* Divider */}
        <div className="divider mt-12" />

        {/* Content grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Calendly */}
          <Reveal delay={0.08}>
            <div id="calendly" className="scroll-mt-24">
              <div className="mb-5">
                <h2 className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">Book a Strategy Call</h2>
                <p className="mt-1 text-[13px] leading-[1.7] text-dim">30 minutes. No pitch. Just clarity on your project.</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/[0.06]" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}>
                <CalendlyEmbed />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.14}>
            <div id="quote" className="scroll-mt-24">
              <div className="mb-5">
                <h2 className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                  {tierParam ? `Quick Build: ${tierParam}` : "Submit a Project Inquiry"}
                </h2>
                <p className="mt-1 text-[13px] leading-[1.7] text-dim">
                  {tierParam ? "Confirm your details and we\u2019ll send a project confirmation within 24 hours." : "Share your project details for a tailored proposal within 24 hours."}
                </p>
              </div>

              <div className="card overflow-hidden rounded-2xl p-6 sm:p-7">
                {status === "success" ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] border border-accent/[0.15] bg-accent/[0.06]">
                      <Check size={18} className="text-accent" />
                    </div>
                    <p className="font-display text-[17px] font-bold text-white">{tierParam ? "Request received!" : "Inquiry received!"}</p>
                    <p className="mt-1.5 text-[13px] text-dim">Our team will respond within 24 hours.</p>
                    <button onClick={() => { setStatus("idle"); setForm({ name:"",email:"",company:"",budget:"",timeline:"",tier:tierParam||"",message:"" }); }} className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-colors duration-200 hover:text-white">
                      Submit another <ArrowRight size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {tierParam && (
                      <div className="mb-2 rounded-xl border border-accent/[0.12] bg-accent/[0.04] px-4 py-2.5 font-mono text-[11px] text-accent/80">
                        Selected: {tierParam} ({tiers.find(t => t.name === tierParam)?.price})
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Name *</label>
                        <input className="field" placeholder="Jane Smith" value={form.name} onChange={s("name")} />
                      </div>
                      <div>
                        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Email *</label>
                        <input className="field" type="email" placeholder="jane@co.com" value={form.email} onChange={s("email")} />
                      </div>
                    </div>
                    {!tierParam && (
                      <>
                        <div>
                          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Company</label>
                          <input className="field" placeholder="Acme Inc." value={form.company} onChange={s("company")} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Budget</label>
                            <select className={cn("field", form.budget ? "text-white" : "text-white/[0.15]")} value={form.budget} onChange={s("budget")}>
                              <option value="" disabled>Select</option>
                              {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Timeline</label>
                            <select className={cn("field", form.timeline ? "text-white" : "text-white/[0.15]")} value={form.timeline} onChange={s("timeline")}>
                              <option value="" disabled>Select</option>
                              {timelineOptions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                    <div>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Project details *</label>
                      <textarea className="field" rows={4} placeholder={tierParam ? "Describe what you need. Include Figma links, screenshots, or references." : "Describe the problem, your goals, and any requirements."} value={form.message} onChange={s("message")} />
                    </div>
                    <button onClick={submit} disabled={status === "loading"} className="btn-v w-full justify-center disabled:opacity-60">
                      {status === "loading" ? <Loader2 size={15} className="animate-spin" /> : <Send size={13} />}
                      {status === "loading" ? "Sending..." : tierParam ? `Request ${tierParam} Build` : "Submit inquiry"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Trust bar */}
        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 py-4" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.02) inset" }}>
            <Shield size={16} className="flex-shrink-0 text-accent/60" />
            <p className="text-[13px] text-body">
              <strong className="font-semibold text-white">Our guarantee:</strong> Clear milestones, weekly updates, and a full refund on any milestone we don&apos;t deliver.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
