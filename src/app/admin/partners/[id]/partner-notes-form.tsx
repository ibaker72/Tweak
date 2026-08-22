"use client";

import { useState, useTransition } from "react";
import { Loader2, Save, Check } from "lucide-react";
import { updatePartnerApplicationNotes } from "@/lib/admin/actions";

export function PartnerNotesForm({
  applicationId,
  initialNotes,
}: {
  applicationId: string;
  initialNotes: string;
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const dirty = notes !== initialNotes;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    setError(null);
    setSaved(false);
    startTransition(async () => {
      try {
        await updatePartnerApplicationNotes(applicationId, notes);
        setSaved(true);
      } catch {
        setError("Couldn't save your notes. Please try again.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        className="field"
        rows={5}
        placeholder="Context, call notes, why this was approved or rejected..."
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          setSaved(false);
        }}
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending || !dirty}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[11px] font-medium text-dim transition-colors hover:border-white/[0.12] hover:text-body disabled:opacity-40"
        >
          {pending ? (
            <Loader2 size={11} className="animate-spin" />
          ) : (
            <Save size={11} />
          )}
          {pending ? "Saving..." : "Save notes"}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-accent">
            <Check size={10} />
            Saved
          </span>
        )}
        {error && (
          <span role="alert" className="text-[11px] text-red-400">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
