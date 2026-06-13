"use client";
import NewCohortModal from "@/components/admin/cohorts/NewCohortModal";
import { useCohorts } from "@/hooks/queries/use-cohorts";
import { CohortStatus } from "@/interfaces/cohort.interface";
import { cohortApi } from "@/lib/api/cohort.api";
import { getApiError } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const statusColors: Record<CohortStatus, string> = {
  Draft: "bg-slate-100 text-slate-600",
  Open: "bg-green-100 text-green-700",
  Closed: "bg-yellow-100 text-yellow-700",
  Active: "bg-blue-100 text-blue-700",
  Completed: "bg-slate-100 text-slate-500",
};
const nextStatus: Partial<Record<CohortStatus, CohortStatus>> = {
  Draft: "Open",
  Open: "Closed",
  Closed: "Active",
  Active: "Completed",
};
const nextLabel: Partial<Record<CohortStatus, string>> = {
  Draft: "Open Applications",
  Open: "Close Applications",
  Closed: "Begin Training",
  Active: "Mark Completed",
};

export default function CohortsPage() {
  const queryClient = useQueryClient();
  const [showNew, setShowNew] = useState(false);
  const [pendingTransition, setPendingTransition] = useState<{
    id: string;
    name: string;
    currentStatus: CohortStatus;
    nextStatus: CohortStatus;
  } | null>(null);

  const { data: cohorts = [], isPending: cohortsLoading } = useCohorts();

  const updateCohortStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CohortStatus }) =>
      cohortApi.updateCohortStatus(id, { status }),
  });

  const loading = cohortsLoading;

  const transition = async (id: string, status: CohortStatus) => {
    await updateCohortStatus.mutateAsync(
      { id, status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cohorts"] });
          queryClient.invalidateQueries({ queryKey: ["open-cohort"] });
          toast.success("Cohort status updated successfully");
          setPendingTransition(null);
        },
        onError: (error) => {
          setPendingTransition(null);
          toast.error(getApiError(error));
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm">
          {cohorts.length} cohort{cohorts.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/60 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
        >
          <Plus size={16} /> New Cohort
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {[
                    "Cohort",
                    "Applications",
                    "Training",
                    "Centers",
                    "Status",
                    "Actions",
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
                {cohorts.map((cohort, i) => (
                  <motion.tr
                    key={cohort._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900 text-nowrap">
                        {cohort.name}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-500 text-nowrap">
                      {new Date(cohort.applicationStart).toLocaleDateString(
                        "en-NG",
                        {
                          month: "short",
                          day: "numeric",
                        },
                      )}{" "}
                      –{" "}
                      {new Date(cohort.applicationEnd).toLocaleDateString(
                        "en-NG",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </td>

                    <td className="px-5 py-4 text-slate-500 text-nowrap">
                      {new Date(cohort.startDate).toLocaleDateString("en-NG", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      –{" "}
                      {new Date(cohort.endDate).toLocaleDateString("en-NG", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-5 py-4 text-slate-600 text-nowrap">
                      {(cohort.centers as unknown[]).length} center
                      {(cohort.centers as unknown[]).length !== 1 ? "s" : ""}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColors[cohort.status]}`}
                      >
                        {cohort.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/dashboard/programs/cohorts/${cohort._id}`}
                          className="text-xs font-bold px-3 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                          View
                        </Link>

                        {nextStatus[cohort.status] ? (
                          <button
                            onClick={() =>
                              setPendingTransition({
                                id: cohort._id,
                                name: cohort.name,
                                currentStatus: cohort.status,
                                nextStatus: nextStatus[cohort.status]!,
                              })
                            }
                            disabled={updateCohortStatus.isPending}
                            className="text-xs font-bold px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/70 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-nowrap cursor-pointer"
                          >
                            {nextLabel[cohort.status]}
                          </button>
                        ) : (
                          <span className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 text-slate-400">
                            Completed
                          </span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}

                {cohorts.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-slate-400"
                    >
                      No cohorts yet. Create your first one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 supports-backdrop-filter:backdrop-blur-xs flex items-center justify-center p-4"
          >
            <NewCohortModal onClose={() => setShowNew(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pendingTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 supports-backdrop-filter:backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setPendingTransition(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6"
            >
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Confirm status change
                </p>

                <h3 className="font-heading font-black text-xl text-slate-900">
                  Move cohort to {pendingTransition.nextStatus}?
                </h3>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  You are about to change{" "}
                  <span className="font-semibold text-slate-800">
                    {pendingTransition.name}
                  </span>{" "}
                  from{" "}
                  <span className="font-semibold">
                    {pendingTransition.currentStatus}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold">
                    {pendingTransition.nextStatus}
                  </span>
                  .
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Make sure this action is correct before continuing. This may
                  affect application visibility and training workflow.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setPendingTransition(null)}
                  disabled={updateCohortStatus.isPending}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={() =>
                    transition(
                      pendingTransition.id,
                      pendingTransition.nextStatus,
                    )
                  }
                  disabled={updateCohortStatus.isPending}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/70 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  {updateCohortStatus.isPending && (
                    <Loader2 size={15} className="animate-spin" />
                  )}
                  Confirm Change
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
