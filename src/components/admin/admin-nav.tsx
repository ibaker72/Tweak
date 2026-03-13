"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  FileText,
  CheckSquare,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/updates", label: "Updates", icon: MessageSquare },
  { href: "/admin/files", label: "Files", icon: FileText },
  { href: "/admin/approvals", label: "Approvals", icon: CheckSquare },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export function AdminDesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-0.5 md:flex">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors",
            isActive(pathname, href)
              ? "bg-white/[0.06] text-white"
              : "text-white/40 hover:bg-white/[0.03] hover:text-white/70"
          )}
        >
          <Icon size={13} />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function AdminMobileNav({ email }: { email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-dim"
      >
        {open ? <X size={14} /> : <Menu size={14} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-14 z-50 border-b border-white/[0.06] bg-surface-0/98 p-4 backdrop-blur-xl">
          <div className="space-y-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
                  isActive(pathname, href)
                    ? "bg-white/[0.06] text-white"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-3 border-t border-white/[0.06] pt-3">
            <p className="mb-2 truncate px-3 font-mono text-[11px] text-dim">{email}</p>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium text-white/40 transition-colors hover:text-white/70"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
