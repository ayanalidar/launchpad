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
 */
function useHoverCapability(): boolean {
  return useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover)").matches;
  })[0];
}

/**
 * Custom gold cursor.
 * Performance: lightweight spring (damping 30, stiffness 500), only 2 DOM nodes.
 * Disabled on touch devices and reduced-motion users.
 */
export function CustomCursor() {
  const reduced = useFramerReduced();
  const hasHover = useHoverCapability();
  const enabled = hasHover && !reduced;

  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  // Snappier spring, less bounce
  const x = useSpring(cursorX, { damping: 30, stiffness: 500, mass: 0.3 });
  const y = useSpring(cursorY, { damping: 30, stiffness: 500, mass: 0.3 });

  useEffect(() => {
    if (!enabled) return;

    let rafId: number | null = null;
    let pendingX = -100;
    let pendingY = -100;

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          cursorX.set(pendingX);
          cursorY.set(pendingY);
          rafId = null;
        });
      }
      setHidden(false);

      // Check interactive element via closest, throttled by rAF
      const el = e.target as HTMLElement;
      const isInteractive = !!el.closest(
        "a, button, input, textarea, select, [data-cursor]"
      );
      setHovering(isInteractive);
    };

    const onLeave = () => setHidden(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border border-gold/60"
        style={{ x, y, translateX: "-50%", translateY: "-50%", willChange: "transform" }}
        animate={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: hidden ? 0 : hovering ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-gold"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", willChange: "transform" }}
        animate={{
          width: hovering ? 8 : 6,
          height: hovering ? 8 : 6,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}

/**
 * Magnetic wrapper, makes any element pull toward the cursor.
 * Disabled for reduced-motion. Light spring, no excessive bounce.
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
  strength = 0.3,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useFramerReduced();
  const hasHover = useHoverCapability();
  const enabled = hasHover && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { damping: 20, stiffness: 250 });
  const ySpring = useSpring(y, { damping: 20, stiffness: 250 });

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
      style={{ x: xSpring, y: ySpring, willChange: enabled ? "transform" : "auto" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
