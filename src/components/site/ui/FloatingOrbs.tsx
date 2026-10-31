"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated floating gold orbs for section backgrounds.
 * Renders 3 orbs with slow drift animations, creating a premium ambient effect.
 * Purely decorative: pointer-events-none, aria-hidden.
 */
interface FloatingOrbsProps {
  className?: string;
  /** number of orbs, default 3 */
  count?: 3;
}

export function FloatingOrbs({ className, count = 3 }: FloatingOrbsProps) {
  const configs = [
    {
      initialX: "5%",
      initialY: "10%",
      size: "h-72 w-72",
      duration: 14,
      delay: 0,
      opacity: 0.06,
    },
    {
      initialX: "70%",
      initialY: "40%",
      size: "h-96 w-96",
      duration: 18,
      delay: 2,
      opacity: 0.04,
    },
    {
      initialX: "30%",
      initialY: "70%",
      size: "h-64 w-64",
      duration: 16,
      delay: 4,
      opacity: 0.05,
    },
  ].slice(0, count);

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
          className={cn("absolute rounded-full bg-gold blur-[100px]", c.size)}
          style={{
            left: c.initialX,
            top: c.initialY,
            opacity: c.opacity,
          }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
