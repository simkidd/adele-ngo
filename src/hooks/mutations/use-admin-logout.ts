import { useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin.api";
import { setAdminToken } from "@/lib/axios";
import { useAdminStore } from "@/stores/admin.store";

export function useAdminLogout() {
  const { clearUser } = useAdminStore();

  return useMutation({
    mutationFn: adminApi.adminLogout,

    onSettled: () => {
      setAdminToken(null);
      clearUser();

      if (typeof window !== "undefined") {
        window.location.href = "/admin/auth/login";
      }
    },
  });
}
