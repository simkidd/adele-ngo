import DashboardLayout from "@/components/applicant/DashboardLayout";
import React from "react";

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
