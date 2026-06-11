"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Award,
  User,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { useApplicantStore } from "@/stores/applicant.store";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Application", href: "/dashboard/application", icon: FileText },
  { label: "Certificate", href: "/dashboard/certificate", icon: Award },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { applicant, dashboard, fetchMe, logout, initialized } =
    useApplicantStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [annDialog, setAnnDialog] = useState(false);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    if (initialized && !applicant) router.push("/applicant/auth/login");
  }, [initialized, applicant, router]);

  useEffect(() => {
    const anns = dashboard?.announcements as
      | Record<string, string>[]
      | undefined;
    if (anns?.length) {
      const key = "adele_ann_shown";
      if (!sessionStorage.getItem(key)) {
        setAnnDialog(true);
        sessionStorage.setItem(key, "true");
      }
    }
  }, [dashboard]);
  if (!initialized)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  const anns = dashboard?.announcements as Record<string, string>[] | undefined;
  const firstAnn = anns?.[0];
  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center"
          >
            <span className="font-heading font-black text-white text-sm">
              A
            </span>
          </Link>
          <div>
            <p className="font-heading font-black text-slate-900 text-sm leading-none">
              Adele
            </p>
            <p className="text-xs text-slate-400 mt-0.5">Applicant Portal</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose}>
            <X size={20} className="text-slate-500" />
          </button>
        )}
      </div>
      {applicant && (
        <div className="px-6 py-4 border-b border-slate-100">
          <p className="font-semibold text-slate-900 text-sm truncate">
            {applicant.fullName}
          </p>
          <p className="text-xs text-slate-400 truncate">{applicant.email}</p>
        </div>
      )}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-orange-500 text-white" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={17} /> Sign Out
        </button>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 fixed top-0 bottom-0 left-0 z-30">
        <SidebarContent />
      </aside>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50" />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 bottom-0 w-64 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-slate-500"
            >
              <Menu size={22} />
            </button>
            <h1 className="font-heading font-black text-xl text-slate-900">
              {NAV.find((n) => n.href === pathname)?.label ?? "Dashboard"}
            </h1>
          </div>
          {anns?.length ? (
            <button
              onClick={() => setAnnDialog(true)}
              className="relative text-slate-400 hover:text-orange-500 transition-colors"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>
          ) : null}
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
      <AnimatePresence>
        {annDialog && firstAnn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Bell size={18} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {firstAnn.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {firstAnn.type} Announcement
                  </p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {firstAnn.body?.slice(0, 300)}
                {firstAnn.body?.length > 300 ? "..." : ""}
              </p>
              <button
                onClick={() => setAnnDialog(false)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
