"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AdminAuthContextType = {
  authed: boolean;
  login: () => void;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const AUTH_KEY = "adele_admin_auth";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(localStorage.getItem(AUTH_KEY) === "true");
    setReady(true);
  }, []);

  const login = () => {
    localStorage.setItem(AUTH_KEY, "true");
    setAuthed(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const value = useMemo(
    () => ({
      authed,
      login,
      logout,
    }),
    [authed],
  );

  if (!ready) return null;

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);

  if (!ctx) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }

  return ctx;
}
