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
  if (pathname === "/admin/dashboard") return "Overview";

  if (pathname.startsWith("/admin/dashboard/blog")) {
    if (pathname.includes("/new")) return "Create Blog";
    if (pathname.split("/").length > 5) return "Edit Blog";
    return "Blog";
  }

  if (pathname.startsWith("/admin/dashboard/events")) {
    if (pathname.includes("/new")) return "Create Event";
    if (pathname.split("/").length > 5) return "Event Details";
    return "Events";
  }

  if (pathname.startsWith("/admin/dashboard/centers")) {
    if (pathname.split("/").length > 4) return "Center Details";
    return "Centers";
  }

  if (pathname.startsWith("/admin/dashboard/programs/registrations")) {
    if (pathname.split("/").length > 5) return "Application Details";
    return "Registrations";
  }

  if (pathname.startsWith("/admin/dashboard/programs/cohorts")) {
    if (pathname.includes("/new")) return "Create Cohort";
    if (pathname.split("/").length > 5) return "Cohort Details";
    return "Cohorts";
  }

  if (pathname.startsWith("/admin/dashboard/programs/certifications")) {
    return "Certifications";
  }

  if (pathname.startsWith("/admin/dashboard/submissions")) {
    return "Submissions";
  }

  if (pathname.startsWith("/admin/dashboard/announcements")) {
    return "Announcements";
  }

  if (pathname.startsWith("/admin/dashboard/users")) {
    if (pathname.split("/").length > 4) return "Staff Details";
    return "Staffs";
  }

  if (pathname.startsWith("/admin/dashboard/biometric")) {
    return "Biometrics";
  }

  if (pathname.startsWith("/admin/dashboard/settings")) {
    return "Settings";
  }

  return "Admin";
};

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const logout = useAdminLogout();
  const { user } = useAdminStore();

  const title = getAdminPageTitle(pathname);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
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
