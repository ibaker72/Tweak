import Link from "next/link";
import { MessageSquare, FolderKanban } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";
import { getAllUpdates, getAllProjects } from "@/lib/admin/queries";
import { UpdatesFilter } from "./updates-filter";

export default async function AdminUpdatesPage() {
  const [updates, projects] = await Promise.all([
    getAllUpdates(),
    getAllProjects(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-white">
            Updates
          </h1>
          <p className="mt-1 text-[13px] text-body">
            {updates.length} update{updates.length !== 1 ? "s" : ""} across all projects
          </p>
        </div>
      </div>

      <UpdatesFilter
        updates={updates.map((u) => ({
          id: u.id,
          title: u.title,
          body: u.body,
          created_at: u.created_at,
          project_id: u.project_id,
          authorName: u.author?.full_name || u.author?.email || null,
          projectName: (u.project as { id: string; name: string } | null)?.name ?? null,
          projectIdResolved: (u.project as { id: string; name: string } | null)?.id ?? null,
        }))}
        projects={projects.map((p) => ({ id: p.id, name: p.name }))}
      />
    </div>
  );
}
