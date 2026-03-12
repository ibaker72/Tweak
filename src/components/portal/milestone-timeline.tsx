import { cn } from "@/lib/utils";
import { Check, Circle, Loader2 } from "lucide-react";
import type { ProjectMilestone } from "@/lib/portal/types";

interface MilestoneTimelineProps {
  milestones: ProjectMilestone[];
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <div className="space-y-0">
      {milestones.map((m, i) => {
        const isLast = i === milestones.length - 1;
        const isCompleted = m.status === "completed";
        const isActive = m.status === "in_progress";

        return (
          <div key={m.id} className="relative flex gap-3">
            {/* Vertical line */}
            {!isLast && (
              <div
                className={cn(
                  "absolute left-[11px] top-6 h-full w-px",
                  isCompleted ? "bg-accent/20" : "bg-white/[0.06]",
                )}
              />
            )}

            {/* Icon */}
            <div className="relative z-10 flex-shrink-0 pt-[2px]">
              {isCompleted ? (
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-accent/15">
                  <Check size={11} className="text-accent" />
                </div>
              ) : isActive ? (
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <Loader2 size={10} className="animate-spin text-accent" />
                </div>
              ) : (
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02]">
                  <Circle size={6} className="text-dim" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className={cn("flex-1 pb-4", isLast && "pb-0")}>
              <p
                className={cn(
                  "text-[13px] font-medium",
                  isCompleted ? "text-white/70" : isActive ? "text-white" : "text-dim",
                )}
              >
                {m.title}
              </p>
              {m.due_date && (
                <p className="mt-0.5 font-mono text-[10px] text-dim">
                  {new Date(m.due_date + "T00:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
