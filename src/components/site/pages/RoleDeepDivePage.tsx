"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  TrendingUp,
  GraduationCap,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Code2,
  Target,
  HelpCircle,
  Award,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { CTAButton } from "../ui/CTAButton";
import { GlassCard } from "../ui/GlassCard";
import { Skeleton } from "../ui/Skeleton";
import { cn } from "@/lib/utils";

interface RoleDeepDivePageProps {
  onNavigate: (p: PageId) => void;
  roleSlug: string;
}

interface RoleData {
  title: string;
  slug: string;
  level: string;
  tagline: string;
  overview: string;
  responsibilities: string[];
  requiredSkills: { name: string; level: "required" | "preferred" }[];
  salaryRange: { min: number; max: number; median: number };
  interviewQuestions: { question: string; difficulty: "easy" | "medium" | "hard" }[];
  careerPath: { stage: string; description: string; typicalCTC: string }[];
  certifications: string[];
}

export function RoleDeepDivePage({
  onNavigate,
  roleSlug,
}: RoleDeepDivePageProps) {
  const [fetchState, setFetchState] = useState<{
    loading: boolean;
    data: RoleData | null;
    error: string | null;
  }>({ loading: true, data: null, error: null });

  // Use a ref to track the latest request, and a separate state set
  // only inside async callbacks (not in effect body).
  useEffect(() => {
    const controller = new AbortController();

    // Fire-and-forget; setState happens only inside async callbacks.
    (async () => {
      try {
        const r = await fetch(`/api/role/${roleSlug}`, {
          signal: controller.signal,
        });
        if (!r.ok) throw new Error("Role not found");
        const d = await r.json();
        setFetchState({ loading: false, data: d, error: null });
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setFetchState({
          loading: false,
          data: null,
          error: (e as Error).message,
        });
      }
    })();

    return () => controller.abort();
  }, [roleSlug]);

  const { loading, data, error } = fetchState;

  return (
    <>
      <Background variant="hero" />

      <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate("placements")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to placements
          </button>

          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-16 w-full max-w-2xl" />
              <Skeleton className="h-6 w-full max-w-xl" />
              <Skeleton className="h-32 w-full mt-8" />
            </div>
          )}

          {error && (
            <div className="p-6 rounded-lg border border-destructive/30 bg-destructive/5 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
              <p className="text-sm text-foreground">
                Couldn&apos;t load role details. Please try again or{" "}
                <button
                  onClick={() => onNavigate("placements")}
                  className="text-gold hover:underline"
                >
                  return to placements
                </button>
                .
              </p>
            </div>
          )}

          {data && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5"
              >
                <Briefcase className="h-3.5 w-3.5 text-gold" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                  {data.level}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]"
              >
                {data.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-4 max-w-3xl text-base sm:text-lg text-gold leading-relaxed"
              >
                {data.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-4 max-w-3xl text-base text-muted-foreground leading-relaxed"
              >
                {data.overview}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <CTAButton onClick={() => onNavigate("register")}>
                  Register for this role
                </CTAButton>
                <CTAButton variant="ghost" onClick={() => onNavigate("contact")}>
                  Ask about this role
                </CTAButton>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {data && (
        <section className="relative pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: responsibilities + skills */}
            <div className="lg:col-span-2 space-y-6">
              <GlassCard className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-4 w-4 text-gold" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    What you&apos;ll do
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {data.responsibilities.map((r, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-start gap-3 text-sm text-foreground/90"
                    >
                      <span className="font-mono text-xs text-gold mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{r}</span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-4 w-4 text-gold" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Skills required
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {data.requiredSkills.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                      className={cn(
                        "flex items-center justify-between gap-2 p-3 rounded-md border",
                        s.level === "required"
                          ? "border-gold/30 bg-gold/[0.03]"
                          : "border-border bg-background/40"
                      )}
                    >
                      <span className="text-sm text-foreground">{s.name}</span>
                      <span
                        className={cn(
                          "font-mono text-[9px] uppercase tracking-wider",
                          s.level === "required" ? "text-gold" : "text-muted-foreground"
                        )}
                      >
                        {s.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="h-4 w-4 text-gold" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Sample interview questions
                  </h2>
                </div>
                <div className="space-y-3">
                  {data.interviewQuestions.map((q, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="p-4 rounded-md border border-border bg-background/40"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs text-gold mt-0.5">
                          Q{i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm text-foreground mb-2">
                            {q.question}
                          </p>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                              q.difficulty === "easy" &&
                                "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
                              q.difficulty === "medium" &&
                                "border-gold/30 bg-gold/10 text-gold",
                              q.difficulty === "hard" &&
                                "border-red-400/30 bg-red-400/10 text-red-400"
                            )}
                          >
                            {q.difficulty}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right column: salary, career path, certifications */}
            <div className="space-y-6">
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-gold" />
                  <h2 className="font-display text-base font-semibold text-foreground">
                    Salary band
                  </h2>
                </div>
                <div className="font-display text-3xl font-semibold text-gradient-gold mb-2">
                  ₹{data.salaryRange.min}-{data.salaryRange.max}L
                </div>
                <p className="text-xs text-muted-foreground">
                  Median: ₹{data.salaryRange.median}L per annum
                </p>
                {/* Visual band */}
                <div className="mt-4 relative h-3 rounded-full bg-border">
                  <div
                    className="absolute inset-y-0 rounded-full bg-gradient-to-r from-gold/40 via-gold to-gold/40"
                    style={{
                      left: `${(data.salaryRange.min / 100) * 100}%`,
                      right: `${100 - (data.salaryRange.max / 100) * 100}%`,
                    }}
                  />
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-4 w-4 text-gold" />
                  <h2 className="font-display text-base font-semibold text-foreground">
                    Career path
                  </h2>
                </div>
                <div className="space-y-4">
                  {data.careerPath.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="relative pl-6"
                    >
                      <div className="absolute left-0 top-1 h-2 w-2 rounded-full bg-gold" />
                      {i < data.careerPath.length - 1 && (
                        <div className="absolute left-[3px] top-3 bottom-[-1rem] w-px bg-border" />
                      )}
                      <div className="font-medium text-sm text-foreground">
                        {c.stage}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {c.description}
                      </div>
                      <div className="font-mono text-xs text-gold mt-1">
                        {c.typicalCTC}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-4 w-4 text-gold" />
                  <h2 className="font-display text-base font-semibold text-foreground">
                    Recommended certifications
                  </h2>
                </div>
                <ul className="space-y-2">
                  {data.certifications.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <GraduationCap className="h-3.5 w-3.5 text-gold shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
