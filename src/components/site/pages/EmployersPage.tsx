"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Clock,
  Target,
  Sparkles,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { CTAButton } from "../ui/CTAButton";
import { GlassCard } from "../ui/GlassCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface EmployersPageProps {
  onNavigate: (p: PageId) => void;
}

const BENEFITS = [
  {
    icon: Users,
    title: "Pre-screened, qualified candidates",
    description:
      "Every candidate we send has been reviewed by our team for technical fit, communication, and culture match. You only meet candidates worth interviewing.",
  },
  {
    icon: Zap,
    title: "Faster time-to-hire",
    description:
      "Our average time from role brief to first interview is 5 business days. Most placements close within 3-4 weeks.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential & compliant",
    description:
      "We respect NDAs and confidentiality requirements. Candidate profiles are shared only with your explicit approval, never publicly listed.",
  },
  {
    icon: TrendingUp,
    title: "Performance-based fees",
    description:
      "Our consultancy fee is post-placement, aligned with successful hires. We win only when you win.",
  },
];

const STATS = [
  { value: "5 days", label: "Avg time to first interview" },
  { value: "85%", label: "Candidate acceptance rate" },
  { value: "12+", label: "Tech domains covered" },
  { value: "50+", label: "Active employer partners" },
];

export function EmployersPage({ onNavigate }: EmployersPageProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    role: "",
    openings: "1-3",
    timeline: "1-3 months",
    details: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.name || !form.email || !form.role) {
      toast({
        title: "Please complete the form",
        description: "Company, name, email, and role are required.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.name} (${form.company})`,
          email: form.email,
          subject: "employer_partnership",
          message: `Role: ${form.role}\nOpenings: ${form.openings}\nTimeline: ${form.timeline}\n\n${form.details}`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      toast({
        title: "Request received",
        description: "Our team will reach out within 1 business day.",
      });
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
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
            <Building2 className="h-3.5 w-3.5 text-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              For Employers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]"
          >
            Hire technology
            <br />
            <span className="text-gradient-gold italic">talent that ships.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Partner with GuardianX Launchpad to hire pre-screened technology
            professionals across every domain. Performance-based fees, confidential
            process, fast time-to-hire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <CTAButton onClick={() =>
              document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" })
            }>
              <Briefcase className="h-4 w-4" />
              Submit Hiring Request
            </CTAButton>
            <CTAButton variant="ghost" onClick={() => onNavigate("placements")}>
              View Candidate Pool
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-8 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="font-display text-3xl sm:text-4xl font-semibold text-gradient-gold">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why partner with us"
            title={
              <>
                Hiring built for
                <br />
                <span className="text-gradient-gold italic">tech teams.</span>
              </>
            }
            description="Stop sifting through irrelevant CVs. We send you the 3 best matches for each role, not 30 maybes."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {BENEFITS.map((b, i) => (
              <GlassCard key={b.title} className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                      <b.icon className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground mb-1.5">
                        {b.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-16 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="From brief to hire in 4 steps"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Share role brief", icon: Briefcase, desc: "Tell us the role, must-have skills, and team context." },
              { step: "02", title: "We screen & shortlist", icon: Target, desc: "Our team reviews candidates and sends you the top 3-5 matches." },
              { step: "03", title: "You interview", icon: Users, desc: "We coordinate scheduling and prep candidates for your rounds." },
              { step: "04", title: "Hire & onboard", icon: CheckCircle2, desc: "Final selection, offer, and onboarding. Fee applies on hire." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-gold mb-1">
                  Step {s.step}
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner form */}
      <section id="partner-form" className="relative py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Get started"
            title="Submit a hiring request"
            description="Tell us what you're hiring for. We'll respond within 1 business day with candidate availability and next steps."
          />
          <div className="mt-10">
            {submitted ? (
              <GlassCard className="p-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 border border-gold/40">
                  <CheckCircle2 className="h-8 w-8 text-gold" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  Request received.
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Our team will reach out within 1 business day at{" "}
                  <span className="text-gold">{form.email}</span> to schedule a
                  consultation call.
                </p>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Company name <span className="text-gold">*</span>
                      </Label>
                      <Input
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Acme Inc."
                        required
                        className="bg-background/50 border-border focus:border-gold/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Your name <span className="text-gold">*</span>
                      </Label>
                      <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Hiring manager name"
                        required
                        className="bg-background/50 border-border focus:border-gold/60"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Work email <span className="text-gold">*</span>
                      </Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@acme.com"
                        required
                        className="bg-background/50 border-border focus:border-gold/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">
                        Role you&apos;re hiring for <span className="text-gold">*</span>
                      </Label>
                      <Input
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="Senior Software Engineer"
                        required
                        className="bg-background/50 border-border focus:border-gold/60"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-sm">Number of openings</Label>
                      <select
                        value={form.openings}
                        onChange={(e) => setForm({ ...form, openings: e.target.value })}
                        className="w-full h-10 rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:border-gold/60 focus:outline-none"
                      >
                        <option value="1-3">1-3</option>
                        <option value="4-10">4-10</option>
                        <option value="10+">10+</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Hiring timeline</Label>
                      <select
                        value={form.timeline}
                        onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                        className="w-full h-10 rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:border-gold/60 focus:outline-none"
                      >
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="immediate">Immediate</option>
                        <option value="exploratory">Just exploring</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Additional details</Label>
                    <Textarea
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      placeholder="Must-have skills, team size, location, work mode, salary range..."
                      rows={4}
                      className="bg-background/50 border-border focus:border-gold/60 resize-none"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-muted-foreground">
                      We respond within 1 business day.
                    </p>
                    <CTAButton onClick={() => {}}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                        </>
                      )}
                    </CTAButton>
                  </div>
                </form>
              </GlassCard>
            )}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative py-12 border-t border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-5 w-5 text-gold mx-auto mb-3" />
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Trusted by 50+ technology employers across India, from SaaS
            unicorns to enterprise security firms. Join the network.
          </p>
        </div>
      </section>
    </>
  );
}
