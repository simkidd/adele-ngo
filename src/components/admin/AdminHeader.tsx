"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, LogOut, ExternalLink } from "lucide-react";
import { useAdminAuth } from "@/contexts/admin-auth.context";
import { useAdminLogout } from "@/hooks/mutations/use-admin-logout";
import { useAdminStore } from "@/stores/admin.store";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const getAdminPageTitle = (pathname: string) => {
  const titles: Record<string, string> = {
    "/admin/dashboard": "Overview",
    "/admin/dashboard/blog": "Blog",
    "/admin/dashboard/events": "Events",
    "/admin/dashboard/centers": "Centers",
    "/admin/dashboard/programs/registrations": "Registrations",
    "/admin/dashboard/programs/cohorts": "Cohorts",
    "/admin/dashboard/programs/certifications": "Certifications",
    "/admin/dashboard/submissions": "Submissions",
    "/admin/dashboard/settings": "Settings",
  };

  return titles[pathname] ?? "Admin";
};

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const logout = useAdminLogout();
  const { user } = useAdminStore();

  const title = getAdminPageTitle(pathname);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-slate-500 hover:text-slate-800 transition-colors"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="font-heading font-black text-xl text-slate-900">
            {title}
          </h1>

          <p className="text-xs text-slate-400 mt-0.5">
            Adele Empowerment Foundation
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className="relative h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          title="Notifications"
        >
          <Bell size={18} className="text-slate-600" />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500" />
        </button>

        {/* Website */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-orange-500 transition-colors"
        >
          View Site
          <ExternalLink size={14} />
        </Link>

        {/* Admin */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-900">
              {user?.fullName}
            </p>
            <p className="text-xs text-slate-500 capitalize">
              {user?.role.replace("_", " ")}
            </p>
          </div>

          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="font-bold text-orange-600 text-sm">
              {user?.fullName?.charAt(0).toUpperCase()}
            </span>
          </div>

          <button
            disabled={logout.isPending}
            onClick={() => logout.mutate()}
            className="h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
