"use client";

import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "full" | "compact";
  className?: string;
}

/**
 * Brand logo: typographic GuardianX Launchpad + Rocket icon.
 * - "full": "GuardianX Launchpad" wordmark + "Recruitment & Career Assistance" subtitle
 * - "compact": same wordmark + "Recruitment Consultancy" short subtitle (for navbar)
 */
export function BrandLogo({ variant = "compact", className }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-md bg-gold/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-md border border-gold/40 bg-gradient-to-br from-gold/20 to-transparent">
          <Rocket className="h-5 w-5 text-gold" strokeWidth={1.75} />
        </div>
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className="font-display text-base sm:text-lg font-semibold tracking-tight text-foreground">
          Guardian<span className="text-gold">X</span>{" "}
          <span className="text-gold">Launchpad</span>
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
          {variant === "full"
            ? "Recruitment & Career Assistance"
            : "Recruitment Consultancy"}
        </span>
      </div>
    </div>
  );
}
