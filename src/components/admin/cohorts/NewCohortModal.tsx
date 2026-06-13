"use client";
import { useCenters } from "@/hooks/queries/use-centers";
import { usePrograms } from "@/hooks/queries/use-programs";
import { ICohort } from "@/interfaces/cohort.interface";
import { cohortApi } from "@/lib/api/cohort.api";
import { getApiError } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

interface NewCohortModalProps {
  onClose: () => void;
  cohort?: ICohort;
  mode?: "create" | "edit";
}

const centerProgramSchema = z.object({
  programId: z.string().min(1, "Program ID is required"),
  totalSeats: z.number().int().min(1, "Seats must be at least 1"),
});

const centerCohortSchema = z.object({
  centerId: z.string().min(1, "Center ID is required"),
  programs: z
    .array(centerProgramSchema)
    .min(1, "At least one program is required"),
});

const cohortBaseSchema = z.object({
  name: z.string().min(3, "Cohort name is required"),
  applicationStart: z.string().min(1, "Application start date is required"),
  applicationEnd: z.string().min(1, "Application end date is required"),
  startDate: z.string().min(1, "Training start date is required"),
  endDate: z.string().min(1, "Training end date is required"),
  centers: z
    .array(centerCohortSchema)
    .min(1, "At least one center must be configured"),
});

export const createCohortSchema = cohortBaseSchema
  .refine((d) => new Date(d.applicationEnd) > new Date(d.applicationStart), {
    message: "Application end date must be after start date",
    path: ["applicationEnd"],
  })
  .refine((d) => new Date(d.startDate) >= new Date(d.applicationEnd), {
    message: "Training start date must be on or after application end date",
    path: ["startDate"],
  })
  .refine((d) => new Date(d.endDate) > new Date(d.startDate), {
    message: "Training end date must be after start date",
    path: ["endDate"],
  });

export const updateCohortSchema = cohortBaseSchema.partial().refine((d) => {
  if (!d.applicationStart || !d.applicationEnd) return true;
  return new Date(d.applicationEnd) > new Date(d.applicationStart);
});

export const cohortStatusSchema = z.object({
  status: z.enum(["Draft", "Open", "Closed", "Active", "Completed"]),
});

export type CreateCohortInput = z.infer<typeof createCohortSchema>;
export type UpdateCohortInput = z.infer<typeof updateCohortSchema>;

const inp =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition";

type CohortForm = {
  name: string;
  applicationStart: string;
  applicationEnd: string;
  startDate: string;
  endDate: string;
  centers: {
    centerId: string;
    programs: {
      programId: string;
      totalSeats: number;
    }[];
  }[];
};

const initialForm: CohortForm = {
  name: "",
  applicationStart: "",
  applicationEnd: "",
  startDate: "",
  endDate: "",
  centers: [],
};

const NewCohortModal = ({
  onClose,
  cohort,
  mode = "create",
}: NewCohortModalProps) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [form, setForm] = useState<CohortForm>(initialForm);
  const isEdit = mode === "edit";

  const { data: programs = [], isPending: programsLoading } = usePrograms();
  const { data: centers = [], isPending: centersLoading } = useCenters();

  useEffect(() => {
    if (cohort && isEdit) {
      setForm({
        name: cohort.name,
        applicationStart: cohort.applicationStart.split("T")[0],
        applicationEnd: cohort.applicationEnd.split("T")[0],
        startDate: cohort.startDate.split("T")[0],
        endDate: cohort.endDate.split("T")[0],
        centers: cohort.centers.map((center) => ({
          centerId: center.centerId._id,
          programs: center.programs.map((program) => ({
            programId: program.programId._id,
            totalSeats: program.totalSeats,
          })),
        })),
      });
    }
  }, [cohort, isEdit]);

  const createCohort = useMutation({
    mutationFn: (data: CreateCohortInput) => cohortApi.createCohort(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cohorts"] });
      queryClient.invalidateQueries({ queryKey: ["open-cohort"] });
    },
  });

  const updateCohort = useMutation({
    mutationFn: (data: UpdateCohortInput) =>
      cohortApi.updateCohort(cohort!._id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cohorts"] });
      queryClient.invalidateQueries({ queryKey: ["open-cohort"] });
    },
  });

  const toggleCenter = (centerId: string) => {
    setForm((f) => {
      const exists = f.centers.find((c) => c.centerId === centerId);

      if (exists) {
        return {
          ...f,
          centers: f.centers.filter((c) => c.centerId !== centerId),
        };
      }

      return {
        ...f,
        centers: [...f.centers, { centerId, programs: [] }],
      };
    });
  };

  const addProgram = (centerId: string, programId: string) => {
    setForm((f) => ({
      ...f,
      centers: f.centers.map((c) =>
        c.centerId === centerId &&
        !c.programs.find((p) => p.programId === programId)
          ? { ...c, programs: [...c.programs, { programId, totalSeats: 20 }] }
          : c,
      ),
    }));
  };

  const removeProgram = (centerId: string, programId: string) => {
    setForm((f) => ({
      ...f,
      centers: f.centers.map((c) =>
        c.centerId === centerId
          ? {
              ...c,
              programs: c.programs.filter((p) => p.programId !== programId),
            }
          : c,
      ),
    }));
  };

  const updateSeats = (centerId: string, programId: string, seats: number) => {
    setForm((f) => ({
      ...f,
      centers: f.centers.map((c) =>
        c.centerId === centerId
          ? {
              ...c,
              programs: c.programs.map((p) =>
                p.programId === programId ? { ...p, totalSeats: seats } : p,
              ),
            }
          : c,
      ),
    }));
  };

  const save = async () => {
    setError("");

    const mutation = isEdit ? updateCohort : createCohort;

    mutation.mutate(form, {
      onSuccess: () => {
        onClose();
        setForm(initialForm);
      },
      onError: (err) => {
        setError(getApiError(err));
      },
    });
  };

  const isLoading = createCohort.isPending || updateCohort.isPending;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
        <h2 className="font-heading font-black text-xl text-slate-900">
          {isEdit ? "Update Cohort" : "Create Cohort"}
        </h2>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
        >
          <X size={18} />
        </button>
      </div>
      <div className="overflow-y-auto flex-1 px-7 py-6 space-y-5">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
            {error}
          </p>
        )}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Cohort Name *
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g. 2025 Q2 Intake"
            className={inp}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Applications Open *
            </label>
            <input
              type="date"
              value={form.applicationStart}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  applicationStart: e.target.value,
                }))
              }
              className={inp}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Applications Close *
            </label>
            <input
              type="date"
              value={form.applicationEnd}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  applicationEnd: e.target.value,
                }))
              }
              className={inp}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Training Starts *
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, startDate: e.target.value }))
              }
              className={inp}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Training Ends *
            </label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, endDate: e.target.value }))
              }
              className={inp}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Training Centers *
          </label>
          <div className="flex gap-2 mb-4">
            {centers.map((c) => (
              <button
                key={c._id}
                type="button"
                onClick={() => toggleCenter(c._id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${form.centers.find((fc) => fc.centerId === c._id) ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-primary/10"}`}
              >
                {c.code} — {c.name.replace(" Training Center", "")}
                {form.centers.find((fc) => fc.centerId === c._id) && (
                  <CheckCircle2 size={13} className="inline ml-1" />
                )}
              </button>
            ))}
          </div>
          {form.centers.map((centerConfig) => {
            const center = centers.find((c) => c._id === centerConfig.centerId);
            return (
              <div
                key={centerConfig.centerId}
                className="bg-slate-50 rounded-2xl p-4 mb-3"
              >
                <p className="font-semibold text-slate-900 text-sm mb-3">
                  {center?.name}
                </p>
                <select
                  onChange={(e) => {
                    if (e.target.value)
                      addProgram(centerConfig.centerId, e.target.value);
                  }}
                  defaultValue=""
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                >
                  <option value="">+ Add a program</option>
                  {programs
                    .filter(
                      (p) =>
                        !centerConfig.programs.find(
                          (cp) => cp.programId === p._id,
                        ),
                    )
                    .map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title}
                      </option>
                    ))}
                </select>
                {centerConfig.programs.map((cp) => {
                  const prog = programs.find((p) => p._id === cp.programId);
                  return (
                    <div
                      key={cp.programId}
                      className="flex items-center justify-between gap-3 bg-white rounded-xl px-3 py-2 mb-1.5"
                    >
                      <span className="text-xs text-slate-700 flex-1">
                        {prog?.title}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-400">Seats:</span>
                        <input
                          type="number"
                          min="1"
                          value={cp.totalSeats}
                          onChange={(e) =>
                            updateSeats(
                              centerConfig.centerId,
                              cp.programId,
                              Number(e.target.value),
                            )
                          }
                          className="w-16 text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary/40"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeProgram(centerConfig.centerId, cp.programId)
                          }
                          className="text-xs font-semibold text-red-500 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-slate-100">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={save}
          disabled={isLoading || !form.name || form.centers.length === 0}
          className="px-6 py-2.5 rounded-xl bg-primary disabled:opacity-40 hover:bg-primary/60 text-white font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>{isEdit ? "Update Cohort" : "Create Cohort"}</>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default NewCohortModal;
