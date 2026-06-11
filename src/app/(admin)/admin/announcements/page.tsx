"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { adminApi, getApiError } from "@/lib/api";
interface Announcement{_id:string;title:string;body:string;type:string;audience:string;status:string;createdAt:string;}
const statusColors:Record<string,string>={Draft:"bg-slate-100 text-slate-500",Published:"bg-green-100 text-green-700"};
const inp="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition";
export default function AnnouncementsPage(){
  const[items,setItems]=useState<Announcement[]>([]);const[loading,setLoading]=useState(true);const[editing,setEditing]=useState<Announcement|null>(null);const[isNew,setIsNew]=useState(false);const[saving,setSaving]=useState(false);const[deleteId,setDeleteId]=useState<string|null>(null);const[error,setError]=useState("");
  const[form,setForm]=useState({title:"",body:"",type:"General",audience:"Public",status:"Draft",expiresAt:""});
  const upd=(k:string,v:string)=>setForm(f=>({...f,[k]:v}));
  const load=useCallback(async()=>{try{const{data}=await adminApi.get("/announcements");setItems(data.data);}catch{}setLoading(false);},[]);
  useEffect(()=>{load();},[load]);
  const openNew=()=>{setForm({title:"",body:"",type:"General",audience:"Public",status:"Draft",expiresAt:""});setIsNew(true);setEditing({} as Announcement);};
  const openEdit=(a:Announcement)=>{setForm({title:a.title,body:a.body,type:a.type,audience:a.audience,status:a.status,expiresAt:""});setIsNew(false);setEditing(a);};
  const save=async()=>{setSaving(true);setError("");try{if(isNew)await adminApi.post("/announcements",form);else await adminApi.patch(`/announcements/${editing!._id}`,form);setEditing(null);load();}catch(err){setError(getApiError(err));}setSaving(false);};
  const confirmDelete=async()=>{try{await adminApi.delete(`/announcements/${deleteId}`);load();}catch(err){alert(getApiError(err));}setDeleteId(null);};
  const togglePublish=async(a:Announcement)=>{try{await adminApi.patch(`/announcements/${a._id}`,{status:a.status==="Published"?"Draft":"Published"});load();}catch(err){alert(getApiError(err));}};
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between"><p className="text-slate-500 text-sm">{items.length} announcement{items.length!==1?"s":""}</p><button onClick={openNew} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"><Plus size={16}/> New Announcement</button></div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading?(<div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-orange-500"/></div>):items.length===0?(<div className="py-16 text-center text-slate-400">No announcements yet.</div>):(
          <div className="divide-y divide-slate-50">{items.map((a,i)=>(<motion.div key={a._id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}} className="px-6 py-4 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-start justify-between gap-4"><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1"><span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${statusColors[a.status]}`}>{a.status}</span><span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">{a.type}</span><span className="text-xs text-slate-400">{a.audience}</span></div><h3 className="font-semibold text-slate-900 text-sm">{a.title}</h3><p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{a.body}</p></div>
              <div className="flex items-center gap-2 flex-shrink-0"><button onClick={()=>togglePublish(a)} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${a.status==="Published"?"bg-slate-100 hover:bg-slate-200 text-slate-600":"bg-green-100 hover:bg-green-200 text-green-700"}`}>{a.status==="Published"?"Unpublish":"Publish"}</button><button onClick={()=>openEdit(a)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-orange-100 hover:text-orange-600 flex items-center justify-center transition-colors"><Pencil size={14}/></button><button onClick={()=>setDeleteId(a._id)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"><Trash2 size={14}/></button></div>
            </div>
          </motion.div>))}</div>
        )}
      </div>
      <AnimatePresence>{editing!==null&&(<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"><motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}} className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100"><h2 className="font-heading font-black text-xl text-slate-900">{isNew?"New Announcement":"Edit Announcement"}</h2><button onClick={()=>setEditing(null)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X size={18}/></button></div>
        <div className="overflow-y-auto flex-1 px-7 py-6 space-y-5">
          {error&&<p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>}
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title *</label><input value={form.title} onChange={e=>upd("title",e.target.value)} placeholder="Announcement title" className={inp}/></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Type</label><select value={form.type} onChange={e=>upd("type",e.target.value)} className={inp}>{["General","Cohort","Program","Alert"].map(t=><option key={t}>{t}</option>)}</select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Audience</label><select value={form.audience} onChange={e=>upd("audience",e.target.value)} className={inp}>{["Public","Applicants","Enrolled","All"].map(a=><option key={a}>{a}</option>)}</select></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label><select value={form.status} onChange={e=>upd("status",e.target.value)} className={inp}><option>Draft</option><option>Published</option></select></div>
          </div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Expires At (optional)</label><input type="date" value={form.expiresAt} onChange={e=>upd("expiresAt",e.target.value)} className={inp}/></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Body *</label><textarea rows={6} value={form.body} onChange={e=>upd("body",e.target.value)} placeholder="Announcement content..." className={`${inp} resize-none`}/></div>
        </div>
        <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-slate-100"><button onClick={()=>setEditing(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">Cancel</button><button onClick={save} disabled={saving||!form.title||!form.body} className="px-6 py-2.5 rounded-xl bg-orange-500 disabled:opacity-40 hover:bg-orange-600 text-white font-bold text-sm flex items-center gap-2 transition-colors">{saving?<><Loader2 size={14} className="animate-spin"/>Saving...</>:"Save"}</button></div>
      </motion.div></motion.div>)}</AnimatePresence>
      <AnimatePresence>{deleteId&&(<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"><motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}} className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl text-center"><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500"/></div><h3 className="font-heading font-black text-lg text-slate-900 mb-2">Delete Announcement?</h3><p className="text-slate-500 text-sm mb-6">This cannot be undone.</p><div className="flex gap-3"><button onClick={()=>setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">Cancel</button><button onClick={confirmDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors">Delete</button></div></motion.div></motion.div>)}</AnimatePresence>
    </div>
  );
}
