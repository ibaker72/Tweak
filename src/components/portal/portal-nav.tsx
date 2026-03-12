"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LayoutDashboard, FileText, CheckSquare, LogOut } from "lucide-react";

interface PortalNavProps {
  email: string;
}

export function PortalNav({ email }: PortalNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white md:hidden"
        aria-label="Menu"
      >
        {open ? <X size={14} /> : <Menu size={14} />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-14 z-40 border-b border-white/[0.06] bg-surface-1/95 px-5 pb-4 pt-2 backdrop-blur-xl md:hidden">
          <nav className="space-y-0.5">
            <MobileLink href="/client-portal" icon={<LayoutDashboard size={14} />} label="Dashboard" onClick={() => setOpen(false)} />
            <MobileLink href="/client-portal/files" icon={<FileText size={14} />} label="Files" onClick={() => setOpen(false)} />
            <MobileLink href="/client-portal/approvals" icon={<CheckSquare size={14} />} label="Approvals" onClick={() => setOpen(false)} />
          </nav>
          <div className="mt-3 border-t border-white/[0.05] pt-3">
            <p className="mb-2 px-3 font-mono text-[10px] text-dim">{email}</p>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] text-white/50 transition-colors hover:bg-white/[0.03] hover:text-white"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function MobileLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[14px] font-medium text-white/60 transition-colors hover:bg-white/[0.03] hover:text-white"
    >
      {icon}
      {label}
    </Link>
  );
}
