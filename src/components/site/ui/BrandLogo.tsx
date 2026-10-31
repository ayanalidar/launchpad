"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "full" | "compact";
  className?: string;
}

/**
 * Brand logo: GuardianX shield image + wordmark.
 * - "full": "GuardianX Launchpad" wordmark + "Recruitment & Career Assistance" subtitle
 * - "compact": same wordmark + "Recruitment Consultancy" short subtitle (for navbar)
 */
export function BrandLogo({ variant = "compact", className }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* GuardianX shield logo */}
      <div className="relative shrink-0">
        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-md bg-gold/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-gold/30 bg-black">
          <Image
            src="/logo.png"
            alt="GuardianX Launchpad logo"
            width={44}
            height={44}
            className="h-full w-full object-contain"
            priority
          />
          {/* Subtle gold inner ring */}
          <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gold/20" />
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
