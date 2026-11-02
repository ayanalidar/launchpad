"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  span?: "default" | "wide" | "tall" | "lg";
  delay?: number;
  glow?: boolean;
}

export function BentoCard({
  children,
  className,
  span = "default",
  delay = 0,
  glow = false,
}: BentoCardProps) {
  return (
    <FadeIn
      direction="up"
      distance={20}
      duration={600}
      delay={delay * 1000}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card/30 backdrop-blur-sm p-6 sm:p-8 hover:border-gold/40 transition-colors duration-500",
        span === "wide" && "sm:col-span-2",
        span === "tall" && "sm:row-span-2",
        span === "lg" && "sm:col-span-2 sm:row-span-2",
        glow && "border-gold/30 bg-gold/[0.03]",
        className
      )}
    >
      {/* Hover gold sweep */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      {/* Top gold line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-2/3 bg-gold/50 transition-all duration-500" />
      {children}
    </FadeIn>
  );
}
