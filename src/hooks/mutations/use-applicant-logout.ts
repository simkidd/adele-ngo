import { useMutation } from "@tanstack/react-query";
import { applicantApi } from "@/lib/api/applicant.api";
import { setApplicantToken } from "@/lib/axios";
import { useApplicantStore } from "@/stores/applicant.store";

export function useApplicantLogout() {
  const { clearApplicant } = useApplicantStore();

  return useMutation({
    mutationFn: applicantApi.applicantLogout,

    onSuccess: () => {
      setApplicantToken(null);
      clearApplicant();

      if (typeof window !== "undefined") {
        window.location.href = "/applicant/auth/login";
      }
    },
  });
}
