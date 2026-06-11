"use client";

import { create } from "zustand";
import { ApplicantUser } from "@/interfaces/applicant.interface";

interface ApplicantStore {
  applicant: ApplicantUser | null;
  dashboard: Record<string, unknown> | null;
  initialized: boolean;
  setApplicant: (applicant: ApplicantUser | null) => void;
  setDashboard: (dashboard: Record<string, unknown> | null) => void;
  setInitialized: (value: boolean) => void;
  clearApplicant: () => void;
}

export const useApplicantStore = create<ApplicantStore>((set) => ({
  applicant: null,
  dashboard: null,
  initialized: false,

  setApplicant: (applicant) => set({ applicant }),
  setDashboard: (dashboard) => set({ dashboard }),
  setInitialized: (value) => set({ initialized: value }),

  clearApplicant: () =>
    set({
      applicant: null,
      dashboard: null,
      initialized: true,
    }),
}));
