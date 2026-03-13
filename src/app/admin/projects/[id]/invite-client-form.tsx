"use client";

import { useState, useTransition } from "react";
import { Send, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { inviteClientToProject } from "@/lib/admin/actions";

export function InviteClientForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setResult(null);

    startTransition(async () => {
      try {
        const res = await inviteClientToProject(projectId, {
          email: fd.get("email") as string,
          full_name: (fd.get("full_name") as string) || undefined,
          member_role: (fd.get("member_role") as "client" | "team") || "client",
        });

        if (res.status === "attached" && res.message.includes("already")) {
          setResult({ type: "info", message: res.message });
        } else {
          setResult({ type: "success", message: res.message });
          // Reset form after short delay
          setTimeout(() => {
            setOpen(false);
            setResult(null);
          }, 2000);
        }
      } catch (err) {
        setResult({ type: "error", message: err instanceof Error ? err.message : "Failed to invite" });
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/[0.06] px-3 py-1.5 text-[11px] font-medium text-accent transition-colors hover:bg-accent/10"
      >
        <Send size={11} />
        Invite Client
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface-0/80 backdrop-blur-sm" onClick={() => !pending && setOpen(false)} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-surface-1 p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-[16px] font-bold tracking-[-0.01em] text-white">
            Invite Client
          </h3>
          {!pending && (
            <button onClick={() => { setOpen(false); setResult(null); }} className="text-dim hover:text-body">
              <X size={14} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
              Client Email *
            </label>
            <input name="email" type="email" required className="field" placeholder="client@company.com" />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
              Full Name
            </label>
            <input name="full_name" className="field" placeholder="Jane Smith" />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
              Role
            </label>
            <select name="member_role" className="field">
              <option value="client">Client</option>
              <option value="team">Team</option>
            </select>
          </div>

          {result && (
            <div className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 ${
              result.type === "success"
                ? "border-emerald-500/20 bg-emerald-500/[0.04]"
                : result.type === "info"
                ? "border-gold/20 bg-gold/[0.04]"
                : "border-red-400/20 bg-red-400/[0.04]"
            }`}>
              {result.type === "success" ? (
                <CheckCircle size={14} className="mt-0.5 flex-shrink-0 text-emerald-400" />
              ) : result.type === "info" ? (
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0 text-gold" />
              ) : (
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0 text-red-400" />
              )}
              <p className={`text-[12px] ${
                result.type === "success" ? "text-emerald-400" : result.type === "info" ? "text-gold" : "text-red-400"
              }`}>
                {result.message}
              </p>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => { setOpen(false); setResult(null); }}
              disabled={pending}
              className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[11px] font-medium text-surface-0 disabled:opacity-50"
            >
              {pending ? <Loader2 size={11} className="animate-spin" /> : <Send size={11} />}
              Send Invite
            </button>
          </div>
        </form>

        <p className="mt-4 text-center font-mono text-[10px] text-dim">
          If the user exists, they&apos;ll be added directly. Otherwise, a magic link invite will be sent.
        </p>
      </div>
    </div>
  );
}
