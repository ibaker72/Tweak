import { cn } from "@/lib/utils";
import type { ProjectStatus, MilestoneStatus, ApprovalStatus } from "@/lib/portal/types";
import type { PartnerApplicationStatus } from "@/lib/partners/types";

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

// Approval pill palette is brand-only (no new hues).
//  • approved          → accent (lime)
//  • pending           → muted neutral (NOT gold — keeps gold reserved for
//                        action-required / changes-requested signal)
//  • changes_requested → gold (already in the palette, used elsewhere for
//                        attention; documented in the migration summary)
const approvalStatusConfig: Record<ApprovalStatus, { label: string; className: string }> = {
  pending:           { label: "Pending",           className: "border-white/[0.10] bg-white/[0.04] text-white/60" },
  approved:          { label: "Approved",          className: "border-accent/30 bg-accent-muted text-accent" },
  changes_requested: { label: "Changes Requested", className: "border-gold/30 bg-gold/[0.08] text-gold" },
};

// Partner application pills reuse the existing brand palette — no new hues.
//  • new       → accent (lime), the one status that wants attention
//  • reviewing → cyan, matches "in flight" elsewhere in the console
//  • contacted → neutral, work is with the other party
//  • approved  → emerald, same as project "live"
//  • rejected  → muted red-tinted neutral, deliberately quiet
const partnerStatusConfig: Record<PartnerApplicationStatus, { label: string; className: string }> = {
  new:       { label: "New",       className: "border-accent/30 bg-accent-muted text-accent" },
  reviewing: { label: "Reviewing", className: "border-cyan-border bg-cyan-dim text-cyan-light" },
  contacted: { label: "Contacted", className: "border-white/[0.10] bg-white/[0.04] text-white/60" },
  approved:  { label: "Approved",  className: "border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-400" },
  rejected:  { label: "Rejected",  className: "border-red-400/20 bg-red-400/[0.06] text-red-400/80" },
};

interface StatusBadgeProps {
  status: string;
  type?: "project" | "milestone" | "approval" | "partner";
  className?: string;
}

export function StatusBadge({ status, type = "project", className }: StatusBadgeProps) {
  const configMap: Record<string, Record<string, { label: string; className: string }>> = {
    project: projectStatusConfig,
    milestone: milestoneStatusConfig,
    approval: approvalStatusConfig,
    partner: partnerStatusConfig,
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
