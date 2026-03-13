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
  InviteStatus,
} from "@/lib/portal/types";
import { sendNotification } from "@/lib/email/notifications";

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

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return { supabase, userId: user.id };
}

function revalidateProject(projectId: string) {
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
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
  revalidateProject(projectId);
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
  revalidateProject(projectId);
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
  revalidateProject(projectId);
  revalidatePath("/admin/updates");

  // Notify project members about the update
  const serviceClient = createServiceClient();
  const { data: members } = await serviceClient
    .from("project_members")
    .select("user_id, profile:profiles!project_members_user_id_fkey(email, role)")
    .eq("project_id", projectId);

  const { data: project } = await serviceClient
    .from("projects")
    .select("name")
    .eq("id", projectId)
    .single();

  if (members && project) {
    const clientEmails = (members as unknown as { user_id: string; profile: { email: string; role: string } | null }[])
      .filter((m) => m.profile?.role === "client" && m.profile?.email)
      .map((m) => m.profile!.email);

    for (const email of clientEmails) {
      sendNotification({
        to: email,
        subject: `New update: ${fields.title} — ${project.name}`,
        heading: "New Project Update",
        body: `A new update has been posted for <strong>${project.name}</strong>:<br><br><strong>${fields.title}</strong>${fields.body ? `<br>${fields.body.slice(0, 200)}${fields.body.length > 200 ? "..." : ""}` : ""}`,
        ctaLabel: "View in Portal",
        ctaUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/client-portal`,
      }).catch(() => {});
    }
  }
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
  revalidateProject(projectId);
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
  revalidateProject(projectId);
  revalidatePath("/admin/approvals");

  // Notify project clients about approval request
  const serviceClient = createServiceClient();
  const { data: members } = await serviceClient
    .from("project_members")
    .select("user_id, profile:profiles!project_members_user_id_fkey(email, role)")
    .eq("project_id", projectId);

  const { data: project } = await serviceClient
    .from("projects")
    .select("name")
    .eq("id", projectId)
    .single();

  if (members && project) {
    const clientEmails = (members as unknown as { user_id: string; profile: { email: string; role: string } | null }[])
      .filter((m) => m.profile?.role === "client" && m.profile?.email)
      .map((m) => m.profile!.email);

    for (const email of clientEmails) {
      sendNotification({
        to: email,
        subject: `Approval needed: ${fields.title} — ${project.name}`,
        heading: "Approval Request",
        body: `Your review is needed for <strong>${project.name}</strong>:<br><br><strong>${fields.title}</strong>${fields.description ? `<br>${fields.description.slice(0, 200)}` : ""}<br><br>Please review and respond in your portal.`,
        ctaLabel: "Review Now",
        ctaUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/client-portal/approvals`,
      }).catch(() => {});
    }
  }
}

export async function updateApprovalStatus(
  approvalId: string,
  status: ApprovalStatus,
  projectId: string,
  responseNote?: string,
) {
  const { supabase, userId } = await requireAdmin();

  const fields: Record<string, unknown> = { status };
  if (status === "approved" || status === "changes_requested") {
    fields.approved_by = userId;
    fields.approved_at = new Date().toISOString();
  }
  if (responseNote !== undefined) {
    fields.response_note = responseNote || null;
  }

  const { error } = await supabase
    .from("project_approvals")
    .update(fields)
    .eq("id", approvalId);

  if (error) throw new Error(error.message);
  revalidateProject(projectId);
  revalidatePath("/admin/approvals");
}

/* ─── Client Approval Response ─── */

export async function respondToApproval(
  approvalId: string,
  status: "approved" | "changes_requested",
  projectId: string,
  responseNote?: string,
) {
  const { supabase, userId } = await requireAuth();

  // Verify user is a member of this project
  const { data: membership } = await supabase
    .from("project_members")
    .select("id")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .single();

  if (!membership) throw new Error("Access denied");

  const fields: Record<string, unknown> = {
    status,
    approved_by: userId,
    approved_at: new Date().toISOString(),
  };
  if (responseNote !== undefined) {
    fields.response_note = responseNote || null;
  }

  const { error } = await supabase
    .from("project_approvals")
    .update(fields)
    .eq("id", approvalId)
    .eq("status", "pending"); // Only allow responding to pending approvals

  if (error) throw new Error(error.message);
  revalidatePath("/client-portal");
  revalidatePath("/client-portal/approvals");
  revalidateProject(projectId);
  revalidatePath("/admin/approvals");

  // Notify admin/team about the approval response
  const serviceClient = createServiceClient();
  const { data: approval } = await serviceClient
    .from("project_approvals")
    .select("title")
    .eq("id", approvalId)
    .single();

  const { data: project } = await serviceClient
    .from("projects")
    .select("name")
    .eq("id", projectId)
    .single();

  const { data: responder } = await serviceClient
    .from("profiles")
    .select("full_name, email")
    .eq("id", userId)
    .single();

  const { data: admins } = await serviceClient
    .from("profiles")
    .select("email")
    .in("role", ["admin", "team"]);

  if (approval && project && admins) {
    const responderName = responder?.full_name || responder?.email || "A client";
    const statusLabel = status === "approved" ? "Approved" : "Changes Requested";
    for (const admin of admins as { email: string }[]) {
      sendNotification({
        to: admin.email,
        subject: `${statusLabel}: ${approval.title} — ${project.name}`,
        heading: `Approval ${statusLabel}`,
        body: `<strong>${responderName}</strong> has ${status === "approved" ? "approved" : "requested changes on"} <strong>${approval.title}</strong> for ${project.name}.${responseNote ? `<br><br><em>"${responseNote}"</em>` : ""}`,
        ctaLabel: "View in Admin",
        ctaUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/projects/${projectId}`,
      }).catch(() => {});
    }
  }
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
  revalidateProject(projectId);
}

export async function removeProjectMember(memberId: string, projectId: string) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase
    .from("project_members")
    .delete()
    .eq("id", memberId);

  if (error) throw new Error(error.message);
  revalidateProject(projectId);
}

/* ─── Client Invite (with tracking) ─── */

export async function inviteClientToProject(
  projectId: string,
  fields: { email: string; full_name?: string; member_role?: MemberRole }
): Promise<{ status: "invited" | "attached" | "already_member"; message: string }> {
  const { userId } = await requireAdmin();
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
      return { status: "already_member", message: `${email} is already a member of this project` };
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

    // Create accepted invite record
    await serviceClient.from("project_invites").insert({
      project_id: projectId,
      email,
      full_name: fields.full_name || existingProfile.full_name || null,
      member_role: memberRole,
      status: "accepted",
      invited_by: userId,
      accepted_at: new Date().toISOString(),
    });

    revalidateProject(projectId);
    revalidatePath("/admin/clients");

    // Notify the user
    const { data: project } = await serviceClient.from("projects").select("name").eq("id", projectId).single();
    if (project) {
      sendNotification({
        to: email,
        subject: `You've been added to ${project.name}`,
        heading: "You're In!",
        body: `You've been added to the project <strong>${project.name}</strong>. You can now view progress, files, and approvals in your portal.`,
        ctaLabel: "Open Portal",
        ctaUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/client-portal`,
      }).catch(() => {});
    }

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

  // Add membership for the newly created auth user
  if (inviteData?.user) {
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

  // Create invite tracking record
  await serviceClient.from("project_invites").insert({
    project_id: projectId,
    email,
    full_name: fields.full_name || null,
    member_role: memberRole,
    status: "pending",
    invited_by: userId,
  });

  revalidateProject(projectId);
  revalidatePath("/admin/clients");
  return { status: "invited", message: `Invite sent to ${email}` };
}

export async function resendInvite(inviteId: string, projectId: string) {
  await requireAdmin();
  const serviceClient = createServiceClient();

  const { data: invite } = await serviceClient
    .from("project_invites")
    .select("*")
    .eq("id", inviteId)
    .single();

  if (!invite) throw new Error("Invite not found");
  if (invite.status !== "pending") throw new Error("Can only resend pending invites");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Re-send the magic link
  const { error: authError } = await serviceClient.auth.admin.inviteUserByEmail(
    invite.email,
    {
      data: {
        full_name: invite.full_name || "",
        invited_to_project: projectId,
      },
      redirectTo: `${siteUrl}/auth/callback?next=/client-portal`,
    }
  );

  if (authError) throw new Error(authError.message);

  // Update last_sent_at
  await serviceClient
    .from("project_invites")
    .update({ last_sent_at: new Date().toISOString() })
    .eq("id", inviteId);

  revalidateProject(projectId);
}

export async function cancelInvite(inviteId: string, projectId: string) {
  await requireAdmin();
  const serviceClient = createServiceClient();

  const { error } = await serviceClient
    .from("project_invites")
    .update({ status: "cancelled" as InviteStatus })
    .eq("id", inviteId)
    .eq("status", "pending");

  if (error) throw new Error(error.message);
  revalidateProject(projectId);
}

/* ─── File Delete ─── */

const BUCKET = "project-files";

export async function deleteFile(fileId: string, projectId: string) {
  const { supabase } = await requireAdmin();

  // Get file metadata first
  const { data: file } = await supabase
    .from("project_files")
    .select("file_path")
    .eq("id", fileId)
    .single();

  if (!file) throw new Error("File not found");

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .remove([file.file_path]);

  if (storageError) {
    console.error("Storage delete failed:", storageError.message);
    // Continue with DB delete even if storage fails
  }

  // Delete metadata row
  const { error: dbError } = await supabase
    .from("project_files")
    .delete()
    .eq("id", fileId);

  if (dbError) throw new Error(dbError.message);

  revalidateProject(projectId);
  revalidatePath("/admin/files");
  revalidatePath("/client-portal/files");
}
