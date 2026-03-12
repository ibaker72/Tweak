import type { ProjectUpdate } from "@/lib/portal/types";

interface UpdatesFeedProps {
  updates: ProjectUpdate[];
}

export function UpdatesFeed({ updates }: UpdatesFeedProps) {
  return (
    <div className="space-y-3">
      {updates.map((u) => (
        <div
          key={u.id}
          className="rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-[13px] font-medium text-white">{u.title}</p>
            <time className="flex-shrink-0 font-mono text-[10px] text-dim">
              {new Date(u.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
          {u.body && (
            <p className="mt-1 text-[12px] leading-relaxed text-body line-clamp-2">
              {u.body}
            </p>
          )}
          {u.author && (
            <p className="mt-1.5 font-mono text-[10px] text-dim">
              {u.author.full_name || u.author.email}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
