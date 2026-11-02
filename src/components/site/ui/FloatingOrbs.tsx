"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Ambient floating gold orbs for section backgrounds.
 * Performance-optimized: lighter blur (60px vs 100px), fewer orbs by default,
 * and uses transform-only animations (GPU-accelerated, no layout thrash).
 */
interface FloatingOrbsProps {
  className?: string;
  /** number of orbs, default 2 (was 3, reduced for perf) */
  count?: 1 | 2 | 3;
}

const CONFIGS = [
  {
    initialX: "5%",
    initialY: "10%",
    size: "h-64 w-64",
    duration: 18,
    delay: 0,
    opacity: 0.05,
  },
  {
    initialX: "70%",
    initialY: "40%",
    size: "h-72 w-72",
    duration: 22,
    delay: 2,
    opacity: 0.04,
  },
  {
    initialX: "30%",
    initialY: "70%",
    size: "h-56 w-56",
    duration: 20,
    delay: 4,
    opacity: 0.04,
  },
];

export function FloatingOrbs({ className, count = 2 }: FloatingOrbsProps) {
  const configs = CONFIGS.slice(0, count);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {configs.map((c, i) => (
        <motion.div
          key={i}
          className={cn("absolute rounded-full bg-gold blur-[60px]", c.size)}
          style={{
            left: c.initialX,
            top: c.initialY,
            opacity: c.opacity,
            willChange: "transform, opacity",
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
