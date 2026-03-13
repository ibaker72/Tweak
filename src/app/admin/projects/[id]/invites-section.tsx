"use client";

import { useTransition } from "react";
import { Send, RotateCw, XCircle, Loader2, Clock, CheckCircle, Ban } from "lucide-react";
import type { ProjectInvite, Profile } from "@/lib/portal/types";
import { resendInvite, cancelInvite } from "@/lib/admin/actions";

const statusConfig: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-gold", label: "Pending" },
  accepted: { icon: CheckCircle, color: "text-emerald-400", label: "Accepted" },
  cancelled: { icon: Ban, color: "text-dim", label: "Cancelled" },
};

interface InvitesSectionProps {
  projectId: string;
  invites: (ProjectInvite & { inviter?: Pick<Profile, "id" | "full_name" | "email"> | null })[];
}

export function InvitesSection({ projectId, invites }: InvitesSectionProps) {
  if (invites.length === 0) {
    return (
      <p className="py-4 text-center text-[12px] text-dim">No invites sent yet</p>
    );
  }

  return (
    <div className="space-y-2">
      {invites.map((invite) => (
        <InviteRow key={invite.id} invite={invite} projectId={projectId} />
      ))}
    </div>
  );
}

function InviteRow({
  invite,
  projectId,
}: {
  invite: ProjectInvite & { inviter?: Pick<Profile, "id" | "full_name" | "email"> | null };
  projectId: string;
}) {
  const [pending, startTransition] = useTransition();
  const config = statusConfig[invite.status] ?? statusConfig.pending;
  const StatusIcon = config.icon;

  function handleResend() {
    startTransition(async () => {
      await resendInvite(invite.id, projectId);
    });
  }

  function handleCancel() {
    startTransition(async () => {
      await cancelInvite(invite.id, projectId);
    });
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.01] px-3 py-2.5">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[12px] font-medium text-white">
            {invite.full_name || invite.email}
          </p>
          <span className={`inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.06em] ${config.color}`}>
            <StatusIcon size={9} />
            {config.label}
          </span>
        </div>
        <p className="font-mono text-[10px] text-dim">{invite.email}</p>
        <p className="font-mono text-[9px] text-dim/60">
          Sent {new Date(invite.last_sent_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          {invite.inviter && ` by ${invite.inviter.full_name || invite.inviter.email}`}
        </p>
      </div>
      {invite.status === "pending" && (
        <div className="flex items-center gap-1 pl-2">
          <button
            onClick={handleResend}
            disabled={pending}
            className="flex h-6 w-6 items-center justify-center rounded-md text-dim transition-colors hover:bg-accent/10 hover:text-accent disabled:opacity-50"
            title="Resend invite"
          >
            {pending ? <Loader2 size={10} className="animate-spin" /> : <RotateCw size={10} />}
          </button>
          <button
            onClick={handleCancel}
            disabled={pending}
            className="flex h-6 w-6 items-center justify-center rounded-md text-dim transition-colors hover:bg-red-400/10 hover:text-red-400 disabled:opacity-50"
            title="Cancel invite"
          >
            <XCircle size={10} />
          </button>
        </div>
      )}
    </div>
  );
}
