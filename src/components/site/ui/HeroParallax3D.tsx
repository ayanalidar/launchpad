"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Wraps the hero illustration to add scroll-driven 3D parallax.
 * - As user scrolls down, the illustration tilts on X axis (tilts away)
 * - Y position drifts up
 * - Scale shrinks slightly
 * - Icons inside get a depth-of-field blur at extreme angles
 * - Disabled for reduced-motion users (renders children as-is)
 */
export function HeroParallax3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // All hooks must be called unconditionally; compute values, conditionally apply
  const rotateXRaw = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const translateYRaw = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const blurRaw = useTransform(scrollYProgress, [0, 0.7, 1], [0, 2, 6]);
  const blurFilter = useTransform(blurRaw, (b) => `blur(${b}px)`);

  // Smooth with springs
  const rotateX = useSpring(rotateXRaw, { damping: 30, stiffness: 100 });
  const translateY = useSpring(translateYRaw, { damping: 30, stiffness: 100 });
  const scale = useSpring(scaleRaw, { damping: 30, stiffness: 100 });

  if (reduced) return <>{children}</>;

  return (
    <div ref={ref} className="relative" style={{ perspective: "1000px" }}>
      <motion.div
        style={{
          rotateX,
          translateY,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div style={{ filter: blurFilter }}>{children}</motion.div>
      </motion.div>
    </div>
  );
}
