"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  /** span on grid: 'lg' = 2x2, 'wide' = 2x1, 'tall' = 1x2 */
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
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay }}
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
    </motion.div>
  );
}
