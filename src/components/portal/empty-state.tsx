import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function EmptyState({ icon, title, description, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center py-8 text-center", className)}>
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-dim">
        {icon}
      </span>
      <p className="font-display text-[13px] font-semibold text-white/60">{title}</p>
      <p className="mt-1 max-w-[240px] text-[12px] text-dim">{description}</p>
    </div>
  );
}
