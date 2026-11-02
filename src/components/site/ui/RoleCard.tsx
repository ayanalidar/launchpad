"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

export interface RoleCardData {
  title: string;
  level: string;
  description: string;
  skills: string[];
  slug?: string;
}

interface RoleCardProps extends RoleCardData {
  index?: number;
  className?: string;
  onClick?: () => void;
}

export function RoleCard({
  title,
  level,
  description,
  skills,
  index = 0,
  className,
  onClick,
}: RoleCardProps) {
  return (
    <FadeIn
      direction="up"
      distance={20}
      duration={500}
      delay={index * 0.06 * 1000}
      className={cn(
        "group relative p-6 rounded-lg border border-border bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-gold/40 hover:bg-card/60 text-left",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* Gold sweep on hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Animated top gold line that grows on hover */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-700" />

      {/* Rotating decorative ring in corner (CSS-only) */}
      <div className="absolute -bottom-10 -right-10 h-32 w-32 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500 animate-spin-slow">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-gold" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" className="text-gold" />
        </svg>
      </div>

      <div className="relative flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
            {level}
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground leading-tight">
            {title}
          </h3>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-gold/60 group-hover:text-gold group-hover:border-gold/40 transition-all group-hover:rotate-45 group-hover:scale-110" style={{ transitionDuration: "300ms" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <p className="relative text-sm text-muted-foreground leading-relaxed mb-5">
        {description}
      </p>

      <div className="relative flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span
            key={s}
            className="inline-flex items-center rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors group-hover:border-gold/20"
          >
            {s}
          </span>
        ))}
      </div>
    </FadeIn>
  );
}
