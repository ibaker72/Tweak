"use client";
import { Reveal } from "./shared";
import { techStack } from "@/lib/data";

export function TechStack() {
  return (
    <section className="py-20">
      <div className="wrap">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-cyan">Our Stack</span>
            <h2 className="mt-2 font-display text-[28px] font-extrabold tracking-[-0.02em] text-white">Built with the tools that matter</h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t) => (
              <div key={t.name}
                className="flex cursor-default items-center gap-2.5 rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${t.color}44`; e.currentTarget.style.boxShadow = `0 0 28px ${t.color}12`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div className="h-2 w-2 rounded-full" style={{ background: t.color, boxShadow: `0 0 8px ${t.color}44` }} />
                <span className="font-mono text-[13px] font-medium text-gray-300">{t.name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
