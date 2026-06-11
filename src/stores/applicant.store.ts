"use client";
import { create } from "zustand";
import {
  applicantApiInstance,
  setApplicantToken,
  getApiError,
} from "@/lib/axios";
import { ApplicantUser } from "@/interfaces/applicant.interface";

interface ApplicantStore {
  applicant: ApplicantUser | null;
  dashboard: Record<string, unknown> | null;
  loading: boolean;
  initialized: boolean;
  login(e: string, p: string): Promise<void>;
  logout(): Promise<void>;
  fetchMe(): Promise<void>;
  setApplicant(a: ApplicantUser): void;
}

export const useApplicantStore = create<ApplicantStore>((set) => ({
  applicant: null,
  dashboard: null,
  loading: false,
  initialized: false,
  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data } = await applicantApiInstance.post("/applicant/login", {
        email,
        password,
      });
      setApplicantToken(data.data.accessToken);
      set({ applicant: data.data.applicant, loading: false });
    } catch (err) {
      set({ loading: false });
      throw new Error(getApiError(err));
    }
  },
  logout: async () => {
    try {
      await applicantApiInstance.post("/applicant/logout");
    } catch {}
    setApplicantToken(null);
    set({ applicant: null, dashboard: null });
    if (typeof window !== "undefined") window.location.href = "/login";
  },
  fetchMe: async () => {
    try {
      const { default: ax } = await import("axios");
      const base =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
      const { data: r } = await ax.post(
        `${base}/applicant/refresh`,
        {},
        { withCredentials: true },
      );
      setApplicantToken(r.data.accessToken);
      const { data } = await applicantApiInstance.get("/applicant/me");
      set({
        applicant: data.data.applicant,
        dashboard: data.data,
        initialized: true,
      });
    } catch {
      set({ applicant: null, initialized: true });
    }
  },
  setApplicant: (a) => set({ applicant: a }),
}));
