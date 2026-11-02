"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Glass morphism v2 card.
 * Performance: lighter backdrop blur (8px vs 12px), cursor-follow highlight
 * throttled via rAF, transform-only animations for GPU acceleration.
 */
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  staticHighlight?: boolean;
}

export function GlassCard({
  children,
  className,
  staticHighlight = false,
}: GlassCardProps) {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const x = useSpring(mouseX, { damping: 30, stiffness: 300 });
  const y = useSpring(mouseY, { damping: 30, stiffness: 300 });

  const highlightBg = useTransform(
    [x, y],
    ([cx, cy]) =>
      `radial-gradient(240px circle at ${cx}% ${cy}%, oklch(0.78 0.16 75 / 0.10), transparent 60%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || staticHighlight) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <div
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gold/20",
        // Lighter blur for performance (8px vs 12px)
        "bg-white/[0.03] backdrop-blur-sm backdrop-saturate-150",
        "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.4)]",
        "transition-colors duration-300 hover:border-gold/40",
        className
      )}
    >
      {!reduced && !staticHighlight && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: highlightBg, willChange: "background" }}
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
