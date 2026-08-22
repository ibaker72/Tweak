"use client";

import { useState } from "react";
import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import {
  PARTNER_APPLICATION_STATUSES,
  PARTNER_STATUS_LABELS,
  type PartnerApplicationStatus,
} from "@/lib/partners/types";

interface PartnerRow {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  estimated_referrals: string;
  status: string;
  created_at: string;
}

export function PartnersFilter({ applications }: { applications: PartnerRow[] }) {
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = filterStatus
    ? applications.filter((a) => a.status === filterStatus)
    : applications;

  const countFor = (status: PartnerApplicationStatus) =>
    applications.filter((a) => a.status === status).length;

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="field !w-auto !py-2 !text-[12px]"
        >
          <option value="">All statuses ({applications.length})</option>
          {PARTNER_APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {PARTNER_STATUS_LABELS[status]} ({countFor(status)})
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card-premium">
          <EmptyState
            icon={<Handshake size={18} />}
            title="No applications found"
            description={
              applications.length === 0
                ? "Applications submitted at /partners will appear here"
                : "No applications match this status filter"
            }
          />
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((application) => (
            <Link
              key={application.id}
              href={`/admin/partners/${application.id}`}
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <p className="truncate font-display text-[14px] font-bold tracking-[-0.01em] text-white">
                      {application.full_name}
                    </p>
                    <StatusBadge status={application.status} type="partner" />
                  </div>
                  <p className="mt-1 truncate font-mono text-[11px] text-dim">
                    {application.email}
                    {application.company ? ` · ${application.company}` : ""}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="mt-1 flex-shrink-0 text-dim transition-colors group-hover:text-body"
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] text-dim">
                  {application.estimated_referrals} referrals/quarter
                </span>
                <span className="text-white/[0.08]">·</span>
                <span className="font-mono text-[10px] text-dim">
                  {new Date(application.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
