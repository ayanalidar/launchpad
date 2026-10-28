"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Counter } from "./Counter";

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  className?: string;
  delay?: number;
}

export function StatCard({
  value,
  suffix,
  prefix,
  label,
  description,
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "relative p-6 sm:p-8 rounded-lg border border-border bg-card/40 backdrop-blur-sm overflow-hidden group",
        className
      )}
    >
      {/* Hover gold sweep */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
      <div className="mt-3 text-sm font-medium text-foreground">{label}</div>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
