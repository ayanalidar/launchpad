"use client";

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
  Layers,
  Boxes,
  Globe,
  GitBranch,
  Terminal,
  Network,
} from "lucide-react";

const DOMAINS = [
  { Icon: ShieldCheck, label: "Cybersecurity" },
  { Icon: Code2, label: "Software Engineering" },
  { Icon: Cloud, label: "Cloud & DevOps" },
  { Icon: Brain, label: "AI / Machine Learning" },
  { Icon: Database, label: "Data Engineering" },
  { Icon: Palette, label: "Product Design" },
  { Icon: Server, label: "Backend Systems" },
  { Icon: Smartphone, label: "Mobile Engineering" },
  { Icon: Cpu, label: "Platform Engineering" },
  { Icon: LineChart, label: "Data Analytics" },
  { Icon: Layers, label: "Frontend Engineering" },
  { Icon: Boxes, label: "Site Reliability" },
  { Icon: Globe, label: "Web3 / Blockchain" },
  { Icon: GitBranch, label: "DevEx & Tooling" },
  { Icon: Terminal, label: "Systems Programming" },
  { Icon: Network, label: "Network Engineering" },
];

interface DomainMarqueeProps {
  /** Render two copies for seamless loop */
  duration?: number;
}

export function DomainMarquee({ duration = 40 }: DomainMarqueeProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* edge fade masks */}
      <div className="absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div
        className="flex w-max gap-3 hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        {[...DOMAINS, ...DOMAINS].map((d, i) => (
          <div
            key={i}
            className="group flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-card/40 backdrop-blur-sm px-4 py-2.5 hover:border-gold/40 transition-colors"
          >
            <d.Icon className="h-3.5 w-3.5 text-gold/70 group-hover:text-gold transition-colors" strokeWidth={1.75} />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
              {d.label}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
