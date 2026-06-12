"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { applicantApiInstance as applicantApi } from "@/lib/axios";
import { Award, Download, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CertificatePage() {
  const [cert, setCert] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicantApi
      .get("/applicant/certificate")
      .then(({ data }) => setCert(data.data.certificate))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-orange-500" />
      </div>
    );

  if (!cert)
    return (
      <div className="max-w-2xl">
        <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
          <Award size={40} className="text-slate-300 mx-auto mb-4" />
          <h2 className="font-heading font-black text-xl text-slate-900 mb-2">
            No Certificate Yet
          </h2>
          <p className="text-slate-500 text-sm">
            Certificates are issued upon successful completion of your training
            program.
          </p>
        </div>
      </div>
    );

  const verifyUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/verify/${cert.certId}`;

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-3 border border-orange-500/20 rounded-xl pointer-events-none" />
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="font-heading font-black text-xl text-white">
              A
            </span>
          </div>
          <p className="text-orange-400 text-xs font-semibold tracking-widest uppercase">
            Adele Empowerment Foundation
          </p>
          <h2 className="font-heading text-2xl font-black text-white mt-1">
            Certificate of Completion
          </h2>
        </div>
        <div className="text-center mb-6">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">
            Awarded to
          </p>
          <p className="font-heading text-3xl font-black text-orange-400">
            {cert.graduateName as string}
          </p>
          <p className="text-slate-400 text-sm mt-2">
            for successfully completing
          </p>
          <p className="font-heading text-xl font-black text-white mt-1">
            {cert.programTitle as string}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-orange-500/20 pt-4">
          <div>
            <p className="text-slate-500 text-xs">Certificate ID</p>
            <p className="font-mono text-orange-400 text-sm font-bold">
              {cert.certId as string}
            </p>
          </div>

          {cert.qrCodeUrl && (
            <img
              src={cert.qrCodeUrl as string}
              alt="QR"
              className="w-14 h-14 bg-white p-1 rounded-lg"
            />
          )}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-2 gap-4"
      >
        <a
          href={cert.pdfUrl as string}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors"
        >
          <Download size={18} /> Download PDF
        </a>
        <Link
          href={verifyUrl}
          target="_blank"
          className="flex items-center justify-center gap-2 border border-slate-200 hover:border-orange-300 text-slate-700 font-bold py-3.5 rounded-xl transition-colors"
        >
          <ExternalLink size={18} /> Verify Online
        </Link>
      </motion.div>
    </div>
  );
}
