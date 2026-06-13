import DashboardLayout from "@/components/applicant/DashboardLayout";
import { ApplicantAuthGuard } from "@/guards/ApplicantAuthGuard";
import React from "react";

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApplicantAuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </ApplicantAuthGuard>
  );
}
