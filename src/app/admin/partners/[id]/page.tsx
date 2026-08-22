import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Building2,
  Link2,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { PortalCard } from "@/components/portal/portal-card";
import { StatusBadge } from "@/components/portal/status-badge";
import { getPartnerApplicationById } from "@/lib/admin/queries";
import { PartnerStatusControls } from "./partner-status-controls";
import { PartnerNotesForm } from "./partner-notes-form";

export const metadata = {
  title: "Partner Application — Admin",
  robots: { index: false, follow: false },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/** Row of applicant metadata: icon, label, value. */
function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="mt-[2px] flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-dim">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-dim">
          {label}
        </p>
        <div className="mt-0.5 break-words text-[13px] text-white/85">{children}</div>
      </div>
    </div>
  );
}

export default async function AdminPartnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getPartnerApplicationById(id);

  if (!application) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/partners"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-dim transition-colors hover:text-body"
      >
        <ArrowLeft size={12} />
        Partner Applications
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-white">
            {application.full_name}
          </h1>
          <p className="mt-1 font-mono text-[12px] text-dim">
            Applied {formatDate(application.created_at)}
          </p>
        </div>
        <StatusBadge status={application.status} type="partner" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* ─── Application content ─── */}
        <div className="space-y-5">
          <PortalCard title="What they do">
            <p className="whitespace-pre-wrap text-[13px] leading-[1.7] text-body">
              {application.description}
            </p>
          </PortalCard>

          <PortalCard title="How they meet potential clients">
            <p className="whitespace-pre-wrap text-[13px] leading-[1.7] text-body">
              {application.how_you_meet}
            </p>
          </PortalCard>

          <PortalCard title="Internal notes">
            <PartnerNotesForm
              applicationId={application.id}
              initialNotes={application.internal_notes ?? ""}
            />
          </PortalCard>
        </div>

        {/* ─── Applicant + management ─── */}
        <div className="space-y-5">
          <PortalCard title="Applicant">
            <div className="divide-y divide-white/[0.04]">
              <DetailRow icon={<Mail size={12} />} label="Email">
                <a
                  href={`mailto:${application.email}`}
                  className="text-accent transition-opacity hover:opacity-80"
                >
                  {application.email}
                </a>
              </DetailRow>

              <DetailRow icon={<Building2 size={12} />} label="Company / brand">
                {application.company || <span className="text-dim">—</span>}
              </DetailRow>

              <DetailRow icon={<Link2 size={12} />} label="Website / LinkedIn">
                {application.website ? (
                  <a
                    href={application.website}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="break-all text-accent transition-opacity hover:opacity-80"
                  >
                    {application.website}
                  </a>
                ) : (
                  <span className="text-dim">—</span>
                )}
              </DetailRow>

              <DetailRow icon={<TrendingUp size={12} />} label="Estimated referrals">
                {application.estimated_referrals} per quarter
              </DetailRow>

              <DetailRow icon={<CalendarDays size={12} />} label="Submitted">
                {formatDate(application.created_at)}
              </DetailRow>
            </div>
          </PortalCard>

          <PortalCard title="Manage">
            <PartnerStatusControls
              applicationId={application.id}
              currentStatus={application.status}
            />
          </PortalCard>
        </div>
      </div>
    </div>
  );
}
