"use client";

import { motion } from "framer-motion";
import { SEED_REGISTRATIONS, SEED_COHORTS, SEED_POSTS, SEED_EVENTS, SEED_CERTIFICATES, SEED_SUBMISSIONS } from "@/lib/store";
import { Users, GraduationCap, FileText, CalendarDays, Award, Inbox, TrendingUp, Clock } from "lucide-react";

const stats = [
  { label: "Total Registrations",   value: SEED_REGISTRATIONS.length,                             icon: Users,         color: "bg-blue-50 text-blue-600",   border: "border-blue-100" },
  { label: "Active Cohorts",        value: SEED_COHORTS.filter(c => c.status === "Active").length, icon: GraduationCap, color: "bg-orange-50 text-orange-600",border: "border-orange-100" },
  { label: "Published Posts",       value: SEED_POSTS.filter(p => p.status === "Published").length,icon: FileText,      color: "bg-purple-50 text-purple-600",border: "border-purple-100" },
  { label: "Upcoming Events",       value: SEED_EVENTS.filter(e => e.status === "Upcoming").length,icon: CalendarDays,  color: "bg-green-50 text-green-600",  border: "border-green-100" },
  { label: "Pending Applications",  value: SEED_REGISTRATIONS.filter(r => r.status === "Pending").length, icon: Clock,  color: "bg-yellow-50 text-yellow-600",border: "border-yellow-100" },
  { label: "Certificates Issued",   value: SEED_CERTIFICATES.length,                               icon: Award,         color: "bg-teal-50 text-teal-600",    border: "border-teal-100" },
];

const programCounts = [
  { label: "Digital Literacy",    count: SEED_REGISTRATIONS.filter(r => r.programId === "digital-literacy").length,  color: "bg-blue-500"   },
  { label: "Entrepreneurship",    count: SEED_REGISTRATIONS.filter(r => r.programId === "entrepreneurship").length,  color: "bg-orange-500" },
  { label: "Culinary Arts",       count: SEED_REGISTRATIONS.filter(r => r.programId === "culinary-arts").length,     color: "bg-amber-500"  },
  { label: "Tailoring",           count: SEED_REGISTRATIONS.filter(r => r.programId === "tailoring").length,         color: "bg-purple-500" },
  { label: "Carpentry",           count: SEED_REGISTRATIONS.filter(r => r.programId === "carpentry").length,         color: "bg-green-600"  },
];
const maxCount = Math.max(...programCounts.map(p => p.count), 1);

const recentActivity = [
  ...SEED_REGISTRATIONS.slice(-3).map(r => ({ type: "registration" as const, label: `New registration — ${r.name}`, sub: r.programTitle, date: r.date })),
  ...SEED_SUBMISSIONS.slice(-2).map(s => ({ type: "submission"   as const, label: `Contact form — ${s.name}`,       sub: s.enquiryType, date: s.date })),
].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`bg-white rounded-2xl p-5 border ${s.border} shadow-sm`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="font-heading text-3xl font-black text-slate-900 mb-1">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Registrations by program */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={18} className="text-orange-500" />
            <h2 className="font-heading font-black text-lg text-slate-900">Registrations by Program</h2>
          </div>
          <div className="space-y-4">
            {programCounts.map((p, i) => (
              <motion.div key={p.label} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-700 font-medium">{p.label}</span>
                  <span className="text-sm font-bold text-slate-900">{p.count}</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(p.count / maxCount) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`h-full rounded-full ${p.color}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <Clock size={18} className="text-orange-500" />
            <h2 className="font-heading font-black text-lg text-slate-900">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 + i * 0.07 }}
                className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.type === "registration" ? "bg-orange-400" : "bg-blue-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 font-medium truncate">{item.label}</p>
                  <p className="text-xs text-slate-400 capitalize">{item.sub}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{new Date(item.date).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Applications status breakdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-heading font-black text-lg text-slate-900 mb-5">Application Status Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(["Pending","Accepted","Enrolled","Rejected"] as const).map((status) => {
            const count = SEED_REGISTRATIONS.filter(r => r.status === status).length;
            const colors: Record<string, string> = {
              Pending:  "bg-yellow-100 text-yellow-700 border-yellow-200",
              Accepted: "bg-green-100  text-green-700  border-green-200",
              Enrolled: "bg-blue-100   text-blue-700   border-blue-200",
              Rejected: "bg-red-100    text-red-700    border-red-200",
            };
            return (
              <div key={status} className={`rounded-2xl p-4 border text-center ${colors[status]}`}>
                <div className="font-heading text-3xl font-black mb-1">{count}</div>
                <div className="text-sm font-medium">{status}</div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
