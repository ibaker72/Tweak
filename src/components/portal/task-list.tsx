import { cn } from "@/lib/utils";
import { Check, Circle, AlertCircle } from "lucide-react";
import type { ProjectTask } from "@/lib/portal/types";

interface TaskListProps {
  tasks: ProjectTask[];
  variant?: "default" | "checklist" | "action";
}

export function TaskList({ tasks, variant = "default" }: TaskListProps) {
  return (
    <div className="space-y-1.5">
      {tasks.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors",
            variant === "action" && !t.is_done && "bg-gold/[0.03] border border-gold/[0.08]",
            (variant !== "action" || t.is_done) && "border border-transparent",
          )}
        >
          {/* Icon */}
          {t.is_done ? (
            <div className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-md bg-accent/10">
              <Check size={10} className="text-accent" />
            </div>
          ) : variant === "action" ? (
            <div className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-md bg-gold/10">
              <AlertCircle size={10} className="text-gold" />
            </div>
          ) : (
            <div className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-md border border-white/[0.08]">
              <Circle size={6} className="text-dim" />
            </div>
          )}

          {/* Text */}
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-[12px] font-medium",
                t.is_done ? "text-white/50 line-through decoration-white/20" : "text-white/80",
              )}
            >
              {t.title}
            </p>
            {t.due_date && !t.is_done && (
              <p className="mt-0.5 font-mono text-[10px] text-dim">
                Due{" "}
                {new Date(t.due_date + "T00:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
