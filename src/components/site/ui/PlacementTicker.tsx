"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, TrendingUp, Activity } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Placement {
  role: string;
  location: string;
  company: string;
  outcome: string;
  ago: string;
}

const SAMPLE_PLACEMENTS: Placement[] = [
  { role: "Software Engineer", location: "Bangalore", company: "SaaS unicorn", outcome: "+38% hike", ago: "2 min ago" },
  { role: "Cloud / DevOps Engineer", location: "Hyderabad", company: "Fintech scale-up", outcome: "2x CTC", ago: "12 min ago" },
  { role: "Data Engineer", location: "Bangalore", company: "AI product startup", outcome: "+45% hike", ago: "23 min ago" },
  { role: "Cybersecurity Analyst", location: "Mumbai", company: "Enterprise security firm", outcome: "+25% hike", ago: "47 min ago" },
  { role: "Product Designer", location: "Remote", company: "Global SaaS", outcome: "Remote-first", ago: "1 hr ago" },
  { role: "AI / ML Engineer", location: "Bangalore", company: "AI research lab", outcome: "+52% hike", ago: "2 hr ago" },
  { role: "Mobile Engineer", location: "Pune", company: "Consumer app", outcome: "+30% hike", ago: "3 hr ago" },
  { role: "Platform Engineer", location: "Chennai", company: "Enterprise SaaS", outcome: "+35% hike", ago: "4 hr ago" },
  { role: "QA / Test Engineer", location: "Bangalore", company: "Healthtech", outcome: "+22% hike", ago: "5 hr ago" },
  { role: "Engineering Manager", location: "Mumbai", company: "Fintech giant", outcome: "+40% hike", ago: "6 hr ago" },
];

const TODAY_COUNT_BASE = 7;

/**
 * Live placement ticker.
 * - Shows a counter of placements today (auto-increments occasionally)
 * - Cycles through anonymised recent placements with animation
 * - "Live" pulse indicator
 */
export function PlacementTicker() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [todayCount, setTodayCount] = useState(TODAY_COUNT_BASE);

  // Cycle placements every 4s
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SAMPLE_PLACEMENTS.length);
    }, 4000);
    return () => clearInterval(t);
  }, [reduced]);

  // Occasionally bump today's count
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      if (Math.random() > 0.6) {
        setTodayCount((c) => c + 1);
      }
    }, 12000);
    return () => clearInterval(t);
  }, [reduced]);

  const current = SAMPLE_PLACEMENTS[index];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
      {/* Counter */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-md border border-emerald-400/40 bg-emerald-400/10 text-emerald-400">
          <Activity className="h-4 w-4" strokeWidth={2} />
        </div>
        <div>
          <div className="font-display text-2xl font-semibold text-foreground tabular-nums">
            {todayCount}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Placements today
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block h-12 w-px bg-border" />

      {/* Live ticker */}
      <div className="flex-1 min-w-0 relative overflow-hidden">
        {/* Live badge */}
        <div className="absolute top-0 right-0 flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">
            Live
          </span>
        </div>

        <div className="h-12 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduced ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3 text-sm"
            >
              <Briefcase className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span className="font-medium text-foreground">{current.role}</span>
              <span className="text-muted-foreground">·</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {current.location}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{current.company}</span>
              <span className="text-muted-foreground">·</span>
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                {current.outcome}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-xs">{current.ago}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
