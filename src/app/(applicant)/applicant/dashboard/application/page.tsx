"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Loader2, Plus, X } from "lucide-react";
import {
  IRegistration,
  RegistrationStatus,
} from "@/interfaces/registration.interface";
import { useApplicantApplications } from "@/hooks/queries/use-applicant-applications";
import ReturningApplicationModal from "@/components/applicant/applications/ReturningApplicationModal";
import { formatDate } from "@/utils/helpers/date";
import ApplicationDetailsSheet from "@/components/applicant/applications/ApplicationDetailSheet";

const statusColors: Record<RegistrationStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-blue-100 text-blue-700",
  Verified: "bg-green-100 text-green-700",
  Enrolled: "bg-orange-100 text-orange-700",
  Rejected: "bg-red-100 text-red-700",
  Completed: "bg-slate-200 text-slate-700",
};

export default function ApplicantApplicationsPage() {
  const [showNew, setShowNew] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);

  const { data, isPending } = useApplicantApplications();

  const payload = data;

  const applications = payload?.applications ?? [];
  const currentApplication = payload?.currentRegistration ?? null;

  const canApply = !!payload?.canApply;
  const openCohort = payload?.openCohort;

  const hasOngoingApplication =
    currentApplication &&
    ["Pending", "Accepted", "Verified", "Enrolled"].includes(
      currentApplication.status,
    );

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Your training applications</p>
          <h2 className="font-heading font-black text-2xl text-slate-900">
            Applications
          </h2>
        </div>

        {canApply && (
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/60 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Plus size={16} />
            New Application
          </button>
        )}
      </div>

      {hasOngoingApplication ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText size={20} className="text-primary" />
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">
                  Ongoing Application
                </p>
                <h3 className="font-heading font-black text-lg text-slate-900">
                  {currentApplication.programId?.title ?? "—"}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {currentApplication.centerId?.name ?? "—"} •{" "}
                  {currentApplication.cohortId?.name ?? "—"}
                </p>
                <p className="text-xs text-slate-400 font-mono mt-2">
                  {currentApplication.referenceNumber}
                </p>
              </div>
            </div>

            <span
              className={`text-xs px-3 py-1.5 rounded-full font-bold ${
                statusColors[currentApplication.status]
              }`}
            >
              {currentApplication.status}
            </span>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center">
          <p className="font-semibold text-slate-900">No application yet</p>
          <p className="text-sm text-slate-500 mt-1">
            {canApply
              ? "A cohort is open. You can submit your first application."
              : "There is no open cohort at the moment."}
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-heading font-bold text-slate-900">
            Application History
          </h3>

          <span className="text-sm text-slate-400">
            {applications.length} record{applications.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {[
                  "Reference",
                  "Cohort",
                  "Program",
                  "Center",
                  "Applied",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {applications.map((app, i) => (
                <motion.tr
                  key={app._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-5 py-4 text-nowrap">
                    <p className="font-mono text-xs font-semibold text-slate-900">
                      {app.referenceNumber}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-600 min-w-[140px]">
                    {app.cohortId?.name ?? "—"}
                  </td>

                  <td className="px-5 py-4 text-slate-600 min-w-[220px]">
                    {app.programId?.title ?? "—"}
                  </td>

                  <td className="px-5 py-4 text-slate-600 min-w-[220px]">
                    {app.centerId?.name ?? "—"}
                  </td>

                  <td className="px-5 py-4 text-slate-500 text-nowrap">
                    {formatDate(app.appliedAt ?? app.createdAt)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        statusColors[app.status]
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setDetailId(app._id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/70 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}

              {applications.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ApplicationDetailsSheet
        applicationId={detailId}
        onClose={() => setDetailId(null)}
      />

      <ReturningApplicationModal
        open={showNew}
        openCohort={openCohort}
        onClose={() => setShowNew(false)}
      />
    </div>
  );
}
