"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Circle,
  Mail,
  Loader2,
  TrendingUp,
  Briefcase,
  MapPin,
  Lock,
  FileText,
  Sparkles,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { CTAButton } from "../ui/CTAButton";
import { GlassCard } from "../ui/GlassCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface DashboardPageProps {
  onNavigate: (p: PageId) => void;
}

interface DashboardData {
  registration: {
    id: string;
    fullName: string;
    email: string;
    preferredRoleCategory: string | null;
    preferredLocation: string | null;
    workMode: string | null;
    experienceYears: number;
    paymentStatus: string;
    createdAt: string;
  };
  timeline: Array<{
    step: number;
    label: string;
    description: string;
    status: "complete" | "in_progress" | "pending";
    timestamp: string | null;
  }>;
  matchedRoles: Array<{
    title: string;
    company: string;
    location: string;
    salary: string;
    matchScore: number;
    postedAgo: string;
    status: "new" | "shortlisted" | "interviewing";
  }>;
  feeStructure: {
    registrationFee: number;
    registrationFeePaid: boolean;
    postPlacementFee: {
      type: string;
      description: string;
      schedule: Array<{
        label: string;
        timing: string;
        amount: string;
        status: string;
      }>;
    };
  };
}

export function DashboardPage({ onNavigate: _onNavigate }: DashboardPageProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(
        `/api/dashboard?email=${encodeURIComponent(email)}`
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Lookup failed");
      setData(json);
      toast({
        title: "Dashboard loaded",
        description: `Welcome back, ${json.registration.fullName.split(" ")[0]}.`,
      });
    } catch (err) {
      setError((err as Error).message);
      toast({
        title: "Lookup failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <LayoutDashboard className="h-3.5 w-3.5 text-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Candidate Dashboard
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]"
          >
            Your career
            <br />
            <span className="text-gradient-gold italic">command center.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Track your registration status, view matched roles, and access the
            post-placement fee structure discussed during your consultation call.
          </motion.p>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {!data ? (
            <GlassCard className="p-8 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                Access your dashboard
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Enter the email you used during registration to view your
                application status.
              </p>
              <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-background/50 border-border focus:border-gold/60"
                  />
                </div>
                <CTAButton onClick={() => {}}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      View Dashboard
                    </>
                  )}
                </CTAButton>
              </form>
              {error && (
                <p className="mt-4 text-sm text-destructive">{error}</p>
              )}
              <p className="mt-6 text-xs text-muted-foreground">
                Haven&apos;t registered yet?{" "}
                <button
                  onClick={() => (window.location.hash = "register")}
                  className="text-gold hover:underline"
                >
                  Start your registration
                </button>
              </p>
            </GlassCard>
          ) : (
            <div className="space-y-6">
              {/* Welcome card */}
              <GlassCard className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
                      Welcome back
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-foreground">
                      {data.registration.fullName}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {data.registration.preferredRoleCategory || "Tech candidate"} ·{" "}
                      {data.registration.preferredLocation || "Location TBD"} ·{" "}
                      {data.registration.workMode || "Mode TBD"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5 self-start">
                    {data.registration.paymentStatus === "paid" ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Clock className="h-3.5 w-3.5 text-gold" />
                    )}
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gold">
                      {data.registration.paymentStatus === "paid"
                        ? "Registration Active"
                        : "Payment Pending"}
                    </span>
                  </div>
                </div>
              </GlassCard>

              {/* Timeline */}
              <GlassCard className="p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                  Application timeline
                </h3>
                <div className="space-y-4">
                  {data.timeline.map((t, i) => (
                    <motion.div
                      key={t.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="relative">
                        {t.status === "complete" && (
                          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                        )}
                        {t.status === "in_progress" && (
                          <Loader2 className="h-6 w-6 text-gold animate-spin" />
                        )}
                        {t.status === "pending" && (
                          <Circle className="h-6 w-6 text-muted-foreground/50" />
                        )}
                        {i < data.timeline.length - 1 && (
                          <div
                            className={cn(
                              "absolute top-7 left-1/2 -translate-x-1/2 w-px h-12",
                              t.status === "complete"
                                ? "bg-emerald-400/40"
                                : "bg-border"
                            )}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-3">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-medium text-foreground">{t.label}</h4>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                            {t.status === "complete"
                              ? "Complete"
                              : t.status === "in_progress"
                              ? "In Progress"
                              : "Pending"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t.description}
                        </p>
                        {t.timestamp && (
                          <p className="text-xs text-muted-foreground/70 mt-1 font-mono">
                            {new Date(t.timestamp).toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Matched roles */}
              <GlassCard className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Matched roles
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {data.matchedRoles.length} active
                  </span>
                </div>
                <div className="space-y-3">
                  {data.matchedRoles.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="group flex items-center justify-between gap-4 p-4 rounded-lg border border-border bg-background/40 hover:border-gold/30 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Briefcase className="h-3.5 w-3.5 text-gold" />
                          <span className="font-medium text-foreground truncate">
                            {r.title}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {r.location}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {r.company} · {r.salary} · {r.postedAgo}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="font-mono text-xs text-gold">
                            {r.matchScore}% match
                          </div>
                          <div className="font-mono text-[10px] text-muted-foreground uppercase">
                            {r.status}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Fee structure (disclosed after registration) */}
              <GlassCard className="p-6 sm:p-8 border-gold/30">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="h-4 w-4 text-gold" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Post-placement fee structure
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {data.feeStructure.postPlacementFee.description}
                </p>
                <div className="space-y-3">
                  {data.feeStructure.postPlacementFee.schedule.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border bg-background/40"
                    >
                      <div>
                        <div className="font-medium text-foreground">{s.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {s.timing}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs text-gold uppercase">
                          {s.amount}
                        </div>
                        <div className="font-mono text-[10px] text-muted-foreground uppercase mt-0.5">
                          {s.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg border border-gold/20 bg-gold/[0.03] flex items-start gap-3">
                  <Sparkles className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Our team will walk you through these terms in detail during
                    your consultation call. Have questions before then? Reach
                    out via the Contact page.
                  </p>
                </div>
              </GlassCard>

              {/* Next steps */}
              <GlassCard className="p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Next steps
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => (window.location.hash = "placements")}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border bg-background/40 hover:border-gold/30 transition-colors text-left"
                  >
                    <TrendingUp className="h-4 w-4 text-gold shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        Browse placement categories
                      </div>
                      <div className="text-xs text-muted-foreground">
                        See all roles we recruit for
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => (window.location.hash = "contact")}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border bg-background/40 hover:border-gold/30 transition-colors text-left"
                  >
                    <FileText className="h-4 w-4 text-gold shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        Talk to your consultant
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Questions about your matches?
                      </div>
                    </div>
                  </button>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
