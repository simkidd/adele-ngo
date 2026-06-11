import ApplyForm from "@/components/pages/apply/ApplyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply | Adele Empowerment Foundation",
};

export default function ApplyPage() {
  return (
    <div className="bg-slate-50">
      <ApplyForm />
    </div>
  );
}
