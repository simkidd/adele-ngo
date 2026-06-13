"use client";

import { Bell, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useApplicantStore } from "@/stores/applicant.store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const getTitle = (pathname: string) => {
  if (pathname === "/applicant/dashboard") return "Overview";
  if (pathname.startsWith("/applicant/dashboard/application"))
    return "Application";
  if (pathname.startsWith("/applicant/dashboard/certificate"))
    return "Certificate";
  if (pathname.startsWith("/applicant/dashboard/profile")) return "Profile";
  return "Dashboard";
};

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
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

  const title = getTitle(pathname);

  return (
    <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden text-slate-500">
          <Menu size={22} />
        </button>

        <div>
          <h1 className="font-heading font-black text-xl text-slate-900">
            {title}
          </h1>

          <p className="text-xs text-slate-400 mt-1 hidden sm:block">
            {getGreeting()}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {hasAnnouncements && (
          <button
            onClick={onAnnouncementClick}
            className="relative h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 hover:text-primary transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
          </button>
        )}

        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          {!applicant ? (
            <>
              <div className="text-right space-y-2">
                <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
                <div className="h-2.5 w-16 bg-slate-100 rounded animate-pulse ml-auto" />
              </div>

              <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
            </>
          ) : (
            <>
              <div className="text-right hidden sm:flex flex-col">
                <p className="text-sm font-semibold text-slate-900 leading-none">
                  {applicant.fullName}
                </p>

                <p className="text-xs text-slate-400 mt-1">{applicant.email}</p>
              </div>

              <Avatar className="h-10 w-10">
                <AvatarImage src={applicant.passportPhoto} />
                <AvatarFallback>
                  {applicant.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
