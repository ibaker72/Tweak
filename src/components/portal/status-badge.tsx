import { cn } from "@/lib/utils";
import type { ProjectStatus, MilestoneStatus, ApprovalStatus } from "@/lib/portal/types";

const projectStatusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  planning:    { label: "Planning",     className: "border-v-border bg-v-dim text-v-light" },
  design:      { label: "Design",       className: "border-cyan-border bg-cyan-dim text-cyan-light" },
  development: { label: "Development",  className: "border-accent/25 bg-accent-muted text-accent" },
  revisions:   { label: "Revisions",    className: "border-gold/25 bg-gold/[0.08] text-gold" },
  launch_prep: { label: "Launch Prep",  className: "border-cyan-border bg-cyan-dim text-cyan-light" },
  live:        { label: "Live",         className: "border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-400" },
};

const milestoneStatusConfig: Record<MilestoneStatus, { label: string; className: string }> = {
  pending:     { label: "Pending",     className: "border-white/[0.08] bg-white/[0.02] text-dim" },
  in_progress: { label: "In Progress", className: "border-accent/25 bg-accent-muted text-accent" },
  completed:   { label: "Completed",   className: "border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-400" },
};

const approvalStatusConfig: Record<ApprovalStatus, { label: string; className: string }> = {
  pending:           { label: "Pending",           className: "border-gold/25 bg-gold/[0.08] text-gold" },
  approved:          { label: "Approved",          className: "border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-400" },
  changes_requested: { label: "Changes Requested", className: "border-red-400/25 bg-red-400/[0.08] text-red-400" },
};

interface StatusBadgeProps {
  status: string;
  type?: "project" | "milestone" | "approval";
  className?: string;
}

export function StatusBadge({ status, type = "project", className }: StatusBadgeProps) {
  const configMap: Record<string, Record<string, { label: string; className: string }>> = {
    project: projectStatusConfig,
    milestone: milestoneStatusConfig,
    approval: approvalStatusConfig,
  };

  const config = configMap[type]?.[status];
  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-[3px] font-mono text-[10px] uppercase tracking-[0.06em]",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
