import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Milestone,
  MessageSquare,
  ListTodo,
  FileText,
  CheckSquare,
} from "lucide-react";
import { PortalCard } from "@/components/portal/portal-card";
import { StatusBadge } from "@/components/portal/status-badge";
import { ProgressRing } from "@/components/portal/progress-ring";
import { EmptyState } from "@/components/portal/empty-state";
import {
  getProjectById,
  getProjectMembers,
  getEligibleMembers,
  getProjectMilestones,
  getProjectUpdates,
  getProjectTasks,
  getProjectFiles,
  getProjectApprovals,
} from "@/lib/admin/queries";
import { ProjectEditForm } from "./project-edit-form";
import { MembersSection } from "./members-section";
import { AddMemberForm } from "./add-member-form";
import { MilestoneForm } from "./milestone-form";
import { FileUploadForm } from "./file-upload-form";
import { InviteClientForm } from "./invite-client-form";
import { UpdateForm } from "./update-form";
import { TaskForm } from "./task-form";
import { ApprovalForm } from "./approval-form";
import { TaskRow } from "./task-row";
import { ApprovalRow } from "./approval-row";

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  const [members, eligibleUsers, milestones, updates, tasks, files, approvals] = await Promise.all([
    getProjectMembers(id),
    getEligibleMembers(id),
    getProjectMilestones(id),
    getProjectUpdates(id),
    getProjectTasks(id),
    getProjectFiles(id),
    getProjectApprovals(id),
  ]);

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div>
        <Link
          href="/admin/projects"
          className="mb-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-dim transition-colors hover:text-body"
        >
          <ArrowLeft size={12} />
          Back to Projects
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <ProgressRing percent={project.completion_percent} size={52} />
            <div>
              <h1 className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-white sm:text-[26px]">
                {project.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <StatusBadge status={project.status} type="project" />
                {project.client_company && (
                  <span className="font-mono text-[11px] text-dim">{project.client_company}</span>
                )}
                {project.launch_window && (
                  <span className="font-mono text-[11px] text-dim">Launch: {project.launch_window}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <ProjectEditForm project={project} />
        <InviteClientForm projectId={id} />
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Members */}
        <PortalCard title="Members" icon={<Users size={14} />} action={<AddMemberForm projectId={id} eligibleUsers={eligibleUsers} />}>
          <MembersSection projectId={id} members={members} />
        </PortalCard>

        {/* Milestones */}
        <PortalCard
          title="Milestones"
          icon={<Milestone size={14} />}
          action={<MilestoneForm projectId={id} />}
        >
          {milestones.length === 0 ? (
            <EmptyState icon={<Milestone size={18} />} title="No milestones" description="Add milestones to track progress" />
          ) : (
            <div className="space-y-2">
              {milestones.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.01] px-3 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-white">{m.title}</p>
                    {m.due_date && (
                      <p className="mt-0.5 font-mono text-[10px] text-dim">
                        Due {new Date(m.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    )}
                  </div>
                  <StatusBadge status={m.status} type="milestone" />
                </div>
              ))}
            </div>
          )}
        </PortalCard>
      </div>

      {/* Updates */}
      <PortalCard
        title="Updates"
        icon={<MessageSquare size={14} />}
        action={<UpdateForm projectId={id} />}
      >
        {updates.length === 0 ? (
          <EmptyState icon={<MessageSquare size={18} />} title="No updates" description="Post an update for this project" />
        ) : (
          <div className="space-y-2.5">
            {updates.map((u) => (
              <div key={u.id} className="rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3">
                <p className="font-display text-[13px] font-semibold text-white">{u.title}</p>
                {u.body && <p className="mt-1 line-clamp-2 text-[12px] text-body">{u.body}</p>}
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-dim">
                    {new Date(u.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  {u.author && (
                    <>
                      <span className="text-white/[0.08]">·</span>
                      <span className="font-mono text-[10px] text-dim">{u.author.full_name || u.author.email}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </PortalCard>

      {/* Tasks + Approvals grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tasks */}
        <PortalCard
          title="Tasks"
          icon={<ListTodo size={14} />}
          action={<TaskForm projectId={id} />}
        >
          {tasks.length === 0 ? (
            <EmptyState icon={<ListTodo size={18} />} title="No tasks" description="Create tasks for this project" />
          ) : (
            <div className="space-y-1.5">
              {tasks.map((t) => (
                <TaskRow key={t.id} task={t} projectId={id} />
              ))}
            </div>
          )}
        </PortalCard>

        {/* Approvals */}
        <PortalCard
          title="Approvals"
          icon={<CheckSquare size={14} />}
          action={<ApprovalForm projectId={id} />}
        >
          {approvals.length === 0 ? (
            <EmptyState icon={<CheckSquare size={18} />} title="No approvals" description="Create an approval request" />
          ) : (
            <div className="space-y-2">
              {approvals.map((a) => (
                <ApprovalRow key={a.id} approval={a} projectId={id} />
              ))}
            </div>
          )}
        </PortalCard>
      </div>

      {/* Files */}
      <PortalCard title="Files" icon={<FileText size={14} />} action={<FileUploadForm projectId={id} />}>
        {files.length === 0 ? (
          <EmptyState icon={<FileText size={18} />} title="No files" description="Files will appear here when added" />
        ) : (
          <div className="space-y-2">
            {files.map((f) => (
              <div key={f.id} className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.01] px-3 py-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-dim">
                  <FileText size={13} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium text-white">{f.file_name}</p>
                  <p className="font-mono text-[10px] text-dim">
                    {f.file_type ?? "file"} · {new Date(f.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </PortalCard>
    </div>
  );
}
