import { applicantApi } from "@/lib/api/applicant.api";
import { useQuery } from "@tanstack/react-query";

export const useApplicantDashboard = () => {
  return useQuery({
    queryKey: ["applicant-dashboard"],
    queryFn: async () => {
      const res = await applicantApi.getApplicantDashboard();
      return res.data;
    },
  });
};
