"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
export default function ApplySuccess(){
  const params=useSearchParams();const ref=params.get("ref")??"AEF-PH-2025-000001";
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.5}} className="max-w-lg w-full text-center">
        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:200,damping:15,delay:0.15}} className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} className="text-green-500"/></motion.div>
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.25}} className="font-heading text-4xl font-black text-slate-900 mb-3">Application Submitted!</motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.35}} className="text-slate-500 leading-relaxed mb-8">Thank you for applying. Your application is now under review and we will update you within 3-5 business days.</motion.p>
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.45}} className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-8"><p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Your Reference Number</p><p className="font-mono text-2xl font-black text-orange-500">{ref}</p><p className="text-xs text-slate-400 mt-2">Save this for future reference.</p></motion.div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.55}} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full transition-all">Go to Dashboard <ArrowRight size={16}/></Link>
          <Link href="/" className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-orange-300 text-slate-700 font-semibold px-7 py-3.5 rounded-full transition-all">Back to Home</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
