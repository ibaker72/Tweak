import { StatusBadge } from "./status-badge";
import { ApprovalResponse } from "./approval-response";
import type { ProjectApproval } from "@/lib/portal/types";

interface ApprovalListProps {
  approvals: ProjectApproval[];
  compact?: boolean;
  interactive?: boolean;
}

export function ApprovalList({ approvals, compact = false, interactive = false }: ApprovalListProps) {
  const displayed = compact ? approvals.slice(0, 3) : approvals;

  return (
    <div className="space-y-2">
      {displayed.map((a) => (
        <div
          key={a.id}
          className={`rounded-xl border px-4 py-3 ${
            a.status === "pending"
              ? "border-gold/10 bg-gold/[0.02]"
              : "border-white/[0.04] bg-white/[0.01]"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-white">{a.title}</p>
              {!compact && a.description && (
                <p className="mt-1 text-[12px] leading-relaxed text-body line-clamp-2">
                  {a.description}
                </p>
              )}
            </div>
            <StatusBadge status={a.status} type="approval" />
          </div>
          {a.response_note && (
            <div className="mt-2 rounded-lg bg-white/[0.02] px-3 py-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-dim">Response</p>
              <p className="mt-0.5 text-[12px] italic text-body">&ldquo;{a.response_note}&rdquo;</p>
            </div>
          )}
          <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-dim">
            <span>
              {new Date(a.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {a.approved_at && (
              <>
                <span className="text-white/10">|</span>
                <span>
                  {a.status === "approved" ? "Approved" : "Responded"}{" "}
                  {new Date(a.approved_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
          {interactive && <ApprovalResponse approval={a} />}
        </div>
      ))}
    </div>
  );
}
