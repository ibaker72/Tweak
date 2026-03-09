"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, DotGrid } from "./shared";
import { metrics } from "@/lib/data";

/* ── Product mockup ── */
function ProductScene({ compact = false }: { compact?: boolean }) {
  const base = compact ? "max-w-[360px]" : "max-w-[520px]";
  return (
    <div className={`relative w-full ${base}`}>
      {/* Ambient glow behind mockup */}
      {!compact && (
        <>
          <div className="absolute -inset-16 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_65%)] blur-[80px]" />
          <div className="absolute -bottom-10 -right-10 h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.04),transparent_70%)] blur-[40px]" />
        </>
      )}

      {/* Browser window */}
      <div
        className="relative overflow-hidden rounded-2xl border shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04),0_0_60px_rgba(139,92,246,0.04)]"
        style={{
          borderColor: "rgba(255,255,255,0.10)",
          background: "linear-gradient(170deg, rgba(16,16,28,0.98), rgba(10,10,18,1))",
          animation: compact ? "none" : "heroFloat 8s ease-in-out infinite",
        }}
      >
        {/* Top highlight edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex gap-[5px]">
            {["#EF4444","#F59E0B","#22C55E"].map(c => (
              <div key={c} className="h-[7px] w-[7px] rounded-full opacity-60" style={{ background: c }} />
            ))}
          </div>
          <div className="ml-2 flex-1 rounded-md border border-white/[0.04] bg-white/[0.03] px-3 py-[3px]">
            <span className="font-mono text-[10px] text-dim">app.clientproject.com</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className={compact ? "p-3" : "p-5"}>
          {/* App nav */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-md bg-gradient-to-br from-v/50 to-cyan/30" />
              <span className="font-mono text-[10px] font-medium text-gray-400">Dashboard</span>
            </div>
            <div className="flex gap-1.5">
              {["Overview","Analytics","Settings"].map((t,i) => (
                <span key={t} className={`rounded-md px-2 py-0.5 font-mono text-[9px] ${i === 0 ? "bg-v/[0.15] text-v-light" : "text-dim"}`}>{t}</span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className={`mb-4 grid grid-cols-3 ${compact ? "gap-2" : "gap-3"}`}>
            {[
              { l: "Revenue", v: "$48.2k", c: "+12.4%", col: "#22C55E" },
              { l: "Visitors", v: "2,847", c: "+8.2%", col: "#06B6D4" },
              { l: "Conversions", v: "184", c: "+23%", col: "#A78BFA" },
            ].map(m => (
              <div key={m.l} className={`rounded-xl border border-white/[0.06] ${compact ? "p-2" : "p-3"}`} style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="mb-1 font-mono text-[9px] text-dim">{m.l}</div>
                <div className={`font-display font-bold text-white ${compact ? "text-sm" : "text-lg"}`}>{m.v}</div>
                <div className="mt-0.5 font-mono text-[9px] font-medium" style={{ color: m.col }}>{m.c}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-white/[0.05] p-3" style={{ background: "rgba(255,255,255,0.01)" }}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[9px] text-dim">Revenue / 12 months</span>
              <span className="font-mono text-[9px] font-medium text-emerald-400">+34% YoY</span>
            </div>
            <div className="flex items-end gap-[3px]" style={{ height: compact ? 40 : 56 }}>
              {[30,42,38,55,50,62,58,72,68,82,78,92].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, rgba(139,92,246,${0.35 + (i/12)*0.55}), rgba(6,182,212,${0.12 + (i/12)*0.35}))`,
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

/* ── Trust metrics ── */
function TrustStrip() {
  return (
    <div className="mt-16 sm:mt-20">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="grid grid-cols-2 gap-6 pt-10 sm:grid-cols-4 sm:gap-8">
        {metrics.map((m, i) => (
          <div key={m.label} className="text-center" style={{ animation: `fadeUp 0.5s ease ${0.1 + i * 0.08}s both` }}>
            <div className="font-display text-[clamp(24px,3vw,32px)] font-black tracking-tight text-white">{m.value}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">{m.label}</div>
          </div>
        ))}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

/* ── Hero ── */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <DotGrid />

      {/* ── Cinematic background lighting ── */}
      {/* Primary violet light source — top center */}
      <div className="pointer-events-none absolute left-1/2 top-[-5%] z-[1] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.07),transparent_60%)] blur-[100px]" />
      {/* Secondary warm violet — right side */}
      <div className="pointer-events-none absolute right-[-5%] top-[25%] z-[1] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.05),transparent_65%)] blur-[60px]" />
      {/* Deep cyan accent — lower left, barely visible */}
      <div className="pointer-events-none absolute bottom-[10%] left-[-5%] z-[1] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.03),transparent_70%)] blur-[50px]" />
      {/* Bottom fade to surface */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-[35%] bg-gradient-to-t from-surface-0 to-transparent" />

      <div className="wrap relative z-[3] pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-[140px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_520px] lg:gap-16">
          {/* Left: Copy */}
          <div>
            <Reveal>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-v-light sm:mb-6">
                Product engineering studio
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="relative">
                {/* Ambient bloom behind headline gradient words */}
                <div className="pointer-events-none absolute left-[-10%] top-[30%] h-[120px] w-[80%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_65%)] blur-[60px] sm:h-[140px]" />

                <h1 className="relative font-display text-[clamp(34px,7.5vw,56px)] font-black leading-[1.06] tracking-[-0.035em] text-white sm:text-[clamp(44px,5.5vw,68px)]">
                  We build the software{" "}
                  <span className="gradient-text">that grows your business.</span>
                </h1>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-5 max-w-[460px] text-[15px] leading-[1.8] text-body sm:mt-6 sm:text-[16px]">
                Websites, web apps, and automation — engineered by senior developers. Fixed pricing, full code ownership, and a process built for founders who ship.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row">
                <Link href="/contact" className="btn-v justify-center sm:justify-start">
                  Start a project <ArrowRight size={15} />
                </Link>
                <Link href="/work" className="btn-o justify-center sm:justify-start">
                  View our work
                </Link>
              </div>
            </Reveal>

            {/* Trust — editorial */}
            <Reveal delay={0.26}>
              <div className="mt-8 sm:mt-10">
                <p className="text-[12px] text-dim">Trusted by</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
                  {["Create3DParts", "LeadsAndSaaS", "GreenThread"].map((name, i) => (
                    <span key={name} className="flex items-center gap-2 font-mono text-[12px] font-medium text-gray-400">
                      {i > 0 && <span className="text-white/[0.1]">/</span>}
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Product scene — desktop only */}
          <div className="hidden justify-center lg:flex">
            <Reveal delay={0.3}><ProductScene /></Reveal>
          </div>
        </div>

        {/* Mobile product scene */}
        <div className="mt-10 flex justify-center lg:hidden">
          <Reveal delay={0.25}><ProductScene compact /></Reveal>
        </div>

        {/* Trust metrics */}
        <Reveal delay={0.35}>
          <TrustStrip />
        </Reveal>
      </div>
    </section>
  );
}
