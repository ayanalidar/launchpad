"use client";

import { cn } from "@/lib/utils";
import { Counter } from "./Counter";
import { FadeIn } from "./FadeIn";

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  className?: string;
  delay?: number;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export function StatCard({
  value,
  suffix,
  prefix,
  label,
  description,
  className,
  delay = 0,
  icon: Icon,
}: StatCardProps) {
  return (
    <FadeIn
      direction="up"
      distance={20}
      duration={600}
      delay={delay}
      className={cn(
        "relative p-6 sm:p-8 rounded-lg border border-border bg-card/40 backdrop-blur-sm overflow-hidden group",
        className
      )}
    >
      {/* Hover gold sweep */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Rotating corner ring decoration (CSS-only, no framer-motion) */}
      <div className="absolute -top-8 -right-8 h-24 w-24 opacity-[0.08] group-hover:opacity-[0.18] transition-opacity duration-500 animate-spin-slow">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" className="text-gold" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" className="text-gold" />
        </svg>
      </div>

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-baseline gap-1">
          {prefix && (
            <span className="font-display text-2xl sm:text-3xl font-semibold text-gold/80">
              {prefix}
            </span>
          )}
          <span className="font-display text-4xl sm:text-5xl font-semibold text-gradient-gold tracking-tight">
            <Counter value={value} />
          </span>
          {suffix && (
            <span className="font-display text-2xl sm:text-3xl font-semibold text-gold/80">
              {suffix}
            </span>
          )}
        </div>
        {Icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold opacity-60 group-hover:opacity-100 transition-opacity">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </div>
        )}
      </div>
      <div className="relative mt-3 text-sm font-medium text-foreground">{label}</div>
      {description && (
        <p className="relative mt-1 text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </FadeIn>
  );
}
