"use client";
import { Reveal, Tilt } from "./shared";
import { techStack } from "@/lib/data";

export function Founder() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      {/* Background treatment */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-1/40 to-surface-0" />
      <div className="pointer-events-none absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.04),transparent_70%)] blur-[60px]" />

      <div className="wrap relative">
        <Reveal>
          <div className="mx-auto max-w-[680px]">
            <Tilt>
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.06] p-8 sm:p-10" style={{ background: "linear-gradient(170deg, #0C0C14, #111119)" }}>
                {/* Top accent line */}
                <div className="absolute left-10 right-10 top-0 h-[2px] rounded bg-gradient-to-r from-transparent via-v/[0.3] via-50% to-transparent" />

                {/* Label */}
                <div className="mb-6 text-center">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-cyan">
                    Behind the studio
                  </span>
                  <h2 className="mt-2 font-display text-[clamp(24px,3.5vw,32px)] font-extrabold tracking-[-0.02em] text-white">
                    Built by engineers who ship.
                  </h2>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-v/[0.2] bg-gradient-to-br from-v/[0.12] to-cyan/[0.06] shadow-[0_0_32px_rgba(139,92,246,0.1)]">
                      <span className="font-display text-2xl font-black text-v-light">IB</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="text-center sm:text-left">
                    <p className="text-[16px] leading-[1.85] text-gray-300">
                      Hi, I&apos;m <strong className="text-white">Iyad</strong>.
                      I build production-grade web apps using Next.js, Supabase, and modern cloud infrastructure.
                    </p>
                    <p className="mt-3 text-[15px] leading-[1.85] text-body">
                      From SaaS products to automation systems, my focus is simple: build fast, ship fast, scale fast. Every project at Tweak & Build gets senior engineering from day one.
                    </p>
                  </div>
                </div>

                {/* Tech badges */}
                <div className="mt-8 flex flex-wrap justify-center gap-2 border-t border-white/[0.06] pt-6 sm:pt-7">
                  {techStack.map((t) => (
                    <div
                      key={t.name}
                      className="flex cursor-default items-center gap-2 rounded-[10px] border border-white/[0.06] bg-white/[0.02] px-3.5 py-2 transition-all duration-300 hover:-translate-y-0.5"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${t.color}44`;
                        e.currentTarget.style.boxShadow = `0 0 20px ${t.color}10`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: t.color, boxShadow: `0 0 6px ${t.color}44` }} />
                      <span className="font-mono text-[11px] font-medium text-gray-400">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Tilt>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
