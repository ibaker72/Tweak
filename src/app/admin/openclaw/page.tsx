"use client";

import { useState, useEffect, useCallback } from "react";
import { Crosshair, RefreshCw } from "lucide-react";
import { SearchForm } from "@/components/openclaw/search-form";
import { ProspectsTable } from "@/components/openclaw/prospects-table";
import { ProspectDetail } from "@/components/openclaw/prospect-detail";
import type { Prospect } from "@/lib/openclaw/types";

export default function OpenClawPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastSearch, setLastSearch] = useState<{ inserted: number; skipped: number } | null>(null);

  const fetchProspects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/openclaw/prospects?limit=100");
      const data = await res.json();
      setProspects(data.prospects ?? []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProspects();
  }, [fetchProspects]);

  function handleSearchResults(
    newProspects: Prospect[],
    summary: { inserted: number; skipped: number }
  ) {
    setLastSearch(summary);
    // Merge new prospects at the top, replacing any existing ones by id
    setProspects((prev: Prospect[]) => {
      const existingIds = new Set(prev.map((p: Prospect) => p.id));
      const fresh = newProspects.filter((p: Prospect) => !existingIds.has(p.id));
      return [...fresh, ...prev];
    });
  }

  function handleProspectUpdated(updated: Prospect) {
    setProspects((prev: Prospect[]) => prev.map((p: Prospect) => (p.id === updated.id ? updated : p)));
    if (selectedProspect?.id === updated.id) {
      setSelectedProspect(updated);
    }
  }

  function handleProspectDeleted(id: string) {
    setProspects((prev: Prospect[]) => prev.filter((p: Prospect) => p.id !== id));
    if (selectedProspect?.id === id) {
      setSelectedProspect(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Crosshair size={14} />
            </div>
            <h1 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-white sm:text-[28px]">
              OpenClaw
            </h1>
          </div>
          <p className="mt-1 text-[13px] text-body">
            Find and qualify B2B prospects from Google Places
          </p>
        </div>
        <button
          onClick={fetchProspects}
          className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-dim transition-colors hover:text-white"
        >
          <RefreshCw size={11} />
          Refresh
        </button>
      </div>

      {/* Search form */}
      <SearchForm onResults={handleSearchResults} />

      {/* Search summary */}
      {lastSearch && (
        <div className="rounded-lg border border-accent/15 bg-accent/[0.04] px-4 py-2.5 font-mono text-[11px] text-accent">
          Search complete — {lastSearch.inserted} new prospect{lastSearch.inserted !== 1 ? "s" : ""} added
          {lastSearch.skipped > 0 && `, ${lastSearch.skipped} already in database`}.
        </div>
      )}

      {/* Prospects table */}
      {loading ? (
        <div className="card-premium p-12 text-center">
          <p className="text-[13px] text-dim">Loading prospects...</p>
        </div>
      ) : (
        <ProspectsTable
          prospects={prospects}
          onSelectProspect={setSelectedProspect}
          onProspectUpdated={handleProspectUpdated}
          onProspectDeleted={handleProspectDeleted}
        />
      )}

      {/* Prospect detail slide-over */}
      <ProspectDetail
        prospect={selectedProspect}
        onClose={() => setSelectedProspect(null)}
        onUpdated={handleProspectUpdated}
      />
    </div>
  );
}
