import { createClient } from "@/lib/supabase/server";
import type {
  Profile,
  Project,
  ProjectMilestone,
  ProjectUpdate,
  ProjectTask,
  ProjectFile,
  ProjectApproval,
  ProjectDashboard,
} from "./types";

/** Get the authenticated user's profile */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data as Profile | null;
}

/** Get all projects the authenticated user is a member of */
export async function getUserProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  return (data ?? []) as Project[];
}

/** Get a single project by ID (RLS enforces membership) */
export async function getProject(projectId: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  return data as Project | null;
}

/** Get milestones for a project, sorted by sort_order then due_date */
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

/** Get recent updates for a project, newest first */
export async function getProjectUpdates(projectId: string, limit = 5): Promise<ProjectUpdate[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_updates")
    .select("*, author:profiles!project_updates_created_by_fkey(id, full_name, email)")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as ProjectUpdate[];
}

/** Get tasks for a project filtered by type */
export async function getProjectTasks(projectId: string): Promise<{
  completed: ProjectTask[];
  clientActions: ProjectTask[];
  launchChecks: ProjectTask[];
}> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  const tasks = (data ?? []) as ProjectTask[];

  return {
    completed: tasks.filter((t) => t.task_type === "completed"),
    clientActions: tasks.filter((t) => t.task_type === "client_action"),
    launchChecks: tasks.filter((t) => t.task_type === "launch_check"),
  };
}

/** Get files for a project, newest first */
export async function getProjectFiles(projectId: string): Promise<ProjectFile[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_files")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  return (data ?? []) as ProjectFile[];
}

/** Get approvals for a project, ordered, with decision history + linked file */
export async function getProjectApprovals(projectId: string): Promise<ProjectApproval[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_approvals")
    .select(
      `*,
       file:project_files!project_approvals_file_id_fkey(id, file_name, mime_type),
       decisions:approval_decisions(
         id, approval_item_id, decided_by, decision, comment, created_at,
         decider:profiles!approval_decisions_decided_by_fkey(id, full_name, email)
       )`,
    )
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  // Decisions come back unordered from the join — sort newest first per item.
  const approvals = (data ?? []) as ProjectApproval[];
  for (const a of approvals) {
    if (a.decisions?.length) {
      a.decisions.sort((x, y) => +new Date(y.created_at) - +new Date(x.created_at));
    }
  }
  return approvals;
}

/** Fetch all dashboard data for a specific project */
export async function getProjectDashboard(projectId: string): Promise<ProjectDashboard | null> {
  const project = await getProject(projectId);
  if (!project) return null;

  const [milestones, updates, tasks, files, approvals] = await Promise.all([
    getProjectMilestones(projectId),
    getProjectUpdates(projectId),
    getProjectTasks(projectId),
    getProjectFiles(projectId),
    getProjectApprovals(projectId),
  ]);

  return {
    project,
    milestones,
    updates,
    completedTasks: tasks.completed,
    clientActions: tasks.clientActions,
    launchChecks: tasks.launchChecks,
    files,
    approvals,
  };
}
