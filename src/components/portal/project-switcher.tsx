"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { Project } from "@/lib/portal/types";

interface ProjectSwitcherProps {
  projects: Project[];
  activeProjectId: string;
}

export function ProjectSwitcher({ projects, activeProjectId }: ProjectSwitcherProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (projects.length <= 1) return null;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("project", e.target.value);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="relative">
      <select
        value={activeProjectId}
        onChange={handleChange}
        className="field cursor-pointer appearance-none !bg-white/[0.03] !pr-9 !text-[13px] font-medium !text-white"
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id} className="bg-surface-1 text-white">
            {p.name}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-dim"
      />
    </div>
  );
}
