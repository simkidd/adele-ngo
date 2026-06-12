import { cohortApi } from "@/lib/api/cohort.api";
import { useQuery } from "@tanstack/react-query";

export const useCohorts = () => {
  return useQuery({
    queryKey: ["cohorts"],
    queryFn: async () => {
      const res = await cohortApi.listCohorts();
      return res.data;
    },
  });
};
