import type { Metadata } from "next";
import ApplicantLogin from "@/components/pages/apply/ApplicantLogin";

export const metadata: Metadata = {
  title: "Login | Adele Empowerment Foundation",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="flex items-center justify-center min-h-screen px-4">
        <ApplicantLogin />
      </div>
    </main>
  );
}
