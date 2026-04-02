"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const stats = [
  { value: 12000, suffix: "+", label: "People Trained" },
  { value: 68, suffix: "%", label: "Employment Rate" },
  { value: 150, suffix: "+", label: "Partner Orgs" },
  { value: 45, suffix: "+", label: "Communities Served" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const startTime = useRef<number | null>(null);
  const duration = 2000;

  useEffect(() => {
    if (!inView) return;
    startTime.current = null;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      <span className="text-2xl font-heading font-bold text-white">
        {count.toLocaleString()}
        {suffix}
      </span>
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 80) {
      mouseX.set(dx * 0.4);
      mouseY.set(dy * 0.4);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-dvh flex items-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, willChange: "transform" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&q=80"
          alt="Community empowerment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/80 via-slate-900/60 to-slate-900/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Changing Lives Since 2015
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.05] mb-6"
          >
            Empowering Communities Through{" "}
            <span className="text-primary italic">Skills</span> &amp;
            Opportunity
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl"
          >
            We provide training, mentorship, and resources to help individuals
            build sustainable futures and transform their communities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Magnetic Donate Button */}
            <motion.div
              style={{ x: springX, y: springY, willChange: "transform" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/programs"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-colors shadow-lg shadow-primary/30"
              >
                Apply Now
              </Link>
            </motion.div>

            {/* Programs button */}
            <motion.a
              href="#programs"
              className="group flex items-center gap-2 text-white/90 hover:text-white font-semibold px-7 py-3.5 rounded-full transition-all bg-white/10 backdrop-blur-sm hover:bg-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Our Programs
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>

          {/* Inline stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/20"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <Counter target={s.value} suffix={s.suffix} />
                <div className="text-sm text-white/60 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
