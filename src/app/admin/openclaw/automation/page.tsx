import Link from "next/link";
import { ArrowLeft, Clock, Activity } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/service";
import { AutomationActions } from "@/components/openclaw/automation-actions";

export const dynamic = "force-dynamic";

interface CronRun {
  id: string;
  job: string;
  status: "running" | "success" | "error";
  stats: Record<string, unknown> | null;
  error: string | null;
  started_at: string;
  completed_at: string | null;
}

const JOB_LABELS: Record<string, string> = {
  discover: "Auto-prospect",
  outreach: "Initial outreach",
  followup: "Follow-up sends",
  "geo-generate": "GEO content",
};

async function loadRuns(): Promise<CronRun[]> {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("cron_runs")
      .select("*")
      .order("started_at", { ascending: false })
      .limit(40);
    return (data || []) as CronRun[];
  } catch {
    return [];
  }
}

async function loadFunnel() {
  try {
    const supabase = createServiceClient();
    const stages = ["lead", "engaged", "meeting", "proposal", "won", "lost"] as const;
    const counts: Record<string, number> = {};
    for (const stage of stages) {
      const { count } = await supabase
        .from("prospects")
        .select("id", { count: "exact", head: true })
        .eq("deal_stage", stage);
      counts[stage] = count ?? 0;
    }
    const { count: totalProspects } = await supabase
      .from("prospects")
      .select("id", { count: "exact", head: true });
    const { count: totalOutreach } = await supabase
      .from("outreach")
      .select("id", { count: "exact", head: true })
      .eq("status", "sent");
    return { stages: counts, totalProspects: totalProspects ?? 0, totalOutreach: totalOutreach ?? 0 };
  } catch {
    return { stages: {}, totalProspects: 0, totalOutreach: 0 };
  }
}

function durationSeconds(start: string, end: string | null): string {
  if (!end) return "running";
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return `${(ms / 1000).toFixed(1)}s`;
}

export default async function AutomationPage() {
  const [runs, funnel] = await Promise.all([loadRuns(), loadFunnel()]);

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
          Automation
        </h1>
        <p className="mt-1 text-[13px] text-body">
          Daily auto-prospect + outreach + follow-up + GEO content jobs.
        </p>
      </div>

      <AutomationActions />

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Activity size={13} className="text-accent" />
          <h2 className="font-display text-[15px] font-bold text-white">Pipeline</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
          {(["lead", "engaged", "meeting", "proposal", "won", "lost"] as const).map((stage) => (
            <div
              key={stage}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
                {stage}
              </div>
              <div className="mt-1 font-display text-[20px] font-bold text-white">
                {funnel.stages[stage] ?? 0}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 font-mono text-[11px] text-dim">
          {funnel.totalProspects} prospects · {funnel.totalOutreach} emails sent
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Clock size={13} className="text-accent" />
          <h2 className="font-display text-[15px] font-bold text-white">Recent runs</h2>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/[0.06]">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] font-mono text-[10px] uppercase tracking-[0.08em] text-dim">
              <tr>
                <th className="px-3 py-2.5">Job</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5">Started</th>
                <th className="px-3 py-2.5">Duration</th>
                <th className="px-3 py-2.5">Stats</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {runs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-dim">
                    No runs yet. Trigger one manually above or wait for the cron schedule.
                  </td>
                </tr>
              ) : (
                runs.map((r) => (
                  <tr key={r.id} className="border-t border-white/[0.04]">
                    <td className="px-3 py-2.5 text-white">{JOB_LABELS[r.job] || r.job}</td>
                    <td className="px-3 py-2.5">
                      <span
                        className={
                          r.status === "success"
                            ? "text-emerald-400"
                            : r.status === "error"
                              ? "text-red-400"
                              : "text-blue-400"
                        }
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-dim">
                      {new Date(r.started_at).toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-dim">
                      {durationSeconds(r.started_at, r.completed_at)}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-dim">
                      {r.stats ? formatStats(r.stats) : r.error || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function formatStats(stats: Record<string, unknown>): string {
  const entries = Object.entries(stats).filter(
    ([k, v]) => k !== "errors" && typeof v === "number" && (v as number) > 0
  );
  if (!entries.length) return "—";
  return entries.map(([k, v]) => `${k}:${v}`).join(" · ");
}
