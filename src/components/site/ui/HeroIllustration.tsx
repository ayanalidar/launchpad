"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Code2,
  Cloud,
  Brain,
  Database,
  Palette,
  Server,
  Smartphone,
  Cpu,
  LineChart,
} from "lucide-react";

/**
 * Hero illustration, a sophisticated SVG composition:
 * central core (career hub) + orbital tech-domain icons + glass stat cards.
 */
export function HeroIllustration() {
  const orbitIcons = [
    { Icon: ShieldCheck, label: "Security", angle: 0 },
    { Icon: Code2, label: "Engineering", angle: 36 },
    { Icon: Cloud, label: "Cloud", angle: 72 },
    { Icon: Brain, label: "AI/ML", angle: 108 },
    { Icon: Database, label: "Data", angle: 144 },
    { Icon: Palette, label: "Design", angle: 180 },
    { Icon: Server, label: "DevOps", angle: 216 },
    { Icon: Smartphone, label: "Mobile", angle: 252 },
    { Icon: Cpu, label: "Systems", angle: 288 },
    { Icon: LineChart, label: "Analytics", angle: 324 },
  ];

  return (
    <div className="relative aspect-square w-full max-w-[34rem] mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-[10%] rounded-full bg-gold/[0.08] blur-[80px]" />

      {/* Rotating outer ring with dashes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="none"
            stroke="oklch(0.78 0.16 75 / 0.15)"
            strokeWidth="1"
            strokeDasharray="2 8"
          />
        </svg>
      </motion.div>

      {/* Counter-rotating middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[8%]"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="oklch(0.78 0.16 75 / 0.2)"
            strokeWidth="1"
            strokeDasharray="60 4 4 4"
          />
        </svg>
      </motion.div>

      {/* Orbital icons positioned around the circle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[4%]"
      >
        {orbitIcons.map(({ Icon, label, angle }, i) => {
          const rad = (angle * Math.PI) / 180;
          const radius = 46; // percentage from center
          const x = 50 + radius * Math.cos(rad);
          const y = 50 + radius * Math.sin(rad);
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 200 }}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Counter-rotate so icons stay upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="group flex flex-col items-center gap-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-card/80 backdrop-blur-sm text-gold group-hover:border-gold/60 group-hover:bg-gold/10 transition-colors">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground group-hover:text-gold transition-colors">
                  {label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Inner concentric ring */}
      <div className="absolute inset-[34%]">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="oklch(0.78 0.16 75 / 0.25)"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="oklch(0.78 0.16 75 / 0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Central core with pulse */}
      <div className="absolute inset-[38%] flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-full w-full items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/15 via-gold/5 to-transparent backdrop-blur-md"
        >
          <div className="absolute inset-0 rounded-full bg-gold/10 blur-2xl" />
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShieldCheck className="h-10 w-10 text-gold" strokeWidth={1.25} />
            </motion.div>
            <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              GuardianX
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating glass cards */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute top-[18%] left-[-8%] sm:left-[-4%]"
      >
        <div className="glass-card rounded-lg p-3 sm:p-4 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gold/15 text-gold">
              <LineChart className="h-4 w-4" strokeWidth={2} />
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-foreground leading-none">
                50+
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mt-1">
                Employer Partners
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-[18%] right-[-8%] sm:right-[-4%]"
      >
        <div className="glass-card rounded-lg p-3 sm:p-4 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gold/15 text-gold">
              <Cpu className="h-4 w-4" strokeWidth={2} />
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-foreground leading-none">
                15+
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mt-1">
                Tech Domains
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom: floating registration card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-[-4%] left-1/2 -translate-x-1/2"
      >
        <div className="glass-card rounded-lg px-4 py-2.5 shadow-2xl flex items-center gap-2 whitespace-nowrap">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
            Registration ₹2,000
          </span>
        </div>
      </motion.div>
    </div>
  );
}
