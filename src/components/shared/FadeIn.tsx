"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
}

const getInitial = (direction: Direction) => {
  switch (direction) {
    case "up":
      return { y: 40, opacity: 0 };
    case "down":
      return { y: -40, opacity: 0 };
    case "left":
      return { x: 40, opacity: 0 };
    case "right":
      return { x: -40, opacity: 0 };
  }
};

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={getInitial(direction)}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
