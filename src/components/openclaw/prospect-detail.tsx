"use client";

import { useEffect, useState } from "react";
import { X, Globe, Phone, MapPin, Star, ExternalLink, Loader2, ArrowRight, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScoreBadge } from "./score-badge";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  INDUSTRY_LABELS,
  DEAL_STAGES,
  DEAL_STAGE_LABELS,
} from "@/lib/openclaw/types";
import type { Prospect, ProspectStatus, DealStage, OutreachRecord } from "@/lib/openclaw/types";

interface ProspectDetailProps {
  prospect: Prospect | null;
  onClose: () => void;
  onUpdated: (p: Prospect) => void;
}

const ALL_STATUSES: ProspectStatus[] = ["new", "crawled", "qualified", "contacted", "converted", "rejected"];

export function ProspectDetail({ prospect, onClose, onUpdated }: ProspectDetailProps) {
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState(prospect?.notes || "");
  const [status, setStatus] = useState<ProspectStatus>(prospect?.status ?? "new");
  const [email, setEmail] = useState(prospect?.email || "");
  const [contactName, setContactName] = useState(prospect?.contact_name || "");
  const [dealStage, setDealStage] = useState<DealStage>(prospect?.deal_stage ?? "lead");
  const [outreachHistory, setOutreachHistory] = useState<OutreachRecord[]>([]);
  const [draftBusy, setDraftBusy] = useState<"draft" | "send" | null>(null);
  const [draftPreview, setDraftPreview] = useState<{ subject: string; body: string } | null>(null);
  const [draftError, setDraftError] = useState<string | null>(null);

  const prospectId = prospect?.id;
  useEffect(() => {
    if (!prospectId) return;
    let cancelled = false;
    fetch(`/api/openclaw/prospects/${prospectId}/outreach`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setOutreachHistory(d.outreach || []);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [prospectId]);

  // Sync state when prospect changes
  if (prospect && notes !== (prospect.notes || "") && !saving) {
    setNotes(prospect.notes || "");
  }
  if (prospect && status !== prospect.status && !saving) {
    setStatus(prospect.status);
  }
  if (prospect && email !== (prospect.email || "") && !saving) {
    setEmail(prospect.email || "");
  }
  if (prospect && contactName !== (prospect.contact_name || "") && !saving) {
    setContactName(prospect.contact_name || "");
  }
  if (prospect && dealStage !== prospect.deal_stage && !saving) {
    setDealStage(prospect.deal_stage);
  }

  if (!prospect) return null;

  const auditResult = prospect.audit_result_json as Record<string, unknown> | null;
  const topIssues = auditResult
    ? ((auditResult.topWeaknesses as Array<{ title: string; severity: string }>) || []).slice(0, 4)
    : [];
  const quickWins = auditResult
    ? ((auditResult.quickWins as Array<{ title: string }>) || []).slice(0, 3)
    : [];

  async function handleSave() {
    if (!prospect || saving) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/openclaw/prospects/${prospect.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          notes,
          email: email || "",
          contact_name: contactName,
          deal_stage: dealStage,
        }),
      });
      const data = await res.json();
      if (data.prospect) {
        onUpdated(data.prospect);
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  }

  async function handleDraftOrSend(send: boolean) {
    if (!prospect) return;
    setDraftBusy(send ? "send" : "draft");
    setDraftError(null);
    try {
      const res = await fetch(`/api/openclaw/prospects/${prospect.id}/outreach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: send ? "send_draft" : "draft", send }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDraftError(data.error || "Failed");
        return;
      }
      if (data.draft) setDraftPreview(data.draft);
      // refresh history
      const h = await fetch(`/api/openclaw/prospects/${prospect.id}/outreach`).then((r) => r.json());
      setOutreachHistory(h.outreach || []);
    } catch (err) {
      setDraftError(err instanceof Error ? err.message : "Network error");
    } finally {
      setDraftBusy(null);
    }
  }

  const contactUrl = `/contact?company=${encodeURIComponent(prospect.business_name)}&website=${encodeURIComponent(prospect.website_url || "")}`;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[480px] flex-col overflow-hidden border-l border-white/[0.06] bg-surface-0 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
          <div className="min-w-0">
            <h2 className="truncate font-display text-[16px] font-extrabold tracking-[-0.02em] text-white">
              {prospect.business_name}
            </h2>
            <p className="mt-0.5 font-mono text-[11px] text-dim">
              {INDUSTRY_LABELS[prospect.industry]}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-dim transition-colors hover:text-white"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Contact info */}
          <div className="space-y-2">
            {prospect.address && (
              <div className="flex items-start gap-2.5 text-[13px] text-body">
                <MapPin size={13} className="mt-0.5 flex-shrink-0 text-dim" />
                {prospect.address}
              </div>
            )}
            {prospect.phone && (
              <a href={`tel:${prospect.phone}`} className="flex items-center gap-2.5 text-[13px] text-body transition-colors hover:text-white">
                <Phone size={13} className="flex-shrink-0 text-dim" />
                {prospect.phone}
              </a>
            )}
            {prospect.website_url && (
              <a
                href={prospect.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[13px] text-accent transition-colors hover:text-accent/80"
              >
                <Globe size={13} className="flex-shrink-0" />
                {prospect.website_url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                <ExternalLink size={10} />
              </a>
            )}
            {prospect.google_rating && (
              <div className="flex items-center gap-2.5 text-[13px] text-body">
                <Star size={13} className="flex-shrink-0 text-gold" />
                {prospect.google_rating} / 5{" "}
                {prospect.google_review_count ? (
                  <span className="text-dim">({prospect.google_review_count} reviews)</span>
                ) : null}
              </div>
            )}
          </div>

          {/* Audit score */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-[12px] font-bold text-white">Audit Score</p>
              <ScoreBadge score={prospect.audit_score} />
            </div>

            {topIssues.length > 0 && (
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-dim">Top Issues</p>
                <div className="space-y-1.5">
                  {topIssues.map((issue, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px]">
                      <span className={cn(
                        "mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full",
                        issue.severity === "critical" ? "bg-red-400" :
                        issue.severity === "important" ? "bg-gold" : "bg-dim"
                      )} />
                      <span className="text-body">{issue.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {quickWins.length > 0 && (
              <div className="mt-3 border-t border-white/[0.04] pt-3">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-dim">Quick Wins</p>
                <div className="space-y-1.5">
                  {quickWins.map((win, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px]">
                      <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span className="text-body">{win.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!prospect.audit_result_json && (
              <p className="text-[12px] text-dim">
                No audit yet.{" "}
                {prospect.website_url
                  ? "Use the Audit Site button in the table."
                  : "No website URL found for this prospect."}
              </p>
            )}
          </div>

          {/* Contact + deal pipeline */}
          <div className="space-y-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2">
              <Mail size={12} className="text-accent" />
              <span className="font-display text-[12px] font-bold text-white">Contact &amp; pipeline</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.08em] text-dim">
                  Contact name
                </label>
                <input
                  type="text"
                  className="field w-full"
                  placeholder="First Last"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.08em] text-dim">
                  Email
                </label>
                <input
                  type="email"
                  className="field w-full"
                  placeholder="contact@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.08em] text-dim">
                Deal stage
              </label>
              <select
                value={dealStage}
                onChange={(e) => setDealStage(e.target.value as DealStage)}
                className="field w-full"
              >
                {DEAL_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {DEAL_STAGE_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDraftOrSend(false)}
                disabled={draftBusy !== null}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 font-mono text-[11px] text-body transition-colors hover:text-white disabled:opacity-40"
              >
                {draftBusy === "draft" ? <Loader2 size={11} className="animate-spin" /> : <Mail size={11} />}
                Draft with Claude
              </button>
              <button
                onClick={() => handleDraftOrSend(true)}
                disabled={draftBusy !== null || !email}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-accent/30 bg-accent/[0.06] px-3 py-2 font-mono text-[11px] text-accent transition-colors hover:bg-accent/[0.1] disabled:opacity-40"
                title={!email ? "Add an email first" : "Draft + send via Resend"}
              >
                {draftBusy === "send" ? <Loader2 size={11} className="animate-spin" /> : <Send size={11} />}
                Draft + Send
              </button>
            </div>
            {draftError && (
              <p className="rounded-lg border border-red-400/15 bg-red-400/[0.06] px-3 py-2 font-mono text-[10px] text-red-400">
                {draftError}
              </p>
            )}
            {draftPreview && (
              <div className="rounded-lg border border-white/[0.06] bg-black/30 p-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">Subject</div>
                <div className="mt-1 text-[12px] text-white">{draftPreview.subject}</div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-dim">Body</div>
                <pre className="mt-1 whitespace-pre-wrap font-sans text-[12px] leading-[1.55] text-body">{draftPreview.body}</pre>
              </div>
            )}
          </div>

          {/* Outreach history */}
          {outreachHistory.length > 0 && (
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">Outreach history</p>
              <div className="space-y-1.5">
                {outreachHistory.slice(0, 8).map((o) => (
                  <div
                    key={o.id}
                    className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-[11px] text-body"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-white">{o.subject || o.kind}</span>
                      <span className={cn(
                        "flex-shrink-0 font-mono text-[10px]",
                        o.status === "sent" || o.status === "opened" || o.status === "clicked" ? "text-emerald-400" :
                        o.status === "replied" ? "text-accent" :
                        o.status === "bounced" || o.status === "complained" || o.status === "failed" ? "text-red-400" : "text-dim"
                      )}>
                        {o.status}
                      </span>
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-dim">
                      {o.kind} · {new Date(o.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProspectStatus)}
              className="field w-full"
            >
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
              Notes
            </label>
            <textarea
              className="field min-h-[96px] w-full resize-y"
              placeholder="Add notes about this prospect..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Outreach link */}
          {prospect.website_url && (
            <a
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-o flex w-full items-center justify-center gap-2 !py-2.5 !text-[13px]"
            >
              Send audit to this prospect
              <ArrowRight size={13} />
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] px-6 py-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-v flex w-full items-center justify-center gap-2 !py-2.5 !text-[13px] disabled:opacity-50"
          >
            {saving ? (
              <><Loader2 size={13} className="animate-spin" /> Saving...</>
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
