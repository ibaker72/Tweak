/* ─── Portal Database Types ─── */

export type UserRole = "admin" | "client" | "team";
export type MemberRole = "owner" | "client" | "team";

export type ProjectStatus =
  | "planning"
  | "design"
  | "development"
  | "revisions"
  | "launch_prep"
  | "live";

export type MilestoneStatus = "pending" | "in_progress" | "completed";
export type TaskType = "completed" | "client_action" | "launch_check";
export type ApprovalStatus = "pending" | "approved" | "changes_requested";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string | null;
  client_company: string | null;
  status: ProjectStatus;
  completion_percent: number;
  launch_window: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  id: string;
  project_id: string;
  user_id: string;
  member_role: MemberRole;
  created_at: string;
}

export interface ProjectMilestone {
  id: string;
  project_id: string;
  title: string;
  status: MilestoneStatus;
  sort_order: number;
  due_date: string | null;
  created_at: string;
}

export interface ProjectUpdate {
  id: string;
  project_id: string;
  title: string;
  body: string | null;
  created_by: string | null;
  created_at: string;
  author?: Profile | null;
}

export interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  task_type: TaskType;
  is_done: boolean;
  due_date: string | null;
  created_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface ProjectApproval {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: ApprovalStatus;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
}

/** Aggregated dashboard data for a single project */
export interface ProjectDashboard {
  project: Project;
  milestones: ProjectMilestone[];
  updates: ProjectUpdate[];
  completedTasks: ProjectTask[];
  clientActions: ProjectTask[];
  launchChecks: ProjectTask[];
  files: ProjectFile[];
  approvals: ProjectApproval[];
}
