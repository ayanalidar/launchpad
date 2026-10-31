"use client";

import { useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  shape: "circle" | "square" | "triangle";
  drift: number;
  rotation: number;
}

const COLORS = [
  "oklch(0.78 0.16 75)",
  "oklch(0.95 0.10 80)",
  "oklch(0.60 0.14 65)",
  "#FFD700",
  "#FFA500",
  "oklch(0.85 0.14 80)",
];

interface ConfettiProps {
  fire: boolean;
  count?: number;
}

/**
 * Gold confetti burst effect.
 * - Pieces fall from the top of the viewport with rotation + drift
 * - Stops after ~3.5s
 * - No-op for reduced-motion users
 *
 * Animation is driven entirely by CSS keyframes (defined in globals.css)
 * with per-piece CSS custom properties for variation.
 */
export function Confetti({ fire, count = 80 }: ConfettiProps) {
  const reduced = useReducedMotion();
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const generate = useCallback(() => {
    const shapes: ConfettiPiece["shape"][] = ["circle", "square", "triangle"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 6 + Math.random() * 8,
      duration: 2.5 + Math.random() * 1.5,
      delay: Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      drift: (Math.random() - 0.5) * 200,
      rotation: 360 + Math.random() * 720,
    }));
  }, [count]);

  useEffect(() => {
    if (!fire || reduced) return;
    // Defer setState outside the synchronous effect body
    const raf = requestAnimationFrame(() => {
      setPieces(generate());
    });
    const t = setTimeout(() => setPieces([]), 4000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [fire, reduced, generate]);

  if (reduced || pieces.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      {pieces.map((p) => {
        const shapeStyle: React.CSSProperties = {
          left: `${p.x}%`,
          top: "-10%",
          width: p.size,
          height: p.size,
          background: p.shape === "triangle" ? "transparent" : p.color,
          // CSS custom properties for the keyframes
          ["--confetti-drift" as string]: `${p.drift}px`,
          ["--confetti-rotation" as string]: `${p.rotation}deg`,
          ["--confetti-fall-distance" as string]: `110vh`,
          animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          clipPath:
            p.shape === "triangle"
              ? "polygon(50% 0%, 0% 100%, 100% 100%)"
              : p.shape === "circle"
              ? "circle(50%)"
              : "none",
          // For triangle, use border-less background color
          ...(p.shape === "triangle"
            ? { background: p.color }
            : {}),
        };
        return <div key={p.id} style={shapeStyle} className="absolute" />;
      })}
    </div>
  );
}
