"use client";

import RegistrationDetailSheet from "@/components/admin/registrations/RegistrationDetailSheet";
import { useCohorts } from "@/hooks/queries/use-cohorts";
import { usePrograms } from "@/hooks/queries/use-programs";
import {
  ListRegistrationsParams,
  useRegistrations,
} from "@/hooks/queries/use-registrations";
import { RegistrationStatus } from "@/interfaces/registration.interface";
import { formatDate } from "@/utils/helpers/date";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

const statusColors: Record<RegistrationStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100  text-green-700",
  Enrolled: "bg-blue-100   text-blue-700",
  Rejected: "bg-red-100    text-red-700",
  Verified: "bg-purple-100 text-purple-700",
};

const STATUSES: RegistrationStatus[] = [
  "Pending",
  "Verified",
  "Accepted",
  "Enrolled",
  "Rejected",
];

export default function RegistrationsPage() {
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("All");
  const [status, setStatus] = useState<"All" | RegistrationStatus>("All");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [cohort, setCohort] = useState("All");

  const filters: ListRegistrationsParams = useMemo(
    () => ({
      page: 1,
      limit: 20,
      search: search.trim() || undefined,
      cohortId: cohort !== "All" ? cohort : undefined,
      programId: program !== "All" ? program : undefined,
      status: status !== "All" ? status : undefined,
    }),
    [search, cohort, program, status],
  );

  const { data: cohorts = [] } = useCohorts();
  const { data: programs = [] } = usePrograms();
  const { data: registrations = [], isPending } = useRegistrations(filters);

  const updateStatus = (id: string, newStatus: RegistrationStatus) => {
    console.log("Update registration status:", id, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 w-56 transition"
            />
          </div>

          <select
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          >
            <option value="All">All Cohorts</option>
            {cohorts.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          >
            <option value="All">All Programs</option>
            {programs.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "All" | RegistrationStatus)
            }
            className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <span className="text-sm text-slate-400">
          {registrations?.length} results
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Applicant", "Program", "Applied", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {registrations?.map((reg, i) => (
                <motion.tr
                  key={reg._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onClick={() => setDetailId(reg._id)}
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">
                      {reg.applicantId.fullName ?? "-"}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {reg.applicantId.email ?? "-"}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-slate-600 text-sm">
                    {reg.programId.title ?? "-"}
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-sm">
                    {formatDate(reg.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColors[reg.status]}`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td
                    className="px-5 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={reg.status}
                      onChange={(e) =>
                        updateStatus(
                          reg._id,
                          e.target.value as RegistrationStatus,
                        )
                      }
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-400 cursor-pointer"
                    >
                      {STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </motion.tr>
              ))}
              {registrations?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail drawer */}
      <RegistrationDetailSheet
        registrationId={detailId}
        onClose={() => setDetailId(null)}
        onUpdateStatus={updateStatus}
      />
    </div>
  );
}
