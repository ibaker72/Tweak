import Link from "next/link";
import { FolderKanban, ArrowRight, Plus } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import { getAllProjects, getProjectMemberCounts } from "@/lib/admin/queries";
import { NewProjectButton } from "./new-project-button";

export default async function AdminProjectsPage() {
  const [projects, memberCounts] = await Promise.all([
    getAllProjects(),
    getProjectMemberCounts(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-white">
            Projects
          </h1>
          <p className="mt-1 text-[13px] text-body">
            {projects.length} project{projects.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <NewProjectButton />
      </div>

      {projects.length === 0 ? (
        <div className="card-premium">
          <EmptyState
            icon={<FolderKanban size={18} />}
            title="No projects yet"
            description="Create your first project to get started"
          />
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}`}
              className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4 transition-all hover:border-white/[0.1] hover:bg-white/[0.025]"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <p className="truncate font-display text-[14px] font-bold tracking-[-0.01em] text-white">
                    {project.name}
                  </p>
                  <StatusBadge status={project.status} type="project" />
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  {project.client_company && (
                    <span className="font-mono text-[11px] text-dim">
                      {project.client_company}
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-dim">
                    {memberCounts[project.id] ?? 0} member{(memberCounts[project.id] ?? 0) !== 1 ? "s" : ""}
                  </span>
                  {project.launch_window && (
                    <span className="font-mono text-[11px] text-dim">
                      Launch: {project.launch_window}
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-dim">
                    Updated {new Date(project.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 pl-4">
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${project.completion_percent}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-dim">
                    {project.completion_percent}%
                  </span>
                </div>
                <ArrowRight size={14} className="text-dim" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
