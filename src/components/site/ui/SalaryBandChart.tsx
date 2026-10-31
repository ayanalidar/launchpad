"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface SalaryBand {
  role: string;
  min: number; // LPA
  max: number;
  median: number;
  count: number; // sample size
  category: string;
}

const BANDS: SalaryBand[] = [
  { role: "Software Engineer", min: 8, max: 45, median: 18, count: 124, category: "Engineering" },
  { role: "Cloud / DevOps", min: 12, max: 55, median: 24, count: 68, category: "Engineering" },
  { role: "AI / ML Engineer", min: 15, max: 70, median: 28, count: 42, category: "AI/Data" },
  { role: "Data Engineer", min: 12, max: 50, median: 22, count: 56, category: "AI/Data" },
  { role: "Cybersecurity", min: 10, max: 48, median: 20, count: 71, category: "Security" },
  { role: "Product Designer", min: 10, max: 42, median: 19, count: 38, category: "Design" },
  { role: "Mobile Engineer", min: 10, max: 40, median: 18, count: 34, category: "Engineering" },
  { role: "Engineering Mgr", min: 35, max: 95, median: 55, count: 22, category: "Leadership" },
];

const MAX_LPA = 100;

interface SalaryChartProps {
  className?: string;
}

export function SalaryBandChart({ className }: SalaryChartProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<SalaryBand | null>(null);

  return (
    <div className={cn("relative", className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
            Salary Insights
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            Salary bands by role category
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Based on {BANDS.reduce((s, b) => s + b.count, 0)} placements in the
            last 12 months. Hover to inspect.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-3 py-1.5">
          <Users className="h-3 w-3 text-gold" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Live data
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-3">
        {BANDS.map((b, i) => {
          const minPct = (b.min / MAX_LPA) * 100;
          const maxPct = (b.max / MAX_LPA) * 100;
          const medianPct = ((b.median - b.min) / (b.max - b.min)) * 100;
          const isActive = active?.role === b.role;

          return (
            <div
              key={b.role}
              className="group"
              onMouseEnter={() => setActive(b)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-medium transition-colors",
                      isActive ? "text-gold" : "text-foreground"
                    )}
                  >
                    {b.role}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/70">
                    {b.category}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                  ₹{b.min}-{b.max}L
                </span>
              </div>

              {/* Track */}
              <div className="relative h-7">
                {/* Background track */}
                <div className="absolute inset-y-2.5 inset-x-0 rounded-full bg-border/40" />
                {/* Active band */}
                <motion.div
                  initial={reduced ? false : { width: 0 }}
                  whileInView={{ width: `${maxPct - minPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                  className={cn(
                    "absolute inset-y-2.5 left-0 rounded-full transition-all",
                    isActive
                      ? "bg-gradient-to-r from-gold/60 via-gold to-gold/60 shadow-[0_0_20px_-4px] shadow-gold/40"
                      : "bg-gradient-to-r from-gold/40 via-gold/70 to-gold/40"
                  )}
                  style={{ marginLeft: `${minPct}%` }}
                />
                {/* Min/max markers */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3 w-0.5 bg-foreground/40"
                  style={{ left: `${minPct}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3 w-0.5 bg-foreground/40"
                  style={{ left: `${maxPct}%` }}
                />
                {/* Median marker */}
                <motion.div
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="absolute top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-gold shadow-[0_0_8px] shadow-gold/60"
                  style={{
                    left: `${minPct + (medianPct * (maxPct - minPct)) / 100}%`,
                  }}
                />
                {/* Sample count badge */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground">
                  n={b.count}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active detail card */}
      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
        className={cn(
          "mt-4 p-4 rounded-lg border border-gold/30 bg-gold/[0.04] transition-opacity",
          active ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {active && (
          <div className="flex items-center justify-between gap-4 text-xs">
            <div>
              <div className="font-display text-sm font-semibold text-foreground">
                {active.role}
              </div>
              <div className="text-muted-foreground mt-0.5">{active.category}</div>
            </div>
            <div className="flex gap-6">
              <div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground">Min</div>
                <div className="text-foreground font-medium">₹{active.min}L</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground text-gold">Median</div>
                <div className="text-gold font-medium">₹{active.median}L</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground">Max</div>
                <div className="text-foreground font-medium">₹{active.max}L</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground">Sample</div>
                <div className="flex items-center gap-1 text-foreground font-medium">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  {active.count}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-6 bg-gradient-to-r from-gold/40 via-gold to-gold/40 rounded-full" />
          <span>Range</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-1 bg-gold rounded-full" />
          <span>Median</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-0.5 bg-foreground/40" />
          <span>Min / Max</span>
        </div>
        <span>·</span>
        <span>All figures in LPA (₹ lakhs per annum)</span>
      </div>
    </div>
  );
}
