"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessFlow({ steps, className }: ProcessFlowProps) {
  return (
    <div
      className={cn(
        "relative grid gap-6 md:gap-8",
        "md:grid-cols-4",
        className
      )}
    >
      {/* Connecting line (desktop) with animated pulse */}
      <div className="hidden md:block absolute top-[3.25rem] left-[12%] right-[12%] h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>

      {steps.map((s, i) => (
        <motion.div
          key={s.step}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.12 }}
          className="relative flex flex-col items-center text-center group"
        >
          {/* Step circle with rotating ring decoration */}
          <div className="relative mb-6">
            {/* Outer rotating dashed ring (appears on hover) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[-8px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="oklch(0.78 0.16 75 / 0.6)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
            </motion.div>

            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main circle */}
            <div className="relative flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full border border-gold/40 bg-card/80 backdrop-blur-sm transition-colors duration-300 group-hover:border-gold/70 group-hover:bg-card">
              <div className="flex flex-col items-center">
                {s.icon ? (
                  <div className="text-gold transition-transform duration-500 group-hover:scale-110">
                    {s.icon}
                  </div>
                ) : (
                  <span className="font-display text-3xl font-semibold text-gradient-gold">
                    {s.step}
                  </span>
                )}
              </div>
            </div>

            {/* Step badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.3, type: "spring", stiffness: 200 }}
              className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border border-gold/60 bg-background"
            >
              <span className="font-mono text-[10px] text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            {s.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[15rem]">
            {s.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
