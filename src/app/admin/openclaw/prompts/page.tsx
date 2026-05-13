import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PROMPT_LIBRARY } from "@/lib/openclaw/prompt-library";
import { PromptCard } from "@/components/openclaw/prompt-card";

export default function PromptsPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/openclaw"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-dim transition-colors hover:text-white"
        >
          <ArrowLeft size={11} /> OpenClaw
        </Link>
        <h1 className="mt-2 font-display text-[24px] font-extrabold tracking-[-0.03em] text-white sm:text-[28px]">
          Scripts & Prompts
        </h1>
        <p className="mt-1 text-[13px] text-body">
          Copy-paste prompts for outreach, objection handling, and phone scripts.
        </p>
      </div>

      <div className="space-y-3">
        {PROMPT_LIBRARY.map((p) => (
          <PromptCard key={p.id} prompt={p} />
        ))}
      </div>
    </div>
  );
}
