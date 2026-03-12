import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  Layers,
  Milestone,
  AlertCircle,
  Rocket,
  Activity,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  FolderOpen,
  ArrowRight,
  Inbox,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserProjects, getProjectDashboard } from "@/lib/portal/queries";
import { StatusBadge } from "@/components/portal/status-badge";
import { ProgressRing } from "@/components/portal/progress-ring";
import { PortalCard } from "@/components/portal/portal-card";
import { SummaryCard } from "@/components/portal/summary-card";
import { MilestoneTimeline } from "@/components/portal/milestone-timeline";
import { UpdatesFeed } from "@/components/portal/updates-feed";
import { TaskList } from "@/components/portal/task-list";
import { FileList } from "@/components/portal/file-list";
import { ApprovalList } from "@/components/portal/approval-list";
import { EmptyState } from "@/components/portal/empty-state";
import { ProjectSwitcher } from "@/components/portal/project-switcher";

interface PageProps {
  searchParams: Promise<{ project?: string }>;
}

export default async function ClientPortalPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const projects = await getUserProjects();

  if (projects.length === 0) {
    return <NoProjectState />;
  }

  const params = await searchParams;
  const activeProjectId = params.project || projects[0].id;
  const dashboard = await getProjectDashboard(activeProjectId);

  if (!dashboard) {
    return <NoProjectState />;
  }

  const { project, milestones, updates, completedTasks, clientActions, launchChecks, files, approvals } = dashboard;

  // Derived metrics
  const nextMilestone = milestones.find((m) => m.status !== "completed");
  const pendingActions = clientActions.filter((t) => !t.is_done).length;
  const launchDone = launchChecks.filter((t) => t.is_done).length;
  const launchTotal = launchChecks.length;
  const pendingApprovals = approvals.filter((a) => a.status === "pending").length;

  const statusLabels: Record<string, string> = {
    planning: "Planning",
    design: "Design",
    development: "Development",
    revisions: "Revisions",
    launch_prep: "Launch Prep",
    live: "Live",
  };

  return (
    <div>
      {/* Project switcher for multi-project users */}
      {projects.length > 1 && (
        <div className="mb-6">
          <Suspense fallback={null}>
            <ProjectSwitcher projects={projects} activeProjectId={activeProjectId} />
          </Suspense>
        </div>
      )}

      {/* ─── Project Header ─── */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2.5">
            <h1 className="font-display text-[24px] font-bold tracking-[-0.03em] text-white sm:text-[28px]">
              {project.name}
            </h1>
            <StatusBadge status={project.status} type="project" />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-dim">
            {project.client_company && <span>{project.client_company}</span>}
            {project.launch_window && (
              <>
                <span className="text-white/10">|</span>
                <span>Launch: {project.launch_window}</span>
              </>
            )}
          </div>
        </div>
        <ProgressRing percent={project.completion_percent} />
      </div>

      {/* ─── Summary Grid ─── */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Current Phase"
          value={statusLabels[project.status] || project.status}
          icon={<Layers size={18} />}
        />
        <SummaryCard
          label="Next Milestone"
          value={nextMilestone?.title ?? "All complete"}
          icon={<Milestone size={18} />}
        />
        <SummaryCard
          label="Action Required"
          value={pendingActions > 0 ? `${pendingActions} item${pendingActions > 1 ? "s" : ""}` : "None"}
          icon={<AlertCircle size={18} />}
          accent={pendingActions > 0}
        />
        <SummaryCard
          label="Launch Readiness"
          value={launchTotal > 0 ? `${launchDone}/${launchTotal}` : "N/A"}
          icon={<Rocket size={18} />}
        />
      </div>

      {/* ─── Main Grid ─── */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-5 lg:col-span-2">
          {/* Milestones */}
          <PortalCard title="Milestones" icon={<Milestone size={13} />}>
            {milestones.length > 0 ? (
              <MilestoneTimeline milestones={milestones} />
            ) : (
              <EmptyState icon={<Milestone size={16} />} title="No milestones yet" description="Milestones will appear here as your project progresses." />
            )}
          </PortalCard>

          {/* Recent Updates */}
          <PortalCard title="Recent Updates" icon={<Activity size={13} />}>
            {updates.length > 0 ? (
              <UpdatesFeed updates={updates} />
            ) : (
              <EmptyState icon={<Activity size={16} />} title="No updates yet" description="Project updates will appear here." />
            )}
          </PortalCard>

          {/* Completed Work */}
          <PortalCard title="Completed Work" icon={<CheckCircle2 size={13} />}>
            {completedTasks.length > 0 ? (
              <TaskList tasks={completedTasks} />
            ) : (
              <EmptyState icon={<CheckCircle2 size={16} />} title="No completed work yet" description="Completed deliverables will be listed here." />
            )}
          </PortalCard>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Client Actions */}
          <PortalCard
            title="Action Required"
            icon={<AlertCircle size={13} />}
            action={
              pendingActions > 0 ? (
                <span className="rounded-full bg-gold/10 px-2 py-[2px] font-mono text-[10px] text-gold">
                  {pendingActions}
                </span>
              ) : null
            }
          >
            {clientActions.length > 0 ? (
              <TaskList tasks={clientActions} variant="action" />
            ) : (
              <EmptyState icon={<AlertCircle size={16} />} title="No actions needed" description="You're all caught up." />
            )}
          </PortalCard>

          {/* Launch Readiness */}
          <PortalCard
            title="Launch Checklist"
            icon={<ClipboardCheck size={13} />}
            action={
              launchTotal > 0 ? (
                <span className="font-mono text-[10px] text-dim">
                  {launchDone}/{launchTotal}
                </span>
              ) : null
            }
          >
            {launchChecks.length > 0 ? (
              <TaskList tasks={launchChecks} variant="checklist" />
            ) : (
              <EmptyState icon={<Rocket size={16} />} title="No launch checks yet" description="Launch readiness items will appear here." />
            )}
          </PortalCard>

          {/* Files Preview */}
          <PortalCard
            title="Project Files"
            icon={<FolderOpen size={13} />}
            action={
              files.length > 0 ? (
                <Link href="/client-portal/files" className="flex items-center gap-1 text-[11px] text-accent/70 transition-colors hover:text-accent">
                  View all <ArrowRight size={10} />
                </Link>
              ) : null
            }
          >
            {files.length > 0 ? (
              <FileList files={files} compact />
            ) : (
              <EmptyState icon={<FileText size={16} />} title="No files yet" description="Project files will appear here when uploaded." />
            )}
          </PortalCard>

          {/* Approvals Preview */}
          <PortalCard
            title="Approvals"
            icon={<CheckCircle2 size={13} />}
            action={
              approvals.length > 0 ? (
                <Link href="/client-portal/approvals" className="flex items-center gap-1 text-[11px] text-accent/70 transition-colors hover:text-accent">
                  View all <ArrowRight size={10} />
                </Link>
              ) : null
            }
          >
            {approvals.length > 0 ? (
              <ApprovalList approvals={approvals} compact />
            ) : (
              <EmptyState icon={<CheckCircle2 size={16} />} title="No approvals yet" description="Approval requests will appear here." />
            )}
            {pendingApprovals > 0 && (
              <div className="mt-3 rounded-lg bg-gold/[0.04] px-3 py-2 text-center font-mono text-[10px] text-gold">
                {pendingApprovals} pending approval{pendingApprovals > 1 ? "s" : ""} awaiting review
              </div>
            )}
          </PortalCard>
        </div>
      </div>
    </div>
  );
}

function NoProjectState() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03]">
          <Inbox size={24} className="text-dim" />
        </div>
        <h2 className="font-display text-[20px] font-bold text-white">No projects yet</h2>
        <p className="mt-2 max-w-[320px] text-[13px] text-body">
          Your project dashboard will appear here once your team sets up your project. Hang tight.
        </p>
        <Link href="/" className="btn-o mx-auto mt-6 !px-5 !py-2 !text-[12px]">
          Back to tweakandbuild.com
        </Link>
      </div>
    </div>
  );
}
