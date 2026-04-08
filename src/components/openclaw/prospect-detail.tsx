"use client";

import { useState } from "react";
import { X, Globe, Phone, MapPin, Star, ExternalLink, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScoreBadge } from "./score-badge";
import { STATUS_LABELS, STATUS_COLORS, INDUSTRY_LABELS } from "@/lib/openclaw/types";
import type { Prospect, ProspectStatus } from "@/lib/openclaw/types";

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

  // Sync state when prospect changes
  if (prospect && notes !== (prospect.notes || "") && !saving) {
    setNotes(prospect.notes || "");
  }
  if (prospect && status !== prospect.status && !saving) {
    setStatus(prospect.status);
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
        body: JSON.stringify({ status, notes }),
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
