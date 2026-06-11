"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useApplicantStore } from "@/stores/applicant.store";
import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { applicantApi } from "@/lib/api/applicant.api";
import { getApiError } from "@/lib/axios";

export default function ApplicantLogin() {
  const router = useRouter();
  const { setApplicant } = useApplicantStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: applicantApi.loginApplicant,
    onSuccess: (res) => {
      setApplicant(res.data.applicant);
      router.push("/applicant/dashboard");
    },
    onError: (err) => {
      throw new Error(getApiError(err));
    },
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    loginMutation.mutate(
      { email, password },
      {
        onError: (err) => {
          setError(getApiError(err));
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="flex flex-col items-center mb-8">
        <Link href="/">
          <div
            className={cn(
              "flex items-center justify-center gap-2 p-3 rounded-full bg-white w-fit mb-4 cursor-pointer",
            )}
          >
            <Logo className="h-14 w-14" />
          </div>
        </Link>

        <h1 className="font-heading text-3xl font-black text-slate-900">
          Welcome Back
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Sign in to your applicant dashboard
        </p>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5 text-center"
          >
            {error}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={loginMutation.isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary hover:bg-primary/80 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          New applicant? Applications open only during active cohorts.
        </div>
      </div>
    </motion.div>
  );
}
