"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Globe,
  ShieldCheck,
  ArrowUpRight,
  MessageSquare,
  Clock,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { CTAButton } from "../ui/CTAButton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactPageProps {
  onNavigate: (p: PageId) => void;
}

export function ContactPage({ onNavigate: _onNavigate }: ContactPageProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      toast({
        title: "Message sent",
        description: "Our team will get back to you within 2 business days.",
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

      {/* Hero — tighter */}
      <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5"
          >
            <Mail className="h-3.5 w-3.5 text-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Contact · Talk to Our Team
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]"
          >
            Let&apos;s talk
            <br />
            <span className="text-gradient-gold italic">about your career.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Have questions about the registration process, fee structure, or
            placement timeline? We encourage candidates to clarify any
            questions before proceeding. Reach out — our team responds within
            two business days.
          </motion.p>
        </div>
      </section>

      {/* Contact form + sidebar */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="relative p-8 sm:p-10 rounded-lg border border-border bg-card/40 backdrop-blur-sm">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 border border-gold/40">
                      <CheckCircle2 className="h-8 w-8 text-gold" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                      Message received.
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Thank you for reaching out. Our team will respond within
                      two business days at the email address you provided.
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-6"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "general",
                          message: "",
                        });
                      }}
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm text-foreground">
                          Full Name <span className="text-gold">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Your name"
                          required
                          className="bg-background/50 border-border focus:border-gold/60 focus-visible:ring-gold/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm text-foreground">
                          Email <span className="text-gold">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="you@example.com"
                          required
                          className="bg-background/50 border-border focus:border-gold/60 focus-visible:ring-gold/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm text-foreground">
                          Phone (optional)
                        </Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          placeholder="+91 ..."
                          className="bg-background/50 border-border focus:border-gold/60 focus-visible:ring-gold/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm text-foreground">
                          Topic
                        </Label>
                        <select
                          id="subject"
                          value={form.subject}
                          onChange={(e) =>
                            setForm({ ...form, subject: e.target.value })
                          }
                          className="w-full h-10 rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:border-gold/60 focus:outline-none focus-visible:ring-gold/20"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="admissions">Admissions &amp; Fees</option>
                          <option value="placements">Placements &amp; Roles</option>
                          <option value="partnership">Employer Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm text-foreground">
                        Message <span className="text-gold">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Tell us about your background, preferred location, and what you'd like to know..."
                        required
                        rows={6}
                        className="bg-background/50 border-border focus:border-gold/60 focus-visible:ring-gold/20 resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-muted-foreground">
                        By submitting, you agree to be contacted by GuardianX
                        Academy regarding your inquiry.
                      </p>
                      <CTAButton onClick={() => {}}>
                        {submitting ? (
                          <>
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                          </>
                        )}
                      </CTAButton>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-lg border border-border bg-card/30">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground mb-1">
                      Response Time
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We respond to all inquiries within two business days.
                      Registration-related questions are prioritised.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/company/guardianx-academy/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-lg border border-border bg-card/30 hover:border-gold/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                      <Linkedin className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground mb-1">
                        LinkedIn
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground group-hover:text-gold transition-colors">
                        /company/guardianx-academy
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
              </a>

              <a
                href="https://www.academy.guardianx.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-lg border border-border bg-card/30 hover:border-gold/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground mb-1">
                        GuardianX Recruitment
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground group-hover:text-gold transition-colors">
                        academy.guardianx.cloud
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
              </a>

              <a
                href="https://www.guardianx.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-lg border border-border bg-card/30 hover:border-gold/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground mb-1">
                        GuardianX Security
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground group-hover:text-gold transition-colors">
                        guardianx.in
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
              </a>

              <div className="p-6 rounded-lg border border-gold/20 bg-gold/[0.03]">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold/40 bg-gold/10 text-gold">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground mb-1">
                      Ready to register?
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      If your questions are answered, start your registration
                      today — the process takes about 5 minutes.
                    </p>
                    <CTAButton
                      onClick={() =>
                        (window.location.hash = "register")
                      }
                    >
                      Register Now — ₹2,000
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office / presence */}
      <section className="relative py-12 border-t border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Presence"
            title="GuardianX Recruitment"
            description="GuardianX Recruitment & Career Assistance Consultancy is the technology recruitment arm of the GuardianX family, alongside GuardianX Security."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-lg border border-border bg-card/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                  <Building2 className="h-4 w-4" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  GuardianX Recruitment
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Technology Recruitment &amp; Career Assistance Consultancy.
                We assist candidates in exploring technology job opportunities
                across every domain through our consultancy network.
              </p>
              <a
                href="https://www.academy.guardianx.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
              >
                academy.guardianx.cloud
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  GuardianX Security
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Our sibling property — GuardianX Security — focuses on
                cybersecurity services and solutions for enterprises.
              </p>
              <a
                href="https://www.guardianx.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
              >
                guardianx.in
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
