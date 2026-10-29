"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type PageId } from "../use-router";

interface CTAButtonProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  page?: PageId;
}

export function CTAButton({
  onClick,
  href,
  children,
  variant = "primary",
  className,
}: CTAButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-medium transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-gold text-gold-foreground hover:shadow-[0_0_40px_-8px] hover:shadow-gold/60 hover:brightness-110"
      : "border border-gold/40 text-gold hover:bg-gold/10";

  const content = (
    <>
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2.25}
      />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, styles, className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cn(base, styles, className)}>
      {content}
    </button>
  );
}
