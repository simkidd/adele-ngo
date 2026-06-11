"use client";
import { create } from "zustand";
import { adminApiInstance, setAdminToken, getApiError } from "@/lib/axios";
import { AdminUser } from "@/interfaces/admin.interface";
import { adminApi } from "@/lib/api/admin.api";

interface AdminStore {
  user: AdminUser | null;
  loading: boolean;
  initialized: boolean;
  login(e: string, p: string): Promise<void>;
  logout(): Promise<void>;
  fetchMe(): Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  user: null,
  loading: false,
  initialized: false,
  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data } = await adminApiInstance.post("/auth/login", {
        email,
        password,
      });
      setAdminToken(data.data.accessToken);
      set({ user: data.data.user, loading: false });
    } catch (err) {
      set({ loading: false });
      throw new Error(getApiError(err));
    }
  },
  logout: async () => {
    try {
      await adminApiInstance.post("/auth/logout");
    } catch {}
    setAdminToken(null);
    set({ user: null });
    if (typeof window !== "undefined") window.location.href = "/admin";
  },
  fetchMe: async () => {
    try {
      const { default: ax } = await import("axios");
      const base =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
      const { data: r } = await ax.post(
        `${base}/auth/refresh`,
        {},
        { withCredentials: true },
      );
      setAdminToken(r.data.accessToken);
      const { data } = await adminApiInstance.get("/auth/me");
      set({ user: data.data, initialized: true });
    } catch {
      set({ user: null, initialized: true });
    }
  },
}));
