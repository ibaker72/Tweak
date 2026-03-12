import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PortalCardProps {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PortalCard({ title, icon, action, children, className }: PortalCardProps) {
  return (
    <div className={cn("card-premium", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.04] text-dim">
              {icon}
            </span>
          )}
          <h3 className="font-display text-[14px] font-bold tracking-[-0.01em] text-white">
            {title}
          </h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
