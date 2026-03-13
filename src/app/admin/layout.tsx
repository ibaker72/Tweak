import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Terminal, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/portal/queries";
import { AdminDesktopNav, AdminMobileNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: "Admin Console — Tweak&Build",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const profile = await getProfile();

  if (!profile || (profile.role !== "admin" && profile.role !== "team")) {
    redirect("/client-portal");
  }

  return (
    <div className="min-h-screen bg-surface-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-surface-0/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-page items-center justify-between px-5 sm:px-8">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-accent shadow-[0_1px_4px_rgba(200,255,0,0.12)]">
              <Terminal size={13} className="text-surface-0" />
            </div>
            <span className="font-display text-[15px] font-extrabold tracking-[-0.03em] text-white">
              Tweak<span className="text-accent">&amp;</span>Build
            </span>
            <span className="hidden rounded-full border border-accent/20 bg-accent/[0.06] px-2.5 py-[2px] font-mono text-[9px] uppercase tracking-[0.1em] text-accent sm:inline-block">
              Admin
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <AdminDesktopNav />
            <div className="ml-3 hidden h-5 w-px bg-white/[0.06] md:block" />
            <div className="hidden items-center gap-2.5 md:flex">
              <span className="font-mono text-[11px] text-dim">
                {profile.full_name || user.email}
              </span>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-dim transition-colors hover:border-white/[0.12] hover:text-body"
                  title="Sign out"
                >
                  <LogOut size={12} />
                </button>
              </form>
            </div>
            <AdminMobileNav email={profile.full_name || user.email || ""} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-page px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
        {children}
      </main>
    </div>
  );
}
