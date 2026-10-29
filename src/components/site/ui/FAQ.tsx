"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export function FAQ({ items, className }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="group">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "font-display text-lg sm:text-xl font-medium transition-colors",
                  isOpen ? "text-gold" : "text-foreground group-hover:text-gold/80"
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isOpen
                    ? "border-gold text-gold bg-gold/10"
                    : "border-border text-muted-foreground"
                )}
              >
                {isOpen ? (
                  <Minus className="h-3.5 w-3.5" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pb-6 pr-12 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {item.answer}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
