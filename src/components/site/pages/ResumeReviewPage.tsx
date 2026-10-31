"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Target,
  TrendingUp,
  Briefcase,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { CTAButton } from "../ui/CTAButton";
import { GlassCard } from "../ui/GlassCard";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ResumeReviewPageProps {
  onNavigate: (p: PageId) => void;
}

const TARGET_ROLES = [
  "Software Engineer",
  "Cybersecurity Analyst",
  "Cloud / DevOps Engineer",
  "AI / ML Engineer",
  "Data Engineer",
  "Product Designer",
  "Mobile Engineer",
  "Product Manager",
];

interface Analysis {
  overallScore: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  suggestedRoles: string[];
}

export function ResumeReviewPage({ onNavigate }: ResumeReviewPageProps) {
  const { toast } = useToast();
  const [resume, setResume] = useState("");
  const [targetRole, setTargetRole] = useState(TARGET_ROLES[0]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resume.trim().length < 50) {
      toast({
        title: "Resume too short",
        description: "Please paste a resume with at least 50 characters.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setAnalysis(null);
    try {
      const res = await fetch("/api/resume-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, targetRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setAnalysis(data.analysis);
      toast({
        title: "Analysis complete",
        description: `Your resume scored ${data.analysis.overallScore}/100 for ${targetRole}.`,
      });
    } catch (err) {
      toast({
        title: "Analysis failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const scoreColor =
    analysis && analysis.overallScore >= 75
      ? "text-emerald-400"
      : analysis && analysis.overallScore >= 50
      ? "text-gold"
      : "text-red-400";

  return (
    <>
      <Background variant="hero" />

      <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              AI Resume Review
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]"
          >
            Get your resume
            <br />
            <span className="text-gradient-gold italic">AI-analyzed.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Paste your resume, pick your target role, and get an instant skill
            gap analysis powered by AI. Free, no signup required. We don&apos;t
            store your resume.
          </motion.p>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <GlassCard className="p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Your resume
              </h2>
              <p className="text-xs text-muted-foreground mb-5">
                Paste plain text (no formatting). Max 5000 characters.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="targetRole" className="text-sm">
                    Target role
                  </Label>
                  <select
                    id="targetRole"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full h-10 rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:border-gold/60 focus:outline-none"
                  >
                    {TARGET_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-sm">
                    Resume text <span className="text-gold">*</span>
                  </Label>
                  <Textarea
                    id="resume"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    placeholder="Paste your resume here..."
                    rows={10}
                    maxLength={5000}
                    className="bg-background/50 border-border focus:border-gold/60 resize-none font-mono text-xs"
                  />
                  <div className="text-right text-[10px] text-muted-foreground font-mono">
                    {resume.length} / 5000
                  </div>
                </div>
                <CTAButton onClick={() => {}} className="w-full justify-center">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Analyze My Resume
                    </>
                  )}
                </CTAButton>
              </form>
            </GlassCard>

            {/* Results */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {!analysis && !loading && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <GlassCard className="p-8 text-center h-full flex flex-col items-center justify-center min-h-[24rem]">
                      <FileText className="h-10 w-10 text-gold/40 mb-4" strokeWidth={1.5} />
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        Your analysis will appear here
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        Paste your resume on the left and click Analyze to get
                        an instant skill gap report.
                      </p>
                    </GlassCard>
                  </motion.div>
                )}

                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <GlassCard className="p-8 text-center h-full flex flex-col items-center justify-center min-h-[24rem]">
                      <Loader2 className="h-10 w-10 text-gold animate-spin mb-4" />
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        Analyzing your resume...
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Comparing against {targetRole} requirements
                      </p>
                    </GlassCard>
                  </motion.div>
                )}

                {analysis && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Score */}
                    <GlassCard className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
                            Overall fit score
                          </div>
                          <div className={cn("font-display text-5xl font-semibold", scoreColor)}>
                            {analysis.overallScore}
                            <span className="text-2xl text-muted-foreground">/100</span>
                          </div>
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/5">
                          {analysis.overallScore >= 75 ? (
                            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                          ) : (
                            <Target className="h-8 w-8 text-gold" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        For {targetRole} role. Scores are indicative; register for
                        a personalized consultation.
                      </p>
                    </GlassCard>

                    {/* Strengths */}
                    <GlassCard className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <h3 className="font-display text-sm font-semibold text-foreground">
                          Strengths
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {analysis.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                            <span className="font-mono text-[10px] text-emerald-400 mt-1">
                              ✓
                            </span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>

                    {/* Gaps */}
                    <GlassCard className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-gold" />
                        <h3 className="font-display text-sm font-semibold text-foreground">
                          Gaps to address
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {analysis.gaps.map((g, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                            <span className="font-mono text-[10px] text-gold mt-1">
                              !
                            </span>
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>

                    {/* Recommendations */}
                    <GlassCard className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="h-4 w-4 text-gold" />
                        <h3 className="font-display text-sm font-semibold text-foreground">
                          Recommendations
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {analysis.recommendations.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                            <ArrowRight className="h-3 w-3 text-gold mt-1 shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>

                    {/* Suggested roles */}
                    <GlassCard className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="h-4 w-4 text-gold" />
                        <h3 className="font-display text-sm font-semibold text-foreground">
                          Roles you may also fit
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.suggestedRoles.map((r, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-full border border-gold/30 bg-gold/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </GlassCard>

                    {/* CTA */}
                    <GlassCard className="p-5 border-gold/40">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="h-4 w-4 text-gold" />
                        <h3 className="font-display text-sm font-semibold text-foreground">
                          Ready to take the next step?
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        Register with GuardianX Launchpad for personalized role
                        matching and a consultation call.
                      </p>
                      <CTAButton onClick={() => onNavigate("register")} className="w-full justify-center">
                        Register Now, ₹2,000
                      </CTAButton>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
