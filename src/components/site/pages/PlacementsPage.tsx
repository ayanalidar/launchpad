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
  Eye,
  FileSignature,
  Cpu,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { CTAButton } from "../ui/CTAButton";
import { RoleCard } from "../ui/RoleCard";
import { StatCard } from "../ui/StatCard";
import { SectionDivider } from "../ui/SectionDivider";
import { FloatingOrbs } from "../ui/FloatingOrbs";
import { GlassCard } from "../ui/GlassCard";
import { SalaryBandChart } from "../ui/SalaryBandChart";
import { PlacementTicker } from "../ui/PlacementTicker";

interface PlacementsPageProps {
  onNavigate: (p: PageId) => void;
  navigateToRole: (slug: string) => void;
}

const roleCategories = [
  {
    title: "Cybersecurity Analyst",
    slug: "cybersecurity-analyst",
    level: "Entry → Senior",
    description:
      "SOC monitoring, threat hunting, vulnerability assessment, GRC, and penetration testing roles across cloud and on-prem environments. Certifications like Security+, CEH, OSCP preferred.",
    skills: ["SIEM", "Splunk", "MITRE", "ISO 27001"],
  },
  {
    title: "Software Engineer",
    slug: "software-engineer",
    level: "Entry → Lead",
    description:
      "Backend, frontend, and full-stack engineering across Java, Python, Go, Node.js, and modern TypeScript stacks. System design and code quality expectations vary by seniority.",
    skills: ["Java", "Python", "Go", "React"],
  },
  {
    title: "Cloud / DevOps Engineer",
    slug: "cloud-devops",
    level: "Mid → Senior",
    description:
      "AWS, Azure, GCP platform engineering, infrastructure-as-code, Kubernetes operations, and CI/CD pipeline ownership. Strong Linux and networking fundamentals expected.",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
  },
  {
    title: "AI / ML Engineer",
    slug: "ai-ml-engineer",
    level: "Mid → Senior",
    description:
      "Model training, MLOps, LLM applications, computer vision, and NLP roles across product and research teams. Hands-on PyTorch or TensorFlow experience essential.",
    skills: ["PyTorch", "LLMs", "MLOps", "Python"],
  },
  {
    title: "Data Engineer",
    slug: "data-engineer",
    level: "Mid → Senior",
    description:
      "Pipelines, data warehouses, lakehouse architecture, streaming platforms, and analytics engineering with dbt. SQL fluency and distributed systems exposure expected.",
    skills: ["Spark", "Snowflake", "Airflow", "SQL"],
  },
  {
    title: "Product Designer",
    slug: "product-designer",
    level: "Mid → Lead",
    description:
      "UX research, interaction design, design systems, and product strategy for B2B and consumer tech products. Strong portfolio of end-to-end product work required.",
    skills: ["Figma", "Design Systems", "Research", "Prototyping"],
  },
  {
    title: "Mobile Engineer",
    slug: "mobile-engineer",
    level: "Mid → Senior",
    description:
      "iOS (Swift), Android (Kotlin), and cross-platform (React Native, Flutter) engineering. Performance tuning, offline-first, and platform API fluency expected.",
    skills: ["Swift", "Kotlin", "React Native", "Flutter"],
  },
  {
    title: "Site Reliability Engineer",
    slug: "site-reliability-engineer",
    level: "Mid → Senior",
    description:
      "Production reliability, observability, incident response, and platform automation. Strong coding skills and distributed systems understanding required.",
    skills: ["Prometheus", "Go", "Kubernetes", "Observability"],
  },
  {
    title: "QA / Test Engineer",
    slug: "qa-test-engineer",
    level: "Entry → Senior",
    description:
      "Test automation, integration testing, performance testing, and quality engineering embedded in product teams. Cypress, Playwright, and Python proficiency valued.",
    skills: ["Cypress", "Playwright", "Python", "Automation"],
  },
  {
    title: "Engineering Manager",
    slug: "engineering-manager",
    level: "Senior → Director",
    description:
      "Team leadership, technical strategy, hiring, and delivery ownership for engineering teams. People leadership and architecture decision-making experience expected.",
    skills: ["Leadership", "Architecture", "Hiring", "Strategy"],
  },
  {
    title: "Product Manager",
    slug: "product-manager",
    level: "Mid → Director",
    description:
      "Discovery, roadmap, execution, and stakeholder management for B2B and consumer products. Strong analytical skills and technical fluency required.",
    skills: ["Discovery", "Roadmap", "Analytics", "Stakeholders"],
  },
  {
    title: "Platform Engineer",
    slug: "platform-engineer",
    level: "Mid → Senior",
    description:
      "Internal developer platforms, infrastructure tooling, service frameworks, and developer experience. API design and distributed systems exposure expected.",
    skills: ["Platform", "Go", "Kubernetes", "API Design"],
  },
];

const placementStats = [
  {
    value: 50,
    suffix: "+",
    label: "Employer Partners",
    description: "Active technology employers in our consultancy network",
  },
  {
    value: 15,
    suffix: "+",
    label: "Tech Domains",
    description: "From engineering to design, security, and data",
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
      "We match your profile against active openings across every technology domain. When a fit is identified, we share relevant role details, employment terms, and expectations with you at the appropriate stage.",
    icon: <Network className="h-6 w-6" />,
  },
  {
    step: "03",
    title: "Employer Introduction",
    description:
      "Subject to client agreements, we introduce your profile to the employer. Company names may remain confidential during initial stages, full employer details shared when you are shortlisted.",
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
    title: "Offer &amp; Onboarding",
    description:
      "Upon successful selection, we coordinate offer letter issuance. The post-placement consultancy fee terms, discussed with you after registration, apply at this stage.",
    icon: <Award className="h-6 w-6" />,
  },
];

const confidentialityPoints = [
  "Specific client company names may remain confidential during initial stages, subject to client agreements.",
  "Relevant role details, employment terms, and expectations are shared with you at the appropriate stage of the process.",
  "Your candidate profile is shared only with employers actively considering you, never with public job boards or mailing lists.",
  "You will be informed of the employer identity before any interview is scheduled, with sufficient time to review the opportunity.",
  "We respect candidate privacy, your current employer is never notified of your job search without your explicit consent.",
];

export function PlacementsPage({ onNavigate, navigateToRole }: PlacementsPageProps) {
  return (
    <>
      <Background variant="hero" />

      {/* Hero, tighter */}
      <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-12">
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
            className="mt-6 font-display font-semibold tracking-tight text-foreground leading-[1.05] text-[clamp(2.25rem,6vw,3.75rem)]"
          >
            Placement
            <br />
            <span className="text-gradient-gold italic">Assistance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            We coordinate with our consultancy network to help candidates
            explore relevant technology roles across every domain, and
            understand the recruitment process. Final selection and offer
            letters are subject to the employer&apos;s hiring process, but we
            stay engaged end-to-end.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
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

      {/* Live placement ticker */}
      <section className="relative py-6 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-5" staticHighlight>
            <PlacementTicker />
          </GlassCard>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {placementStats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* Salary insights */}
      <section className="relative py-8 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-6 sm:p-8" staticHighlight>
            <SalaryBandChart />
          </GlassCard>
        </div>
      </section>

      {/* Role categories, broader tech scope */}
      <section className="relative py-12 sm:py-16">
        <FloatingOrbs count={2} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Role Categories"
            title={
              <>
                Tech roles we actively
                <br />
                <span className="text-gradient-gold italic">recruit for.</span>
              </>
            }
            description="Our consultancy network spans employers hiring across the full technology spectrum. Below is a representative sample of role categories we coordinate placements for, from entry-level engineers to senior leaders."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roleCategories.map((r, i) => (
              <RoleCard
                key={r.title}
                {...r}
                index={i}
                onClick={() => r.slug && navigateToRole(r.slug)}
              />
            ))}
          </div>

          <div className="mt-8 p-5 rounded-lg border border-border bg-card/30 flex items-start gap-3">
            <Cpu className="h-4 w-4 text-gold shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="text-gold font-medium">Note:</span> This is a
              representative list. New role categories are added as our
              consultancy network expands. Register to be notified of openings
              matching your profile.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider label="Process" className="my-2" />

      {/* Recruitment process */}
      <section className="relative py-12 sm:py-16 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Recruitment Process"
            title="How we coordinate placements"
            description="A transparent five-stage process, from profile activation to offer and onboarding. We work alongside the employer's hiring process, advocating for you at every step."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-5">
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
                  <div className="hidden md:block absolute top-7 left-[3.25rem] right-[-1.5rem] h-px bg-gradient-to-r from-gold/40 to-transparent" />
                )}

                <div className="relative mb-4">
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
                  <span dangerouslySetInnerHTML={{ __html: step.title }} />
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Confidentiality policy */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 mb-4">
                <Lock className="h-4 w-4 text-gold" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                  Confidentiality Policy
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
                Company confidentiality,
                <br />
                <span className="text-gradient-gold italic">candidate privacy.</span>
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Many employers in our network require discretion during the
                initial stages of recruitment. We balance that with your right
                to make informed decisions, full employer details are always
                shared before any interview is scheduled.
              </p>
              <div className="mt-6">
                <CTAButton onClick={() => onNavigate("register")}>
                  Register Now
                </CTAButton>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-2.5">
                {confidentialityPoints.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-4 p-4 rounded-md border border-border bg-card/30 hover:border-gold/30 transition-colors"
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
      <section className="relative py-12 sm:py-16 border-t border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-card/40 backdrop-blur-sm p-8 sm:p-10 lg:p-12">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold/[0.08] blur-[120px]" />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
                  See who we are
                  <br />
                  <span className="text-gradient-gold italic">before you register.</span>
                </h2>
                <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
                  We encourage candidates to review our professional LinkedIn
                  presence and clarify any questions about the recruitment
                  process and fee terms before proceeding.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
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
