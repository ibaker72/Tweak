"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function getScoreColor(score: number) {
  if (score >= 80) return { text: "text-emerald-400", bg: "bg-emerald-500/20", stroke: "#34d399" };
  if (score >= 60) return { text: "text-blue-400", bg: "bg-blue-500/20", stroke: "#60a5fa" };
  if (score >= 40) return { text: "text-amber-400", bg: "bg-amber-500/20", stroke: "#fbbf24" };
  return { text: "text-red-400", bg: "bg-red-500/20", stroke: "#f87171" };
}

export function AuditScoreGauge({ score, size = 180 }: { score: number; size?: number }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const colors = getScoreColor(score);

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (count / 100) * circumference;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = score / 60;
    const t = setInterval(() => {
      v += step;
      if (v >= score) {
        setCount(score);
        clearInterval(t);
      } else {
        setCount(Math.floor(v));
      }
    }, 16);
    return () => clearInterval(t);
  }, [inView, score]);

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={8}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-mono text-5xl font-bold ${colors.text}`}>{count}</span>
        <span className="mt-1 text-[11px] text-dim">/100</span>
      </div>
    </div>
  );
}

export function AuditScoreBadge({ score, label }: { score: number; label?: string }) {
  const colors = getScoreColor(score);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono font-semibold ${colors.text} ${colors.bg}`}>
      {score}
      {label && <span className="text-[10px] font-normal opacity-70">/{label}</span>}
    </span>
  );
}

export { getScoreColor };
