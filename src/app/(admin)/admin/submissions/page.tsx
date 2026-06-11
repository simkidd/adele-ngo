"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Trash2, Circle, CheckCircle, Search, Loader2 } from "lucide-react";
import { adminApi, getApiError } from "@/lib/api";
interface Sub{_id:string;name:string;email:string;phone?:string;enquiryType:string;program?:string;message:string;read:boolean;createdAt:string;}
const enquiryLabels:Record<string,string>={application:"Program Application",volunteer:"Volunteer / Mentor",general:"General Enquiry"};
const enquiryColors:Record<string,string>={application:"bg-orange-100 text-orange-700",volunteer:"bg-green-100 text-green-700",general:"bg-slate-100 text-slate-600"};
export default function SubmissionsPage(){
  const[subs,setSubs]=useState<Sub[]>([]);const[meta,setMeta]=useState({total:0,unread:0});const[loading,setLoading]=useState(true);const[detail,setDetail]=useState<Sub|null>(null);const[search,setSearch]=useState("");const[deleteId,setDeleteId]=useState<string|null>(null);
  const load=useCallback(async()=>{try{const{data}=await adminApi.get("/submissions?limit=50");setSubs(data.data);setMeta({total:data.meta?.total??0,unread:data.meta?.unread??0});}catch{}setLoading(false);},[]);
  useEffect(()=>{load();},[load]);
  const markRead=async(id:string)=>{try{await adminApi.patch(`/submissions/${id}/read`);setSubs(prev=>prev.map(s=>s._id===id?{...s,read:true}:s));setMeta(m=>({...m,unread:Math.max(0,m.unread-1)}));if(detail?._id===id)setDetail(d=>d?{...d,read:true}:d);}catch{}};
  const confirmDelete=async()=>{try{await adminApi.delete(`/submissions/${deleteId}`);setSubs(prev=>prev.filter(s=>s._id!==deleteId));if(detail?._id===deleteId)setDetail(null);}catch(err){alert(getApiError(err));}setDeleteId(null);};
  const filtered=subs.filter(s=>s.name.toLowerCase().includes(search.toLowerCase())||s.email.toLowerCase().includes(search.toLowerCase())||s.message.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4"><div className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search submissions..." className="pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 w-64 transition"/></div>{meta.unread>0&&<span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full"><Circle size={10} className="fill-orange-500 text-orange-500"/> {meta.unread} unread</span>}</div>
        <span className="text-sm text-slate-400">{meta.total} total</span>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading?(<div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-orange-500"/></div>):(
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 border-b border-slate-100"><tr>{["","Name","Type","Message","Date","Actions"].map((h,i)=>(<th key={i} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>))}</tr></thead>
            <tbody className="divide-y divide-slate-50">{filtered.map((sub,i)=>(<motion.tr key={sub._id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.03}} className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${!sub.read?"bg-orange-50/30":""}`} onClick={()=>{setDetail(sub);if(!sub.read)markRead(sub._id);}}>
              <td className="px-3 py-4 w-8">{sub.read?<CheckCircle size={15} className="text-slate-300"/>:<Circle size={15} className="text-orange-500 fill-orange-500"/>}</td>
              <td className="px-5 py-4"><p className={`font-semibold ${!sub.read?"text-slate-900":"text-slate-700"}`}>{sub.name}</p><p className="text-xs text-slate-400">{sub.email}</p></td>
              <td className="px-5 py-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${enquiryColors[sub.enquiryType]}`}>{enquiryLabels[sub.enquiryType]}</span></td>
              <td className="px-5 py-4 text-slate-500 max-w-xs"><p className="line-clamp-1">{sub.message}</p></td>
              <td className="px-5 py-4 text-slate-500">{new Date(sub.createdAt).toLocaleDateString("en-NG",{day:"numeric",month:"short"})}</td>
              <td className="px-5 py-4" onClick={e=>e.stopPropagation()}><button onClick={()=>setDeleteId(sub._id)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"><Trash2 size={14}/></button></td>
            </motion.tr>))}{filtered.length===0&&<tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400">No submissions found.</td></tr>}</tbody>
          </table></div>
        )}
      </div>
      <AnimatePresence>{detail&&(<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={()=>setDetail(null)}><motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",stiffness:300,damping:30}} className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100"><div className="flex items-center gap-2"><Mail size={18} className="text-orange-500"/><h3 className="font-heading font-black text-lg text-slate-900">Submission</h3></div><button onClick={()=>setDetail(null)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X size={16}/></button></div>
        <div className="p-6 space-y-5"><span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${enquiryColors[detail.enquiryType]}`}>{enquiryLabels[detail.enquiryType]}</span>
          <div className="grid grid-cols-2 gap-4 text-sm">{[["Name",detail.name],["Email",detail.email],["Phone",detail.phone||"—"],["Date",new Date(detail.createdAt).toLocaleDateString("en-NG",{day:"numeric",month:"long",year:"numeric"})]].map(([k,v])=>(<div key={k}><p className="text-xs text-slate-400 mb-0.5">{k}</p><p className="font-semibold text-slate-900 break-all">{v}</p></div>))}{detail.program&&<div className="col-span-2"><p className="text-xs text-slate-400 mb-0.5">Program</p><p className="font-semibold text-slate-900">{detail.program}</p></div>}</div>
          <div><p className="text-xs text-slate-400 font-medium mb-2">Message</p><p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4">{detail.message}</p></div>
          <a href={`mailto:${detail.email}`} className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm transition-colors"><Mail size={15}/> Reply via Email</a>
        </div>
      </motion.div></motion.div>)}</AnimatePresence>
      <AnimatePresence>{deleteId&&(<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"><motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}} className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl text-center"><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500"/></div><h3 className="font-heading font-black text-lg text-slate-900 mb-2">Delete Submission?</h3><p className="text-slate-500 text-sm mb-6">This cannot be undone.</p><div className="flex gap-3"><button onClick={()=>setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">Cancel</button><button onClick={confirmDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">Delete</button></div></motion.div></motion.div>)}</AnimatePresence>
    </div>
  );
}
