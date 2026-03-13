"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { revalidatePath } from "next/cache";
import type {
  ProjectStatus,
  MilestoneStatus,
  TaskType,
  ApprovalStatus,
  MemberRole,
} from "@/lib/portal/types";

/* ─── Helpers ─── */

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || (profile.role !== "admin" && profile.role !== "team")) {
    throw new Error("Access denied");
  }

  return { supabase, userId: user.id };
}

/* ─── Project Mutations ─── */

export async function updateProject(
  projectId: string,
  fields: { name?: string; status?: ProjectStatus; client_company?: string | null; launch_window?: string | null; completion_percent?: number }
) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("projects")
    .update(fields)
    .eq("id", projectId);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}

export async function createProject(fields: {
  name: string;
  client_company?: string;
  status?: ProjectStatus;
  launch_window?: string;
}) {
  const { supabase, userId } = await requireAdmin();

  const slug = fields.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: fields.name,
      slug,
      client_company: fields.client_company || null,
      status: fields.status || "planning",
      launch_window: fields.launch_window || null,
      completion_percent: 0,
      created_by: userId,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
  return data as { id: string };
}

/* ─── Milestone Mutations ─── */

export async function createMilestone(
  projectId: string,
  fields: { title: string; status?: MilestoneStatus; due_date?: string; sort_order?: number }
) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("project_milestones").insert({
    project_id: projectId,
    title: fields.title,
    status: fields.status || "pending",
    due_date: fields.due_date || null,
    sort_order: fields.sort_order ?? 0,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
}

/* ─── Update Mutations ─── */

export async function createUpdate(
  projectId: string,
  fields: { title: string; body?: string }
) {
  const { supabase, userId } = await requireAdmin();

  const { error } = await supabase.from("project_updates").insert({
    project_id: projectId,
    title: fields.title,
    body: fields.body || null,
    created_by: userId,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/updates");
  revalidatePath("/admin");
}

/* ─── Task Mutations ─── */

export async function createTask(
  projectId: string,
  fields: { title: string; description?: string; task_type?: TaskType; due_date?: string }
) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("project_tasks").insert({
    project_id: projectId,
    title: fields.title,
    description: fields.description || null,
    task_type: fields.task_type || "completed",
    is_done: false,
    due_date: fields.due_date || null,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin");
}

export async function toggleTask(taskId: string, isDone: boolean, projectId: string) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("project_tasks")
    .update({ is_done: isDone })
    .eq("id", taskId);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
}

/* ─── Approval Mutations ─── */

export async function createApproval(
  projectId: string,
  fields: { title: string; description?: string }
) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("project_approvals").insert({
    project_id: projectId,
    title: fields.title,
    description: fields.description || null,
    status: "pending",
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/approvals");
  revalidatePath("/admin");
}

export async function updateApprovalStatus(
  approvalId: string,
  status: ApprovalStatus,
  projectId: string
) {
  const { supabase, userId } = await requireAdmin();

  const fields: Record<string, unknown> = { status };
  if (status === "approved" || status === "changes_requested") {
    fields.approved_by = userId;
    fields.approved_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("project_approvals")
    .update(fields)
    .eq("id", approvalId);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/approvals");
  revalidatePath("/admin");
}

/* ─── Member Mutations ─── */

export async function addProjectMember(
  projectId: string,
  userId: string,
  memberRole: "owner" | "client" | "team" = "client"
) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("project_members").insert({
    project_id: projectId,
    user_id: userId,
    member_role: memberRole,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function removeProjectMember(memberId: string, projectId: string) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("project_members")
    .delete()
    .eq("id", memberId);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
}

/* ─── Client Invite ─── */

export async function inviteClientToProject(
  projectId: string,
  fields: { email: string; full_name?: string; member_role?: MemberRole }
): Promise<{ status: "invited" | "attached"; message: string }> {
  await requireAdmin();
  const serviceClient = createServiceClient();
  const email = fields.email.trim().toLowerCase();
  const memberRole = fields.member_role || "client";

  // Check if user already exists in profiles (by email)
  const { data: existingProfile } = await serviceClient
    .from("profiles")
    .select("id, full_name, email")
    .eq("email", email)
    .single();

  if (existingProfile) {
    // User exists — check if already a member
    const { data: existingMember } = await serviceClient
      .from("project_members")
      .select("id")
      .eq("project_id", projectId)
      .eq("user_id", existingProfile.id)
      .single();

    if (existingMember) {
      return { status: "attached", message: `${email} is already a member of this project` };
    }

    // Add membership directly
    const { error: memberError } = await serviceClient
      .from("project_members")
      .insert({
        project_id: projectId,
        user_id: existingProfile.id,
        member_role: memberRole,
      });

    if (memberError) throw new Error(memberError.message);
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath("/admin/clients");
    return { status: "attached", message: `${existingProfile.full_name || email} added to project` };
  }

  // User does not exist — invite via Supabase auth
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data: inviteData, error: inviteError } = await serviceClient.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name: fields.full_name || "",
      invited_to_project: projectId,
      member_role: memberRole,
    },
    redirectTo: `${siteUrl}/auth/callback?next=/client-portal`,
  });

  if (inviteError) throw new Error(inviteError.message);

  // The handle_new_user trigger creates the profile.
  // Now add membership for the newly created user.
  if (inviteData?.user) {
    // Update profile name if provided
    if (fields.full_name) {
      await serviceClient
        .from("profiles")
        .update({ full_name: fields.full_name })
        .eq("id", inviteData.user.id);
    }

    const { error: memberError } = await serviceClient
      .from("project_members")
      .insert({
        project_id: projectId,
        user_id: inviteData.user.id,
        member_role: memberRole,
      });

    if (memberError) throw new Error(memberError.message);
  }

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/clients");
  return { status: "invited", message: `Invite sent to ${email}` };
}
