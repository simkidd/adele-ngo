"use client";

import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Edit3, Loader2 } from "lucide-react";
import { useCohorts } from "@/hooks/queries/use-cohorts";
import { CohortStatus } from "@/interfaces/cohort.interface";
import { useState } from "react";
import NewCohortModal from "@/components/admin/cohorts/NewCohortModal";

const statusColors: Record<CohortStatus, string> = {
  Draft: "bg-slate-100 text-slate-600",
  Open: "bg-green-100 text-green-700",
  Closed: "bg-yellow-100 text-yellow-700",
  Active: "bg-blue-100 text-blue-700",
  Completed: "bg-slate-100 text-slate-500",
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function CohortDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [showEdit, setShowEdit] = useState(false);

  const { data: cohorts = [], isPending } = useCohorts();

  const cohort = cohorts.find((item) => item._id === params.id);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!cohort) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
        <p className="text-slate-500 text-sm">Cohort not found.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-sm font-bold text-primary cursor-pointer"
        >
          Go back
        </button>
      </div>
    );
  }

  const totalCenters = cohort.centers.length;

  const totalPrograms = cohort.centers.reduce(
    (sum, center) => sum + center.programs.length,
    0,
  );

  const totalSeats = cohort.centers.reduce(
    (sum, center) =>
      sum +
      center.programs.reduce(
        (programSum, program) => programSum + program.totalSeats,
        0,
      ),
    0,
  );

  const totalEnrolled = cohort.centers.reduce(
    (sum, center) =>
      sum +
      center.programs.reduce(
        (programSum, program) => programSum + program.enrolledCount,
        0,
      ),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to cohorts
        </button>

        <div className="flex items-center gap-3 ml-auto">
          <span
            className={`text-xs px-3 py-1.5 rounded-full font-bold ${statusColors[cohort.status]}`}
          >
            {cohort.status}
          </span>

          <button
            onClick={() => setShowEdit(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/70 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
          >
            <Edit3 size={15} />
            Edit Cohort
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading font-black text-2xl text-slate-900">
              {cohort.name}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Created {formatDate(cohort.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={16} />
            <span>
              {formatDate(cohort.startDate)} – {formatDate(cohort.endDate)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {[
            ["Centers", totalCenters],
            ["Programs", totalPrograms],
            ["Total Seats", totalSeats],
            ["Enrolled", totalEnrolled],
          ].map(([label, value]) => (
            <div key={label} className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs text-slate-400 font-medium">{label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-heading font-bold text-slate-900">
            Application & Training Timeline
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {[
                  "Application Start",
                  "Application End",
                  "Training Start",
                  "Training End",
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
            <tbody>
              <tr>
                <td className="px-5 py-4 text-slate-600 text-nowrap">
                  {formatDate(cohort.applicationStart)}
                </td>
                <td className="px-5 py-4 text-slate-600 text-nowrap">
                  {formatDate(cohort.applicationEnd)}
                </td>
                <td className="px-5 py-4 text-slate-600 text-nowrap">
                  {formatDate(cohort.startDate)}
                </td>
                <td className="px-5 py-4 text-slate-600 text-nowrap">
                  {formatDate(cohort.endDate)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-heading font-bold text-slate-900">
            Centers & Programs
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {[
                  "Center",
                  "Program",
                  "Total Seats",
                  "Enrolled",
                  "Available",
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
              {cohort.centers.flatMap((center, centerIndex) =>
                center.programs.map((program, programIndex) => {
                  const available = program.totalSeats - program.enrolledCount;

                  return (
                    <motion.tr
                      key={`${center.centerId._id}-${program.programId._id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: (centerIndex + programIndex) * 0.04,
                      }}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {center.centerId.name}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {program.programId.title}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {program.totalSeats}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {program.enrolledCount}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            available > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {available}
                        </span>
                      </td>
                    </motion.tr>
                  );
                }),
              )}

              {cohort.centers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No centers configured for this cohort.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 supports-backdrop-filter:backdrop-blur-xs flex items-center justify-center p-4"
          >
            <NewCohortModal
              cohort={cohort}
              mode="edit"
              onClose={() => setShowEdit(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
