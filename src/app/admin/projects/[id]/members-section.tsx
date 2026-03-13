"use client";

import { useTransition } from "react";
import { UserMinus, Loader2 } from "lucide-react";
import type { ProjectMember, Profile } from "@/lib/portal/types";
import { removeProjectMember } from "@/lib/admin/actions";

interface MembersSectionProps {
  projectId: string;
  members: (ProjectMember & { profile?: Profile | null })[];
}

export function MembersSection({ projectId, members }: MembersSectionProps) {
  if (members.length === 0) {
    return (
      <p className="py-4 text-center text-[12px] text-dim">No members assigned</p>
    );
  }

  return (
    <div className="space-y-2">
      {members.map((m) => (
        <MemberRow key={m.id} member={m} projectId={projectId} />
      ))}
    </div>
  );
}

function MemberRow({ member, projectId }: { member: ProjectMember & { profile?: Profile | null }; projectId: string }) {
  const [pending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      await removeProjectMember(member.id, projectId);
    });
  }

  const roleColors: Record<string, string> = {
    owner: "text-accent",
    team: "text-cyan-light",
    client: "text-v-light",
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.01] px-3 py-2.5">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-medium text-white">
          {member.profile?.full_name || member.profile?.email || "Unknown User"}
        </p>
        <p className="font-mono text-[10px] text-dim">
          {member.profile?.email}
        </p>
      </div>
      <div className="flex items-center gap-2 pl-3">
        <span className={`font-mono text-[10px] uppercase tracking-[0.06em] ${roleColors[member.member_role] ?? "text-dim"}`}>
          {member.member_role}
        </span>
        <button
          onClick={handleRemove}
          disabled={pending}
          className="flex h-6 w-6 items-center justify-center rounded-md text-dim transition-colors hover:bg-red-400/10 hover:text-red-400 disabled:opacity-50"
          title="Remove member"
        >
          {pending ? <Loader2 size={11} className="animate-spin" /> : <UserMinus size={11} />}
        </button>
      </div>
    </div>
  );
}
