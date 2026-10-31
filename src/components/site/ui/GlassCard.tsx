"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Glass morphism v2 card.
 * - backdrop-filter blur + saturate for the modern frosted look
 * - Subtle inner highlight that follows the cursor
 * - Gold-tinted border that intensifies on hover
 */
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Disable the cursor-following highlight */
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

  const x = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const y = useSpring(mouseY, { damping: 30, stiffness: 200 });

  // Compute highlight background reactively (always called)
  const highlightBg = useTransform(
    [x, y],
    ([cx, cy]) =>
      `radial-gradient(240px circle at ${cx}% ${cy}%, oklch(0.78 0.16 75 / 0.12), transparent 60%)`
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
        // Glass v2 effect
        "bg-white/[0.03] backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_4px_30px_-10px_rgba(0,0,0,0.5)]",
        "transition-all duration-500 hover:border-gold/40 hover:shadow-[0_8px_40px_-10px_rgba(245,158,11,0.15)]",
        className
      )}
    >
      {/* Cursor-following highlight */}
      {!reduced && !staticHighlight && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: highlightBg }}
        />
      )}
      {/* Top inner highlight line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {/* Inner ring */}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.04]" />

      <div className="relative">{children}</div>
    </div>
  );
}
