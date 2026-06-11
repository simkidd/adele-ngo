"use client";

import { create } from "zustand";
import { AdminUser } from "@/interfaces/admin.interface";

interface AdminStore {
  user: AdminUser | null;
  initialized: boolean;
  setUser: (user: AdminUser | null) => void;
  setInitialized: (value: boolean) => void;
  clearUser: () => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  user: null,
  initialized: false,

  setUser: (user) => set({ user }),

  setInitialized: (value) => set({ initialized: value }),

  clearUser: () =>
    set({
      user: null,
      initialized: true,
    }),
}));
