"use client";

import { useTransition } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import type { ProjectTask } from "@/lib/portal/types";
import { toggleTask } from "@/lib/admin/actions";

const typeLabels: Record<string, { label: string; className: string }> = {
  completed: { label: "Work", className: "text-emerald-400" },
  client_action: { label: "Client", className: "text-gold" },
  launch_check: { label: "Launch", className: "text-cyan-light" },
};

export function TaskRow({ task, projectId }: { task: ProjectTask; projectId: string }) {
  const [pending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      await toggleTask(task.id, !task.is_done, projectId);
    });
  }

  const typeConfig = typeLabels[task.task_type] ?? typeLabels.completed;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.01] px-3 py-2.5">
      <button
        onClick={handleToggle}
        disabled={pending}
        className="flex-shrink-0 text-dim transition-colors hover:text-accent disabled:opacity-50"
      >
        {pending ? (
          <Loader2 size={15} className="animate-spin" />
        ) : task.is_done ? (
          <CheckCircle2 size={15} className="text-emerald-400" />
        ) : (
          <Circle size={15} />
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-[12px] font-medium ${task.is_done ? "text-dim line-through" : "text-white"}`}>
          {task.title}
        </p>
      </div>
      <span className={`font-mono text-[9px] uppercase tracking-[0.06em] ${typeConfig.className}`}>
        {typeConfig.label}
      </span>
    </div>
  );
}
