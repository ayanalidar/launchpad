"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  /** Optional label in the middle of the divider */
  label?: string;
  className?: string;
}

export function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className ?? ""}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="h-px w-16 sm:w-32 bg-gradient-to-r from-transparent to-gold/40 origin-right"
      />
      {label ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
        >
          {label}
        </motion.div>
      ) : (
        <div className="flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-gold/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="h-1 w-1 rounded-full bg-gold/60" />
        </div>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="h-px w-16 sm:w-32 bg-gradient-to-l from-transparent to-gold/40 origin-left"
      />
    </div>
  );
}
