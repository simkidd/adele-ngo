"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Phone, Mail, Loader2, Save, CheckCircle2 } from "lucide-react";
import { adminApi, getApiError } from "@/lib/api";
interface Program{_id:string;title:string;category:string;isActive:boolean;}
interface Center{_id:string;name:string;slug:string;code:string;state:string;address:string;phone:string;email:string;isActive:boolean;programs:Program[];managerId?:{_id:string;fullName:string;email:string};}
const inp="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition";
const lbl="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
export default function CentersPage(){
  const[centers,setCenters]=useState<Center[]>([]);const[loading,setLoading]=useState(true);const[editing,setEditing]=useState<string|null>(null);const[saving,setSaving]=useState(false);const[saved,setSaved]=useState<string|null>(null);const[error,setError]=useState("");const[forms,setForms]=useState<Record<string,Partial<Center>>>({});
  const load=useCallback(async()=>{try{const{data}=await adminApi.get("/centers");setCenters(data.data);const f:Record<string,Partial<Center>>={};data.data.forEach((c:Center)=>{f[c._id]={name:c.name,address:c.address,phone:c.phone,email:c.email};});setForms(f);}catch{}setLoading(false);},[]);
  useEffect(()=>{load();},[load]);
  const upd=(id:string,k:string,v:string)=>setForms(f=>({...f,[id]:{...f[id],[k]:v}}));
  const save=async(id:string)=>{setSaving(true);setError("");try{await adminApi.patch(`/centers/${id}`,forms[id]);setSaved(id);setTimeout(()=>setSaved(null),2000);setEditing(null);load();}catch(err){setError(getApiError(err));}setSaving(false);};
  if(loading) return <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-orange-500"/></div>;
  return (
    <div className="max-w-5xl space-y-8">
      {error&&<p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>}
      {centers.map((center,i)=>(<motion.div key={center._id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-7 py-5 border-b border-slate-100 flex items-center justify-between"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center"><span className="font-heading font-black text-xl text-white">{center.code}</span></div><div><h2 className="font-heading font-black text-xl text-slate-900">{center.name}</h2><p className="text-slate-500 text-sm">{center.state}</p></div></div>
          <div className="flex items-center gap-3"><span className={`text-xs font-bold px-3 py-1.5 rounded-full ${center.isActive?"bg-green-100 text-green-700":"bg-red-100 text-red-600"}`}>{center.isActive?"Active":"Inactive"}</span>
            {editing===center._id?(<div className="flex gap-2"><button onClick={()=>setEditing(null)} className="text-sm text-slate-500 hover:text-slate-700 font-medium px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors">Cancel</button><button onClick={()=>save(center._id)} disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">{saving?<Loader2 size={14} className="animate-spin"/>:<Save size={14}/>}Save</button></div>):(<button onClick={()=>setEditing(center._id)} className="text-sm font-semibold text-slate-600 hover:text-orange-500 transition-colors px-4 py-2 rounded-xl hover:bg-orange-50">Edit</button>)}
            {saved===center._id&&<span className="flex items-center gap-1.5 text-green-600 text-sm font-medium"><CheckCircle2 size={15}/> Saved</span>}
          </div>
        </div>
        <div className="px-7 py-6 grid lg:grid-cols-2 gap-8">
          <div className="space-y-4"><h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400">Contact Information</h3>
            {editing===center._id?(
              <div className="space-y-4"><div><label className={lbl}>Address</label><textarea rows={2} value={(forms[center._id]?.address??center.address)||""} onChange={e=>upd(center._id,"address",e.target.value)} className={`${inp} resize-none`}/></div><div className="grid grid-cols-2 gap-4"><div><label className={lbl}>Phone</label><input value={(forms[center._id]?.phone??center.phone)||""} onChange={e=>upd(center._id,"phone",e.target.value)} className={inp}/></div><div><label className={lbl}>Email</label><input type="email" value={(forms[center._id]?.email??center.email)||""} onChange={e=>upd(center._id,"email",e.target.value)} className={inp}/></div></div></div>
            ):(
              <div className="space-y-3">{[{icon:MapPin,value:center.address},{icon:Phone,value:center.phone},{icon:Mail,value:center.email}].map(({icon:Icon,value})=>(<div key={value} className="flex items-start gap-3"><div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0"><Icon size={14} className="text-orange-500"/></div><p className="text-slate-600 text-sm pt-1.5">{value}</p></div>))}</div>
            )}
          </div>
          <div><h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">Programs Offered ({center.programs.length})</h3>
            {center.programs.length===0?(<p className="text-slate-400 text-sm">No programs assigned yet.</p>):(
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">{center.programs.map(prog=>(<div key={prog._id} className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm ${prog.isActive?"bg-slate-50":"bg-slate-50 opacity-50"}`}><span className={`font-medium ${prog.isActive?"text-slate-800":"text-slate-400 line-through"}`}>{prog.title}</span><span className="text-xs text-slate-400">{prog.category.split(" ")[0]}</span></div>))}</div>
            )}
          </div>
        </div>
        <div className="px-7 py-4 bg-slate-50 border-t border-slate-100"><div className="flex items-center gap-2"><Building2 size={14} className="text-slate-400"/><span className="text-xs text-slate-500">{center.code} — {center.slug} · {center.programs.length} program{center.programs.length!==1?"s":""} configured</span></div></div>
      </motion.div>))}
    </div>
  );
}
