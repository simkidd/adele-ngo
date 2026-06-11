"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown } from "lucide-react";
import { SEED_REGISTRATIONS, PROGRAMS_DATA, type ProgramRegistration, type AppStatus } from "@/lib/store";

const statusColors: Record<AppStatus, string> = {
  Pending:  "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100  text-green-700",
  Enrolled: "bg-blue-100   text-blue-700",
  Rejected: "bg-red-100    text-red-700",
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<ProgramRegistration[]>(SEED_REGISTRATIONS);
  const [search,     setSearch]     = useState("");
  const [program,    setProgram]    = useState("All");
  const [status,     setStatus]     = useState<"All"|AppStatus>("All");
  const [detail,     setDetail]     = useState<ProgramRegistration|null>(null);

  const filtered = registrations.filter(r =>
    (program === "All" || r.programId === program) &&
    (status  === "All" || r.status === status) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: string, newStatus: AppStatus) => {
    setRegistrations(prev => prev.map(r => r.id === id ? {...r, status: newStatus} : r));
    if (detail?.id === id) setDetail(d => d ? {...d, status: newStatus} : d);
  };

  return (
    <div className="max-w-6xl space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or email..." className="pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 w-56 transition"/>
          </div>
          <select value={program} onChange={e=>setProgram(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition">
            <option value="All">All Programs</option>
            {PROGRAMS_DATA.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
          <select value={status} onChange={e=>setStatus(e.target.value as "All"|AppStatus)} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition">
            <option value="All">All Statuses</option>
            {(["Pending","Accepted","Enrolled","Rejected"] as AppStatus[]).map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <span className="text-sm text-slate-400">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Applicant","Program","Applied","Status","Actions"].map(h=>(
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((reg, i) => (
                <motion.tr key={reg.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={()=>setDetail(reg)}>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{reg.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{reg.email}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600 text-sm">{reg.programTitle}</td>
                  <td className="px-5 py-4 text-slate-500 text-sm">{new Date(reg.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColors[reg.status]}`}>{reg.status}</span>
                  </td>
                  <td className="px-5 py-4" onClick={e=>e.stopPropagation()}>
                    <select value={reg.status} onChange={e=>updateStatus(reg.id, e.target.value as AppStatus)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-400 cursor-pointer">
                      {(["Pending","Accepted","Enrolled","Rejected"] as AppStatus[]).map(s=><option key={s}>{s}</option>)}
                    </select>
                  </td>
                </motion.tr>
              ))}
              {filtered.length===0 && <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-400">No applications found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {detail && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={()=>setDetail(null)}>
            <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",stiffness:300,damping:30}}
              className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl" onClick={e=>e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <h3 className="font-heading font-black text-lg text-slate-900">Application Details</h3>
                <button onClick={()=>setDetail(null)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X size={16}/></button>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-heading font-black text-xl text-slate-900">{detail.name}</h2>
                    <p className="text-orange-500 font-medium text-sm">{detail.programTitle}</p>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${statusColors[detail.status]}`}>{detail.status}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["Email",      detail.email],
                    ["Phone",      detail.phone],
                    ["DOB",        detail.dob],
                    ["Location",   detail.location],
                    ["Education",  detail.education],
                    ["Employment", detail.employment],
                  ].map(([k,v])=>(
                    <div key={k}><p className="text-xs text-slate-400 font-medium mb-0.5">{k}</p><p className="text-sm font-semibold text-slate-800">{v||"—"}</p></div>
                  ))}
                </div>

                <div><p className="text-xs text-slate-400 font-medium mb-1">Motivation</p><p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">{detail.motivation||"—"}</p></div>
                {detail.extraAnswer && <div><p className="text-xs text-slate-400 font-medium mb-1">Program Question</p><p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-3">{detail.extraAnswer}</p></div>}

                <div>
                  <p className="text-xs text-slate-400 font-medium mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(["Pending","Accepted","Enrolled","Rejected"] as AppStatus[]).map(s=>(
                      <button key={s} onClick={()=>updateStatus(detail.id, s)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${detail.status===s ? `${statusColors[s]} ring-2 ring-offset-1 ring-current` : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
