"use client";

import { motion } from "framer-motion";
import { Handshake, Heart } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section id="cta" className="relative py-28 bg-slate-900 overflow-hidden">
      {/* Animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/30 blur-[100px] pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Secondary orb offset */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/90/20 blur-[80px] pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-8"
        >
          <Heart size={28} className="text-primary fill-primary/30" />
        </motion.div>

        {/* Headline — reveals from center outward */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
        >
          Be Part of Creating Real Impact
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-slate-400 text-lg leading-relaxed mb-10"
        >
          Join our programs, support our mission, or partner with us to create
          opportunities for individuals and communities across Nigeria.
        </motion.p>

        {/* Button with ripple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-lg px-10 py-4 rounded-full transition-colors shadow-xl shadow-primary/30"
          >
            Join a Program
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition gap-2"
            >
              Support Our Mission
              <Heart size={16} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition gap-2"
            >
              Partner With Us
              <Handshake size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm"
        >
          Our programs are designed to be accessible, with support provided to
          selected participants.
        </motion.div>
      </div>
    </section>
  );
}
