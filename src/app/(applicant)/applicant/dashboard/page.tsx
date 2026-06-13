"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useApplicantStore } from "@/stores/applicant.store";
import { useApplicantDashboard } from "@/hooks/queries/use-applicant-dashboard";
import {
  FileText,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Bell,
  ArrowRight,
  Loader2,
} from "lucide-react";

const STATUS_CONFIG = {
  Pending: {
    color: "text-yellow-700",
    bg: "bg-yellow-50 border-yellow-200",
    icon: Clock,
    label: "Under Review",
    desc: "Your application is being reviewed. We will update you within 3-5 business days.",
  },
  Accepted: {
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    icon: AlertCircle,
    label: "Action Required",
    desc: "You have been accepted! Please complete biometric verification at your center before the deadline.",
  },
  Verified: {
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
    icon: CheckCircle2,
    label: "Verification Complete",
    desc: "Your identity has been verified. You are confirmed for the upcoming cohort.",
  },
  Enrolled: {
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-200",
    icon: Users,
    label: "Enrolled",
    desc: "You are enrolled and training is underway.",
  },
  Rejected: {
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    icon: AlertCircle,
    label: "Unsuccessful",
    desc: "Unfortunately your application was not successful.",
  },
} as const;

type RegistrationStatus = keyof typeof STATUS_CONFIG;

export default function DashboardOverview() {
  const { applicant } = useApplicantStore();
  const { data, isPending } = useApplicantDashboard();

  const dashboard = data;
  const reg = dashboard?.registration;
  const cert = dashboard?.certificate;
  const announcements = dashboard?.announcements ?? [];

  const status = reg?.status as RegistrationStatus | undefined;
  const cfg = status ? STATUS_CONFIG[status] : null;
  const Icon = cfg?.icon ?? Clock;

  if (!applicant) return null;

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  const cohort = reg?.cohortId;
  const program = reg?.programId;
  const center = reg?.centerId;

  return (
    <div className=" space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white"
      >
        <p className="text-slate-400 text-sm mb-1">Welcome back</p>
        <h2 className="font-heading text-2xl font-black mb-1">
          {applicant.fullName}
        </h2>

        {/* {reg?.referenceNumber && (
          <p className="text-slate-400 text-xs font-mono">
            {reg.referenceNumber}
          </p>
        )} */}
      </motion.div>

      {reg && cfg ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`border rounded-2xl p-6 ${cfg.bg}`}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white flex-shrink-0">
              <Icon size={20} className={cfg.color} />
            </div>

            <div className="flex-1">
              <p className={`font-bold text-base ${cfg.color}`}>{cfg.label}</p>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                {cfg.desc}
              </p>
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-3 gap-3 pt-4 border-t border-current/10">
            {[
              ["Skill", program?.title],
              ["Center", center?.name],
              ["Cohort", cohort?.name],
            ]
              .filter(([, v]) => Boolean(v))
              .map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-slate-400 mb-0.5">{k}</p>
                  <p className="text-sm font-semibold text-slate-900">{v}</p>
                </div>
              ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white border border-slate-100 rounded-2xl p-6 text-center"
        >
          <p className="font-semibold text-slate-900 mb-1">
            No Active Application
          </p>
          <p className="text-slate-500 text-sm mb-4">
            Apply for a training program to get started.
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-3 gap-4"
      >
        {[
          {
            label: "Application",
            desc: "View your full application",
            href: "/applicant/dashboard/application",
            icon: FileText,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Certificate",
            desc: cert
              ? "Download your certificate"
              : "Issued after completion",
            href: "/applicant/dashboard/certificate",
            icon: Award,
            color: cert ? "text-orange-500" : "text-slate-300",
            bg: cert ? "bg-orange-50" : "bg-slate-50",
          },
          {
            label: "Profile",
            desc: "Manage your account",
            href: "/applicant/dashboard/profile",
            icon: Users,
            color: "text-green-500",
            bg: "bg-green-50",
          },
        ].map((item) => {
          const I = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-shadow group"
            >
              <div
                className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-3`}
              >
                <I size={20} className={item.color} />
              </div>

              <p className="font-semibold text-slate-900 text-sm">
                {item.label}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
            </Link>
          );
        })}
      </motion.div>

      {announcements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white border border-slate-100 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-primary" />
            <h3 className="font-semibold text-slate-900 text-sm">
              Announcements
            </h3>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 3).map((a: any, i: number) => (
              <div
                key={a._id ?? i}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl"
              >
                <span
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    a.type === "Alert" ? "bg-red-500" : "bg-primary"
                  }`}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {a.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {a.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
