"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Lightbulb, Heart, Globe } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    title: "Skills Development",
    description:
      "We provide practical digital and vocational training that equips individuals with in-demand skills for employment, freelancing, and entrepreneurship.",
    icon: Lightbulb,
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  },
  {
    title: "Mentorship & Support",
    description:
      "Through mentorship, guidance, and access to resources, we support individuals in overcoming challenges and building confidence to succeed.",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80",
  },
  {
    title: "Access to Opportunities",
    description:
      "We connect participants to job opportunities, funding, and networks that open doors to sustainable income and long-term growth.",
    icon: Globe,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
  },
];

function ProgramCard({
  program,
  index,
}: {
  program: (typeof programs)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
  const Icon = program.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        willChange: "transform",
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image with clip-path reveal */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={inView ? { clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{
              duration: 0.8,
              delay: index * 0.15 + 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="h-full"
          >
            <Image
              src={program.image}
              alt={`${program.title} program by Adele Empowerment Foundation`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* Icon */}
        <div className="px-6 -mt-6 mb-4 relative z-10">
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Icon size={20} className="text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
            {program.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {program.description}
          </p>
          <Link
            href="/programs"
            className="group/link inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all"
          >
            Learn More
            <ArrowRight
              size={14}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm tracking-widest uppercase mb-3"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Programs That Create Real Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-xl mx-auto"
          >
            We design programs that equip individuals with practical skills,
            ongoing support, and access to real opportunities — creating lasting
            change in their lives and communities.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <ProgramCard key={program.title} program={program} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
