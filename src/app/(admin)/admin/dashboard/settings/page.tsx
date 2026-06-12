"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import { adminApiInstance, getApiError } from "@/lib/axios";
import { useAdminStore } from "@/stores/admin.store";

const inp =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition";
const lbl =
  "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

export default function AdminSettingsPage() {
  const { user } = useAdminStore();
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [profile, setProfile] = useState({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    newRegistration: true,
    newSubmission: true,
    newRsvp: false,
    weeklyDigest: true,
  });

  const saveSection = async (section: string) => {
    setLoading(true);
    setError("");
    setSaved(null);
    try {
      if (section === "profile") {
        await adminApiInstance.patch("/auth/me", {
          fullName: profile.fullName,
          email: profile.email,
        });
      } else if (section === "password") {
        if (passwords.newPassword !== passwords.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        await adminApiInstance.patch("/auth/me/password", passwords);
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
      setSaved(section);
      setTimeout(() => setSaved(null), 2500);
    } catch (err) {
      setError(getApiError(err));
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl space-y-8">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl"
        >
          {error}
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <div className="px-7 py-5 border-b border-slate-100">
          <h2 className="font-heading font-black text-lg text-slate-900">
            Admin Profile
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Update your account name and email
          </p>
        </div>
        <div className="px-7 py-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={lbl}>Full Name</label>
              <input
                value={profile.fullName}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, fullName: e.target.value }))
                }
                className={inp}
              />
            </div>
            <div>
              <label className={lbl}>Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, email: e.target.value }))
                }
                className={inp}
              />
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xs font-bold">
                  {user.fullName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {user.fullName}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {user.role.replace("_", " ")}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="px-7 py-4 border-t border-slate-100 flex items-center justify-between">
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
            {saved !== "profile" && <span />}
          </AnimatePresence>
          <button
            onClick={() => saveSection("profile")}
            disabled={loading}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}{" "}
            Save Profile
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <div className="px-7 py-5 border-b border-slate-100">
          <h2 className="font-heading font-black text-lg text-slate-900">
            Change Password
          </h2>
        </div>
        <div className="px-7 py-6 space-y-5">
          <div>
            <label className={lbl}>Current Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords((p) => ({
                    ...p,
                    currentPassword: e.target.value,
                  }))
                }
                placeholder="••••••••"
                className={`${inp} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={lbl}>New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, newPassword: e.target.value }))
                  }
                  placeholder="Min 8 characters"
                  className={`${inp} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className={lbl}>Confirm New</label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords((p) => ({
                    ...p,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Repeat password"
                className={inp}
              />
              {passwords.newPassword &&
                passwords.confirmPassword &&
                passwords.newPassword !== passwords.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>
          </div>
        </div>
        <div className="px-7 py-4 border-t border-slate-100 flex items-center justify-between">
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
            {saved !== "password" && <span />}
          </AnimatePresence>
          <button
            onClick={() => saveSection("password")}
            disabled={
              loading ||
              !passwords.currentPassword ||
              !passwords.newPassword ||
              passwords.newPassword !== passwords.confirmPassword
            }
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}{" "}
            Update Password
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <div className="px-7 py-5 border-b border-slate-100">
          <h2 className="font-heading font-black text-lg text-slate-900">
            Notification Preferences
          </h2>
        </div>
        <div className="px-7 py-6 space-y-4">
          {(
            [
              ["newRegistration", "New program registration submitted"],
              ["newSubmission", "New contact form submission"],
              ["newRsvp", "New event RSVP received"],
              ["weeklyDigest", "Weekly activity digest"],
            ] as const
          ).map(([key, desc]) => (
            <label
              key={key}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                {desc}
              </span>
              <button
                role="switch"
                aria-checked={notifications[key]}
                onClick={() =>
                  setNotifications((n) => ({ ...n, [key]: !n[key] }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${notifications[key] ? "bg-orange-500" : "bg-slate-200"}`}
              >
                <motion.span
                  layout
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{
                    left: notifications[key] ? "calc(100% - 22px)" : "2px",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </label>
          ))}
        </div>
        <div className="px-7 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              setSaved("notifications");
              setTimeout(() => setSaved(null), 2500);
            }}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Save size={14} /> Save Preferences
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="bg-slate-900 rounded-2xl p-6"
      >
        <h2 className="font-heading font-black text-lg text-white mb-4">
          System Information
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            [
              "API URL",
              process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
            ],
            ["Version", "1.0.0"],
            ["Environment", process.env.NODE_ENV ?? "development"],
            ["Admin Role", user?.role?.replace("_", " ") ?? "—"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">
                {k}
              </p>
              <p className="text-sm font-mono text-slate-300">{v}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
