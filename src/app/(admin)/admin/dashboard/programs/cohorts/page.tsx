"use client";
import NewCohortModal from "@/components/admin/cohorts/NewCohortModal";
import { useCenters } from "@/hooks/queries/use-centers";
import { useCohorts } from "@/hooks/queries/use-cohorts";
import { usePrograms } from "@/hooks/queries/use-programs";
import { CohortStatus } from "@/interfaces/cohort.interface";
import { cohortApi } from "@/lib/api/cohort.api";
import { getApiError } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Plus, X } from "lucide-react";
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

  const { data: cohorts = [], isPending: cohortsLoading } = useCohorts();

  const updateCohortStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CohortStatus }) =>
      cohortApi.updateCohortStatus(id, { status }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cohorts"] });
      queryClient.invalidateQueries({ queryKey: ["open-cohort"] });
    },
  });

  const loading = cohortsLoading;

  const transition = async (id: string, status: CohortStatus) => {
    updateCohortStatus.mutate(
      { id, status },
      {
        onError: (err) => {
          toast(getApiError(err));
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cohorts.map((cohort, i) => (
            <motion.div
              key={cohort._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-heading font-bold text-slate-900 text-base leading-tight">
                  {cohort.name}
                </h3>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${statusColors[cohort.status]}`}
                >
                  {cohort.status}
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-500 mb-4">
                <p>
                  Applications:{" "}
                  {new Date(cohort.applicationStart).toLocaleDateString(
                    "en-NG",
                    { month: "short", day: "numeric" },
                  )}{" "}
                  –{" "}
                  {new Date(cohort.applicationEnd).toLocaleDateString("en-NG", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p>
                  Training:{" "}
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
                </p>
                <p>
                  {(cohort.centers as unknown[]).length} center
                  {(cohort.centers as unknown[]).length !== 1 ? "s" : ""}{" "}
                  configured
                </p>
              </div>
              {nextStatus[cohort.status] && (
                <button
                  onClick={() =>
                    transition(cohort._id, nextStatus[cohort.status]!)
                  }
                  className="w-full text-xs font-bold py-2.5 rounded-xl bg-primary hover:bg-primary/60 text-white transition-colors"
                >
                  {nextLabel[cohort.status]}
                </button>
              )}
            </motion.div>
          ))}
          {cohorts.length === 0 && (
            <div className="col-span-3 bg-white rounded-2xl p-10 text-center text-slate-400">
              No cohorts yet. Create your first one.
            </div>
          )}
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
    </div>
  );
}
