"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <FadeIn direction="up" distance={12} duration={500} className={cn("flex items-center gap-3 mb-4", align === "center" && "justify-center")}>
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-gold/60" />
        </FadeIn>
      )}
      <FadeIn as="h2" direction="up" distance={16} duration={600} delay={50} className="font-display font-semibold tracking-tight text-foreground leading-[1.1] text-[clamp(1.75rem,4vw,3rem)]">
        {title}
      </FadeIn>
      {description && (
        <FadeIn as="p" direction="up" distance={16} duration={600} delay={150} className={cn("mt-4 text-[clamp(0.95rem,1.5vw,1.125rem)] text-muted-foreground leading-relaxed", align === "center" && "mx-auto")}>
          {description}
        </FadeIn>
      )}
    </div>
  );
}
