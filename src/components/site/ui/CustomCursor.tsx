"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion as useFramerReduced,
} from "framer-motion";

/**
 * Detects hover capability once on first render (SSR-safe).
 * Returns false on server, true only if the client supports hover (mouse).
 */
function useHoverCapability(): boolean {
  return useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover)").matches;
  })[0];
}

/**
 * Custom gold cursor with magnetic interactions.
 * - Hidden on touch devices (no hover capability)
 * - Grows when hovering interactive elements (a, button, [data-cursor])
 * - Adds a subtle gold trail
 * - Fully disabled when prefers-reduced-motion is set
 */
export function CustomCursor() {
  const reduced = useFramerReduced();
  const hasHover = useHoverCapability();
  const enabled = hasHover && !reduced;

  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setHidden(false);

      const el = e.target as HTMLElement;
      const isInteractive = !!el.closest(
        "a, button, input, textarea, select, [data-cursor]"
      );
      setHovering(isInteractive);
    };

    const onLeave = () => setHidden(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring (larger, trails) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border border-gold/60"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          opacity: hidden ? 0 : hovering ? 0.6 : 0.4,
          scale: hidden ? 0.5 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      {/* Inner dot (precise) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-gold"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 8 : 6,
          height: hovering ? 8 : 6,
          opacity: hidden ? 0 : 1,
        }}
      />
    </>
  );
}

/**
 * HOC/wrapper that makes any element magnetic: it pulls toward the cursor
 * when the cursor is within `radius` pixels. Disabled for reduced-motion.
 */
interface MagneticProps {
  children: React.ReactNode;
  radius?: number;
  strength?: number;
  className?: string;
}

export function Magnetic({
  children,
  radius = 80,
  strength = 0.4,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useFramerReduced();
  const hasHover = useHoverCapability();
  const enabled = hasHover && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { damping: 15, stiffness: 200 });
  const ySpring = useSpring(y, { damping: 15, stiffness: 200 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius + Math.max(rect.width, rect.height) / 2) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: xSpring, y: ySpring }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
