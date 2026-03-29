"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
  label: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export default function PageHero({
  label,
  title,
  titleAccent,
  subtitle,
  image,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="relative lg:h-[55vh] pt-40 flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-orange-400 font-semibold text-sm tracking-widest uppercase mb-4"
        >
          {label}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-5xl md:text-6xl font-black text-white leading-tight mb-4"
        >
          {title}{" "}
          {titleAccent && (
            <span className="text-orange-400 italic">{titleAccent}</span>
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/70 text-lg max-w-2xl"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
