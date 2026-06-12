"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { applicantApiInstance as applicantApi, getApiError } from "@/lib/axios";
import { useApplicantStore } from "@/stores/applicant.store";
import { CheckCircle2, Save, Eye, EyeOff, Upload, Loader2 } from "lucide-react";

const inp =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition";
const lbl =
  "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

export default function ProfilePage() {
  const { applicant, setApplicant } = useApplicantStore();
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [phone, setPhone] = useState(applicant?.phone ?? "");
  const [address, setAddress] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(
    applicant?.passportPhoto ?? "",
  );
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confPw, setConfPw] = useState("");

  const saveSection = async (section: string) => {
    setLoading(true);
    setError("");
    setSaved(null);
    try {
      if (section === "profile") {
        const { data } = await applicantApi.patch("/applicant/me", {
          phone,
          address,
        });
        setApplicant({ ...applicant!, ...data.data });
      } else {
        if (newPw !== confPw) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        await applicantApi.patch("/applicant/me/password", {
          currentPassword: curPw,
          newPassword: newPw,
          confirmPassword: confPw,
        });
        setCurPw("");
        setNewPw("");
        setConfPw("");
      }
      setSaved(section);
      setTimeout(() => setSaved(null), 2500);
    } catch (err) {
      setError(getApiError(err));
    }
    setLoading(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    setPhotoPreview(URL.createObjectURL(file));
    const form = new FormData();
    form.append("passportPhoto", file);
    try {
      const { data } = await applicantApi.post(
        "/applicant/upload/passport",
        form,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      await applicantApi.patch("/applicant/me", {
        passportPhoto: data.data.url,
      });
      setApplicant({ ...applicant!, passportPhoto: data.data.url });
    } catch (err) {
      setError(getApiError(err));
    }
    setPhotoUploading(false);
  };

  if (!applicant) return null;

  return (
    <div className="max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-100 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="font-heading font-black text-lg text-slate-900">
            Personal Information
          </h2>
        </div>
        <div className="px-6 py-6 space-y-5">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                    No photo
                  </div>
                )}
              </div>
              {photoUploading && (
                <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                  <Loader2 size={16} className="animate-spin text-orange-500" />
                </div>
              )}
            </div>
            <div>
              <label className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                <Upload size={15} /> Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-slate-400 mt-1">JPG/PNG, max 5MB.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ["Full Name", applicant.fullName],
              ["Email", applicant.email],
            ].map(([k, v]) => (
              <div key={k}>
                <label className={lbl}>{k}</label>
                <input
                  value={v}
                  readOnly
                  className={inp + " bg-slate-100 cursor-not-allowed"}
                />
              </div>
            ))}
          </div>
          <div>
            <label className={lbl}>Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Current Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inp + " resize-none"}
            />
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-sm text-green-700 font-medium">
              NIN Verified
            </span>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <AnimatePresence>
            {saved === "profile" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-green-600 text-sm font-medium"
              >
                <CheckCircle2 size={15} /> Saved
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => saveSection("profile")}
            disabled={loading}
            className="ml-auto flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Save size={15} /> Save Changes
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-white border border-slate-100 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="font-heading font-black text-lg text-slate-900">
            Change Password
          </h2>
        </div>
        <div className="px-6 py-6 space-y-4">
          <div>
            <label className={lbl}>Current Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={curPw}
                onChange={(e) => setCurPw(e.target.value)}
                className={inp + " pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>New Password</label>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className={inp}
              />
            </div>
            <div>
              <label className={lbl}>Confirm New</label>
              <input
                type="password"
                value={confPw}
                onChange={(e) => setConfPw(e.target.value)}
                className={inp}
              />
              {confPw && newPw !== confPw && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <AnimatePresence>
            {saved === "password" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-green-600 text-sm font-medium"
              >
                <CheckCircle2 size={15} /> Password changed
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => saveSection("password")}
            disabled={loading || !curPw || !newPw || newPw !== confPw}
            className="ml-auto flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Save size={15} /> Update Password
          </button>
        </div>
      </motion.div>
    </div>
  );
}
