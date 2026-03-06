"use client";
import Link from "next/link";
import { ArrowRight, Activity, CircleDot } from "lucide-react";
import { Reveal, Counter, DotGrid } from "./shared";
import { liveActivity } from "@/lib/data";

function DashboardMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative w-full ${compact ? "max-w-[320px] sm:max-w-[360px]" : "max-w-[480px]"}`} style={{ animation: "floatY 6s ease-in-out infinite" }}>
      {!compact && <div className="absolute -inset-10 rounded-[30px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)] blur-[40px]" />}
      <div className="relative overflow-hidden rounded-[18px] border border-v/[0.15] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(139,92,246,0.05)]" style={{ background: "linear-gradient(170deg, #0C0C14, #111119)" }}>
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-[18px] py-3">
          <div className="flex gap-[6px]">{["#EF4444","#F59E0B","#22C55E"].map(c => <div key={c} className="h-2.5 w-2.5 rounded-full opacity-70" style={{ background: c }} />)}</div>
          <span className="ml-2 font-mono text-[11px] text-dim">dashboard.tsx</span>
        </div>
        <div className={compact ? "p-3.5" : "p-5"}>
          <div className={`mb-4 grid grid-cols-3 ${compact ? "gap-2" : "gap-2.5"}`}>
            {[{ l:"Revenue", v:"$48.2k", c:"+12%", col:"#22C55E" },{ l:"Visitors", v:"2,847", c:"+8%", col:"#06B6D4" },{ l:"Conversions", v:"184", c:"+23%", col:"#A78BFA" }].map(m => (
              <div key={m.l} className={`rounded-xl border border-white/[0.04] bg-white/[0.02] ${compact ? "p-2.5" : "p-3"}`}>
                <div className="mb-1 font-mono text-[9px] text-dim sm:text-[10px]">{m.l}</div>
                <div className={`font-display font-bold text-white ${compact ? "text-base" : "text-xl"}`}>{m.v}</div>
                <div className="mt-0.5 font-mono text-[9px] sm:text-[10px]" style={{ color: m.col }}>{m.c}</div>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-1 px-1" style={{ height: compact ? 44 : 60 }}>
            {[35,48,42,65,58,72,68,80,75,90,85,95].map((h, i) => (
              <div key={i} className="flex-1 rounded" style={{ height: `${h}%`, background: `linear-gradient(180deg, rgba(139,92,246,${i > 8 ? 0.8 : 0.4}), rgba(6,182,212,${i > 8 ? 0.5 : 0.2}))` }} />
            ))}
          </div>
        </div>
      </div>
      {!compact && (
        <div className="absolute -right-12 top-5 hidden items-center gap-2 rounded-xl border border-cyan/[0.15] px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_20px_rgba(6,182,212,0.05)] md:flex" style={{ background: "linear-gradient(135deg, #0C0C14, #111119)", animation: "floatX 8s ease-in-out infinite" }}>
          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <span className="font-mono text-[11px] text-cyan-light">+$2.4k MRR</span>
        </div>
      )}
      <style>{`@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}@keyframes floatX{0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}}`}</style>
    </div>
  );
}

const typeColors: Record<string, string> = { deploy: "#22C55E", lead: "#06B6D4", review: "#A78BFA", milestone: "#F59E0B", metric: "#8B5CF6" };

export function Hero() {
  return (
    <section className="relative overflow-hidden lg:flex lg:min-h-screen lg:items-center">
      <DotGrid />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-[50%] bg-gradient-to-t from-surface-0 to-transparent" />
      <div className="pointer-events-none absolute right-[-10%] top-[20%] z-[1] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_70%)] blur-[60px]" />
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(139,92,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="wrap relative z-[3] pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-[110px]">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1fr_480px]">
          <div>
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-v/[0.15] bg-gradient-to-r from-v/[0.06] to-cyan/[0.03] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-v-light sm:mb-7 sm:px-4 sm:py-2 sm:text-[11px]">
                <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.35)]" />
                Product engineering studio
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="font-display text-[clamp(38px,9vw,52px)] font-black leading-[1.06] tracking-[-0.04em] text-white sm:text-[clamp(44px,5.5vw,68px)] sm:leading-[1.02]">
                We engineer<br />products that<br /><span className="gradient-text">actually scale.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-[460px] text-[15px] leading-[1.85] text-body sm:mt-6 sm:text-[17px]">
                Web apps. Landing pages. Automation systems. We ship production-grade software on fixed pricing with senior engineers who know what they&apos;re doing.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
                <Link href="/#pricing" className="btn-v justify-center text-[14px] sm:justify-start sm:text-[15px]">See how we work <ArrowRight size={15} /></Link>
                <Link href="/work" className="btn-o justify-center text-[14px] sm:justify-start sm:text-[15px]">View case studies</Link>
              </div>
            </Reveal>
          </div>
          <div className="hidden justify-center lg:flex">
            <Reveal delay={0.3}><DashboardMockup /></Reveal>
          </div>
        </div>

        {/* Mobile dashboard — compact below CTAs */}
        <div className="mt-8 flex justify-center sm:mt-10 lg:hidden">
          <Reveal delay={0.25}><DashboardMockup compact /></Reveal>
        </div>

        {/* Live activity feed */}
        <Reveal delay={0.35}>
          <div className="mt-8 border-t border-white/[0.06] pt-5 sm:mt-16 sm:pt-7">
            <div className="mb-3.5 flex items-center gap-2">
              <Activity size={14} className="text-cyan" />
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-cyan">Live from our studio</span>
              <div className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 sm:gap-4">
              {liveActivity.map((a, i) => (
                <div key={i} className="flex flex-shrink-0 items-center gap-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] px-3.5 py-2.5" style={{ animation: `slideIn 0.4s ease ${i * 0.1}s both` }}>
                  <CircleDot size={10} style={{ color: typeColors[a.type] || "#A78BFA" }} />
                  <span className="whitespace-nowrap text-[13px] text-gray-300">{a.text}</span>
                  <span className="whitespace-nowrap font-mono text-[10px] text-dim">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
          <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}`}</style>
        </Reveal>
      </div>
    </section>
  );
}
