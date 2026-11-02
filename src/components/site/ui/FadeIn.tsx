"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  /** Animation delay in ms, default 0 */
  delay?: number;
  /** Direction to fade in from, default "up" */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance to travel, default 16px */
  distance?: number;
  /** Duration in ms, default 600 */
  duration?: number;
  /** Render as different element, default div */
  as?: ElementType;
  className?: string;
  /** Only animate once, default true */
  once?: boolean;
}

/**
 * CSS-based fade-in on scroll, replaces framer-motion's whileInView.
 * Uses IntersectionObserver + CSS transitions — no JS animation loop,
 * no spring physics, no library dependency. GPU-accelerated (transform + opacity).
 *
 * Performance: ~0KB JS (vs ~50KB for framer-motion per component).
 */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 16,
  duration = 600,
  as: Component = "div",
  className,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const transforms: Record<string, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "none",
  };

  return (
    <Component
      ref={ref}
      className={cn("transition-all ease-out", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
