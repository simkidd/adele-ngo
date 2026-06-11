"use client";

import { useEffect } from "react";
import { useAdminMe } from "@/hooks/queries/use-admin-me";
import { useAdminStore } from "@/stores/admin.store";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, setUser, setInitialized } = useAdminStore();
  const { data } = useAdminMe();

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }

    setInitialized(true);
  }, [data, setUser, setInitialized]);

  return <>{children}</>;
}
