"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface GoldFoilProps {
  /** Content to render with gold foil texture */
  children: React.ReactNode;
  className?: string;
  /** Animate the foil shift (subtle), default true */
  animated?: boolean;
}

/**
 * Animated gold foil texture overlay.
 * - SVG turbulence filter creates a shimmering gold pattern
 * - Background-position slowly shifts for "liquid metal" effect
 * - Applied as a clip-path text or surface fill
 * - Disabled (solid gold gradient) for reduced-motion users
 */
export function GoldFoil({
  children,
  className,
  animated = true,
}: GoldFoilProps) {
  const reduced = useReducedMotion();

  return (
    <span
      className={cn(
        "relative inline-block",
        animated && !reduced && "animate-gold-foil",
        className
      )}
      style={{
        backgroundImage: reduced
          ? "linear-gradient(135deg, oklch(0.95 0.10 80) 0%, oklch(0.78 0.16 75) 50%, oklch(0.60 0.14 65) 100%)"
          : "linear-gradient(135deg, oklch(0.95 0.10 80) 0%, oklch(0.85 0.14 80) 25%, oklch(0.78 0.16 75) 50%, oklch(0.85 0.14 80) 75%, oklch(0.95 0.10 80) 100%)",
        backgroundSize: reduced ? "100% 100%" : "200% 200%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
      {/* SVG filter for gold foil shimmer */}
      {!reduced && (
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none opacity-30 mix-blend-overlay"
          aria-hidden="true"
        >
          <filter id="gold-foil-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="5"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.96
                      0 0 0 0 0.78
                      0 0 0 0 0.32
                      0 0 0 0.6 0"
            />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <rect width="100%" height="100%" filter="url(#gold-foil-filter)" />
        </svg>
      )}
    </span>
  );
}
