// components/applicant/ReturningApplicationModal.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiError } from "@/lib/axios";
import { applicantApi } from "@/lib/api/applicant.api";

const STEPS = [
  "Center & Skill",
  "Background",
  "Motivation",
  "Emergency Contact",
  "Review",
];

const inp =
  "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition";

const lbl =
  "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

const sel = `${inp} cursor-pointer`;

const QUALS = [
  "No formal education",
  "Primary School",
  "Junior Secondary (JSS)",
  "Senior Secondary (SSCE/WAEC/NECO)",
  "OND / NCE",
  "HND / B.Sc and above",
  "Vocational/Technical Certificate",
];

const EMPLOY = [
  "Unemployed",
  "Self-employed (informal)",
  "Employed part-time",
  "Employed full-time",
  "Student",
];

const EXP = ["None", "Basic / Self-taught", "Intermediate", "Advanced"];

const POST = [
  "Get employment in the field",
  "Start my own business",
  "Upgrade existing skills",
  "Other",
];

const REF = [
  "Social media",
  "Friend or family referral",
  "Community announcement",
  "School or institution",
  "Government agency",
  "Other",
];

type OpenCohort = {
  _id: string;
  name: string;
  centers: {
    centerId: {
      _id: string;
      name: string;
    };
    programs: {
      programId: {
        _id: string;
        title: string;
      };
      totalSeats: number;
      enrolledCount: number;
    }[];
  }[];
};

interface ReturningApplicationModalProps {
  open: boolean;
  onClose: () => void;
  openCohort?: OpenCohort | null;
}

export default function ReturningApplicationModal({
  open,
  onClose,
  openCohort,
}: ReturningApplicationModalProps) {
  const queryClient = useQueryClient();

  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const [centerId, setCenterId] = useState("");
  const [programId, setProgramId] = useState("");
  const [secondId, setSecondId] = useState("");

  const [qualification, setQualification] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [priorExperience, setPriorExperience] = useState("");
  const [experienceDetail, setExperienceDetail] = useState("");

  const [motivation, setMotivation] = useState("");
  const [postTrainingPlan, setPostTrainingPlan] = useState("");
  const [referralSource, setReferralSource] = useState("");

  const [specialNeeds, setSpecialNeeds] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");

  const centers = openCohort?.centers ?? [];
  const selectedCenter = centers.find((c) => c.centerId._id === centerId);

  const availablePrograms =
    selectedCenter?.programs.filter((p) => p.enrolledCount < p.totalSeats) ??
    [];

  const selectedProgram = availablePrograms.find(
    (p) => p.programId._id === programId,
  );

  const createApplication = useMutation({
    mutationFn: (payload: unknown) =>
      applicantApi.createReturningApplication(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicant-applications"] });
      queryClient.invalidateQueries({ queryKey: ["applicant-dashboard"] });
      resetAndClose();
    },
    onError: (err) => {
      setError(getApiError(err));
    },
  });

  const canProceed = () => {
    if (step === 0) return centerId && programId;
    if (step === 1) return qualification && employmentStatus && priorExperience;
    if (step === 2)
      return motivation.length >= 20 && postTrainingPlan && referralSource;
    if (step === 3) return emergencyName && emergencyPhone && emergencyRelation;
    return true;
  };

  const resetAndClose = () => {
    setStep(0);
    setError("");
    setCenterId("");
    setProgramId("");
    setSecondId("");
    setQualification("");
    setEmploymentStatus("");
    setPriorExperience("");
    setExperienceDetail("");
    setMotivation("");
    setPostTrainingPlan("");
    setReferralSource("");
    setSpecialNeeds("");
    setEmergencyName("");
    setEmergencyPhone("");
    setEmergencyRelation("");
    onClose();
  };

  const next = () => {
    setError("");
    if (canProceed()) setStep((s) => s + 1);
  };

  const submit = () => {
    if (!canProceed()) return;

    createApplication.mutate({
      centerId,
      programId,
      secondChoiceId: secondId || undefined,
      qualification,
      employmentStatus,
      priorExperience,
      experienceDetail,
      motivation,
      postTrainingPlan,
      referralSource,
      specialNeeds,
      emergencyName,
      emergencyPhone,
      emergencyRelation,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 supports-backdrop-filter:backdrop-blur-xs flex items-center justify-center p-4"
          // onClick={resetAndClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
              <div>
                <h2 className="font-heading font-black text-xl text-slate-900">
                  New Application
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {openCohort?.name ?? "Open cohort"}
                </p>
              </div>

              <button
                onClick={resetAndClose}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-7 pt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-700">
                  Step {step + 1} of {STEPS.length}
                </span>
                <span className="text-sm text-slate-400">{STEPS[step]}</span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-7 py-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6 text-center"
                >
                  {error}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 0 && (
                    <div className="space-y-5">
                      {!openCohort ? (
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
                          <p className="font-semibold text-slate-900">
                            No open cohort
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            Applications are currently closed.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div>
                            <label className={lbl}>Training Center *</label>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {centers.map((c) => (
                                <button
                                  key={c.centerId._id}
                                  type="button"
                                  onClick={() => {
                                    setCenterId(c.centerId._id);
                                    setProgramId("");
                                    setSecondId("");
                                  }}
                                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                                    centerId === c.centerId._id
                                      ? "border-primary bg-primary/50"
                                      : "border-slate-200 hover:border-primary"
                                  }`}
                                >
                                  <p className="text-slate-900 text-sm">
                                    {c.centerId.name}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>

                          {centerId && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <label className={lbl}>Skill Area *</label>

                              {availablePrograms.length === 0 ? (
                                <p className="text-sm text-red-600">
                                  No programs available at this center.
                                </p>
                              ) : (
                                <select
                                  value={programId}
                                  onChange={(e) => setProgramId(e.target.value)}
                                  className={sel}
                                >
                                  <option value="">Select a skill area</option>
                                  {availablePrograms.map((p) => (
                                    <option
                                      key={p.programId._id}
                                      value={p.programId._id}
                                    >
                                      {p.programId.title}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className={lbl}>Highest Qualification *</label>
                        <select
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          className={sel}
                        >
                          <option value="">Select</option>
                          {QUALS.map((q) => (
                            <option key={q}>{q}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={lbl}>Employment Status *</label>
                        <select
                          value={employmentStatus}
                          onChange={(e) => setEmploymentStatus(e.target.value)}
                          className={sel}
                        >
                          <option value="">Select</option>
                          {EMPLOY.map((e) => (
                            <option key={e}>{e}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={lbl}>Prior Experience *</label>
                        <select
                          value={priorExperience}
                          onChange={(e) => setPriorExperience(e.target.value)}
                          className={sel}
                        >
                          <option value="">Select</option>
                          {EXP.map((e) => (
                            <option key={e}>{e}</option>
                          ))}
                        </select>
                      </div>

                      {priorExperience !== "None" && priorExperience && (
                        <div>
                          <label className={lbl}>Describe Experience</label>
                          <textarea
                            rows={3}
                            value={experienceDetail}
                            onChange={(e) =>
                              setExperienceDetail(e.target.value)
                            }
                            className={inp + " resize-none"}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className={lbl}>
                          Why do you want to learn this skill? *
                        </label>
                        <textarea
                          rows={5}
                          value={motivation}
                          onChange={(e) => setMotivation(e.target.value)}
                          placeholder="Tell us what motivated you..."
                          className={inp + " resize-none"}
                        />
                        <p className="text-xs text-slate-400 mt-1">
                          {motivation.split(/\s+/).filter(Boolean).length} words
                        </p>
                      </div>

                      <div>
                        <label className={lbl}>Post-Training Plan *</label>
                        <select
                          value={postTrainingPlan}
                          onChange={(e) => setPostTrainingPlan(e.target.value)}
                          className={sel}
                        >
                          <option value="">Select</option>
                          {POST.map((p) => (
                            <option key={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={lbl}>
                          How did you hear about us? *
                        </label>
                        <select
                          value={referralSource}
                          onChange={(e) => setReferralSource(e.target.value)}
                          className={sel}
                        >
                          <option value="">Select</option>
                          {REF.map((r) => (
                            <option key={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5">
                      <div>
                        <label className={lbl}>Special Needs (Optional)</label>
                        <textarea
                          rows={2}
                          value={specialNeeds}
                          onChange={(e) => setSpecialNeeds(e.target.value)}
                          className={inp + " resize-none"}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={lbl}>
                            Emergency Contact Name *
                          </label>
                          <input
                            value={emergencyName}
                            onChange={(e) => setEmergencyName(e.target.value)}
                            className={inp}
                          />
                        </div>

                        <div>
                          <label className={lbl}>Emergency Phone *</label>
                          <input
                            value={emergencyPhone}
                            onChange={(e) => setEmergencyPhone(e.target.value)}
                            placeholder="+234..."
                            className={inp}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={lbl}>Relationship *</label>
                        <select
                          value={emergencyRelation}
                          onChange={(e) => setEmergencyRelation(e.target.value)}
                          className={sel}
                        >
                          <option value="">Select</option>
                          {[
                            "Parent",
                            "Spouse",
                            "Sibling",
                            "Friend",
                            "Other",
                          ].map((r) => (
                            <option key={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-5">
                      <div className="bg-slate-50 rounded-2xl p-5 space-y-3 text-sm">
                        <h3 className="font-semibold text-slate-900">
                          Application Summary
                        </h3>

                        {[
                          ["Cohort", openCohort?.name],
                          ["Center", selectedCenter?.centerId.name],
                          ["Program", selectedProgram?.programId.title],
                          ["Education", qualification],
                          ["Employment", employmentStatus],
                          ["Experience", priorExperience],
                          ["Plan", postTrainingPlan],
                        ].map(([k, v]) =>
                          v ? (
                            <div key={k} className="flex justify-between gap-4">
                              <span className="text-slate-400">{k}</span>
                              <span className="font-medium text-slate-900 text-right">
                                {v}
                              </span>
                            </div>
                          ) : null,
                        )}
                      </div>

                      <p className="text-sm text-slate-500 leading-relaxed">
                        Please confirm your details before submitting this new
                        application.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between px-7 py-4 border-t border-slate-100">
              <button
                onClick={() => (step === 0 ? null : setStep((s) => s - 1))}
                disabled={step === 0}
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-medium text-sm disabled:opacity-0 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                Back
              </button>

              {step < STEPS.length - 1 ? (
                <motion.button
                  onClick={next}
                  disabled={!canProceed()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 bg-primary disabled:opacity-40 hover:bg-primary/60 text-white font-bold px-7 py-3 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Continue <ChevronRight size={16} />
                </motion.button>
              ) : (
                <motion.button
                  onClick={submit}
                  disabled={!canProceed() || createApplication.isPending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-primary disabled:opacity-40 hover:bg-primary/60 text-white font-bold px-8 py-3 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  {createApplication.isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
