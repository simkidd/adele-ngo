import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin.api";
import { setAdminToken } from "@/lib/axios";

export function useAdminMe() {
  return useQuery({
    queryKey: ["admin-me"],
    queryFn: adminApi.getAdminMe,
    retry: false,
    staleTime: 1000 * 60 * 5, //5 minutes
  });
}
