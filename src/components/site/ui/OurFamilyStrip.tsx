"use client";

import { motion } from "framer-motion";
import { Rocket, GraduationCap, ShieldCheck, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FamilyProperty {
  name: string;
  tagline: string;
  domain?: string;
  href?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Whether this is the current site (highlighted) */
  current?: boolean;
}

const FAMILY: FamilyProperty[] = [
  {
    name: "GuardianX Launchpad",
    tagline: "Recruitment & Career Assistance",
    icon: Rocket,
    current: true,
  },
  {
    name: "GuardianX Academy",
    tagline: "Training & Upskilling",
    domain: "academy.guardianx.cloud",
    href: "https://www.academy.guardianx.cloud",
    icon: GraduationCap,
  },
  {
    name: "GuardianX Security",
    tagline: "Enterprise Cybersecurity",
    domain: "guardianx.in",
    href: "https://www.guardianx.in",
    icon: ShieldCheck,
  },
];

interface OurFamilyStripProps {
  className?: string;
}

/**
 * Compact horizontal strip showing the three GuardianX family properties.
 * Used on the Home page right below the domain marquee so visitors
 * immediately understand the three-property structure.
 */
export function OurFamilyStrip({ className }: OurFamilyStripProps) {
  return (
    <section className={cn("relative py-10", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            The GuardianX Family
          </span>
          <span className="h-px w-8 bg-gold/60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {FAMILY.map((p, i) => {
            const Icon = p.icon;
            const inner = (
              <>
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md border",
                      p.current
                        ? "border-gold/50 bg-gold/10 text-gold"
                        : "border-gold/30 bg-gold/5 text-gold"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display text-base font-semibold text-foreground">
                        {p.name}
                      </span>
                      {p.current && (
                        <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold">
                          You&apos;re here
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {p.tagline}
                    </p>
                    {p.domain && (
                      <p className="font-mono text-[10px] text-muted-foreground/70 mt-1.5">
                        {p.domain}
                      </p>
                    )}
                  </div>
                </div>
                {!p.current && p.href && (
                  <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground/50 group-hover:text-gold transition-colors" />
                )}
              </>
            );

            const cardClasses = cn(
              "group relative p-5 rounded-lg border transition-all duration-300 overflow-hidden",
              p.current
                ? "border-gold/40 bg-gold/[0.04]"
                : "border-border bg-card/30 hover:border-gold/30 hover:bg-card/50"
            );

            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(cardClasses, "block")}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cardClasses}>
                    {/* Top gold line for current site */}
                    {p.current && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gold/60" />
                    )}
                    {inner}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
