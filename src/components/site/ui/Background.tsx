"use client";

import { cn } from "@/lib/utils";

interface BackgroundProps {
  variant?: "default" | "hero" | "subtle";
  className?: string;
}

export function Background({ variant = "default", className }: BackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* Grid */}
      <div
        className={cn(
          "absolute inset-0 bg-grid opacity-60 mask-fade-b",
          variant === "subtle" && "opacity-30"
        )}
      />

      {/* Gold radial glow top-left */}
      {variant !== "subtle" && (
        <>
          <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-gold/[0.07] blur-[120px]" />
          <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-gold/[0.04] blur-[120px]" />
        </>
      )}

      {variant === "hero" && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[60rem] w-[60rem] rounded-full bg-gold/[0.05] blur-[140px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </>
      )}
    </div>
  );
}

export function Noise() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.015] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
      }}
    />
  );
}
