import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SummaryCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  accent?: boolean;
  className?: string;
}

export function SummaryCard({ label, value, icon, accent = false, className }: SummaryCardProps) {
  return (
    <div
      className={cn(
        "card-premium flex items-center gap-4 !p-5",
        accent && "border-accent/10",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
          accent ? "bg-accent/10 text-accent" : "bg-white/[0.04] text-dim",
        )}
      >
        {icon}
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">{label}</p>
        <p className="mt-0.5 font-display text-[16px] font-bold tracking-[-0.01em] text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
