"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Clock, Shield, Send, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { budgetOptions, timelineOptions, tiers } from "@/lib/data";

export default function ContactPage() {
  const params = useSearchParams();
  const tierParam = params.get("tier");
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", timeline: "", tier: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success">("idle");
  useEffect(() => { if (tierParam) setForm(p => ({ ...p, tier: tierParam })); }, [tierParam]);
  const s = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  const submit = async () => { setStatus("loading"); try { await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); } catch {} setStatus("success"); };

  return (
    <div className="pb-20 pt-32 sm:pt-36">
      <div className="wrap">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-v-light">Contact</span>
          <h1 className="mt-2 font-display text-[clamp(36px,5vw,52px)] font-black leading-[1.1] tracking-[-0.03em] text-white">Let&apos;s get started</h1>
          <p className="mt-4 max-w-lg text-lg text-body">Book a strategy call or submit your project details. We respond within one business day.</p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-dim">
            <a href="mailto:iyadbaker.dev@gmail.com" className="flex items-center gap-2 transition-colors hover:text-v"><Mail size={15} className="text-cyan" /> iyadbaker.dev@gmail.com</a>
            <span className="flex items-center gap-2"><Clock size={15} className="text-cyan" /> Responds within 4 hours</span>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Reveal delay={0.08}><div id="calendly" className="scroll-mt-24"><h2 className="mb-2 font-display text-lg font-bold text-white">Book a Strategy Call</h2><p className="mb-5 text-sm text-dim">30 minutes. No pitch. Just clarity on your project.</p><CalendlyEmbed /></div></Reveal>
          <Reveal delay={0.14}><div id="quote" className="scroll-mt-24">
            <h2 className="mb-2 font-display text-lg font-bold text-white">{tierParam ? `Quick Build: ${tierParam}` : "Submit a Project Inquiry"}</h2>
            <p className="mb-5 text-sm text-dim">{tierParam ? "Confirm your details and we'll send a project confirmation within 24 hours." : "Share your project details for a tailored proposal within 24 hours."}</p>
            <div className="overflow-hidden rounded-[20px] border border-white/[0.06] p-7" style={{ background: "linear-gradient(170deg, #0C0C14, #111119)" }}>
              {status === "success" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-v/[0.2] bg-v/[0.06]"><Check size={20} className="text-v-light" /></div>
                  <p className="font-display text-lg font-bold text-white">{tierParam ? "Request received!" : "Inquiry received!"}</p>
                  <p className="mt-1 text-sm text-body">Our team will respond within 24 hours.</p>
                  <button onClick={() => { setStatus("idle"); setForm({ name:"",email:"",company:"",budget:"",timeline:"",tier:tierParam||"",message:"" }); }} className="mt-5 text-[13px] font-semibold text-v-light">Submit another →</button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {tierParam && <div className="mb-2 rounded-lg border border-v/[0.15] bg-v/[0.04] px-4 py-2.5 font-mono text-[12px] text-v-light">Selected: {tierParam} ({tiers.find(t => t.name === tierParam)?.price})</div>}
                  <div className="grid grid-cols-2 gap-3"><div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Name *</label><input className="field" placeholder="Jane Smith" value={form.name} onChange={s("name")} /></div><div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Email *</label><input className="field" type="email" placeholder="jane@co.com" value={form.email} onChange={s("email")} /></div></div>
                  {!tierParam && <><div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Company</label><input className="field" placeholder="Acme Inc." value={form.company} onChange={s("company")} /></div>
                  <div className="grid grid-cols-2 gap-3"><div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Budget</label><select className={cn("field",form.budget?"text-white":"text-[#252530]")} value={form.budget} onChange={s("budget")}><option value="" disabled>Select</option>{budgetOptions.map(o=><option key={o} value={o}>{o}</option>)}</select></div><div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Timeline</label><select className={cn("field",form.timeline?"text-white":"text-[#252530]")} value={form.timeline} onChange={s("timeline")}><option value="" disabled>Select</option>{timelineOptions.map(o=><option key={o} value={o}>{o}</option>)}</select></div></div></>}
                  <div><label className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Project details *</label><textarea className="field" rows={4} placeholder={tierParam ? "Describe what you need. Include Figma links, screenshots, or references." : "Describe the problem, your goals, and any requirements."} value={form.message} onChange={s("message")} /></div>
                  <button onClick={submit} disabled={status === "loading"} className="btn-v w-full justify-center disabled:opacity-60">{status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} />}{status === "loading" ? "Sending..." : tierParam ? `Request ${tierParam} Build` : "Submit inquiry"}</button>
                </div>
              )}
            </div>
          </div></Reveal>
        </div>
        <Reveal delay={0.2}><div className="mt-14 flex flex-wrap items-center gap-4 rounded-[18px] border border-v/[0.12] bg-gradient-to-r from-v/[0.03] to-cyan/[0.02] px-6 py-4">
          <Shield size={18} className="text-v-light" /><p className="text-sm text-body"><strong className="text-white">Our guarantee:</strong> Clear milestones, weekly updates, and a full refund on any milestone we don&apos;t deliver.</p>
        </div></Reveal>
      </div>
    </div>
  );
}
