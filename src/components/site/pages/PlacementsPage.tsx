"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Lock,
  ShieldCheck,
  Network,
  TrendingUp,
  Award,
  ArrowUpRight,
  Linkedin,
  Users,
  CheckCircle2,
  Eye,
  FileSignature,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { CTAButton } from "../ui/CTAButton";
import { RoleCard } from "../ui/RoleCard";
import { StatCard } from "../ui/StatCard";

interface PlacementsPageProps {
  onNavigate: (p: PageId) => void;
}

const roleCategories = [
  {
    title: "SOC Analyst (L1–L3)",
    level: "Entry → Senior",
    description:
      "Monitor SIEM platforms, triage security alerts, perform initial incident response, and contribute to threat hunting programs. L1 analysts handle alert triage; L3 leads investigate complex incidents and mentor junior analysts.",
    skills: ["Splunk", "QRadar", "Sentinel", "MITRE ATT&CK"],
  },
  {
    title: "Penetration Tester",
    level: "Mid → Lead",
    description:
      "Conduct web application, network, mobile, and API penetration tests. Lead red team engagements, write detailed technical reports, and provide remediation guidance to development teams. Certifications like OSCP, OSWE, or CRTO preferred.",
    skills: ["Burp Suite", "Metasploit", "OWASP", "Bash"],
  },
  {
    title: "GRC Specialist",
    level: "Mid → Manager",
    description:
      "Lead risk assessments, compliance audits (ISO 27001, SOC 2, PCI DSS, HIPAA), policy design, and third-party risk programs. Excellent communication and stakeholder management skills are essential for these client-facing roles.",
    skills: ["ISO 27001", "SOC 2", "NIST CSF", "Risk Quant"],
  },
  {
    title: "Cloud Security Engineer",
    level: "Mid → Senior",
    description:
      "Secure AWS, Azure, and GCP workloads. Implement CSPM, design zero-trust architectures, automate security guardrails via IaC, and partner with platform teams on secure-by-default patterns.",
    skills: ["AWS Security", "Azure", "Terraform", "CSPM"],
  },
  {
    title: "Threat Intelligence Analyst",
    level: "Mid → Senior",
    description:
      "Track adversaries, IOCs, and TTPs relevant to your industry. Produce actionable intelligence reports for SOC, detection engineering, and executive stakeholders. Experience with MITRE ATT&CK, MISP, and commercial intel feeds preferred.",
    skills: ["MITRE ATT&CK", "OSINT", "MISP", "Python"],
  },
  {
    title: "Application Security Engineer",
    level: "Mid → Senior",
    description:
      "Embed security into the SDLC — threat modeling, SAST/DAST tuning, secure code review, and developer enablement. Partner with engineering to ship secure features without slowing velocity.",
    skills: ["SAST", "DAST", "Threat Modeling", "DevSecOps"],
  },
  {
    title: "Identity & Access Management",
    level: "Mid → Senior",
    description:
      "Design and operate IAM platforms — Okta, Azure AD, Ping. Implement SSO, MFA, privileged access management, and just-in-time access workflows. Drive zero-trust identity architecture.",
    skills: ["Okta", "Azure AD", "PAM", "SAML"],
  },
  {
    title: "Detection & Response Engineer",
    level: "Mid → Senior",
    description:
      "Build detection content, tune SIEM rules, write automation for incident response, and partner with SOC on complex investigations. Strong scripting (Python, KQL, SPL) and attacker mindset required.",
    skills: ["Python", "KQL", "SPL", "SOAR"],
  },
  {
    title: "Security Architect",
    level: "Senior → Lead",
    description:
      "Design end-to-end security architectures for enterprise environments. Define security standards, review infrastructure designs, and lead strategic security initiatives across cloud and on-prem.",
    skills: ["Architecture", "Zero Trust", "Cloud", "Strategy"],
  },
];

const placementStats = [
  {
    value: 50,
    suffix: "+",
    label: "Employer Partners",
    description: "Active cybersecurity employers in our consultancy network",
  },
  {
    value: 12,
    suffix: "+",
    label: "Role Categories",
    description: "From SOC analysts to security architects",
  },
  {
    value: 6,
    suffix: "+",
    label: "Tier-1 Cities",
    description: "Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai",
  },
  {
    value: 5,
    suffix: " days",
    label: "Profile Review",
    description: "Average time to first screening call after registration",
  },
];

const recruitmentProcess = [
  {
    step: "01",
    title: "Profile Activation",
    description:
      "After registration and ₹2,000 fee payment, your profile is activated in our consultancy network. Our team reviews your skills, qualifications, and preferences within five business days.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    step: "02",
    title: "Consultancy Matching",
    description:
      "We match your profile against active openings. When a fit is identified, we share relevant role details, employment terms, and expectations with you at the appropriate stage.",
    icon: <Network className="h-6 w-6" />,
  },
  {
    step: "03",
    title: "Employer Introduction",
    description:
      "Subject to client agreements, we introduce your profile to the employer. Company names may remain confidential during initial stages — full employer details shared when you are shortlisted.",
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    step: "04",
    title: "Interview Coordination",
    description:
      "We coordinate interview scheduling, prepare you with employer briefings, and debrief after each round. Our team stays engaged through every stage of the employer's hiring process.",
    icon: <FileSignature className="h-6 w-6" />,
  },
  {
    step: "05",
    title: "Offer & Onboarding",
    description:
      "Upon successful selection, we coordinate offer letter issuance. The first consultancy installment (one month's salary) becomes payable at this stage, with the second upon your first salary.",
    icon: <Award className="h-6 w-6" />,
  },
];

const confidentialityPoints = [
  "Specific client company names may remain confidential during initial stages, subject to client agreements.",
  "Relevant role details, employment terms, and expectations are shared with you at the appropriate stage of the process.",
  "Your candidate profile is shared only with employers actively considering you — never with public job boards or mailing lists.",
  "You will be informed of the employer identity before any interview is scheduled, with sufficient time to review the opportunity.",
  "We respect candidate privacy — your current employer is never notified of your job search without your explicit consent.",
];

export function PlacementsPage({ onNavigate }: PlacementsPageProps) {
  return (
    <>
      <Background variant="hero" />

      {/* Hero */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5"
          >
            <Briefcase className="h-3.5 w-3.5 text-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Placements · Recruitment Assistance
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]"
          >
            Placement
            <br />
            <span className="text-gradient-gold italic">Assistance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            We coordinate with our consultancy network to help candidates
            explore relevant cybersecurity roles and understand the recruitment
            process. Final selection and offer letters are subject to the
            employer&apos;s hiring process — but we stay engaged end-to-end.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <CTAButton onClick={() => onNavigate("register")}>
              Register for Placement
            </CTAButton>
            <CTAButton variant="ghost" onClick={() => onNavigate("admissions")}>
              View Admissions
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-12 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {placementStats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 0.08} />
            ))}
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
            description="Our consultancy network spans employers hiring across the full cybersecurity spectrum. Below is a representative sample of role categories we coordinate placements for — from entry-level SOC analysts to senior security architects."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleCategories.map((r, i) => (
              <RoleCard key={r.title} {...r} index={i} />
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg border border-border bg-card/30 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="text-gold font-medium">Note:</span> This is a
              representative list. New role categories are added as our
              consultancy network expands. Register to be notified of openings
              matching your profile.
            </p>
          </div>
        </div>
      </section>

      {/* Recruitment process */}
      <section className="relative py-24 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Recruitment Process"
            title="How we coordinate placements"
            description="A transparent five-stage process — from profile activation to offer and onboarding. We work alongside the employer's hiring process, advocating for you at every step."
          />

          <div className="mt-20 grid gap-8 md:grid-cols-5">
            {recruitmentProcess.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col"
              >
                {/* Vertical connector */}
                {i < recruitmentProcess.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[3.25rem] right-[-2rem] h-px bg-gradient-to-r from-gold/40 to-transparent" />
                )}

                <div className="relative mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-card/80 backdrop-blur-sm text-gold">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-gold/60 bg-background">
                    <span className="font-mono text-[10px] text-gold">
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Confidentiality policy */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 mb-5">
                <Lock className="h-4 w-4 text-gold" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                  Confidentiality Policy
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
                Company confidentiality,
                <br />
                <span className="text-gradient-gold italic">candidate privacy.</span>
              </h2>
              <p className="mt-6 text-base text-muted-foreground leading-relaxed">
                Many employers in our network require discretion during the
                initial stages of recruitment. We balance that with your right
                to make informed decisions — full employer details are always
                shared before any interview is scheduled.
              </p>
              <div className="mt-8">
                <CTAButton onClick={() => onNavigate("register")}>
                  Register Now
                </CTAButton>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-3">
                {confidentialityPoints.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-4 p-5 rounded-md border border-border bg-card/30 hover:border-gold/30 transition-colors"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Eye className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-foreground/90 leading-relaxed">{p}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn CTA */}
      <section className="relative py-24 border-t border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-card/40 backdrop-blur-sm p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold/[0.08] blur-[120px]" />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
                  See who we are
                  <br />
                  <span className="text-gradient-gold italic">before you register.</span>
                </h2>
                <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
                  We encourage candidates to review our professional LinkedIn
                  presence and clarify any questions about the recruitment
                  process and payment terms before proceeding.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <CTAButton href="https://www.linkedin.com/company/guardianx-academy/">
                  <Linkedin className="h-4 w-4" />
                  Follow on LinkedIn
                </CTAButton>
                <CTAButton variant="ghost" onClick={() => onNavigate("contact")}>
                  Ask a Question
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
