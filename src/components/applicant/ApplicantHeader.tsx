"use client";

import { useApplicantStore } from "@/stores/applicant.store";
import { Bell, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const getTitle = (pathname: string) => {
  if (pathname === "/applicant/dashboard") return "Overview";
  if (pathname.startsWith("/application")) return "Application";
  if (pathname.startsWith("/certificate")) return "Certificate";
  if (pathname.startsWith("/profile")) return "Profile";
  return "Dashboard";
};

export default function ApplicantHeader({
  onMenuClick,
  hasAnnouncements,
  onAnnouncementClick,
}: {
  onMenuClick: () => void;
  hasAnnouncements: boolean;
  onAnnouncementClick: () => void;
}) {
  const pathname = usePathname();
  const { applicant } = useApplicantStore();

  return (
    <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden text-slate-500">
          <Menu size={22} />
        </button>

        <h1 className="font-heading font-black text-xl text-slate-900">
          {getTitle(pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {hasAnnouncements && (
          <button
            onClick={onAnnouncementClick}
            className="relative h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </button>
        )}

        {applicant && (
          <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-100">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 leading-none">
                {applicant.fullName}
              </p>
              <p className="text-xs text-slate-400 mt-1 truncate max-w-40">
                {applicant.email}
              </p>
            </div>

            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-bold text-primary text-sm">
                {applicant.fullName?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
