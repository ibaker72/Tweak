import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number | null;
  className?: string;
}

function getScoreConfig(score: number): { label: string; className: string } {
  if (score >= 80) return { label: `${score}`, className: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" };
  if (score >= 65) return { label: `${score}`, className: "bg-accent/10 text-accent border-accent/20" };
  if (score >= 50) return { label: `${score}`, className: "bg-gold/10 text-gold border-gold/20" };
  return { label: `${score}`, className: "bg-red-400/10 text-red-400 border-red-400/20" };
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  if (score === null) {
    return (
      <span className={cn(
        "inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-[3px] font-mono text-[11px] text-dim",
        className
      )}>
        —
      </span>
    );
  }

  const config = getScoreConfig(score);
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-[3px] font-mono text-[11px] font-bold",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}
