"use client";

import { useEffect } from "react";
import { useApplicantMe } from "@/hooks/queries/use-applicant-me";
import { useApplicantStore } from "@/stores/applicant.store";

export function ApplicantAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { applicant, setApplicant, setInitialized } = useApplicantStore();
  const { data } = useApplicantMe();

  useEffect(() => {
    if (data?.data) {
      setApplicant(data.data);
    }

    setInitialized(true);
  }, [data, setApplicant, setInitialized]);

  return <>{children}</>;
}
