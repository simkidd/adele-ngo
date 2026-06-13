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
  Loader2,
} from "lucide-react";
import { useApplicantStore } from "@/stores/applicant.store";
import { useApplicantLogout } from "@/hooks/mutations/use-applicant-logout";
import AnnouncementModal from "./AnnouncementModal";
import ApplicantHeader from "./ApplicantHeader";
import ApplicantSidebar from "./ApplicantSidebar";
import { usePublicAnnouncements } from "@/hooks/queries/use-announcements";
import { IAnnouncement } from "@/interfaces/announcement.interface";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [annDialog, setAnnDialog] = useState(false);

  const { data: announcements } = usePublicAnnouncements();

  const anns = announcements?.data;
  const firstAnn = anns?.[0] as IAnnouncement | null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 fixed top-0 bottom-0 left-0 z-30">
        <ApplicantSidebar />
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
              <ApplicantSidebar onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <ApplicantHeader
          onMenuClick={() => setMobileOpen(true)}
          hasAnnouncements={!!anns?.length}
          onAnnouncementClick={() => setAnnDialog(true)}
        />
        <main className="flex-1 p-6">{children}</main>
      </div>

      <AnnouncementModal
        open={annDialog}
        announcement={firstAnn}
        onClose={() => setAnnDialog(false)}
      />
    </div>
  );
}
