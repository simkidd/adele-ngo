"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Users, Calendar, CheckCircle2 } from "lucide-react";
import { SEED_COHORTS, SEED_REGISTRATIONS, PROGRAMS_DATA, type Cohort } from "@/lib/store";

const statusColors: Record<string, string> = {
  Upcoming:  "bg-blue-100   text-blue-700",
  Active:    "bg-green-100  text-green-700",
  Completed: "bg-slate-100  text-slate-600",
};

const emptyCohort = (): Omit<Cohort,"id"|"enrolled"> => ({
  programId:"digital-literacy", programTitle:"Digital Literacy",
  name:"", startDate:"", endDate:"", capacity:25, status:"Upcoming"
});

export default function CohortsPage() {
  const [cohorts,  setCohorts]  = useState<Cohort[]>(SEED_COHORTS);
  const [showNew,  setShowNew]  = useState(false);
  const [selected, setSelected] = useState<Cohort|null>(null);
  const [form,     setForm]     = useState(emptyCohort());

  const upd = (k: string, v: string | number) => {
    setForm(f => {
      const updated = {...f, [k]: v};
      if (k === "programId") {
        const prog = PROGRAMS_DATA.find(p => p.id === v);
        if (prog) updated.programTitle = prog.title;
      }
      return updated;
    });
  };

  const save = () => {
    setCohorts(prev => [...prev, {...form, id:`cohort-${Date.now()}`, enrolled:[]}]);
    setShowNew(false); setForm(emptyCohort());
  };

  const markComplete = (id: string) => {
    setCohorts(prev => prev.map(c => c.id===id ? {...c, status:"Completed"} : c));
    if (selected?.id===id) setSelected(s => s ? {...s, status:"Completed"} : s);
  };

  const enrolled = (cohort: Cohort) => SEED_REGISTRATIONS.filter(r => cohort.enrolled.includes(r.id));

  const inp = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition";

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm">{cohorts.length} cohorts across {PROGRAMS_DATA.length} programs</p>
        <button onClick={()=>setShowNew(true)} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          <Plus size={16}/> New Cohort
        </button>
      </div>

      {/* Cohort cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cohorts.map((cohort, i) => {
          const enrolledList = enrolled(cohort);
          const pct = Math.round((enrolledList.length / cohort.capacity) * 100);
          return (
            <motion.div key={cohort.id} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              onClick={()=>setSelected(cohort)} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="text-xs text-slate-400 font-medium">{cohort.programTitle}</p>
                  <h3 className="font-heading font-bold text-slate-900 text-base leading-tight mt-0.5">{cohort.name}</h3>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${statusColors[cohort.status]}`}>{cohort.status}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={12}/>{cohort.startDate}</span>
                <span className="flex items-center gap-1"><Users size={12}/>{enrolledList.length}/{cohort.capacity}</span>
              </div>
              {/* Enrollment bar */}
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:0.8,delay:i*0.08+0.3}}
                  className={`h-full rounded-full ${pct>=100?"bg-green-500":pct>60?"bg-orange-500":"bg-blue-500"}`}/>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">{pct}% full</p>
            </motion.div>
          );
        })}
      </div>

      {/* Cohort detail drawer */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={()=>setSelected(null)}>
            <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",stiffness:300,damping:30}}
              className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl" onClick={e=>e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <h3 className="font-heading font-black text-lg text-slate-900">Cohort Details</h3>
                <button onClick={()=>setSelected(null)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X size={16}/></button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <p className="text-orange-500 font-semibold text-sm">{selected.programTitle}</p>
                  <h2 className="font-heading font-black text-xl text-slate-900">{selected.name}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[["Start Date",selected.startDate],["End Date",selected.endDate],["Capacity",String(selected.capacity)],["Status",selected.status]].map(([k,v])=>(
                    <div key={k}><p className="text-xs text-slate-400 mb-0.5">{k}</p><p className="font-semibold text-slate-900">{v}</p></div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-sm">Enrolled Participants ({enrolled(selected).length})</h4>
                  {enrolled(selected).length===0 ? (
                    <p className="text-slate-400 text-sm">No participants enrolled yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {enrolled(selected).map(r=>(
                        <div key={r.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5 text-sm">
                          <div><p className="font-medium text-slate-800">{r.name}</p><p className="text-xs text-slate-400">{r.email}</p></div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Enrolled</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selected.status !== "Completed" && (
                  <button onClick={()=>markComplete(selected.id)}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                    <CheckCircle2 size={16}/> Mark as Completed
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New cohort modal */}
      <AnimatePresence>
        {showNew && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl" onClick={e=>e.stopPropagation()}>
              <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                <h2 className="font-heading font-black text-xl text-slate-900">New Cohort</h2>
                <button onClick={()=>setShowNew(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X size={18}/></button>
              </div>
              <div className="px-7 py-6 space-y-5">
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Program</label>
                  <select value={form.programId} onChange={e=>upd("programId",e.target.value)} className={inp}>
                    {PROGRAMS_DATA.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Cohort Name</label>
                  <input value={form.name} onChange={e=>upd("name",e.target.value)} placeholder="e.g. Cohort 18 — April 2025" className={inp}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Start Date</label><input type="date" value={form.startDate} onChange={e=>upd("startDate",e.target.value)} className={inp}/></div>
                  <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">End Date</label><input type="date" value={form.endDate} onChange={e=>upd("endDate",e.target.value)} className={inp}/></div>
                </div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Capacity</label><input type="number" value={form.capacity} onChange={e=>upd("capacity",Number(e.target.value))} className={inp}/></div>
              </div>
              <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-slate-100">
                <button onClick={()=>setShowNew(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">Cancel</button>
                <button onClick={save} className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors">Create Cohort</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
