import { createClient } from "@/lib/supabase/server";
import type {
  Profile,
  Project,
  ProjectMember,
  ProjectMilestone,
  ProjectUpdate,
  ProjectTask,
  ProjectFile,
  ProjectApproval,
} from "@/lib/portal/types";

/* ─── Dashboard Aggregates ─── */

export interface AdminStats {
  totalProjects: number;
  activeProjects: number;
  pendingApprovals: number;
  openTasks: number;
  totalClients: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient();

  const [projects, approvals, tasks, clients] = await Promise.all([
    supabase.from("projects").select("id, status"),
    supabase.from("project_approvals").select("id, status").eq("status", "pending"),
    supabase.from("project_tasks").select("id, is_done").eq("is_done", false),
    supabase.from("profiles").select("id").eq("role", "client"),
  ]);

  const allProjects = (projects.data ?? []) as { id: string; status: string }[];

  return {
    totalProjects: allProjects.length,
    activeProjects: allProjects.filter((p) => p.status !== "live").length,
    pendingApprovals: (approvals.data ?? []).length,
    openTasks: (tasks.data ?? []).length,
    totalClients: (clients.data ?? []).length,
  };
}

/* ─── Recent Activity ─── */

export async function getRecentUpdates(limit = 8): Promise<(ProjectUpdate & { project?: Project | null })[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_updates")
    .select("*, author:profiles!project_updates_created_by_fkey(id, full_name, email), project:projects!project_updates_project_id_fkey(id, name, slug, status)")
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as (ProjectUpdate & { project?: Project | null })[];
}

export async function getRecentFiles(limit = 6): Promise<(ProjectFile & { project?: Pick<Project, "id" | "name"> | null })[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_files")
    .select("*, project:projects!project_files_project_id_fkey(id, name)")
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as (ProjectFile & { project?: Pick<Project, "id" | "name"> | null })[];
}

/* ─── Projects ─── */

export async function getAllProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  return (data ?? []) as Project[];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  return data as Project | null;
}

export async function getProjectMembers(projectId: string): Promise<(ProjectMember & { profile?: Profile | null })[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_members")
    .select("*, profile:profiles!project_members_user_id_fkey(id, full_name, email, role)")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });

  return (data ?? []) as (ProjectMember & { profile?: Profile | null })[];
}

export async function getEligibleMembers(projectId: string): Promise<Profile[]> {
  const supabase = await createClient();

  // Get current member user_ids
  const { data: existing } = await supabase
    .from("project_members")
    .select("user_id")
    .eq("project_id", projectId);

  const memberIds = new Set((existing ?? []).map((r) => (r as { user_id: string }).user_id));

  // Get all profiles and filter out existing members
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("full_name", { ascending: true });

  return ((profiles ?? []) as Profile[]).filter((p) => !memberIds.has(p.id));
}

export async function getProjectMilestones(projectId: string): Promise<ProjectMilestone[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_milestones")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .order("due_date", { ascending: true });

  return (data ?? []) as ProjectMilestone[];
}

export async function getProjectUpdates(projectId: string): Promise<ProjectUpdate[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_updates")
    .select("*, author:profiles!project_updates_created_by_fkey(id, full_name, email)")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  return (data ?? []) as ProjectUpdate[];
}

export async function getProjectTasks(projectId: string): Promise<ProjectTask[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  return (data ?? []) as ProjectTask[];
}

export async function getProjectFiles(projectId: string): Promise<ProjectFile[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_files")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  return (data ?? []) as ProjectFile[];
}

export async function getProjectApprovals(projectId: string): Promise<ProjectApproval[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_approvals")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  return (data ?? []) as ProjectApproval[];
}

export async function getProjectMemberCounts(): Promise<Record<string, number>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_members")
    .select("project_id");

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    const pid = (row as { project_id: string }).project_id;
    counts[pid] = (counts[pid] ?? 0) + 1;
  }
  return counts;
}

/* ─── Clients ─── */

export async function getAllClients(): Promise<Profile[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (data ?? []) as Profile[];
}

export async function getClientProjectMemberships(): Promise<Record<string, { project_id: string; project_name: string; member_role: string }[]>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_members")
    .select("user_id, project_id, member_role, project:projects!project_members_project_id_fkey(id, name)");

  const map: Record<string, { project_id: string; project_name: string; member_role: string }[]> = {};
  for (const row of data ?? []) {
    const r = row as unknown as { user_id: string; project_id: string; member_role: string; project: { id: string; name: string } | null };
    if (!map[r.user_id]) map[r.user_id] = [];
    map[r.user_id].push({
      project_id: r.project_id,
      project_name: r.project?.name ?? "Unknown",
      member_role: r.member_role,
    });
  }
  return map;
}

/* ─── All Updates (cross-project) ─── */

export async function getAllUpdates(): Promise<(ProjectUpdate & { project?: Pick<Project, "id" | "name"> | null })[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_updates")
    .select("*, author:profiles!project_updates_created_by_fkey(id, full_name, email), project:projects!project_updates_project_id_fkey(id, name)")
    .order("created_at", { ascending: false });

  return (data ?? []) as (ProjectUpdate & { project?: Pick<Project, "id" | "name"> | null })[];
}

/* ─── All Files (cross-project) ─── */

export async function getAllFiles(): Promise<(ProjectFile & { project?: Pick<Project, "id" | "name"> | null })[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_files")
    .select("*, project:projects!project_files_project_id_fkey(id, name)")
    .order("created_at", { ascending: false });

  return (data ?? []) as (ProjectFile & { project?: Pick<Project, "id" | "name"> | null })[];
}

/* ─── All Approvals (cross-project) ─── */

export async function getAllApprovals(): Promise<(ProjectApproval & { project?: Pick<Project, "id" | "name"> | null })[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_approvals")
    .select("*, project:projects!project_approvals_project_id_fkey(id, name)")
    .order("created_at", { ascending: false });

  return (data ?? []) as (ProjectApproval & { project?: Pick<Project, "id" | "name"> | null })[];
}
