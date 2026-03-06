"use client";
import { Star } from "lucide-react";
import { Reveal, Tilt } from "./shared";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(139,92,246,0.06),transparent_50%),radial-gradient(ellipse_at_70%_100%,rgba(6,182,212,0.04),transparent_50%)]" />
      <div className="wrap relative">
        <Reveal><div className="mb-12 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-cyan">Client feedback</span>
          <h2 className="mt-2 font-display text-[clamp(28px,3.5vw,40px)] font-extrabold tracking-[-0.02em] text-white">What our clients say</h2>
        </div></Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <Tilt className="h-full">
                <div className="flex h-full flex-col rounded-[20px] border border-white/[0.06] bg-surface-0/70 p-7 backdrop-blur-xl">
                  <div className="mb-4 flex gap-1">{Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />)}</div>
                  <p className="flex-1 text-[15px] italic leading-[1.8] text-gray-300">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-5 border-t border-white/[0.06] pt-4">
                    <p className="font-display text-sm font-bold text-white">{t.name}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-dim">{t.title}</p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
