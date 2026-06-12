import { useQuery } from "@tanstack/react-query";
import { centersApi } from "@/lib/api/center.api";

export function useCenters() {
  return useQuery({
    queryKey: ["centers"],
    queryFn: async () => {
      const res = await centersApi.getCenters();
      return res.data;
    },
  });
}
