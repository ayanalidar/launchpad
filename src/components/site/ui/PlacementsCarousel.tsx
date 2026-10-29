"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  TrendingUp,
  MapPin,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlacementStory {
  /** anonymised candidate identifier */
  initials: string;
  /** e.g. "Software Engineer" */
  role: string;
  /** e.g. "Bangalore" */
  location: string;
  /** e.g. "SaaS unicorn" or "Fintech scale-up" */
  companyType: string;
  /** e.g. "+38% hike" or "2x of previous CTC" */
  outcome: string;
  /** short testimonial */
  quote: string;
  /** time ago, e.g. "2 weeks ago" */
  placedAgo: string;
}

interface PlacementsCarouselProps {
  stories: PlacementStory[];
}

export function PlacementsCarousel({ stories }: PlacementsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return stories.length - 1;
      if (next >= stories.length) return 0;
      return next;
    });
  };

  if (!stories.length) return null;

  const current = stories[index];

  return (
    <div className="relative">
      {/* Desktop: 3-up layout, mobile: single card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main featured story (col-span 2 on desktop) */}
        <div className="md:col-span-2 relative overflow-hidden rounded-xl border border-gold/30 bg-card/40 backdrop-blur-sm p-6 sm:p-8 min-h-[16rem]">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-gold/[0.08] blur-[80px]" />
          </div>

          {/* Top gold line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gold/40" />

          <Quote className="h-6 w-6 text-gold/40 mb-4" strokeWidth={1.5} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar with initials */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                  <span className="font-display text-sm font-semibold text-gold">
                    {current.initials}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display text-base font-semibold text-foreground">
                      {current.role}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {current.location}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {current.companyType} · Placed {current.placedAgo}
                  </div>
                </div>
              </div>

              {/* Outcome pill */}
              <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1">
                <TrendingUp className="h-3 w-3 text-emerald-400" strokeWidth={2} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                  {current.outcome}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"
              aria-label="Previous story"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"
              aria-label="Next story"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Side card: mini stats / counter */}
        <div className="rounded-xl border border-border bg-card/30 p-6 flex flex-col justify-between min-h-[16rem]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
              Recent Placements
            </div>
            <div className="font-display text-4xl font-semibold text-gradient-gold mb-1">
              {String(index + 1).padStart(2, "0")}
              <span className="text-muted-foreground/40 text-2xl">
                /{String(stories.length).padStart(2, "0")}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Real outcomes from candidates placed through our consultancy
              network. Names withheld for candidate privacy.
            </p>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1.5 mt-6">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index
                    ? "w-6 bg-gold"
                    : "w-1.5 bg-border hover:bg-gold/40"
                )}
                aria-label={`Go to story ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Below: quick role/location tags for the next stories */}
      <div className="mt-4 flex flex-wrap gap-2">
        {stories.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all",
              i === index
                ? "border-gold/40 bg-gold/5 text-gold"
                : "border-border bg-background/40 text-muted-foreground hover:text-foreground hover:border-gold/30"
            )}
          >
            <Briefcase className="h-3 w-3" strokeWidth={2} />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              {s.role} · {s.location}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
