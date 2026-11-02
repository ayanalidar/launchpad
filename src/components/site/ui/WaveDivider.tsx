"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface WaveDividerProps {
  /** "up" = wave pointing up, "down" = wave pointing down */
  direction?: "up" | "down";
  /** Color of the wave fill, defaults to card background */
  fillClass?: string;
  className?: string;
}

/**
 * Animated SVG wave divider that flows continuously.
 * - Two layered paths with subtle parallax for depth
 * - 8s horizontal scroll animation
 * - Static (no animation) for reduced-motion users
 */
export function WaveDivider({
  direction = "down",
  fillClass = "fill-card",
  className,
}: WaveDividerProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden leading-none",
        direction === "up" ? "rotate-180" : "",
        className
      )}
      style={{ height: "60px" }}
      aria-hidden="true"
    >
      {/* Back wave (slower, dimmer) */}
      <motion.svg
        className={cn("absolute inset-x-0 bottom-0 h-full w-[200%]", fillClass, "opacity-30")}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        animate={reduced ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z M1440,30 C1680,60 1920,0 2160,30 C2400,60 2640,0 2880,30 L2880,60 L1440,60 Z"
        />
      </motion.svg>

      {/* Front wave (faster, brighter) */}
      <motion.svg
        className={cn("absolute inset-x-0 bottom-0 h-full w-[200%]", fillClass, "opacity-80")}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        animate={reduced ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,40 C180,20 360,50 540,35 C720,20 900,55 1080,40 C1260,25 1440,45 1440,45 L1440,60 L0,60 Z M1440,40 C1620,20 1800,50 1980,35 C2160,20 2340,55 2520,40 C2700,25 2880,45 2880,45 L2880,60 L1440,60 Z"
        />
      </motion.svg>

      {/* Top gold shimmer line */}
      <div className="absolute top-0 inset-x-0 h-px gold-line opacity-50" />
    </div>
  );
}
