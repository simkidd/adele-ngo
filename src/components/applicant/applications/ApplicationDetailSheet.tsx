"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Loader2, MapPin, Phone, X } from "lucide-react";
import {
  IRegistration,
  RegistrationStatus,
} from "@/interfaces/registration.interface";
import { formatDate } from "@/utils/helpers/date";
import { useApplicantApplication } from "@/hooks/queries/use-applicant-applications";

const statusColors: Record<RegistrationStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-blue-100 text-blue-700",
  Verified: "bg-green-100 text-green-700",
  Enrolled: "bg-orange-100 text-orange-700",
  Rejected: "bg-red-100 text-red-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

const statusMessage: Record<RegistrationStatus, string> = {
  Pending: "Your application is currently under review.",
  Accepted:
    "Your application was accepted. Please follow verification instructions.",
  Verified: "Your verification is complete and you are ready for training.",
  Enrolled: "You are enrolled and training is currently ongoing.",
  Completed:
    "You completed this training. Your certificate will appear in the Certificate section once issued.",
  Rejected: "This application was not successful.",
};

interface ApplicationDetailsSheetProps {
  applicationId: string | null;
  onClose: () => void;
}

export default function ApplicationDetailsSheet({
  applicationId,
  onClose,
}: ApplicationDetailsSheetProps) {
  const { data, isPending } = useApplicantApplication(applicationId);

  const detail = data?.registration as IRegistration | undefined;

  return (
    <AnimatePresence>
      {applicationId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 supports-backdrop-filter:backdrop-blur-xs flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h3 className="font-heading font-black text-lg text-slate-900">
                Application Details
              </h3>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            {isPending ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={24} className="animate-spin text-primary" />
              </div>
            ) : !detail ? (
              <div className="p-6 text-center text-sm text-slate-400">
                Application not found.
              </div>
            ) : (
              <div className="p-6 space-y-5">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        Program
                      </p>
                      <h2 className="font-heading font-black text-xl text-slate-900">
                        {detail.programId?.title ?? "—"}
                      </h2>
                      <p className="text-primary font-medium text-sm mt-1">
                        {detail.programId?.category ?? "—"}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1.5 rounded-full font-bold ${
                        statusColors[detail.status]
                      }`}
                    >
                      {detail.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-mono mt-3">
                    {detail.referenceNumber}
                  </p>

                  <div
                    className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
                      statusColors[detail.status]
                    }`}
                  >
                    {statusMessage[detail.status]}
                  </div>
                </div>

                <section className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">
                    Training Information
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ["Cohort", detail.cohortId?.name],
                      ["Cohort Status", detail.cohortId?.status],
                      ["Applied", formatDate(detail.appliedAt)],
                      ["Deadline", formatDate(detail.cohortId?.applicationEnd)],
                      ["Start Date", formatDate(detail.cohortId?.startDate)],
                      ["End Date", formatDate(detail.cohortId?.endDate)],
                    ].map(([k, v]) => (
                      <InfoItem key={k} label={k} value={v} />
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">
                    Training Center
                  </h4>

                  <div className="rounded-2xl bg-slate-50 p-4 space-y-3">
                    <p className="font-semibold text-slate-900 text-sm">
                      {detail.centerId?.name ?? "—"}
                    </p>

                    <div className="flex gap-2 text-sm text-slate-600">
                      <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                      <span>{detail.centerId?.address ?? "—"}</span>
                    </div>

                    <div className="flex gap-2 text-sm text-slate-600">
                      <Phone size={15} className="mt-0.5 flex-shrink-0" />
                      <span>{detail.centerId?.phone ?? "—"}</span>
                    </div>

                    <p className="text-sm text-slate-600">
                      {detail.centerId?.email ?? "—"}
                    </p>
                  </div>
                </section>

                <section className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">
                    Program Description
                  </h4>

                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">
                    {detail.programId?.description || "—"}
                  </p>
                </section>

                <section className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">
                    Your Application
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ["Qualification", detail.qualification],
                      ["Employment", detail.employmentStatus],
                      ["Experience", detail.priorExperience],
                      ["Plan", detail.postTrainingPlan],
                      ["Referral", detail.referralSource],
                      ["Special Needs", detail.specialNeeds || "—"],
                    ].map(([k, v]) => (
                      <InfoItem key={k} label={k} value={v} />
                    ))}
                  </div>
                </section>

                {detail.experienceDetail && (
                  <section>
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Experience Detail
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">
                      {detail.experienceDetail}
                    </p>
                  </section>
                )}

                <section>
                  <p className="text-xs text-slate-400 font-medium mb-1">
                    Motivation
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">
                    {detail.motivation || "—"}
                  </p>
                </section>

                <section>
                  <p className="text-xs text-slate-400 font-medium mb-1">
                    Emergency Contact
                  </p>
                  <div className="bg-slate-50 rounded-xl p-3 space-y-1">
                    <p className="text-sm font-semibold text-slate-800">
                      {detail.emergencyName || "—"}
                    </p>
                    <p className="text-sm text-slate-600">
                      {detail.emergencyPhone || "—"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {detail.emergencyRelation || "—"}
                    </p>
                  </div>
                </section>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value || "—"}</p>
    </div>
  );
}
