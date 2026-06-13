import { useQuery } from "@tanstack/react-query";
import { applicantApi } from "@/lib/api/applicant.api";

export function useApplicantMe() {
  return useQuery({
    queryKey: ["applicant-me"],
    queryFn: applicantApi.getMe,
    retry: false,
    staleTime: 1000 * 60 * 5, //5 minutes
  });
}
