"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I went from uncertain to employed — and now I mentor others. The training changed my life and gave me the confidence to pursue my dreams.",
    name: "Ama Mensah",
    role: "Digital Literacy Graduate",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
  },
  {
    quote:
      "The training gave me skills I use every day in my business. I started small, but now I employ three people in my community.",
    name: "Kwame Asante",
    role: "Entrepreneurship Graduate",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  },
  {
    quote:
      "I found not just a job, but a career path I'm passionate about. The mentorship and support made all the difference.",
    name: "Abena Osei",
    role: "Culinary Arts Graduate",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            Hear from those whose lives have been transformed by our programs.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Decorative quote mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.2 }}
                className="text-orange-200 mb-4"
              >
                <Quote size={40} className="fill-primary/20 stroke-primary/30" />
              </motion.div>

              {/* Quote text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3 }}
                className="text-slate-700 leading-relaxed text-sm mb-6"
              >
                &ldquo;{t.quote}&rdquo;
              </motion.p>

              {/* Avatar + info */}
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: i * 0.15 + 0.35,
                  }}
                  className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
                >
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </motion.div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-primary text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
