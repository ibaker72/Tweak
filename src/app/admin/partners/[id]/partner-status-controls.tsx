"use client";

import { useState, useTransition } from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { updatePartnerApplicationStatus } from "@/lib/admin/actions";
import {
  PARTNER_APPLICATION_STATUSES,
  PARTNER_STATUS_LABELS,
  type PartnerApplicationStatus,
} from "@/lib/partners/types";

/**
 * Status triage for a single application.
 *
 * Approval deliberately does NOT send the applicant an email or create any
 * commission/referral records — there is no partner onboarding workflow to
 * hang that off yet. Approving marks the row so the state is visible here;
 * the follow-up is still a human sending the referral link and partner kit.
 * See the "optional next phase" note in the handover report.
 */
export function PartnerStatusControls({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: PartnerApplicationStatus;
}) {
  const [pending, startTransition] = useTransition();
  const [target, setTarget] = useState<PartnerApplicationStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  function setStatus(status: PartnerApplicationStatus) {
    if (status === currentStatus || pending) return;
    setTarget(status);
    setError(null);
    startTransition(async () => {
      try {
        await updatePartnerApplicationStatus(applicationId, status);
      } catch {
        setError("Couldn't update the status. Please try again.");
      } finally {
        setTarget(null);
      }
    });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {PARTNER_APPLICATION_STATUSES.map((status) => {
          const isCurrent = status === currentStatus;
          const isPending = pending && target === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setStatus(status)}
              disabled={pending || isCurrent}
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors disabled:cursor-default",
                isCurrent
                  ? "border-accent/30 bg-accent-muted text-accent"
                  : "border-white/[0.06] bg-white/[0.02] text-dim hover:border-white/[0.12] hover:text-body disabled:opacity-50",
              )}
            >
              {isPending ? (
                <Loader2 size={11} className="animate-spin" />
              ) : isCurrent ? (
                <Check size={11} />
              ) : null}
              {PARTNER_STATUS_LABELS[status]}
            </button>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="text-[12px] text-red-400">
          {error}
        </p>
      )}

      <p className="font-mono text-[10px] leading-relaxed text-dim">
        Approving records the decision here only — no email is sent to the
        applicant and no referral link is generated yet.
      </p>
    </div>
  );
}
