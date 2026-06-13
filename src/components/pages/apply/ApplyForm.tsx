"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { publicApi, setApplicantToken, getApiError } from "@/lib/axios";
import { useApplicantStore } from "@/stores/applicant.store";
import { authApi } from "@/lib/api/auth.api";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { cohortApi } from "@/lib/api/cohort.api";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const STEPS = [
  "Identity",
  "Contact",
  "Center & Skill",
  "Background",
  "Motivation",
  "Emergency Contact",
  "Account & Review",
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

export default function ApplyForm() {
  const router = useRouter();
  const { setApplicant } = useApplicantStore();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [nin, setNin] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [stateOfOrigin, setStateOfOrigin] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [lga, setLga] = useState("");
  const [address, setAddress] = useState("");

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

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const {
    data,
    isLoading: isCohortLoading,
    isError: isCohortError,
  } = useQuery({
    queryKey: ["open-cohort"],
    queryFn: cohortApi.getOpenCohort,
    enabled: step >= 2,
    retry: 1,
  });

  const cohortData = data?.data;

  const registerMutation = useMutation({
    mutationFn: (payload: any) =>
      authApi.applicantRegister(payload).then((res) => res.data),
    onSuccess: (data) => {
      setApplicantToken(data.data.accessToken);
      setApplicant(data.data.applicant);
      router.push("/apply/success?ref=" + data.data.referenceNumber);
    },
    onError: (err: any) => {
      setError(getApiError(err));
    },
  });

  const canProceed = () => {
    if (step === 0)
      return (
        fullName.trim().length >= 2 &&
        dob &&
        gender &&
        stateOfOrigin.trim().length >= 2
      );
    if (step === 1)
      return phone && email && lga && address && /^\d{11}$/.test(nin);
    if (step === 2) return centerId && programId;
    if (step === 3) return qualification && employmentStatus && priorExperience;
    if (step === 4)
      return motivation.length >= 20 && postTrainingPlan && referralSource;
    if (step === 5) return emergencyName && emergencyPhone && emergencyRelation;
    if (step === 6)
      return (
        password.length >= 8 && password === confirmPassword && acceptTerms
      );
    return true;
  };

  const next = () => {
    setError("");

    if (canProceed()) {
      setStep((s) => s + 1);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    registerMutation.mutate({
      nin,
      fullName,
      dob,
      gender,
      stateOfOrigin,
      phone,
      whatsapp,
      email,
      lga,
      address,
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
      password,
      confirmPassword,
      acceptTerms,
    });
  };

  const centers = cohortData?.centers ?? [];
  const selectedCenter = centers.find((c) => c.centerId._id === centerId);
  const availablePrograms =
    selectedCenter?.programs.filter((p) => p.enrolledCount < p.totalSeats) ??
    [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center mb-10">
        <Link href="/">
          <div
            className={cn(
              "flex items-center justify-center gap-2 p-3 rounded-full bg-white w-fit mb-4 cursor-pointer",
            )}
          >
            <Logo className="h-14 w-14" />
          </div>
        </Link>

        <h1 className="font-heading text-3xl font-black text-slate-900 mb-2">
          Apply for Training
        </h1>
        <p className="text-slate-500">
          Free vocational skills training — Port Harcourt & Bayelsa
        </p>
      </div>
      <div className="mb-8">
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
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6 text-center"
        >
          {error}
        </motion.div>
      )}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className={lbl}>Full Name *</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className={inp}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>Date of Birth *</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className={inp}
                    />
                  </div>
                  <div>
                    <label className={lbl}>Gender *</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={sel}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={lbl}>State of Origin *</label>
                  <input
                    value={stateOfOrigin}
                    onChange={(e) => setStateOfOrigin(e.target.value)}
                    placeholder="e.g. Rivers"
                    className={inp}
                  />
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className={lbl}>NIN (11 digits) *</label>
                  <input
                    value={nin}
                    onChange={(e) => setNin(e.target.value)}
                    placeholder="Enter 11-digit NIN"
                    maxLength={11}
                    className={inp}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>Phone *</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 80..."
                      className={inp}
                    />
                  </div>
                  <div>
                    <label className={lbl}>WhatsApp</label>
                    <input
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+234 80..."
                      className={inp}
                    />
                  </div>
                </div>
                <div>
                  <label className={lbl}>Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={inp}
                  />
                </div>
                <div>
                  <label className={lbl}>LGA *</label>
                  <input
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    placeholder="e.g. Port Harcourt"
                    className={inp}
                  />
                </div>
                <div>
                  <label className={lbl}>Address *</label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full address"
                    className={inp + " resize-none"}
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-5">
                {isCohortLoading ? (
                  <div className="text-center py-10">
                    <Loader2
                      size={28}
                      className="animate-spin text-primary mx-auto mb-3"
                    />
                    <p className="text-slate-500 text-sm">
                      Loading available programs...
                    </p>
                  </div>
                ) : isCohortError || !cohortData ? (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <p className="font-semibold text-slate-900 mb-2">
                      Could not load available programs
                    </p>
                    <p className="text-slate-500 text-sm">
                      Please refresh and try again.
                    </p>
                  </div>
                ) : !cohortData.status ? (
                  <div className="bg-primary/50 border border-primary/20 rounded-2xl p-6 text-center">
                    <p className="font-semibold text-slate-900 mb-2">
                      Applications Currently Closed
                    </p>
                    <p className="text-slate-500 text-sm">
                      No cohort is currently open.
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
                            onClick={() => {
                              setCenterId(c.centerId._id);
                              setProgramId("");
                            }}
                            className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${centerId === c.centerId._id ? "border-primary bg-primary/50" : "border-slate-200 hover:border-primary"}`}
                          >
                            <p className=" text-slate-900 text-sm">
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
                        {/* <div className="mt-3">
                          <label className={lbl}>
                            Second Choice (Optional)
                          </label>
                          <select
                            value={secondId}
                            onChange={(e) => setSecondId(e.target.value)}
                            className={sel}
                          >
                            <option value="">No second choice</option>
                            {availablePrograms
                              .filter((p) => p.programId._id !== programId)
                              .map((p) => (
                                <option
                                  key={p.programId._id}
                                  value={p.programId._id}
                                >
                                  {p.programId.title}
                                </option>
                              ))}
                          </select>
                        </div> */}
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            )}
            {step === 3 && (
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
                      onChange={(e) => setExperienceDetail(e.target.value)}
                      className={inp + " resize-none"}
                    />
                  </div>
                )}
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <label className={lbl}>
                    Why do you want to learn this skill? *{" "}
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
                  <label className={lbl}>How did you hear about us? *</label>
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
            {step === 5 && (
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
                    <label className={lbl}>Emergency Contact Name *</label>
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
                    {["Parent", "Spouse", "Sibling", "Friend", "Other"].map(
                      (r) => (
                        <option key={r}>{r}</option>
                      ),
                    )}
                  </select>
                </div>
              </div>
            )}
            {step === 6 && (
              <div className="space-y-5">
                <div className="bg-slate-50 rounded-2xl p-5 space-y-3 text-sm">
                  <h3 className="font-semibold text-slate-900">
                    Application Summary
                  </h3>
                  {[
                    ["Name", fullName],
                    ["Email", email],
                    ["Phone", phone],
                    [
                      "Center",
                      centers.find((c) => c.centerId._id === centerId)?.centerId
                        .name,
                    ],
                    [
                      "Program",
                      availablePrograms.find(
                        (p) => p.programId._id === programId,
                      )?.programId.title,
                    ],
                    ["Education", qualification],
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>Password *</label>
                    <div className="relative">
                      <input
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 8 characters"
                        className={inp + " pr-10"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                      >
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Confirm Password *</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inp}
                    />
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        Passwords do not match
                      </p>
                    )}
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                  />
                  <span className="text-sm text-slate-600">
                    I confirm all information is accurate and accept the terms
                    and conditions of the Adele Empowerment Foundation training
                    program.
                  </span>
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => (step === 0 ? null : setStep((s) => s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-medium text-sm disabled:opacity-0 transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} /> Back
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
            onClick={handleSubmit}
            disabled={!canProceed() || registerMutation.isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-primary disabled:opacity-40 hover:bg-primary/60 text-white font-bold px-8 py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            {registerMutation.isPending ? (
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
      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{" "}
        <Link
          href="/applicant/auth/login"
          className="text-primary font-semibold hover:underline"
        >
          Log in here
        </Link>
      </p>
    </div>
  );
}
