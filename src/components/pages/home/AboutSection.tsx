"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const checklist = [
  "Practical, hands-on training programs",
  "Personalized mentorship and support",
  "Direct connections to employers",
  "Ongoing community engagement",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const checklistInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT — Image with parallax & clip-path reveal */}
          <div ref={imageRef} className="relative h-[500px] rounded-2xl overflow-hidden">
            <motion.div
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ y: imageY, willChange: "transform" }}
              className="absolute inset-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
                alt="Training in progress"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
          </div>

          {/* RIGHT — Content */}
          <div className="lg:pl-8">
            {/* Label with animated left border */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="h-5 bg-primary rounded-full flex-shrink-0"
              />
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                Our Mission
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6"
            >
              Building Brighter Futures Together
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 leading-relaxed mb-3"
            >
              Since 2015, Adele Empowerment Foundation has been dedicated to transforming lives
              through education and skills development. We believe everyone deserves access to
              opportunities that help them thrive.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-600 leading-relaxed mb-8"
            >
              Our approach combines practical training with personalized support, ensuring each
              individual has the tools they need to succeed in their chosen path.
            </motion.p>

            {/* Checklist */}
            <ul className="space-y-4">
              {checklist.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={checklistInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={checklistInView ? { scale: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.4 + i * 0.1,
                    }}
                  >
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                  </motion.div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
