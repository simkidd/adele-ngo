"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  User,
  X,
} from "lucide-react";
import { useApplicantLogout } from "@/hooks/mutations/use-applicant-logout";
import Logo from "../shared/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", href: "/applicant/dashboard", icon: LayoutDashboard },
  {
    label: "Application",
    href: "/applicant/dashboard/application",
    icon: FileText,
  },
  {
    label: "Certificate",
    href: "/applicant/dashboard/certificate",
    icon: Award,
  },
  { label: "Profile", href: "/applicant/dashboard/profile", icon: User },
];

export default function ApplicantSidebar({
  mobile,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const logout = useApplicantLogout();

  return (
    <div
      className={cn("flex h-full flex-col bg-white", mobile ? "w-72" : "w-64")}
    >
      {/* Brand */}
      <div className="px-5 py-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Logo className="h-7 w-7" />
            </div>

            <div>
              <p className="font-heading font-black text-slate-900 leading-none">
                Adele
              </p>
              <p className="text-xs text-slate-400 mt-1">Applicant Portal</p>
            </div>
          </Link>

          {onClose && (
            <button
              onClick={onClose}
              className="h-9 w-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-slate-500" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </p>

        {NAV.map((item) => {
          const isActive =
            item.href === "/applicant/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span
                className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-slate-100 text-slate-400 group-hover:text-primary"
                }`}
              >
                <item.icon size={17} />
              </span>

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-100">
        <button
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-60"
        >
          <span className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center">
            {logout.isPending ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <LogOut size={17} />
            )}
          </span>

          {logout.isPending ? "Signing Out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
