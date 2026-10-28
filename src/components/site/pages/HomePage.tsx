"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Briefcase,
  MapPin,
  Lock,
  Award,
  ArrowUpRight,
  Linkedin,
  Globe,
  CheckCircle2,
  FileCheck,
  Search,
  Handshake,
  Sparkles,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background, Noise } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { StatCard } from "../ui/StatCard";
import { ProcessFlow } from "../ui/ProcessFlow";
import { RoleCard } from "../ui/RoleCard";
import { CTAButton } from "../ui/CTAButton";

interface HomePageProps {
  onNavigate: (p: PageId) => void;
}

const valueProps = [
  {
    icon: Search,
    title: "Curated Cybersecurity Roles",
    description:
      "We work exclusively with cybersecurity positions — SOC analysts, penetration testers, GRC specialists, cloud security engineers, and threat intelligence roles across India. Your profile is matched against live requirements in our consultancy network, not generic job listings.",
  },
  {
    icon: MapPin,
    title: "Location-Aware Matching",
    description:
      "Share your preferred location — Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, or remote — and we prioritize opportunities that fit your geography. Relocation-friendly employers and remote-first security teams are part of the network.",
  },
  {
    icon: Handshake,
    title: "Consultancy-Driven Process",
    description:
      "We don't just forward CVs. Our team reviews your skills, qualifies you against employer requirements, prepares you for interviews, and stays engaged through offer negotiation. The consultancy fee structure keeps our incentives aligned with your placement.",
  },
  {
    icon: Lock,
    title: "Confidential & Compliant",
    description:
      "Client company names remain confidential during initial stages, subject to client agreements. Your data is shared only with employers actively considering your profile — never blasted to mailing lists or public job boards.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Register",
    description:
      "Complete registration with ₹2,000 fee. Share your skills, qualifications, experience, and preferred location.",
  },
  {
    step: "02",
    title: "Screening",
    description:
      "Our team reviews your profile and qualifies you against active openings in the consultancy network.",
  },
  {
    step: "03",
    title: "Consultancy Match",
    description:
      "We introduce relevant roles with details on employer, expectations, and employment terms at the right stage.",
  },
  {
    step: "04",
    title: "Placement",
    description:
      "Final selection happens via the employer's process. Upon offer, the agreed consultancy fee applies in two installments.",
  },
];

const roleCategories = [
  {
    title: "SOC Analyst",
    level: "Entry → Senior",
    description:
      "Monitor SIEM, triage alerts, hunt threats, and respond to incidents across cloud and on-prem environments.",
    skills: ["SIEM", "Splunk", "QRadar", "Threat Hunting"],
  },
  {
    title: "Penetration Tester",
    level: "Mid → Lead",
    description:
      "Conduct web app, network, mobile, and red team engagements. Write clear reports and remediation guidance.",
    skills: ["Burp Suite", "Metasploit", "OWASP", "Bash"],
  },
  {
    title: "GRC Specialist",
    level: "Mid → Manager",
    description:
      "Lead risk assessments, ISO 27001 / SOC 2 audits, policy design, and third-party risk programs.",
    skills: ["ISO 27001", "SOC 2", "NIST", "Risk"],
  },
  {
    title: "Cloud Security Engineer",
    level: "Mid → Senior",
    description:
      "Secure AWS / Azure / GCP workloads, implement CSPM, design zero-trust architectures, automate guardrails.",
    skills: ["AWS", "Azure", "Terraform", "CSPM"],
  },
  {
    title: "Threat Intelligence Analyst",
    level: "Mid → Senior",
    description:
      "Track adversaries, IOCs, and TTPs. Produce actionable intel reports for SOC and detection engineering.",
    skills: ["MITRE ATT&CK", "OSINT", "MISP", "Python"],
  },
  {
    title: "Application Security Engineer",
    level: "Mid → Senior",
    description:
      "Embed security in SDLC — threat modeling, SAST/DAST, secure code review, and developer enablement.",
    skills: ["SAST", "DAST", "Threat Modeling", "DevSecOps"],
  },
];

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Consultancy Partners",
    description: "Active cybersecurity employers across India",
  },
  {
    value: 12,
    suffix: "+",
    label: "Role Categories",
    description: "From SOC to red team and cloud security",
  },
  {
    value: 6,
    suffix: "+",
    label: "Tier-1 Cities",
    description: "Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai",
  },
  {
    value: 95,
    suffix: "%",
    label: "Profile Review Rate",
    description: "Of registered candidates screened within 5 business days",
  },
];

const offerings = [
  "Personalised recruitment assistance for cybersecurity roles",
  "Direct introductions to employers in our consultancy network",
  "Confidential matching — your profile is never spammed",
  "Transparent fee structure disclosed upfront before registration",
  "End-to-end coordination through offer and onboarding",
  "Preferred location prioritised during role matching",
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      <Background variant="hero" />
      <Noise />

      {/* Hero */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                Cybersecurity Recruitment · Now Accepting Profiles
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]"
            >
              Your gateway to
              <br />
              <span className="text-gradient-gold italic">cybersecurity</span>
              <br />
              careers that matter.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
            >
              GuardianX Academy connects skilled professionals with leading
              cybersecurity employers through our consultancy network. We
              match you based on skills, qualifications, experience, and
              preferred location — and stay engaged through every stage of the
              hiring process.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <CTAButton onClick={() => onNavigate("register")}>
                Begin Registration — ₹2,000
              </CTAButton>
              <CTAButton
                variant="ghost"
                onClick={() => onNavigate("placements")}
              >
                Explore Placements
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold" />
                Registration Fee ₹2,000
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold" />
                Transparent Fee Terms
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold" />
                Confidential Matching
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative py-12 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why GuardianX"
            title={
              <>
                Built for cybersecurity careers,
                <br />
                <span className="text-gradient-gold italic">not generic hiring.</span>
              </>
            }
            description="We specialise exclusively in cybersecurity recruitment. That means deeper role knowledge, stronger employer relationships, and a process designed around how security teams actually hire — not how generic job boards operate."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueProps.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative p-8 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:border-gold/40 transition-colors"
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                    <v.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process flow */}
      <section className="relative py-24 sm:py-32 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="How It Works"
            title="From registration to placement"
            description="A transparent four-step process that keeps you informed at every stage. Final selection and offer letters are subject to the employer's hiring process — but we coordinate with you end-to-end."
          />

          <div className="mt-20">
            <ProcessFlow steps={processSteps} />
          </div>

          <div className="mt-16 flex justify-center">
            <CTAButton onClick={() => onNavigate("admissions")}>
              See Full Admissions Process
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Role categories */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Role Categories"
            title={
              <>
                Cybersecurity roles we actively
                <br />
                <span className="text-gradient-gold italic">recruit for.</span>
              </>
            }
            description="Our consultancy network spans employers hiring across the full cybersecurity spectrum — from entry-level SOC analysts to senior red team leads and cloud security architects. Below is a representative sample of role categories we work with."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleCategories.map((r, i) => (
              <RoleCard key={r.title} {...r} index={i} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <CTAButton variant="ghost" onClick={() => onNavigate("placements")}>
              View All Placement Categories
            </CTAButton>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="relative py-24 sm:py-32 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="What You Get"
                title={
                  <>
                    A recruitment partner,
                    <br />
                    <span className="text-gradient-gold italic">not a job board.</span>
                  </>
                }
                description="For ₹2,000 registration, you get a curated, consultancy-driven job search — with our team advocating for you across the cybersecurity employer network. The post-placement fee only applies once you actually receive and accept an offer."
              />
              <div className="mt-8">
                <CTAButton onClick={() => onNavigate("register")}>
                  Register Now — ₹2,000
                </CTAButton>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-3">
                {offerings.map((o, i) => (
                  <motion.li
                    key={o}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-4 p-4 rounded-md border border-border bg-background/40 hover:border-gold/30 transition-colors"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-foreground/90">{o}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn + properties CTA */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-card/40 backdrop-blur-sm p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold/[0.08] blur-[120px]" />
              <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gold/[0.05] blur-[120px]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                    Connect With Us
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
                  Review our professional profile before you register.
                </h2>
                <p className="mt-6 text-base text-muted-foreground leading-relaxed">
                  We encourage every candidate to review our LinkedIn presence
                  and clarify any questions about the recruitment process and
                  payment terms before proceeding. Transparency is the
                  foundation of this engagement.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <CTAButton
                    href="https://www.linkedin.com/company/guardianx-academy/"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn Company Page
                  </CTAButton>
                  <CTAButton
                    variant="ghost"
                    onClick={() => onNavigate("contact")}
                  >
                    Ask a Question
                  </CTAButton>
                </div>
              </div>

              <div className="grid gap-4">
                <a
                  href="https://www.academy.guardianx.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-6 rounded-lg border border-border bg-background/40 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                      <Award className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="font-display text-base font-semibold text-foreground">
                        GuardianX Academy
                      </div>
                      <div className="font-mono text-xs text-muted-foreground mt-1">
                        academy.guardianx.cloud
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                </a>
                <a
                  href="https://www.guardianx.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-6 rounded-lg border border-border bg-background/40 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                      <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="font-display text-base font-semibold text-foreground">
                        GuardianX Security
                      </div>
                      <div className="font-mono text-xs text-muted-foreground mt-1">
                        guardianx.in
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
