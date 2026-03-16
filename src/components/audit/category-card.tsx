"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Search, MousePointerClick, ShieldCheck, Smartphone, Eye, type LucideIcon } from "lucide-react";
import { getScoreColor } from "./score-gauge";

const icons: Record<string, LucideIcon> = {
  performance: Zap,
  seo: Search,
  conversion: MousePointerClick,
  trust: ShieldCheck,
  mobile: Smartphone,
  accessibility: Eye,
};

interface AuditCategoryCardProps {
  category: string;
  label: string;
  score: number;
  summary: string;
  index: number;
}

export function AuditCategoryCard({ category, label, score, summary, index }: AuditCategoryCardProps) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const colors = getScoreColor(score);
  const Icon = icons[category] || Zap;

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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = score / 50;
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="card p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg}`}>
            <Icon size={18} className={colors.text} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-white">{label}</h3>
          </div>
        </div>
        <span className={`font-mono text-2xl font-bold ${colors.text}`}>{count}</span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: colors.stroke }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${score}%` } : {}}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <p className="mt-3 text-[13px] leading-[1.7] text-body">{summary}</p>
    </motion.div>
  );
}
