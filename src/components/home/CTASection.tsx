"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShieldCheck } from "lucide-react";

export default function CTASection() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);
  };

  return (
    <section id="cta" className="relative py-28 bg-slate-900 overflow-hidden">
      {/* Animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/30 blur-[100px] pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Secondary orb offset */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-orange-600/20 blur-[80px] pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-8"
        >
          <Heart size={28} className="text-orange-400 fill-orange-400/30" />
        </motion.div>

        {/* Headline — reveals from center outward */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
        >
          Make an Impact Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-slate-400 text-lg leading-relaxed mb-10"
        >
          Your support funds training, mentorship, and job connections where they&apos;re
          needed most — transforming individuals and entire communities.
        </motion.p>

        {/* Button with ripple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <button
            onClick={handleClick}
            className="relative overflow-hidden bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full transition-colors shadow-xl shadow-orange-500/30 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <span className="relative z-10">Donate Now</span>
            <AnimatePresence>
              {ripples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute w-12 h-12 bg-white/30 rounded-full pointer-events-none"
                  style={{
                    left: ripple.x - 24,
                    top: ripple.y - 24,
                  }}
                />
              ))}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm"
        >
          <ShieldCheck size={16} className="text-slate-400" />
          All donations are tax-deductible. 100% of funds go directly to our programs.
        </motion.div>
      </div>
    </section>
  );
}
