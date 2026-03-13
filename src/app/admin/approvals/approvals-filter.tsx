"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckSquare, FolderKanban } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";

interface ApprovalRow {
  id: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  approved_at: string | null;
  project_id: string;
  projectName: string | null;
  projectIdResolved: string | null;
}

export function ApprovalsFilter({
  approvals,
  projects,
}: {
  approvals: ApprovalRow[];
  projects: { id: string; name: string }[];
}) {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterProject, setFilterProject] = useState("");

  let filtered = approvals;
  if (filterStatus) filtered = filtered.filter((a) => a.status === filterStatus);
  if (filterProject) filtered = filtered.filter((a) => a.project_id === filterProject);

  const pendingCount = approvals.filter((a) => a.status === "pending").length;

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="field !w-auto !py-2 !text-[12px]"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending ({pendingCount})</option>
          <option value="approved">Approved</option>
          <option value="changes_requested">Changes Requested</option>
        </select>
        {projects.length > 1 && (
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="field !w-auto !py-2 !text-[12px]"
          >
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="card-premium">
          <EmptyState icon={<CheckSquare size={18} />} title="No approvals found" description="Create approval requests from project detail pages" />
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((approval) => (
            <div key={approval.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <p className="truncate font-display text-[14px] font-bold tracking-[-0.01em] text-white">
                      {approval.title}
                    </p>
                    <StatusBadge status={approval.status} type="approval" />
                  </div>
                  {approval.description && (
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-body">
                      {approval.description}
                    </p>
                  )}
                </div>
                {approval.projectIdResolved && (
                  <Link
                    href={`/admin/projects/${approval.projectIdResolved}`}
                    className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-dim transition-colors hover:border-white/[0.12] hover:text-body"
                  >
                    <FolderKanban size={10} />
                    {approval.projectName}
                  </Link>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-mono text-[10px] text-dim">
                  Created {new Date(approval.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                {approval.approved_at && (
                  <>
                    <span className="text-white/[0.08]">·</span>
                    <span className="font-mono text-[10px] text-dim">
                      Resolved {new Date(approval.approved_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
