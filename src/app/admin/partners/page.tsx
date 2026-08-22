import {
  getPartnerApplications,
  getPartnerApplicationStats,
} from "@/lib/admin/queries";
import { PartnersFilter } from "./partners-filter";

export const metadata = {
  title: "Partner Applications — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPartnersPage() {
  const [applications, stats] = await Promise.all([
    getPartnerApplications(),
    getPartnerApplicationStats(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[24px] font-extrabold tracking-[-0.03em] text-white">
          Partner Applications
        </h1>
        <p className="mt-1 text-[13px] text-body">
          {stats.total} application{stats.total !== 1 ? "s" : ""}
          {stats.newCount > 0 && (
            <>
              {" · "}
              <span className="text-accent">{stats.newCount} awaiting review</span>
            </>
          )}
        </p>
      </div>

      <PartnersFilter
        applications={applications.map((a) => ({
          id: a.id,
          full_name: a.full_name,
          email: a.email,
          company: a.company,
          estimated_referrals: a.estimated_referrals,
          status: a.status,
          created_at: a.created_at,
        }))}
      />
    </div>
  );
}
