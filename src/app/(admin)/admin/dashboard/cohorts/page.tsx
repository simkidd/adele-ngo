"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Loader2, CheckCircle2 } from "lucide-react";
import { adminApi, getApiError } from "@/lib/api";
interface Program{_id:string;title:string;}
interface Center{_id:string;name:string;code:string;}
interface Cohort{_id:string;name:string;status:string;startDate:string;endDate:string;applicationStart:string;applicationEnd:string;centers:unknown[];}
const statusColors:Record<string,string>={Draft:"bg-slate-100 text-slate-600",Open:"bg-green-100 text-green-700",Closed:"bg-yellow-100 text-yellow-700",Active:"bg-blue-100 text-blue-700",Completed:"bg-slate-100 text-slate-500"};
const nextStatus:Record<string,string>={Draft:"Open",Open:"Closed",Closed:"Active",Active:"Completed"};
const nextLabel:Record<string,string>={Draft:"Open Applications",Open:"Close Applications",Closed:"Begin Training",Active:"Mark Completed"};
const inp="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition";
export default function CohortsPage(){
  const[cohorts,setCohorts]=useState<Cohort[]>([]);const[programs,setPrograms]=useState<Program[]>([]);const[centers,setCenters]=useState<Center[]>([]);
  const[loading,setLoading]=useState(true);const[showNew,setShowNew]=useState(false);const[saving,setSaving]=useState(false);const[error,setError]=useState("");
  const[form,setForm]=useState({name:"",applicationStart:"",applicationEnd:"",startDate:"",endDate:"",centers:[] as{centerId:string;programs:{programId:string;totalSeats:number}[]}[]});
  const load=useCallback(async()=>{try{const[coRes,prRes,ceRes]=await Promise.all([adminApi.get("/cohorts"),adminApi.get("/programs"),adminApi.get("/centers")]);setCohorts(coRes.data.data);setPrograms(prRes.data.data);setCenters(ceRes.data.data);}catch{}setLoading(false);},[]);
  useEffect(()=>{load();},[load]);
  const addCenter=(centerId:string)=>{if(form.centers.find(c=>c.centerId===centerId)) return;setForm(f=>({...f,centers:[...f.centers,{centerId,programs:[]}]}));};
  const addProgram=(centerId:string,programId:string)=>{setForm(f=>({...f,centers:f.centers.map(c=>c.centerId===centerId&&!c.programs.find(p=>p.programId===programId)?{...c,programs:[...c.programs,{programId,totalSeats:20}]}:c)}));};
  const updateSeats=(centerId:string,programId:string,seats:number)=>{setForm(f=>({...f,centers:f.centers.map(c=>c.centerId===centerId?{...c,programs:c.programs.map(p=>p.programId===programId?{...p,totalSeats:seats}:p)}:c)}));};
  const save=async()=>{setSaving(true);setError("");try{await adminApi.post("/cohorts",form);setShowNew(false);setForm({name:"",applicationStart:"",applicationEnd:"",startDate:"",endDate:"",centers:[]});load();}catch(err){setError(getApiError(err));}setSaving(false);};
  const transition=async(id:string,status:string)=>{try{await adminApi.patch(`/cohorts/${id}/status`,{status});load();}catch(err){alert(getApiError(err));}};
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between"><p className="text-slate-500 text-sm">{cohorts.length} cohort{cohorts.length!==1?"s":""}</p><button onClick={()=>setShowNew(true)} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"><Plus size={16}/> New Cohort</button></div>
      {loading?(<div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-orange-500"/></div>):(
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cohorts.map((cohort,i)=>(<motion.div key={cohort._id} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between gap-2 mb-3"><h3 className="font-heading font-bold text-slate-900 text-base leading-tight">{cohort.name}</h3><span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${statusColors[cohort.status]}`}>{cohort.status}</span></div>
            <div className="space-y-1 text-xs text-slate-500 mb-4">
              <p>Applications: {new Date(cohort.applicationStart).toLocaleDateString("en-NG",{month:"short",day:"numeric"})} – {new Date(cohort.applicationEnd).toLocaleDateString("en-NG",{month:"short",day:"numeric",year:"numeric"})}</p>
              <p>Training: {new Date(cohort.startDate).toLocaleDateString("en-NG",{month:"short",day:"numeric"})} – {new Date(cohort.endDate).toLocaleDateString("en-NG",{month:"short",day:"numeric",year:"numeric"})}</p>
              <p>{(cohort.centers as unknown[]).length} center{(cohort.centers as unknown[]).length!==1?"s":""} configured</p>
            </div>
            {nextStatus[cohort.status]&&(<button onClick={()=>transition(cohort._id,nextStatus[cohort.status])} className="w-full text-xs font-bold py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors">{nextLabel[cohort.status]}</button>)}
          </motion.div>))}
          {cohorts.length===0&&<div className="col-span-3 bg-white rounded-2xl p-10 text-center text-slate-400">No cohorts yet. Create your first one.</div>}
        </div>
      )}
      <AnimatePresence>{showNew&&(<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
        <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}} className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={e=>e.stopPropagation()}>
          <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100"><h2 className="font-heading font-black text-xl text-slate-900">New Cohort</h2><button onClick={()=>setShowNew(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X size={18}/></button></div>
          <div className="overflow-y-auto flex-1 px-7 py-6 space-y-5">
            {error&&<p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>}
            <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Cohort Name *</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. 2025 Q2 Intake" className={inp}/></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Applications Open *</label><input type="date" value={form.applicationStart} onChange={e=>setForm(f=>({...f,applicationStart:e.target.value}))} className={inp}/></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Applications Close *</label><input type="date" value={form.applicationEnd} onChange={e=>setForm(f=>({...f,applicationEnd:e.target.value}))} className={inp}/></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Training Starts *</label><input type="date" value={form.startDate} onChange={e=>setForm(f=>({...f,startDate:e.target.value}))} className={inp}/></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Training Ends *</label><input type="date" value={form.endDate} onChange={e=>setForm(f=>({...f,endDate:e.target.value}))} className={inp}/></div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Training Centers *</label>
              <div className="flex gap-2 mb-4">{centers.map(c=>(<button key={c._id} onClick={()=>addCenter(c._id)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${form.centers.find(fc=>fc.centerId===c._id)?"bg-orange-500 text-white":"bg-slate-100 text-slate-600 hover:bg-orange-100"}`}>{c.code} — {c.name.replace(" Training Center","")}{form.centers.find(fc=>fc.centerId===c._id)&&<CheckCircle2 size={13} className="inline ml-1"/>}</button>))}</div>
              {form.centers.map(centerConfig=>{const center=centers.find(c=>c._id===centerConfig.centerId);return(<div key={centerConfig.centerId} className="bg-slate-50 rounded-2xl p-4 mb-3"><p className="font-semibold text-slate-900 text-sm mb-3">{center?.name}</p>
                <select onChange={e=>{if(e.target.value) addProgram(centerConfig.centerId,e.target.value);}} defaultValue="" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3"><option value="">+ Add a program</option>{programs.filter(p=>!centerConfig.programs.find(cp=>cp.programId===p._id)).map(p=><option key={p._id} value={p._id}>{p.title}</option>)}</select>
                {centerConfig.programs.map(cp=>{const prog=programs.find(p=>p._id===cp.programId);return(<div key={cp.programId} className="flex items-center justify-between gap-3 bg-white rounded-xl px-3 py-2 mb-1.5"><span className="text-xs text-slate-700 flex-1">{prog?.title}</span><div className="flex items-center gap-1.5"><span className="text-xs text-slate-400">Seats:</span><input type="number" min="1" value={cp.totalSeats} onChange={e=>updateSeats(centerConfig.centerId,cp.programId,Number(e.target.value))} className="w-16 text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-400"/></div></div>);})}
              </div>);})}
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-slate-100">
            <button onClick={()=>setShowNew(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">Cancel</button>
            <button onClick={save} disabled={saving||!form.name||form.centers.length===0} className="px-6 py-2.5 rounded-xl bg-orange-500 disabled:opacity-40 hover:bg-orange-600 text-white font-bold text-sm flex items-center gap-2 transition-colors">{saving?<><Loader2 size={14} className="animate-spin"/>Saving...</>:"Create Cohort"}</button>
          </div>
        </motion.div>
      </motion.div>)}</AnimatePresence>
    </div>
  );
}
