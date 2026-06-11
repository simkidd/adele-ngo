"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "../shared/Logo";
import { useAdminStore } from "@/stores/admin.store";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin.api";
import { getApiError, setAdminToken } from "@/lib/axios";

export function LoginGate() {
  const router = useRouter();
  const setUser = useAdminStore((s) => s.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: adminApi.adminLogin,
    onSuccess: (res) => {
      setUser(res.data.user);
      setAdminToken(res.data.accessToken);
      router.push("/admin/dashboard");
      router.refresh();
    },
  });

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
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
          <h1 className="font-heading text-2xl font-black text-white">Admin</h1>
          <p className="text-slate-500 text-sm mt-1">
            Sign in to access the dashboard
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full bg-slate-900 border ${error ? "border-red-500" : "border-slate-700"} rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary pr-12 transition`}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={loginMutation.isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3.5 rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
