"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, FolderKanban } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";

interface UpdateRow {
  id: string;
  title: string;
  body: string | null;
  created_at: string;
  project_id: string;
  authorName: string | null;
  projectName: string | null;
  projectIdResolved: string | null;
}

interface Props {
  updates: UpdateRow[];
  projects: { id: string; name: string }[];
}

export function UpdatesFilter({ updates, projects }: Props) {
  const [filterProject, setFilterProject] = useState("");

  const filtered = filterProject
    ? updates.filter((u) => u.project_id === filterProject)
    : updates;

  return (
    <>
      {projects.length > 1 && (
        <div className="flex items-center gap-3">
          <label className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
            Filter by project
          </label>
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
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="card-premium">
          <EmptyState icon={<MessageSquare size={18} />} title="No updates" description="Post an update from a project detail page" />
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((update) => (
            <div key={update.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[14px] font-bold tracking-[-0.01em] text-white">
                    {update.title}
                  </p>
                  {update.body && (
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-body">
                      {update.body}
                    </p>
                  )}
                </div>
                {update.projectIdResolved && (
                  <Link
                    href={`/admin/projects/${update.projectIdResolved}`}
                    className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-dim transition-colors hover:border-white/[0.12] hover:text-body"
                  >
                    <FolderKanban size={10} />
                    {update.projectName}
                  </Link>
                )}
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="font-mono text-[10px] text-dim">
                  {new Date(update.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                {update.authorName && (
                  <>
                    <span className="text-white/[0.08]">·</span>
                    <span className="font-mono text-[10px] text-dim">{update.authorName}</span>
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
