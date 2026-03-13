"use client";

import { useState, useTransition } from "react";
import { Check, X, Loader2, MessageSquare } from "lucide-react";
import { respondToApproval } from "@/lib/admin/actions";
import type { ProjectApproval } from "@/lib/portal/types";

export function ApprovalResponse({ approval }: { approval: ProjectApproval }) {
  const [pending, startTransition] = useTransition();
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [result, setResult] = useState<string | null>(null);

  if (approval.status !== "pending") return null;

  function handleRespond(status: "approved" | "changes_requested") {
    startTransition(async () => {
      try {
        await respondToApproval(approval.id, status, approval.project_id, note || undefined);
        setResult(status === "approved" ? "Approved!" : "Changes requested");
      } catch (err) {
        setResult(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  if (result) {
    return (
      <p className="mt-2 rounded-lg bg-white/[0.02] px-3 py-2 text-center font-mono text-[11px] text-emerald-400">
        {result}
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      {showNote && (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)..."
          rows={2}
          className="field !text-[12px] !py-2"
        />
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleRespond("approved")}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20 disabled:opacity-50"
        >
          {pending ? <Loader2 size={10} className="animate-spin" /> : <Check size={10} />}
          Approve
        </button>
        <button
          onClick={() => handleRespond("changes_requested")}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gold/10 px-3 py-1.5 text-[11px] font-medium text-gold transition-colors hover:bg-gold/20 disabled:opacity-50"
        >
          {pending ? <Loader2 size={10} className="animate-spin" /> : <X size={10} />}
          Request Changes
        </button>
        <button
          onClick={() => setShowNote(!showNote)}
          className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
            showNote ? "bg-white/[0.06] text-white" : "text-dim hover:text-body"
          }`}
          title="Add note"
        >
          <MessageSquare size={10} />
        </button>
      </div>
    </div>
  );
}
