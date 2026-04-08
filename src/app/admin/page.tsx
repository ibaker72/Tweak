import Link from "next/link";
import {
  FolderKanban,
  Zap,
  Clock,
  CheckSquare,
  Users,
  ListTodo,
  MessageSquare,
  FileText,
  ArrowRight,
  Plus,
  Crosshair,
} from "lucide-react";
import { SummaryCard } from "@/components/portal/summary-card";
import { PortalCard } from "@/components/portal/portal-card";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import { getAdminStats, getRecentUpdates, getRecentFiles, getAllProjects, getProspectStats } from "@/lib/admin/queries";

export default async function AdminDashboard() {
  const [stats, recentUpdates, recentFiles, projects, prospectStats] = await Promise.all([
    getAdminStats(),
    getRecentUpdates(6),
    getRecentFiles(5),
    getAllProjects(),
    getProspectStats(),
  ]);

  const activeProjects = projects.filter((p) => p.status !== "live").slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-white sm:text-[28px]">
            Command Center
          </h1>
          <p className="mt-1 text-[13px] text-body">
            Manage projects, clients, and deliverables
          </p>
        </div>
        <Link
          href="/admin/projects"
          className="btn-v !py-2 !px-5 !text-[12px] inline-flex w-fit items-center gap-2"
        >
          <Plus size={13} />
          New Project
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <SummaryCard
          label="Total Projects"
          value={String(stats.totalProjects)}
          icon={<FolderKanban size={18} />}
        />
        <SummaryCard
          label="Active"
          value={String(stats.activeProjects)}
          icon={<Zap size={18} />}
          accent
        />
        <SummaryCard
          label="Pending Approvals"
          value={String(stats.pendingApprovals)}
          icon={<Clock size={18} />}
        />
        <SummaryCard
          label="Open Tasks"
          value={String(stats.openTasks)}
          icon={<ListTodo size={18} />}
        />
        <SummaryCard
          label="Clients"
          value={String(stats.totalClients)}
          icon={<Users size={18} />}
        />
        <Link href="/admin/openclaw" className="block">
          <SummaryCard
            label="Prospects"
            value={String(prospectStats.total)}
            icon={<Crosshair size={18} />}
          />
        </Link>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left column - 3/5 */}
        <div className="space-y-6 lg:col-span-3">
          {/* Active Projects */}
          <PortalCard
            title="Active Projects"
            icon={<FolderKanban size={14} />}
            action={
              <Link href="/admin/projects" className="flex items-center gap-1 text-[11px] font-medium text-accent/70 transition-colors hover:text-accent">
                View all <ArrowRight size={10} />
              </Link>
            }
          >
            {activeProjects.length === 0 ? (
              <EmptyState icon={<FolderKanban size={18} />} title="No active projects" description="Create your first project to get started" />
            ) : (
              <div className="space-y-2">
                {activeProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/admin/projects/${project.id}`}
                    className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3 transition-all hover:border-white/[0.08] hover:bg-white/[0.025]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-[13px] font-semibold text-white">
                        {project.name}
                      </p>
                      {project.client_company && (
                        <p className="mt-0.5 font-mono text-[10px] text-dim">
                          {project.client_company}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 pl-3">
                      <div className="hidden items-center gap-2 sm:flex">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${project.completion_percent}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-dim">
                          {project.completion_percent}%
                        </span>
                      </div>
                      <StatusBadge status={project.status} type="project" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </PortalCard>

          {/* Recent Updates */}
          <PortalCard
            title="Recent Updates"
            icon={<MessageSquare size={14} />}
            action={
              <Link href="/admin/updates" className="flex items-center gap-1 text-[11px] font-medium text-accent/70 transition-colors hover:text-accent">
                View all <ArrowRight size={10} />
              </Link>
            }
          >
            {recentUpdates.length === 0 ? (
              <EmptyState icon={<MessageSquare size={18} />} title="No updates yet" description="Post an update from a project detail page" />
            ) : (
              <div className="space-y-2.5">
                {recentUpdates.map((update) => {
                  const proj = update.project as { id: string; name: string } | null;
                  return (
                    <div key={update.id} className="rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-display text-[13px] font-semibold text-white">
                            {update.title}
                          </p>
                          {update.body && (
                            <p className="mt-1 line-clamp-1 text-[12px] text-body">
                              {update.body}
                            </p>
                          )}
                        </div>
                        {proj && (
                          <Link
                            href={`/admin/projects/${proj.id}`}
                            className="flex-shrink-0 rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-[2px] font-mono text-[9px] text-dim transition-colors hover:text-body"
                          >
                            {proj.name}
                          </Link>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-mono text-[10px] text-dim">
                          {new Date(update.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        {update.author && (
                          <>
                            <span className="text-white/[0.08]">·</span>
                            <span className="font-mono text-[10px] text-dim">
                              {update.author.full_name || update.author.email}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </PortalCard>
        </div>

        {/* Right column - 2/5 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Quick Links */}
          <PortalCard title="Quick Actions" icon={<Zap size={14} />}>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: "/admin/projects", label: "Projects", icon: FolderKanban },
                { href: "/admin/clients", label: "Clients", icon: Users },
                { href: "/admin/updates", label: "Updates", icon: MessageSquare },
                { href: "/admin/approvals", label: "Approvals", icon: CheckSquare },
                { href: "/admin/openclaw", label: "OpenClaw", icon: Crosshair },
              ].map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.04] bg-white/[0.01] px-3.5 py-3 text-[12px] font-medium text-white/60 transition-all hover:border-white/[0.08] hover:bg-white/[0.025] hover:text-white"
                >
                  <Icon size={14} />
                  {label}
                </Link>
              ))}
            </div>
          </PortalCard>

          {/* Recent Files */}
          <PortalCard
            title="Recent Files"
            icon={<FileText size={14} />}
            action={
              <Link href="/admin/files" className="flex items-center gap-1 text-[11px] font-medium text-accent/70 transition-colors hover:text-accent">
                View all <ArrowRight size={10} />
              </Link>
            }
          >
            {recentFiles.length === 0 ? (
              <EmptyState icon={<FileText size={18} />} title="No files yet" description="Files will appear here when uploaded" />
            ) : (
              <div className="space-y-2">
                {recentFiles.map((file) => {
                  const proj = file.project as { id: string; name: string } | null;
                  return (
                    <div key={file.id} className="flex items-center gap-3 rounded-lg px-2 py-2">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-dim">
                        <FileText size={13} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-medium text-white">
                          {file.file_name}
                        </p>
                        <p className="font-mono text-[10px] text-dim">
                          {proj?.name ?? "Unknown"} · {new Date(file.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </PortalCard>

          {/* Pending Approvals quick view */}
          <PortalCard
            title="Pending Approvals"
            icon={<Clock size={14} />}
            action={
              <Link href="/admin/approvals" className="flex items-center gap-1 text-[11px] font-medium text-accent/70 transition-colors hover:text-accent">
                View all <ArrowRight size={10} />
              </Link>
            }
          >
            {stats.pendingApprovals === 0 ? (
              <EmptyState icon={<CheckSquare size={18} />} title="All clear" description="No pending approvals right now" />
            ) : (
              <div className="flex items-center gap-3 rounded-xl border border-gold/10 bg-gold/[0.03] px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="font-display text-[14px] font-bold text-white">
                    {stats.pendingApprovals} pending
                  </p>
                  <p className="text-[11px] text-body">
                    Awaiting review
                  </p>
                </div>
              </div>
            )}
          </PortalCard>
        </div>
      </div>
    </div>
  );
}
