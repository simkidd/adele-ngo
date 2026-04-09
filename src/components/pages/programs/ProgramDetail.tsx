"use client";

import { PROGRAMS_DATA } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Program = (typeof PROGRAMS_DATA)[0];

// ── Registration Modal ────────────────────────────────────────────────────────

const STEPS = ["Personal Info", "Background", "Program Questions", "Review"];

function RegistrationModal({
  program,
  onClose,
}: {
  program: Program;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    location: "",
    education: "",
    employment: "",
    motivation: "",
    extraAnswer: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 0)
      return form.name && form.dob && form.phone && form.email && form.location;
    if (step === 1) return form.education && form.employment && form.motivation;
    if (step === 2) return true;
    return true;
  };

  const handleSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  };

  const inputCls =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition";
  const labelCls =
    "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white w-full md:max-w-2xl md:rounded-3xl rounded-t-3xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="font-heading font-black text-xl text-slate-900">
              Register — {program.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Step {step + 1} of {STEPS.length}: {STEPS[step]}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={18} className="text-slate-600" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-100">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={36} className="text-green-500" />
                </motion.div>
                <h3 className="font-heading text-2xl font-black text-slate-900 mb-3">
                  Application Submitted!
                </h3>
                <p className="text-slate-600 leading-relaxed max-w-sm mb-2">
                  Thank you, <strong>{form.name}</strong>. Your application for
                  the <strong>{program.title}</strong> program has been
                  received.
                </p>
                <p className="text-slate-500 text-sm">
                  Our team will review your application and contact you at{" "}
                  <strong>{form.email}</strong> within 3–5 business days.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-full transition-colors"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Step 0 — Personal Info */}
                {step === 0 && (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Your full name"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Date of Birth *</label>
                        <input
                          required
                          type="date"
                          value={form.dob}
                          onChange={(e) => update("dob", e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Phone Number *</label>
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+233 ..."
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Email Address *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="your@email.com"
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>
                        Location (City / Community) *
                      </label>
                      <input
                        required
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="e.g. Accra, Madina"
                        className={inputCls}
                      />
                    </div>
                  </div>
                )}

                {/* Step 1 — Background */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls}>
                        Highest Education Level *
                      </label>
                      <select
                        required
                        value={form.education}
                        onChange={(e) => update("education", e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select level</option>
                        <option>No formal education</option>
                        <option>Primary</option>
                        <option>JHS</option>
                        <option>Secondary / SHS</option>
                        <option>Tertiary / University</option>
                        <option>Vocational / Technical</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>
                        Current Employment Status *
                      </label>
                      <select
                        required
                        value={form.employment}
                        onChange={(e) => update("employment", e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select status</option>
                        <option>Unemployed</option>
                        <option>Part-time employed</option>
                        <option>Full-time employed</option>
                        <option>Self-employed / Business owner</option>
                        <option>Student</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>
                        Why do you want to join this program? *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.motivation}
                        onChange={(e) => update("motivation", e.target.value)}
                        placeholder="Tell us what motivated you to apply and what you hope to achieve..."
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2 — Program-specific question */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="bg-primary/5 rounded-2xl p-4 mb-4">
                      <p className="text-primary text-sm font-medium">
                        {program.title} — Additional Question
                      </p>
                    </div>
                    <div>
                      <label className={labelCls}>
                        {program.extraQuestion}
                      </label>
                      <textarea
                        rows={5}
                        value={form.extraAnswer}
                        onChange={(e) => update("extraAnswer", e.target.value)}
                        placeholder="Your answer here..."
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3 — Review */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div className="bg-slate-50 rounded-2xl p-5">
                      <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">
                        Personal Info
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                          ["Name", form.name],
                          ["Date of Birth", form.dob],
                          ["Phone", form.phone],
                          ["Email", form.email],
                          ["Location", form.location],
                        ].map(([k, v]) => (
                          <div key={k}>
                            <span className="text-slate-400">{k}</span>
                            <p className="font-medium text-slate-900 mt-0.5">
                              {v || "—"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-5">
                      <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">
                        Background
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                          ["Education", form.education],
                          ["Employment", form.employment],
                        ].map(([k, v]) => (
                          <div key={k}>
                            <span className="text-slate-400">{k}</span>
                            <p className="font-medium text-slate-900 mt-0.5">
                              {v || "—"}
                            </p>
                          </div>
                        ))}
                        <div className="col-span-2">
                          <span className="text-slate-400">Motivation</span>
                          <p className="font-medium text-slate-900 mt-0.5">
                            {form.motivation || "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {form.extraAnswer && (
                      <div className="bg-slate-50 rounded-2xl p-5">
                        <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wider">
                          Program Question
                        </h4>
                        <p className="text-sm text-slate-600">
                          {form.extraAnswer}
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-slate-400 text-center">
                      By submitting, you confirm all information is accurate.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        {!submitted && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <button
              onClick={() => (step > 0 ? setStep((s) => s - 1) : onClose())}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} /> {step === 0 ? "Cancel" : "Back"}
            </button>
            {step < STEPS.length - 1 ? (
              <motion.button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1.5 bg-primary disabled:opacity-40 hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors cursor-pointer"
              >
                Next <ChevronRight size={16} />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors cursor-pointer"
              >
                Submit Application
              </motion.button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Program Detail Page ───────────────────────────────────────────────────────

export default function ProgramDetail({ program }: { program: Program }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={program.coverImage}
            alt={program.title}
            fill
            className="object-cover"
            priority
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b ${program.color} opacity-70`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <motion.a
            href="/programs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors"
          >
            <ChevronLeft size={14} /> All Programs
          </motion.a>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-5xl md:text-6xl font-black text-white mb-3"
          >
            {program.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/75 text-lg max-w-xl mb-8"
          >
            {program.tagline}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={() => setModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3.5 rounded-full text-base shadow-lg shadow-primary/30 transition-all hover:scale-105"
          >
            Register for This Program
          </motion.button>
        </div>
        {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10" /> */}
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="font-heading text-3xl font-black text-slate-900 mb-4">
                  About This Program
                </h2>
                <p className="text-slate-600 leading-relaxed text-base">
                  {program.shortDesc}
                </p>
              </div>

              {/* Curriculum */}
              <div>
                <h2 className="font-heading text-3xl font-black text-slate-900 mb-6">
                  What You&apos;ll Learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {program.curriculum.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 bg-slate-50 rounded-xl p-4"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="font-heading text-3xl font-black text-slate-900 mb-6">
                  Entry Requirements
                </h2>
                <ul className="space-y-3">
                  {program.requirements.map((req, i) => (
                    <motion.li
                      key={req}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-6 h-6 bg-primary/10 bg-primary/90 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-slate-600">{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Facilitator */}
              <div>
                <h2 className="font-heading text-3xl font-black text-slate-900 mb-6">
                  Your Facilitator
                </h2>
                <div className="flex items-start gap-5 bg-slate-50 rounded-2xl p-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={program.facilitator.image}
                      alt={program.facilitator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900">
                      {program.facilitator.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-2">
                      {program.facilitator.title}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {program.facilitator.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Program snapshot */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-5">
                  Program Details
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Clock, label: "Duration", value: program.duration },
                    {
                      icon: Users,
                      label: "Cohort Size",
                      value: program.cohortSize,
                    },
                    {
                      icon: Calendar,
                      label: "Next Cohort",
                      value: program.nextCohort,
                    },
                    {
                      icon: MapPin,
                      label: "Schedule",
                      value: program.schedule,
                    },
                    {
                      icon: Award,
                      label: "Certification",
                      value: program.certification,
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={15} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium">
                          {label}
                        </div>
                        <div className="text-sm text-slate-800 font-semibold mt-0.5">
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <motion.button
                  onClick={() => setModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-full transition-colors"
                >
                  Register Now
                </motion.button>
              </div>

              {/* Outcomes */}
              <div className="bg-primary/5 rounded-2xl p-6">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">
                  Graduate Outcomes
                </h3>
                <div className="space-y-3">
                  {program.outcomes.map((o) => (
                    <div key={o} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={15}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-slate-700">{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {modalOpen && (
          <RegistrationModal
            program={program}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
