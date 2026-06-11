"use client";
import {
  CalendarDays,
  ChevronRight,
  FileText,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAdminLogout } from "@/hooks/mutations/use-admin-logout";
import { useAdminStore } from "@/stores/admin.store";

export function Sidebar({
  mobile,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const logout = useAdminLogout();
  const { user } = useAdminStore();
  const [programsOpen, setProgramsOpen] = useState(
    pathname.startsWith("/admin/programs"),
  );

  // ── Nav config ───────────────────────────────────────────────────────────────
  const NAV = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Blog", href: "/admin/dashboard/blog", icon: FileText },
    { label: "Events", href: "/admin/dashboard/events", icon: CalendarDays },
    {
      label: "Programs",
      icon: GraduationCap,
      children: [
        {
          label: "Registrations",
          href: "/admin/dashboard/programs/registrations",
        },
        { label: "Cohorts", href: "/admin/dashboard/programs/cohorts" },
        {
          label: "Certifications",
          href: "/admin/dashboard/programs/certifications",
        },
      ],
    },
    { label: "Submissions", href: "/admin/dashboard/submissions", icon: Inbox },
    { label: "Settings", href: "/admin/dashboard/settings", icon: Settings },
  ];

  return (
    <div
      className={`flex flex-col h-full bg-slate-950 ${mobile ? "w-72" : "w-64"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="font-heading font-black text-sm text-white">
              A
            </span>
          </div>
          <span className="font-heading font-black text-white">
            Adele Admin
          </span>
        </div>
        {mobile && (
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        {NAV.map((item) => {
          if (item.children) {
            const isActive = pathname.startsWith("/admin/programs");
            return (
              <div key={item.label}>
                <button
                  onClick={() => setProgramsOpen((o) => !o)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={17} />
                    {item.label}
                  </span>
                  <motion.div
                    animate={{ rotate: programsOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={14} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {programsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-8 mt-1 space-y-1"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={`block px-3 py-2 rounded-xl text-sm transition-colors ${pathname === child.href ? "bg-primary text-white font-semibold" : "text-slate-500 hover:text-white hover:bg-slate-800"}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href!}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          {!user ? (
            <>
              <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse" />

              <div className="space-y-2 flex-1">
                <div className="h-3 w-24 bg-slate-800 rounded animate-pulse" />
                <div className="h-2.5 w-16 bg-slate-800 rounded animate-pulse" />
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-xs font-bold">
                  {user.fullName?.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {user.fullName}
                </p>
                <p className="text-slate-500 text-xs capitalize truncate">
                  {user.role.replace("_", " ")}
                </p>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={17} /> Sign Out
        </button>
      </div>
    </div>
  );
}
