import { Check, Download, ExternalLink, X } from "lucide-react";
import { StatusBadge } from "./status-badge";
import { ApprovalResponse } from "./approval-response";
import type { ApprovalDecision, ProjectApproval } from "@/lib/portal/types";

interface ApprovalListProps {
  approvals: ProjectApproval[];
  compact?: boolean;
  interactive?: boolean;
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function deciderName(d: ApprovalDecision) {
  return d.decider?.full_name?.trim() || d.decider?.email || "Client";
}

export function ApprovalList({
  approvals,
  compact = false,
  interactive = false,
}: ApprovalListProps) {
  const displayed = compact ? approvals.slice(0, 3) : approvals;

  return (
    <div className="space-y-2">
      {displayed.map((a) => {
        const isPending = a.status === "pending";
        const decisions = a.decisions ?? [];
        return (
          <div
            key={a.id}
            className={`rounded-xl border px-4 py-3 ${
              isPending
                ? "border-white/[0.06] bg-white/[0.015]"
                : "border-white/[0.04] bg-white/[0.01]"
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-white">{a.title}</p>
                {!compact && a.description && (
                  <p className="mt-1 text-[12px] leading-relaxed text-body">
                    {a.description}
                  </p>
                )}
              </div>
              <StatusBadge status={a.status} type="approval" />
            </div>

            {/* What's being approved — file link or url link */}
            {!compact && (a.file_id || a.url) && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {a.file_id && (
                  <a
                    href={`/api/files/download?id=${encodeURIComponent(a.file_id)}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-body transition-colors hover:border-accent/30 hover:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={10} />
                    {a.file?.file_name ?? "View file"}
                  </a>
                )}
                {a.url && (
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-body transition-colors hover:border-accent/30 hover:text-accent"
                  >
                    <ExternalLink size={10} />
                    Open link
                  </a>
                )}
              </div>
            )}

            {/* Created date */}
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.06em] text-dim">
              Requested {formatDateTime(a.created_at)}
            </div>

            {/* Interactive controls (pending items only) */}
            {interactive && isPending && <ApprovalResponse approval={a} />}

            {/* Decision history — the receipt */}
            {!compact && decisions.length > 0 && (
              <div className="mt-3 space-y-2 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                  Decision history
                </p>
                <ul className="space-y-2">
                  {decisions.map((d) => {
                    const isApprove = d.decision === "approved";
                    return (
                      <li key={d.id} className="flex gap-2.5">
                        <span
                          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                            isApprove
                              ? "border border-accent/25 bg-accent-muted text-accent"
                              : "border border-gold/25 bg-gold/[0.08] text-gold"
                          }`}
                          aria-label={isApprove ? "Approved" : "Changes requested"}
                        >
                          {isApprove ? <Check size={9} /> : <X size={9} />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] text-white/80">
                            <span className="font-medium">{deciderName(d)}</span>{" "}
                            <span className="text-dim">
                              {isApprove ? "approved" : "requested changes"}
                            </span>
                          </p>
                          <p className="font-mono text-[10px] text-dim">
                            {formatDateTime(d.created_at)}
                          </p>
                          {d.comment && (
                            <p className="mt-1 text-[12px] italic text-body">
                              &ldquo;{d.comment}&rdquo;
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
