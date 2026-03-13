import Link from "next/link";
import { CheckSquare, FolderKanban } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";
import { getAllApprovals, getAllProjects } from "@/lib/admin/queries";
import { ApprovalsFilter } from "./approvals-filter";

export default async function AdminApprovalsPage() {
  const [approvals, projects] = await Promise.all([
    getAllApprovals(),
    getAllProjects(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-white">
          Approvals
        </h1>
        <p className="mt-1 text-[13px] text-body">
          {approvals.length} approval{approvals.length !== 1 ? "s" : ""} across all projects
        </p>
      </div>

      <ApprovalsFilter
        approvals={approvals.map((a) => ({
          id: a.id,
          title: a.title,
          description: a.description,
          status: a.status,
          created_at: a.created_at,
          approved_at: a.approved_at,
          project_id: a.project_id,
          projectName: (a.project as { id: string; name: string } | null)?.name ?? null,
          projectIdResolved: (a.project as { id: string; name: string } | null)?.id ?? null,
        }))}
        projects={projects.map((p) => ({ id: p.id, name: p.name }))}
      />
    </div>
  );
}
