"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { applicantApiInstance as applicantApi } from "@/lib/axios";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  XCircle,
  Loader2,
} from "lucide-react";

const STATUSES = ["Pending", "Accepted", "Verified", "Enrolled"];
const STATUS_ICONS: Record<string, typeof Clock> = {
  Pending: Clock,
  Accepted: AlertCircle,
  Verified: CheckCircle2,
  Enrolled: Users,
  Rejected: XCircle,
};
const STATUS_COLORS: Record<string, string> = {
  Pending: "text-yellow-500",
  Accepted: "text-blue-500",
  Verified: "text-green-500",
  Enrolled: "text-orange-500",
  Rejected: "text-red-500",
};

export default function ApplicationPage() {
  const [reg, setReg] = useState<Record<string, unknown> | null>(null);
  const [canApply, setCanApply] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicantApi
      .get("/applicant/application")
      .then(({ data }) => {
        setReg(data.data.registration);
        setCanApply(data.data.canApply);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-orange-500" />
      </div>
    );

  if (!reg)
    return (
      <div className="max-w-2xl">
        <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
          <Clock size={40} className="text-slate-300 mx-auto mb-4" />
          <h2 className="font-heading font-black text-xl text-slate-900 mb-2">
            No Active Application
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {canApply
              ? "Applications are open. Apply now."
              : "Applications are currently closed."}
          </p>
          {canApply && (
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-full text-sm"
            >
              Apply Now <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    );

  const status = reg.status as string;
  const program = reg.programId as Record<string, string>;
  const center = reg.centerId as Record<string, string>;
  const cohort = reg.cohortId as Record<string, string>;
  const StatusIcon = STATUS_ICONS[status] ?? Clock;
  const currentStep = STATUSES.indexOf(status);

  return (
    <div className="max-w-3xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-100 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <StatusIcon
            size={22}
            className={STATUS_COLORS[status] ?? "text-slate-500"}
          />
          <div>
            <p className="font-bold text-slate-900">{status}</p>
            <p className="text-xs text-slate-400 font-mono">
              {reg.referenceNumber as string}
            </p>
          </div>
        </div>
        {status !== "Rejected" && (
          <div className="flex items-center gap-2 mb-6">
            {STATUSES.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${i <= currentStep ? "bg-orange-500 border-orange-500 text-white" : "border-slate-200 text-slate-400"}`}
                >
                  {i < currentStep ? "✓" : i + 1}
                </div>
                <div className="text-xs text-slate-500 hidden sm:block">
                  {s}
                </div>
                {i < STATUSES.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ${i < currentStep ? "bg-orange-500" : "bg-slate-100"}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {reg.adminNotes && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700 mb-3">
            <p className="font-semibold mb-1">Note from Admin</p>
            <p>{reg.adminNotes as string}</p>
          </div>
        )}

        {status === "Accepted" && reg.verificationDeadline && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-700">
            <p className="font-semibold mb-1">
              Biometric Verification Required
            </p>
            <p>
              Visit <strong>{center.name}</strong> by{" "}
              <strong>
                {new Date(
                  reg.verificationDeadline as string,
                ).toLocaleDateString("en-NG", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
              .
            </p>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white border border-slate-100 rounded-2xl p-6"
      >
        <h3 className="font-heading font-bold text-lg text-slate-900 mb-5">
          Application Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            ["Program", program?.title],
            ["Training Center", center?.name],
            ["Cohort", cohort?.name],
            [
              "Applied On",
              new Date(reg.createdAt as string).toLocaleDateString("en-NG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            ],
            ["Qualification", reg.qualification as string],
            ["Employment", reg.employmentStatus as string],
          ].map(([k, v]) =>
            v ? (
              <div key={k}>
                <p className="text-xs text-slate-400 font-medium mb-0.5">{k}</p>
                <p className="text-sm font-semibold text-slate-900">{v}</p>
              </div>
            ) : null,
          )}
        </div>
        {reg.motivation && (
          <div className="mt-5 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium mb-1">
              Your Motivation
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {reg.motivation as string}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
