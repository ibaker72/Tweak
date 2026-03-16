"use client";
import { CheckCircle, AlertTriangle, AlertCircle, Lightbulb } from "lucide-react";

interface FindingItemProps {
  title: string;
  description: string;
  severity: "critical" | "important" | "minor" | "positive";
  effort?: "quick" | "moderate" | "strategic";
  blurred?: boolean;
  onClickBlurred?: () => void;
}

const severityConfig = {
  critical: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10", badge: "bg-red-500/20 text-red-400", label: "Critical" },
  important: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", badge: "bg-amber-500/20 text-amber-400", label: "Important" },
  minor: { icon: AlertTriangle, color: "text-gray-400", bg: "bg-white/[0.04]", badge: "bg-white/[0.08] text-gray-400", label: "Minor" },
  positive: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", badge: "", label: "" },
};

const effortConfig: Record<string, { color: string; label: string }> = {
  quick: { color: "bg-emerald-500/20 text-emerald-400", label: "Quick fix" },
  moderate: { color: "bg-amber-500/20 text-amber-400", label: "Moderate effort" },
  strategic: { color: "bg-blue-500/20 text-blue-400", label: "Strategic" },
};

export function AuditFindingItem({ title, description, severity, effort, blurred, onClickBlurred }: FindingItemProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;
  const effortCfg = effort ? effortConfig[effort] : null;

  return (
    <div
      className={`relative rounded-xl border border-white/[0.06] p-4 transition-all duration-200 hover:border-white/[0.1] ${blurred ? "cursor-pointer" : ""}`}
      onClick={blurred ? onClickBlurred : undefined}
      style={blurred ? { filter: "blur(5px)", userSelect: "none" } : undefined}
    >
      <div className="flex gap-3">
        <div className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
          <Icon size={14} className={config.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-[14px] font-semibold text-white">{title}</h4>
            {config.label && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.badge}`}>
                {config.label}
              </span>
            )}
            {effortCfg && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${effortCfg.color}`}>
                {effortCfg.label}
              </span>
            )}
          </div>
          <p className="mt-1 text-[13px] leading-[1.7] text-body">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function AuditQuickWinItem({ title, description, effort }: { title: string; description: string; effort?: string }) {
  const effortCfg = effort ? effortConfig[effort] : null;

  return (
    <div className="rounded-xl border border-white/[0.06] p-4 transition-all duration-200 hover:border-white/[0.1]">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
          <Lightbulb size={14} className="text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-[14px] font-semibold text-white">{title}</h4>
            {effortCfg && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${effortCfg.color}`}>
                {effortCfg.label}
              </span>
            )}
          </div>
          <p className="mt-1 text-[13px] leading-[1.7] text-body">{description}</p>
        </div>
      </div>
    </div>
  );
}
