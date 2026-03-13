"use client";

import { useTransition } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import type { ProjectApproval } from "@/lib/portal/types";
import { updateApprovalStatus } from "@/lib/admin/actions";

export function ApprovalRow({ approval, projectId }: { approval: ProjectApproval; projectId: string }) {
  const [pending, startTransition] = useTransition();

  function handleAction(status: "approved" | "changes_requested") {
    startTransition(async () => {
      await updateApprovalStatus(approval.id, status, projectId);
    });
  }

  return (
    <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-[13px] font-semibold text-white">{approval.title}</p>
          {approval.description && (
            <p className="mt-1 line-clamp-1 text-[12px] text-body">{approval.description}</p>
          )}
        </div>
        <StatusBadge status={approval.status} type="approval" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[10px] text-dim">
          {new Date(approval.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          {approval.approved_at && ` · Resolved ${new Date(approval.approved_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
        </span>
        {approval.status === "pending" && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleAction("approved")}
              disabled={pending}
              className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20 disabled:opacity-50"
            >
              {pending ? <Loader2 size={10} className="animate-spin" /> : <CheckCircle size={10} />}
              Approve
            </button>
            <button
              onClick={() => handleAction("changes_requested")}
              disabled={pending}
              className="inline-flex items-center gap-1 rounded-md bg-red-400/10 px-2 py-1 text-[10px] font-medium text-red-400 transition-colors hover:bg-red-400/20 disabled:opacity-50"
            >
              {pending ? <Loader2 size={10} className="animate-spin" /> : <XCircle size={10} />}
              Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
