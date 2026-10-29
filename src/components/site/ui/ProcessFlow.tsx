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
      {/* Connecting line (desktop) */}
      <div className="hidden md:block absolute top-[3.25rem] left-[12%] right-[12%] h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0" />

      {steps.map((s, i) => (
        <motion.div
          key={s.step}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.12 }}
          className="relative flex flex-col items-center text-center"
        >
          {/* Step circle */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl" />
            <div className="relative flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full border border-gold/40 bg-card/80 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                {s.icon ? (
                  <div className="text-gold">{s.icon}</div>
                ) : (
                  <span className="font-display text-3xl font-semibold text-gradient-gold">
                    {s.step}
                  </span>
                )}
              </div>
            </div>
            {/* Step badge */}
            <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border border-gold/60 bg-background">
              <span className="font-mono text-[10px] text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
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
