import { programsApi } from "@/lib/api/program.api";
import { useQuery } from "@tanstack/react-query";

export const usePrograms = (params?: {
  category?: string;
  active?: string;
}) => {
  return useQuery({
    queryKey: ["programs", params],
    queryFn: async () => {
      const res = await programsApi.getPrograms(params);
      return res.data;
    },
  });
};
