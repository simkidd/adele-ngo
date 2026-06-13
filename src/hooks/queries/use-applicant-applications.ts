import { useQuery } from "@tanstack/react-query";
import { applicantApi } from "@/lib/api/applicant.api";

export const useApplicantApplications = () => {
  return useQuery({
    queryKey: ["applicant-applications"],
    queryFn: async () => {
      const res = await applicantApi.getApplications();
      return res.data;
    },
  });
};

export const useApplicantApplication = (id: string | null) => {
  return useQuery({
    queryKey: ["applicant-application", id],
    queryFn: async () => {
      const res = await applicantApi.getApplication(id!);
      return res.data;
    },
    enabled: !!id,
  });
};
