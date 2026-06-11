"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Plus, X, QrCode, Download, Search } from "lucide-react";
import { SEED_CERTIFICATES, SEED_REGISTRATIONS, PROGRAMS_DATA, type Certificate } from "@/lib/store";

function QRPlaceholder({ value }: { value: string }) {
  // Visual QR code simulation using a grid pattern
  const size = 11;
  const seed = value.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = Array.from({length: size * size}, (_, i) => {
    // Always-dark finder patterns (corners)
    const row = Math.floor(i / size), col = i % size;
    if ((row < 3 && col < 3) || (row < 3 && col >= size-3) || (row >= size-3 && col < 3)) return true;
    return ((seed * (i + 1) * 2654435769) >>> 0) % 3 === 0;
  });
  return (
    <div className="inline-grid bg-white p-2 rounded-lg border border-slate-200" style={{gridTemplateColumns:`repeat(${size},1fr)`,gap:1.5}}>
      {cells.map((dark, i) => (
        <div key={i} style={{width:6,height:6,background:dark?"#1e293b":"transparent",borderRadius:1}}/>
      ))}
    </div>
  );
}

function CertPreview({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const verifyUrl = `${typeof window !== "undefined" ? window.location.origin : "https://adelefoundation.org"}/verify/${cert.certId}`;
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}}
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl" onClick={e=>e.stopPropagation()}>
        {/* Certificate */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10">
          {/* Decorative border */}
          <div className="absolute inset-3 border border-orange-500/30 rounded-2xl pointer-events-none"/>
          <div className="absolute inset-4 border border-orange-500/10 rounded-xl pointer-events-none"/>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="font-heading font-black text-xl text-white">A</span>
            </div>
            <p className="text-orange-400 text-xs font-semibold tracking-widest uppercase mb-1">Adele Empowerment Foundation</p>
            <h2 className="font-heading text-3xl font-black text-white">Certificate of Completion</h2>
          </div>

          <p className="text-slate-400 text-center text-sm mb-2">This certifies that</p>
          <p className="font-heading text-4xl font-black text-orange-400 text-center mb-2">{cert.graduateName}</p>
          <p className="text-slate-400 text-center text-sm mb-1">has successfully completed the</p>
          <p className="font-heading text-2xl font-black text-white text-center mb-1">{cert.programTitle}</p>
          <p className="text-slate-400 text-center text-sm mb-6">{cert.cohortName}</p>

          <div className="flex items-end justify-between">
            <div>
              <div className="w-32 h-px bg-orange-500/40 mb-1"/>
              <p className="text-slate-500 text-xs">Authorised Signature</p>
              <p className="text-white text-sm font-semibold mt-0.5">Dr. Adwoa Sarpong</p>
              <p className="text-slate-500 text-xs">Executive Director</p>
            </div>
            <div className="text-center">
              <QRPlaceholder value={verifyUrl}/>
              <p className="text-slate-500 text-xs mt-1.5">Scan to verify</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs mb-1">Certificate ID</p>
              <p className="font-mono text-orange-400 text-sm font-bold">{cert.certId}</p>
              <p className="text-slate-500 text-xs mt-1">Issued {new Date(cert.issueDate).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">Verify at: <span className="font-mono text-orange-500 text-xs">{verifyUrl}</span></p>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-orange-500 transition-colors px-4 py-2 rounded-xl hover:bg-orange-50">
              <Download size={15}/> Download PDF
            </button>
            <button onClick={onClose} className="px-5 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">Close</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CertificationsPage() {
  const [certs,    setCerts]   = useState<Certificate[]>(SEED_CERTIFICATES);
  const [preview,  setPreview] = useState<Certificate|null>(null);
  const [search,   setSearch]  = useState("");
  const [showIssue,setShowIssue]=useState(false);
  const [selReg,   setSelReg]  = useState("");

  const enrolledRegs = SEED_REGISTRATIONS.filter(r => r.status === "Enrolled" && !certs.find(c => c.graduateName === r.name && c.programTitle === r.programTitle));

  const issueCert = () => {
    const reg = SEED_REGISTRATIONS.find(r => r.id === selReg);
    if (!reg) return;
    const progCode = reg.programId.split("-").map(w=>w[0].toUpperCase()).join("");
    const certId = `AEF-${new Date().getFullYear()}-${progCode}-${String(certs.length+1).padStart(5,"0")}`;
    const cert: Certificate = {
      id: `cert-${Date.now()}`, certId, graduateName: reg.name,
      programTitle: reg.programTitle, programId: reg.programId,
      cohortName: reg.cohortId ?? "Independent", issueDate: new Date().toISOString().split("T")[0],
      cohortId: reg.cohortId ?? "",
    };
    setCerts(prev => [cert, ...prev]);
    setShowIssue(false); setSelReg("");
  };

  const filtered = certs.filter(c =>
    c.graduateName.toLowerCase().includes(search.toLowerCase()) ||
    c.certId.toLowerCase().includes(search.toLowerCase()) ||
    c.programTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, cert ID..." className="pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 w-64 transition"/>
        </div>
        <button onClick={()=>setShowIssue(true)} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          <Plus size={16}/> Issue Certificate
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Graduate","Program","Cohort","Cert ID","Issued","Actions"].map(h=>(
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((cert, i)=>(
                <motion.tr key={cert.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}
                  className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-900">{cert.graduateName}</td>
                  <td className="px-5 py-4 text-slate-600">{cert.programTitle}</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">{cert.cohortName}</td>
                  <td className="px-5 py-4"><span className="font-mono text-xs text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg">{cert.certId}</span></td>
                  <td className="px-5 py-4 text-slate-500">{new Date(cert.issueDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={()=>setPreview(cert)} className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 hover:bg-orange-100 hover:text-orange-600 px-3 py-1.5 rounded-lg transition-colors">
                        <QrCode size={13}/> Preview
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length===0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400">No certificates found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue cert modal */}
      <AnimatePresence>
        {showIssue && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl" onClick={e=>e.stopPropagation()}>
              <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                <h2 className="font-heading font-black text-xl text-slate-900">Issue Certificate</h2>
                <button onClick={()=>setShowIssue(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X size={18}/></button>
              </div>
              <div className="px-7 py-6">
                <p className="text-slate-500 text-sm mb-5">Select an enrolled participant to issue a certificate.</p>
                {enrolledRegs.length === 0 ? (
                  <div className="text-center py-6">
                    <Award size={32} className="text-slate-300 mx-auto mb-3"/>
                    <p className="text-slate-400 text-sm">No enrolled participants awaiting certificates.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {enrolledRegs.map(reg=>(
                      <button key={reg.id} onClick={()=>setSelReg(reg.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${selReg===reg.id?"border-orange-500 bg-orange-50":"border-slate-100 hover:border-orange-200"}`}>
                        <div className="text-left">
                          <p className="font-semibold text-slate-900 text-sm">{reg.name}</p>
                          <p className="text-xs text-slate-400">{reg.programTitle}</p>
                        </div>
                        {selReg===reg.id && <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"><span className="text-white text-xs">✓</span></div>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-slate-100">
                <button onClick={()=>setShowIssue(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">Cancel</button>
                <button onClick={issueCert} disabled={!selReg}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 disabled:opacity-40 hover:bg-orange-600 text-white font-bold text-sm transition-colors">
                  Issue Certificate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate preview */}
      <AnimatePresence>
        {preview && <CertPreview cert={preview} onClose={()=>setPreview(null)}/>}
      </AnimatePresence>
    </div>
  );
}
