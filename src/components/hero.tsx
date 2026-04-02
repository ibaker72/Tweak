"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./shared";
import { siteConfig } from "@/lib/config";
import { useEffect, useRef, useState } from "react";

const servicePills = ["SaaS Dashboards", "Internal Tools", "Client Portals"];
const rotatingWords = ["vision", "product", "startup", "future"];
const longestRotatingWord = rotatingWords.reduce(
  (longest, current) =>
    current.length > longest.length ? current : longest,
  rotatingWords[0],
);

type WordPhase = "idle" | "out" | "in";

function RotatingWord({
  word,
  phase,
}: {
  word: string;
  phase: WordPhase;
}) {
  const wordClass =
    phase === "out" ? "rw-exit" : phase === "in" ? "rw-enter" : "rw-idle";

  return (
    <span className="rw-mask grid items-baseline">
      <span
        className="invisible col-start-1 row-start-1 select-none"
        aria-hidden="true"
      >
        {longestRotatingWord}
      </span>
      <span className={`col-start-1 row-start-1 rw-base ${wordClass}`}>
        {word}
      </span>
    </span>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<WordPhase>("idle");

  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPhase("out");

      exitTimeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % rotatingWords.length);
        setPhase("in");

        enterTimeoutRef.current = setTimeout(() => {
          setPhase("idle");
        }, 460);
      }, 260);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-black/72" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.18),rgba(0,0,0,0.84)_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/82" />
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,0,0,0.42),transparent)]" />

      {/* Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(200,255,0,0.06),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(200,255,0,0.02),transparent)]" />

      <div className="wrap relative z-10 flex min-h-[100dvh] flex-col justify-start pb-8 pt-24 sm:justify-center sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
        <div className="mx-auto flex w-full max-w-[980px] flex-col items-center text-center">
          <Reveal>
            <div className="mb-4 sm:mb-10">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/12 bg-emerald-400/[0.03] px-3 py-[5px] backdrop-blur-sm sm:border-emerald-400/15 sm:bg-emerald-400/[0.04] sm:px-4 sm:py-1.5"
                style={{
                  boxShadow:
                    "inset 0 0.5px 0 rgba(52,211,153,0.06), 0 1px 2px rgba(0,0,0,0.15)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] font-medium tracking-[0.06em] text-emerald-400/80 sm:text-[11px] sm:text-emerald-400/90">
                  {siteConfig.availability}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="headline-block relative w-full max-w-[920px]">
              {/* Aura (handles glow instead of filter: drop-shadow) */}
              <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
                <div className="h-[220px] w-[440px] rounded-full bg-lime-300/[0.045] blur-[96px] sm:h-[300px] sm:w-[620px]" />
              </div>

              {/* Kicker */}
              <div className="relative mb-3 flex items-center justify-center gap-3 sm:mb-4 sm:gap-4">
                <span className="kicker-line-l h-px w-7 sm:w-14" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/34 sm:text-[11px] sm:tracking-[0.28em]">
                  Founder-led product engineering
                </span>
                <span className="kicker-line-r h-px w-7 sm:w-14" />
              </div>

              {/* Headline */}
              <h1
                className="headline-stack relative flex flex-col items-center text-balance leading-[0.92]"
                aria-label={`Ship your ${rotatingWords[index]}.`}
              >
                <span
                  className="headline-ship-svg relative z-[2] text-[clamp(72px,16vw,172px)]"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 760 210"
                    className="block h-[0.9em] w-auto overflow-visible"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <linearGradient id="shipGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="20%" stopColor="#ffffff" />
                        <stop offset="65%" stopColor="rgba(190,242,100,0.95)" />
                        <stop offset="100%" stopColor="rgba(190,242,100,0.45)" />
                      </linearGradient>

                      <linearGradient id="shipShimmerGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="40%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="48%" stopColor="rgba(255,255,255,0.12)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.20)" />
                        <stop offset="52%" stopColor="rgba(255,255,255,0.12)" />
                        <stop offset="60%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>

                      <clipPath id="shipTextClip">
                        <text
                          x="50%"
                          y="164"
                          textAnchor="middle"
                          fontSize="170"
                          fontWeight="800"
                          letterSpacing="-10"
                          style={{
                            fontFamily: "var(--font-display), Inter, Arial, sans-serif",
                          }}
                        >
                          SHIP
                        </text>
                      </clipPath>
                    </defs>

                    <text
                      x="50%"
                      y="164"
                      textAnchor="middle"
                      fontSize="170"
                      fontWeight="800"
                      letterSpacing="-10"
                      fill="url(#shipGradient)"
                      style={{
                        fontFamily: "var(--font-display), Inter, Arial, sans-serif",
                      }}
                    >
                      SHIP
                    </text>

                    <g clipPath="url(#shipTextClip)">
                      <rect
                        x="-280"
                        y="0"
                        width="220"
                        height="210"
                        fill="url(#shipShimmerGradient)"
                      >
                        <animate
                          attributeName="x"
                          from="-280"
                          to="860"
                          dur="1.6s"
                          begin="0.8s"
                          fill="freeze"
                          calcMode="spline"
                          keySplines="0.22 1 0.36 1"
                        />
                      </rect>
                    </g>
                  </svg>
                </span>

                <span
                  className="headline-sub relative z-[1] -mt-[0.08em] flex items-baseline gap-[0.16em] text-[clamp(30px,6.2vw,68px)] font-light tracking-[-0.05em]"
                  aria-hidden="true"
                >
                  <span className="text-white/72">your</span>
                  <RotatingWord word={rotatingWords[index]} phase={phase} />
                </span>
              </h1>

              {/* Divider */}
              <div className="relative mx-auto mt-5 flex items-center justify-center gap-2.5 sm:mt-6">
                <span className="divider-line-l h-px w-10 sm:w-16" />
                <span className="h-[7px] w-[7px] rotate-45 rounded-[1px] border border-lime-300/28 bg-lime-300/[0.08] shadow-[0_0_12px_rgba(190,242,100,0.08)]" />
                <span className="divider-line-r h-px w-10 sm:w-16" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-[640px] text-pretty text-[14px] leading-[1.72] text-white/62 sm:mt-8 sm:text-[17px] sm:leading-[1.76] lg:text-[18px]">
              Product engineering studio for founders who need websites, web
              apps, and automation systems built fast, built right, and built to
              convert.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-2.5">
              {servicePills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex shrink-0 items-center rounded-full border border-white/[0.07] bg-white/[0.025] px-3.5 py-1.5 text-[11px] font-medium tracking-[0.08em] text-white/50 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.12] hover:text-white/65 sm:px-4 sm:py-2 sm:text-[12px]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex w-full flex-col justify-center gap-2.5 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
              <Link
                href="/contact"
                className="btn-v justify-center px-6 py-2.5 text-[13px] sm:px-8 sm:py-3.5 sm:text-[14px]"
              >
                Start a project <ArrowRight size={14} />
              </Link>

              <Link
                href="#work"
                className="btn-o justify-center px-6 py-2.5 text-[13px] backdrop-blur-sm sm:px-7 sm:py-3.5 sm:text-[14px]"
              >
                See our work
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        .headline-ship-svg {
          display: inline-block;
          line-height: 0;
        }

        .headline-sub {
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
        }

        /* ── Rotating word ── */
        .rw-mask {
          position: relative;
          overflow: hidden;
          padding-bottom: 0.1em;
        }

        .rw-base {
          color: rgba(190, 242, 100, 0.94);
          font-weight: 400;
          font-style: italic;
          letter-spacing: -0.03em;
          will-change: transform, opacity, filter;
          text-shadow: 0 0 26px rgba(190, 242, 100, 0.08);
        }

        .rw-idle {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0px);
          transition:
            transform 0.32s ease,
            opacity 0.32s ease,
            filter 0.32s ease;
        }

        .rw-exit {
          opacity: 0;
          transform: translateY(-38%);
          filter: blur(4px);
          transition:
            transform 0.24s ease,
            opacity 0.22s ease,
            filter 0.22s ease;
        }

        .rw-enter {
          animation: slideUpSoft 0.46s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes slideUpSoft {
          0% {
            opacity: 0;
            transform: translateY(40%);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        /* ── Decorative lines ── */
        .kicker-line-l {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2)
          );
        }
        .kicker-line-r {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.2),
            transparent
          );
        }
        .divider-line-l {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(190, 242, 100, 0.22)
          );
        }
        .divider-line-r {
          background: linear-gradient(
            90deg,
            rgba(190, 242, 100, 0.22),
            transparent
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .rw-enter,
          .rw-idle,
          .rw-exit {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            filter: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}