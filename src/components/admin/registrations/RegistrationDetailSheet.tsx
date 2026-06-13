"use client";
import { useRegistration } from "@/hooks/queries/use-registrations";
import { RegistrationStatus } from "@/interfaces/registration.interface";
import { formatDate } from "@/utils/helpers/date";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";

const statusColors: Record<RegistrationStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100  text-green-700",
  Enrolled: "bg-blue-100   text-blue-700",
  Rejected: "bg-red-100    text-red-700",
  Verified: "bg-purple-100 text-purple-700",
};

const STATUSES: RegistrationStatus[] = [
  "Pending",
  "Verified",
  "Accepted",
  "Enrolled",
  "Rejected",
];

interface Props {
  registrationId: string | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: RegistrationStatus) => void;
}

const RegistrationDetailSheet = ({
  registrationId,
  onClose,
  onUpdateStatus,
}: Props) => {
  const { data, isPending } = useRegistration(registrationId!);

  const detail = data;

  return (
    <AnimatePresence>
      {detail && registrationId && (
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
            className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
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

            <div className="p-6 space-y-5">
              {isPending ? (
                <div className="flex items-center justify-center ">
                  <Loader2 size={24} className="animate-spin text-primary" />
                </div>
              ) : !detail ? (
                <div className="p-6 text-center text-sm text-slate-400">
                  Registration not found.
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-heading font-black text-xl text-slate-900">
                        {detail.applicantId?.fullName ?? "—"}
                      </h2>

                      <p className="text-orange-500 font-medium text-sm">
                        {detail.programId?.title ?? "—"}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Ref: {detail.referenceNumber ?? "—"}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1.5 rounded-full font-bold ${statusColors[detail.status]}`}
                    >
                      {detail.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ["Email", detail.applicantId?.email],
                      ["Phone", detail.applicantId?.phone],
                      ["DOB", formatDate(detail.applicantId?.dob)],
                      ["Gender", detail.applicantId?.gender],
                      ["State", detail.applicantId?.stateOfOrigin],
                      ["LGA", detail.applicantId?.lga],
                      ["Address", detail.applicantId?.address],
                      [
                        "Biometric",
                        detail.applicantId?.biometricEnrolled
                          ? "Enrolled"
                          : "Not enrolled",
                      ],
                      ["Cohort", detail.cohortId?.name],
                      ["Center", detail.centerId?.name],
                      ["Center Code", detail.centerId?.code],
                      ["Applied", formatDate(detail.appliedAt)],
                      [
                        "Training Start",
                        formatDate(detail.cohortId?.startDate),
                      ],
                      ["Training End", formatDate(detail.cohortId?.endDate)],
                      ["Education", detail.qualification],
                      ["Employment", detail.employmentStatus],
                      ["Experience", detail.priorExperience],
                      ["Post Plan", detail.postTrainingPlan],
                      ["Referral", detail.referralSource],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <p className="text-xs text-slate-400 font-medium mb-0.5">
                          {k}
                        </p>
                        <p className="text-sm font-semibold text-slate-800">
                          {v || "—"}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Program Description
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">
                      {detail.programId?.description || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">
                      Motivation
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">
                      {detail.motivation || "—"}
                    </p>
                  </div>

                  {detail.experienceDetail && (
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        Experience Detail
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">
                        {detail.experienceDetail}
                      </p>
                    </div>
                  )}

                  {detail.specialNeeds && (
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        Special Needs
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">
                        {detail.specialNeeds}
                      </p>
                    </div>
                  )}

                  <div>
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
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-2">
                      Update Status
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => onUpdateStatus(detail._id, s)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            detail.status === s
                              ? `${statusColors[s]} ring-2 ring-offset-1 ring-current`
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationDetailSheet;
