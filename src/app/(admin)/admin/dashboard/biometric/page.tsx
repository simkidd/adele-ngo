"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Fingerprint,
  CheckCircle2,
  Clock,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { adminApiInstance as adminApi, getApiError } from "@/lib/axios";
interface PendingBiometric {
  registrationId: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  passportPhoto: string;
  biometricEnrolled: boolean;
  program: string;
  referenceNumber: string;
  verificationDeadline?: string;
  daysRemaining?: number;
}

export default function BiometricPage() {
  const [pending, setPending] = useState<PendingBiometric[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [selected, setSelected] = useState<PendingBiometric | null>(null);
  const [template, setTemplate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.get("/biometric/pending");
      setPending(data.data);
    } catch {}
    setLoading(false);
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const handleEnroll = async () => {
    if (!selected || !template.trim()) {
      setError("Fingerprint template is required.");
      return;
    }
    setEnrolling(selected.applicantId);
    setError("");
    try {
      await adminApi.post("/biometric/enroll", {
        applicantId: selected.applicantId,
        fingerprintTemplate: template,
      });
      setSuccess(`${selected.applicantName} verified successfully.`);
      setSelected(null);
      setTemplate("");
      setTimeout(() => {
        setSuccess(null);
        load();
      }, 2500);
    } catch (err) {
      setError(getApiError(err));
    }
    setEnrolling(null);
  };
  const urgency = (days?: number) => {
    if (days === undefined || days === null) return "text-slate-400";
    if (days <= 2) return "text-red-600 font-bold";
    if (days <= 5) return "text-orange-600 font-semibold";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Fingerprint
            size={20}
            className="text-blue-500 flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="font-semibold text-slate-900 text-sm mb-1">
              In-Person Biometric Enrollment
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Use your connected fingerprint scanner SDK to capture the
              applicant fingerprint template, then paste the base64 template
              string below to enroll. Enrollment automatically marks the
              applicant as Verified.
            </p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3"
          >
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
            <p className="text-green-700 font-semibold text-sm">{success}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Pending Verification",
            value: pending.length,
            color: "text-orange-500",
          },
          {
            label: "Due This Week",
            value: pending.filter((p) => (p.daysRemaining ?? 99) <= 7).length,
            color: "text-red-500",
          },
          {
            label: "Already Enrolled",
            value: pending.filter((p) => p.biometricEnrolled).length,
            color: "text-green-500",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-center"
          >
            <div className={`font-heading text-3xl font-black mb-1 ${s.color}`}>
              {s.value}
            </div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-heading font-black text-lg text-slate-900">
            Accepted — Awaiting Biometric
          </h2>
          <button
            onClick={load}
            className="text-sm text-slate-400 hover:text-orange-500 transition-colors"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-orange-500" />
          </div>
        ) : pending.length === 0 ? (
          <div className="py-16 text-center">
            <CheckCircle2 size={36} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">
              No applicants pending biometric verification.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {pending.map((p, i) => (
              <motion.div
                key={p.applicantId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      {p.passportPhoto ? (
                        <img
                          src={p.passportPhoto}
                          alt={p.applicantName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">
                          {p.applicantName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {p.applicantName}
                      </p>
                      <p className="text-xs text-slate-500">{p.program}</p>
                      <p className="text-xs font-mono text-slate-400">
                        {p.referenceNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {p.verificationDeadline && (
                      <div className="text-right">
                        <p className="text-xs text-slate-400 mb-0.5">
                          Deadline
                        </p>
                        <p className={`text-xs ${urgency(p.daysRemaining)}`}>
                          {new Date(p.verificationDeadline).toLocaleDateString(
                            "en-NG",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </p>
                        {p.daysRemaining !== undefined && (
                          <p
                            className={`text-xs mt-0.5 ${urgency(p.daysRemaining)}`}
                          >
                            {p.daysRemaining <= 0
                              ? "Overdue!"
                              : p.daysRemaining + "d left"}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="text-center">
                      {p.biometricEnrolled ? (
                        <span className="flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-100 px-3 py-1.5 rounded-full">
                          <CheckCircle2 size={12} /> Enrolled
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-orange-600 font-semibold bg-orange-100 px-3 py-1.5 rounded-full">
                          <Clock size={12} /> Pending
                        </span>
                      )}
                    </div>
                    {!p.biometricEnrolled && (
                      <button
                        onClick={() => {
                          setSelected(p);
                          setTemplate("");
                          setError("");
                        }}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
                      >
                        <Fingerprint size={13} /> Enroll
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                <h2 className="font-heading font-black text-xl text-slate-900">
                  Enroll Biometric
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="px-7 py-6 space-y-5">
                <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4">
                  <div className="w-14 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    {selected.passportPhoto ? (
                      <img
                        src={selected.passportPhoto}
                        alt={selected.applicantName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">
                        {selected.applicantName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-lg text-slate-900">
                      {selected.applicantName}
                    </p>
                    <p className="text-orange-500 text-sm">
                      {selected.program}
                    </p>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      {selected.referenceNumber}
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle
                      size={15}
                      className="text-blue-500 flex-shrink-0 mt-0.5"
                    />
                    <div className="text-xs text-blue-700 leading-relaxed">
                      <p className="font-semibold mb-1">Steps:</p>
                      <ol className="list-decimal list-inside space-y-0.5">
                        <li>Ask applicant to place finger on the scanner</li>
                        <li>Capture fingerprint using your SDK</li>
                        <li>Copy the base64 template from SDK output</li>
                        <li>Paste below and click Enroll</li>
                      </ol>
                    </div>
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                    {error}
                  </p>
                )}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Fingerprint Template (base64) *
                  </label>
                  <textarea
                    rows={5}
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    placeholder="Paste base64 fingerprint template here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    In production, the SDK sends this automatically via the
                    admin app.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-slate-100">
                <button
                  onClick={() => setSelected(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnroll}
                  disabled={!!enrolling || !template.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 disabled:opacity-40 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
                >
                  {enrolling ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />{" "}
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <Fingerprint size={15} /> Confirm Enrollment
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
