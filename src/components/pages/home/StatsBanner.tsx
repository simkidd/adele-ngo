"use client";

import { motion, useInView } from "framer-motion";
import { Building2, MapPin, TrendingUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { icon: Users, value: 12000, suffix: "+", label: "People Trained" },
  { icon: TrendingUp, value: 68, suffix: "%", label: "Employment Rate" },
  { icon: Building2, value: 150, suffix: "+", label: "Partner Organizations" },
  { icon: MapPin, value: 45, suffix: "+", label: "Communities Served" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
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
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsBanner() {
  return (
    <section
      id="stats"
      className="bg-gradient-to-r from-orange-500 to-orange-600 py-16"
    >
      {/* Mobile: horizontal scroll; Desktop: grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="flex md:grid md:grid-cols-4 gap-8 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-4 md:pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-shrink-0 snap-center text-center text-white min-w-[180px] md:min-w-0"
              >
                {/* Floating icon */}
                <motion.div
                  animate={{ y: ["-5px", "5px"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4"
                >
                  <Icon size={22} className="text-white" />
                </motion.div>

                <div className="text-4xl font-heading font-black mb-1">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-orange-100">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
