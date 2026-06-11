"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Loader2, UserX, Eye, EyeOff } from "lucide-react";
import { adminApi, getApiError } from "@/lib/api";
import { useAdminStore } from "@/store/adminStore";
interface AdminUser{_id:string;fullName:string;email:string;role:string;isActive:boolean;lastLogin?:string;centerId?:{name:string};}
interface Center{_id:string;name:string;code:string;}
const roleColors:Record<string,string>={super_admin:"bg-red-100 text-red-700",program_officer:"bg-blue-100 text-blue-700",blog_editor:"bg-purple-100 text-purple-700"};
const inp="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition";
export default function AdminUsersPage(){
  const{user:currentUser}=useAdminStore();
  const[users,setUsers]=useState<AdminUser[]>([]);const[centers,setCenters]=useState<Center[]>([]);const[loading,setLoading]=useState(true);const[showNew,setShowNew]=useState(false);const[saving,setSaving]=useState(false);const[error,setError]=useState("");const[showPw,setShowPw]=useState(false);
  const[form,setForm]=useState({fullName:"",email:"",password:"",role:"program_officer",centerId:""});
  const upd=(k:string,v:string)=>setForm(f=>({...f,[k]:v}));
  const load=useCallback(async()=>{try{const[uRes,cRes]=await Promise.all([adminApi.get("/auth/users"),adminApi.get("/centers")]);setUsers(uRes.data.data);setCenters(cRes.data.data);}catch{}setLoading(false);},[]);
  useEffect(()=>{load();},[load]);
  const save=async()=>{setSaving(true);setError("");try{await adminApi.post("/auth/users",form);setShowNew(false);setForm({fullName:"",email:"",password:"",role:"program_officer",centerId:""});load();}catch(err){setError(getApiError(err));}setSaving(false);};
  const deactivate=async(id:string)=>{if(!confirm("Deactivate this admin user?")) return;try{await adminApi.delete(`/auth/users/${id}`);load();}catch(err){alert(getApiError(err));}};
  const canManage=currentUser?.role==="super_admin";
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between"><p className="text-slate-500 text-sm">{users.length} admin account{users.length!==1?"s":""}</p>{canManage&&<button onClick={()=>setShowNew(true)} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"><Plus size={16}/> New Admin User</button>}</div>
      {loading?(<div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-orange-500"/></div>):(
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 border-b border-slate-100"><tr>{["Name","Role","Center","Last Login","Status","Actions"].map(h=>(<th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>))}</tr></thead>
          <tbody className="divide-y divide-slate-50">{users.map((u,i)=>(<motion.tr key={u._id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.05}} className={`hover:bg-slate-50/50 transition-colors ${!u.isActive?"opacity-50":""}`}>
            <td className="px-5 py-4"><p className="font-semibold text-slate-900">{u.fullName}</p><p className="text-xs text-slate-400">{u.email}</p></td>
            <td className="px-5 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${roleColors[u.role]}`}>{u.role.replace("_"," ")}</span></td>
            <td className="px-5 py-4 text-slate-600 text-sm">{u.centerId?.name?.replace(" Training Center","")??"—"}</td>
            <td className="px-5 py-4 text-slate-500 text-xs">{u.lastLogin?new Date(u.lastLogin).toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"}):"Never"}</td>
            <td className="px-5 py-4"><span className={`text-xs font-semibold ${u.isActive?"text-green-600":"text-red-500"}`}>{u.isActive?"Active":"Inactive"}</span></td>
            <td className="px-5 py-4">{canManage&&u._id!==currentUser?._id&&u.isActive?(<button onClick={()=>deactivate(u._id)} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors" title="Deactivate"><UserX size={14}/></button>):u._id===currentUser?._id?<span className="text-xs text-slate-400 italic">You</span>:null}</td>
          </motion.tr>))}</tbody>
        </table></div></div>
      )}
      <AnimatePresence>{showNew&&(<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"><motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}} className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100"><h2 className="font-heading font-black text-xl text-slate-900">New Admin User</h2><button onClick={()=>setShowNew(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X size={18}/></button></div>
        <div className="px-7 py-6 space-y-5">
          {error&&<p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>}
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name *</label><input value={form.fullName} onChange={e=>upd("fullName",e.target.value)} className={inp}/></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email *</label><input type="email" value={form.email} onChange={e=>upd("email",e.target.value)} className={inp}/></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password *</label><div className="relative"><input type={showPw?"text":"password"} value={form.password} onChange={e=>upd("password",e.target.value)} placeholder="Min 8 characters" className={`${inp} pr-10`}/><button type="button" onClick={()=>setShowPw(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{showPw?<EyeOff size={15}/>:<Eye size={15}/>}</button></div></div>
          <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Role *</label><select value={form.role} onChange={e=>upd("role",e.target.value)} className={inp}><option value="super_admin">Super Admin</option><option value="program_officer">Program Officer</option><option value="blog_editor">Blog Editor</option></select></div>
          {form.role==="program_officer"&&(<div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Assigned Center *</label><select value={form.centerId} onChange={e=>upd("centerId",e.target.value)} className={inp}><option value="">Select center</option>{centers.map(c=><option key={c._id} value={c._id}>{c.code} — {c.name.replace(" Training Center","")}</option>)}</select></div>)}
        </div>
        <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-slate-100"><button onClick={()=>setShowNew(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">Cancel</button><button onClick={save} disabled={saving||!form.fullName||!form.email||!form.password} className="px-6 py-2.5 rounded-xl bg-orange-500 disabled:opacity-40 hover:bg-orange-600 text-white font-bold text-sm flex items-center gap-2 transition-colors">{saving?<><Loader2 size={14} className="animate-spin"/>Creating...</>:"Create User"}</button></div>
      </motion.div></motion.div>)}</AnimatePresence>
    </div>
  );
}
