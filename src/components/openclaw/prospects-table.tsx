"use client";

import { useState } from "react";
import { Globe, Phone, Loader2, ChevronRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScoreBadge } from "./score-badge";
import { STATUS_LABELS, STATUS_COLORS, INDUSTRY_LABELS } from "@/lib/openclaw/types";
import type { Prospect, ProspectStatus } from "@/lib/openclaw/types";

interface ProspectsTableProps {
  prospects: Prospect[];
  onSelectProspect: (p: Prospect) => void;
  onProspectUpdated: (p: Prospect) => void;
  onProspectDeleted: (id: string) => void;
}

const STATUS_TABS: { value: ProspectStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "crawled", label: "Crawled" },
  { value: "qualified", label: "Qualified" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
];

export function ProspectsTable({
  prospects,
  onSelectProspect,
  onProspectUpdated,
  onProspectDeleted,
}: ProspectsTableProps) {
  const [activeTab, setActiveTab] = useState<ProspectStatus | "all">("all");
  const [crawlingId, setCrawlingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered =
    activeTab === "all"
      ? prospects
      : prospects.filter((p) => p.status === activeTab);

  async function handleCrawl(prospect: Prospect) {
    if (!prospect.website_url || crawlingId) return;
    setCrawlingId(prospect.id);

    try {
      const res = await fetch("/api/openclaw/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospectId: prospect.id }),
      });
      const data = await res.json();
      if (data.prospect) {
        onProspectUpdated(data.prospect);
      }
    } catch {
      // silent fail — score stays null
    } finally {
      setCrawlingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (deletingId) return;
    setDeletingId(id);

    try {
      await fetch(`/api/openclaw/prospects/${id}`, { method: "DELETE" });
      onProspectDeleted(id);
    } catch {
      // silent fail
    } finally {
      setDeletingId(null);
    }
  }

  if (prospects.length === 0) {
    return (
      <div className="card-premium p-12 text-center">
        <p className="text-[14px] text-dim">No prospects yet. Run a search above to find businesses.</p>
      </div>
    );
  }

  return (
    <div className="card-premium overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-0.5 overflow-x-auto border-b border-white/[0.06] px-4 pt-2 pb-0">
        {STATUS_TABS.map((tab) => {
          const count =
            tab.value === "all"
              ? prospects.length
              : prospects.filter((p) => p.status === tab.value).length;
          if (count === 0 && tab.value !== "all" && tab.value !== activeTab) return null;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "flex items-center gap-1.5 rounded-t-lg px-3 py-2 font-mono text-[11px] transition-colors",
                activeTab === tab.value
                  ? "border-b-2 border-accent text-white"
                  : "text-dim hover:text-body"
              )}
            >
              {tab.label}
              <span className={cn(
                "rounded-full px-1.5 py-[1px] text-[9px]",
                activeTab === tab.value ? "bg-accent/15 text-accent" : "bg-white/[0.05] text-dim"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.04]">
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-dim">Business</th>
              <th className="hidden px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-dim sm:table-cell">Industry</th>
              <th className="hidden px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-dim md:table-cell">Location</th>
              <th className="hidden px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-dim lg:table-cell">Contact</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-dim">Score</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.08em] text-dim">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="group transition-colors hover:bg-white/[0.015]"
              >
                {/* Business */}
                <td className="px-4 py-3">
                  <div>
                    <p className="font-display text-[13px] font-semibold text-white line-clamp-1">
                      {p.business_name}
                    </p>
                    {p.website_url && (
                      <a
                        href={p.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-0.5 flex items-center gap-1 font-mono text-[10px] text-dim transition-colors hover:text-accent"
                      >
                        <Globe size={9} />
                        {new URL(p.website_url.startsWith("http") ? p.website_url : `https://${p.website_url}`).hostname.replace("www.", "")}
                      </a>
                    )}
                  </div>
                </td>

                {/* Industry */}
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span className="font-mono text-[11px] text-dim">
                    {INDUSTRY_LABELS[p.industry] ?? p.industry}
                  </span>
                </td>

                {/* Location */}
                <td className="hidden px-4 py-3 md:table-cell">
                  <span className="font-mono text-[11px] text-dim">
                    {[p.city, p.state].filter(Boolean).join(", ") || "—"}
                  </span>
                </td>

                {/* Contact */}
                <td className="hidden px-4 py-3 lg:table-cell">
                  {p.phone ? (
                    <a
                      href={`tel:${p.phone}`}
                      className="flex items-center gap-1.5 font-mono text-[11px] text-dim transition-colors hover:text-white"
                    >
                      <Phone size={10} />
                      {p.phone}
                    </a>
                  ) : (
                    <span className="font-mono text-[11px] text-white/20">—</span>
                  )}
                </td>

                {/* Score */}
                <td className="px-4 py-3">
                  {p.website_url && p.status === "new" ? (
                    <button
                      onClick={() => handleCrawl(p)}
                      disabled={crawlingId === p.id}
                      className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-[3px] font-mono text-[10px] text-dim transition-colors hover:border-accent/30 hover:bg-accent/[0.04] hover:text-accent disabled:opacity-50"
                    >
                      {crawlingId === p.id ? (
                        <><Loader2 size={9} className="animate-spin" /> Auditing...</>
                      ) : (
                        "Audit site"
                      )}
                    </button>
                  ) : (
                    <ScoreBadge score={p.audit_score} />
                  )}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-[3px] font-mono text-[10px] uppercase tracking-[0.06em]",
                    STATUS_COLORS[p.status]
                  )}>
                    {STATUS_LABELS[p.status]}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => onSelectProspect(p)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-dim transition-colors hover:border-white/[0.12] hover:text-white"
                      title="View details"
                    >
                      <ChevronRight size={12} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deletingId === p.id}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-dim transition-colors hover:border-red-400/30 hover:text-red-400 disabled:opacity-40"
                      title="Delete prospect"
                    >
                      {deletingId === p.id ? (
                        <Loader2 size={11} className="animate-spin" />
                      ) : (
                        <Trash2 size={11} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
