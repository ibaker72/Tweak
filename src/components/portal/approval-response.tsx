"use client";

import { useState, useTransition } from "react";
import { Check, X, Loader2, MessageSquare } from "lucide-react";
import { recordApprovalDecision } from "@/lib/admin/actions";
import type { ProjectApproval } from "@/lib/portal/types";

export function ApprovalResponse({ approval }: { approval: ProjectApproval }) {
  const [pending, startTransition] = useTransition();
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Only render the controls when the item is still pending. After a decision
  // is recorded the parent list rerenders from server-fetched data, so this
  // component goes away.
  if (approval.status !== "pending") return null;

  function handle(decision: "approved" | "changes_requested") {
    setError(null);
    startTransition(async () => {
      try {
        await recordApprovalDecision(approval.id, decision, note || undefined);
        setNote("");
        setShowNote(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  return (
    <div className="mt-3 space-y-2">
      {showNote && (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a comment (optional for approve, encouraged for changes)…"
          rows={2}
          className="field !text-[12px] !py-2"
          disabled={pending}
        />
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => handle("approved")}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent-muted px-3 py-1.5 text-[11px] font-medium text-accent transition-colors hover:border-accent/50 hover:bg-accent/20 disabled:opacity-50"
        >
          {pending ? <Loader2 size={10} className="animate-spin" /> : <Check size={10} />}
          Approve
        </button>
        <button
          type="button"
          onClick={() => handle("changes_requested")}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gold/25 bg-gold/[0.08] px-3 py-1.5 text-[11px] font-medium text-gold transition-colors hover:border-gold/40 hover:bg-gold/[0.15] disabled:opacity-50"
        >
          {pending ? <Loader2 size={10} className="animate-spin" /> : <X size={10} />}
          Request Changes
        </button>
        <button
          type="button"
          onClick={() => setShowNote((v) => !v)}
          className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
            showNote ? "bg-white/[0.06] text-white" : "text-dim hover:text-body"
          }`}
          title={showNote ? "Hide comment" : "Add comment"}
          aria-label={showNote ? "Hide comment" : "Add comment"}
        >
          <MessageSquare size={10} />
        </button>
      </div>
      {error && (
        <p className="font-mono text-[11px] text-gold" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
