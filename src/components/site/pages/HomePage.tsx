"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Search,
  MapPin,
  Handshake,
  Lock,
  CheckCircle2,
  ArrowUpRight,
  Linkedin,
  Sparkles,
  Briefcase,
  Layers,
  Users,
  Cpu,
  Zap,
  TrendingUp,
  Award,
  GraduationCap,
  Rocket,
  Building2,
  Target,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background, Noise } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { StatCard } from "../ui/StatCard";
import { ProcessFlow } from "../ui/ProcessFlow";
import { RoleCard } from "../ui/RoleCard";
import { CTAButton } from "../ui/CTAButton";
import { HeroIllustration } from "../ui/HeroIllustration";
import { DomainMarquee } from "../ui/DomainMarquee";
import { SectionDivider } from "../ui/SectionDivider";
import { BentoCard } from "../ui/BentoCard";
import { EmailCaptureBar } from "../ui/EmailCaptureBar";
import { OurFamilyStrip } from "../ui/OurFamilyStrip";
import { FloatingOrbs } from "../ui/FloatingOrbs";
import {
  PlacementsCarousel,
  type PlacementStory,
} from "../ui/PlacementsCarousel";

interface HomePageProps {
  onNavigate: (p: PageId) => void;
}

const valueProps = [
  {
    icon: Search,
    title: "Curated Tech Roles",
    description:
      "We work across every domain of technology, from cybersecurity and software engineering to cloud, AI/ML, data, design, and platform roles. Your profile is matched against live requirements in our consultancy network, not generic job listings.",
  },
  {
    icon: MapPin,
    title: "Location-Aware Matching",
    description:
      "Share your preferred location, Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, or remote, and we prioritise opportunities that fit your geography. Relocation-friendly employers and remote-first teams are part of the network.",
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
      "Client company names remain confidential during initial stages, subject to client agreements. Your data is shared only with employers actively considering your profile, never blasted to mailing lists or public job boards.",
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
      "Final selection happens via the employer's process. Post-placement consultancy fee terms apply as agreed.",
  },
];

const roleCategories = [
  {
    title: "Cybersecurity Analyst",
    level: "Entry → Senior",
    description:
      "SOC, threat hunting, vulnerability assessment, GRC, and penetration testing roles across cloud and on-prem environments.",
    skills: ["SIEM", "Splunk", "MITRE", "ISO 27001"],
  },
  {
    title: "Software Engineer",
    level: "Entry → Lead",
    description:
      "Backend, frontend, and full-stack engineering across Java, Python, Go, Node.js, and modern TypeScript stacks.",
    skills: ["Java", "Python", "Go", "React"],
  },
  {
    title: "Cloud / DevOps Engineer",
    level: "Mid → Senior",
    description:
      "AWS, Azure, GCP platform engineering, infrastructure-as-code, Kubernetes operations, and CI/CD pipeline ownership.",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
  },
  {
    title: "AI / ML Engineer",
    level: "Mid → Senior",
    description:
      "Model training, MLOps, LLM applications, computer vision, and NLP roles across product and research teams.",
    skills: ["PyTorch", "LLMs", "MLOps", "Python"],
  },
  {
    title: "Data Engineer",
    level: "Mid → Senior",
    description:
      "Pipelines, data warehouses, lakehouse architecture, streaming platforms, and analytics engineering with dbt.",
    skills: ["Spark", "Snowflake", "Airflow", "SQL"],
  },
  {
    title: "Product Designer",
    level: "Mid → Lead",
    description:
      "UX research, interaction design, design systems, and product strategy for B2B and consumer tech products.",
    skills: ["Figma", "Design Systems", "Research", "Prototyping"],
  },
];

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Consultancy Partners",
    description: "Active tech employers across India",
    icon: Building2,
  },
  {
    value: 15,
    suffix: "+",
    label: "Tech Domains",
    description: "Engineering, data, design, security & more",
    icon: Layers,
  },
  {
    value: 6,
    suffix: "+",
    label: "Tier-1 Cities",
    description: "Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai",
    icon: MapPin,
  },
  {
    value: 95,
    suffix: "%",
    label: "Profile Review Rate",
    description: "Of registered candidates screened within 5 business days",
    icon: Target,
  },
];

const offerings = [
  "Personalised recruitment assistance across every domain of technology",
  "Direct introductions to employers in our consultancy network",
  "Confidential matching, your profile is never spammed",
  "Transparent fee structure, all terms disclosed before registration",
  "End-to-end coordination through offer and onboarding",
  "Preferred location prioritised during role matching",
];

/**
 * Anonymised recent placements.
 * Names withheld; identities reduced to initials + role + city + company type.
 */
const placementStories: PlacementStory[] = [
  {
    initials: "AK",
    role: "Software Engineer",
    location: "Bangalore",
    companyType: "SaaS unicorn",
    outcome: "+38% hike",
    quote:
      "GuardianX Launchpad understood my target companies before I even named them. Got three interview calls within ten days, accepted an offer in three weeks.",
    placedAgo: "2 weeks ago",
  },
  {
    initials: "RM",
    role: "Cloud / DevOps Engineer",
    location: "Hyderabad",
    companyType: "Fintech scale-up",
    outcome: "2x CTC",
    quote:
      "I was skeptical about paying a fee upfront, but the consultancy model actually worked. The team prepped me for every round and negotiated harder than I would have.",
    placedAgo: "1 month ago",
  },
  {
    initials: "SP",
    role: "Cybersecurity Analyst",
    location: "Mumbai",
    companyType: "Enterprise security firm",
    outcome: "+25% hike",
    quote:
      "What stood out was confidentiality. My current employer never found out I was looking. Got introduced to three SOC roles, picked the one that fit my career plan.",
    placedAgo: "3 weeks ago",
  },
  {
    initials: "VD",
    role: "AI / ML Engineer",
    location: "Bangalore",
    companyType: "AI product startup",
    outcome: "+42% hike",
    quote:
      "Coming from a non-tier-1 college, I expected to be filtered out. GuardianX Launchpad actually advocated for my portfolio work and got me shortlisted at places I wouldn't have reached on my own.",
    placedAgo: "5 weeks ago",
  },
  {
    initials: "NJ",
    role: "Product Designer",
    location: "Remote",
    companyType: "Global SaaS",
    outcome: "Remote-first",
    quote:
      "I wanted a remote-first design role and most consultancies kept pushing me toward on-site. GuardianX Launchpad actually listened. Placed at a global SaaS within four weeks of registering.",
    placedAgo: "1 week ago",
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      <Background variant="hero" />
      <Noise />

      {/* HERO, split layout: text + illustration */}
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Text column */}
            <div className="lg:col-span-7">
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
                  Tech Recruitment · Now Accepting Profiles
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-tight text-foreground leading-[1.05]"
              >
                Launch your
                <br />
                <span className="text-gradient-gold italic">technology</span>
                <br />
                career with us.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
              >
                GuardianX Launchpad connects skilled professionals with leading
                tech employers across every domain, engineering, cybersecurity,
                cloud, AI/ML, data, design, and more. We match you based on
                skills, qualifications, experience, and preferred location,
                and stay engaged through every stage of the hiring process.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <CTAButton onClick={() => onNavigate("register")}>
                  Begin Registration, ₹2,000
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
                className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
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

            {/* Illustration column */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroIllustration />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Email capture bar, sits right after the hero */}
      <EmailCaptureBar />

      {/* Domain marquee */}
      <section className="relative py-6 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Domains we recruit for
            </span>
          </div>
          <DomainMarquee />
        </div>
      </section>

      {/* Our Family strip, the three GuardianX properties */}
      <OurFamilyStrip />

      {/* Stats strip, tighter */}
      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent placements carousel, social proof */}
      <section className="relative py-12 sm:py-16 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Recent Placements"
            title={
              <>
                Real outcomes from
                <br />
                <span className="text-gradient-gold italic">real candidates.</span>
              </>
            }
            description="Anonymised stories of candidates placed through our consultancy network across every domain of technology. Names withheld for candidate privacy."
          />
          <div className="mt-10">
            <PlacementsCarousel stories={placementStories} />
          </div>
        </div>
      </section>

      {/* Value props, Bento grid */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why GuardianX"
            title={
              <>
                Built for technology careers,
                <br />
                <span className="text-gradient-gold italic">not generic hiring.</span>
              </>
            }
            description="We work across every domain of technology. That means deeper role knowledge, stronger employer relationships, and a process designed around how tech teams actually hire."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {valueProps.map((v, i) => (
              <BentoCard key={v.title} delay={i * 0.08}>
                <div className="flex items-start gap-5">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                    <div className="absolute inset-0 rounded-md bg-gold/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <v.icon className="relative h-5 w-5" strokeWidth={1.75} />
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
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider label="Process" className="my-2" />

      {/* Process flow */}
      <section className="relative py-16 sm:py-20 border-y border-border bg-card/20">
        <FloatingOrbs />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="How It Works"
            title="From registration to placement"
            description="A transparent four-step process that keeps you informed at every stage. Final selection and offer letters are subject to the employer's hiring process, but we coordinate with you end-to-end."
          />

          <div className="mt-16">
            <ProcessFlow steps={processSteps} />
          </div>

          <div className="mt-12 flex justify-center">
            <CTAButton onClick={() => onNavigate("admissions")}>
              See Full Admissions Process
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Role categories */}
      <section className="relative py-16 sm:py-20">
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
            description="Our consultancy network spans employers hiring across the full technology spectrum, from entry-level engineers to senior architects and design leads. Below is a representative sample of role categories we work with."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roleCategories.map((r, i) => (
              <RoleCard key={r.title} {...r} index={i} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <CTAButton variant="ghost" onClick={() => onNavigate("placements")}>
              View All Placement Categories
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Premium bento grid, feature showcase */}
      <section className="relative py-16 sm:py-20 border-y border-border bg-card/20">
        <FloatingOrbs count={2} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The GuardianX Edge"
            title={
              <>
                Premium recruitment,
                <br />
                <span className="text-gradient-gold italic">end-to-end.</span>
              </>
            }
          />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[12rem]">
            {/* Big tile */}
            <BentoCard span="lg" glow delay={0}>
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gold/40 bg-gold/10 text-gold mb-4">
                    <Sparkles className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight mb-3">
                    A recruitment partner,
                    <br />
                    <span className="text-gradient-gold italic">not a job board.</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    For ₹2,000 registration, you get a curated, consultancy-driven
                    job search, with our team advocating for you across the tech
                    employer network. The post-placement fee only applies once you
                    actually receive and accept an offer.
                  </p>
                </div>
                <div className="mt-6">
                  <CTAButton onClick={() => onNavigate("register")}>
                    Register Now, ₹2,000
                  </CTAButton>
                </div>
              </div>
            </BentoCard>

            {/* Stat tiles */}
            <BentoCard delay={0.1}>
              <div className="flex flex-col h-full justify-between">
                <Users className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <div>
                  <div className="font-display text-3xl font-semibold text-gradient-gold">
                    50+
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Employer partners in our network
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard delay={0.15}>
              <div className="flex flex-col h-full justify-between">
                <Layers className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <div>
                  <div className="font-display text-3xl font-semibold text-gradient-gold">
                    15+
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Technology domains covered
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard delay={0.2}>
              <div className="flex flex-col h-full justify-between">
                <Zap className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <div>
                  <div className="font-display text-3xl font-semibold text-gradient-gold">
                    5 days
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Avg. time to first screening call
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard delay={0.25} span="wide">
              <div className="flex items-center gap-5 h-full">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                  <Briefcase className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    Post-Placement Fee Structure
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pay ₹2,000 to register. The post-placement consultancy fee
                    only applies once you receive and accept an offer, full
                    terms are discussed with you after registration.
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard delay={0.3}>
              <div className="flex flex-col h-full justify-between">
                <TrendingUp className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <div>
                  <div className="font-display text-base font-semibold text-foreground mb-1">
                    Career growth focused
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Matched to roles that move your career forward
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard delay={0.35}>
              <div className="flex flex-col h-full justify-between">
                <Award className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <div>
                  <div className="font-display text-base font-semibold text-foreground mb-1">
                    Premium network
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Trusted employers across India
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="relative py-16 sm:py-20">
        <FloatingOrbs count={2} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="What You Get"
                title={
                  <>
                    Recruitment that
                    <br />
                    <span className="text-gradient-gold italic">advocates for you.</span>
                  </>
                }
                description="For ₹2,000 registration, you get a curated, consultancy-driven job search, with our team advocating for you across the technology employer network."
              />
              <div className="mt-6">
                <CTAButton onClick={() => onNavigate("register")}>
                  Register Now, ₹2,000
                </CTAButton>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-2.5">
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
      <section className="relative py-16 sm:py-20 border-t border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-card/40 backdrop-blur-sm p-8 sm:p-10 lg:p-12">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold/[0.08] blur-[120px]" />
              <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gold/[0.05] blur-[120px]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                    Connect With Us
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
                  Review our professional profile before you register.
                </h2>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                  We encourage every candidate to review our LinkedIn presence
                  and clarify any questions about the recruitment process and
                  fee terms before proceeding. Transparency is the foundation
                  of this engagement.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CTAButton href="https://www.linkedin.com/company/guardianx-academy/">
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

              <div className="grid gap-3">
                <div className="group flex items-center justify-between gap-4 p-5 rounded-lg border border-gold/40 bg-gold/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gold/40 bg-gold/10 text-gold">
                      <Rocket className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="font-display text-base font-semibold text-foreground">
                        GuardianX Launchpad
                      </div>
                      <div className="font-mono text-xs text-muted-foreground mt-1">
                        You&apos;re here, recruitment &amp; career assistance
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-gold">
                    Current
                  </span>
                </div>
                <a
                  href="https://www.academy.guardianx.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-5 rounded-lg border border-border bg-background/40 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                      <GraduationCap className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="font-display text-base font-semibold text-foreground">
                        GuardianX Academy
                      </div>
                      <div className="font-mono text-xs text-muted-foreground mt-1">
                        academy.guardianx.cloud, training &amp; upskilling
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
                </a>
                <a
                  href="https://www.guardianx.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-5 rounded-lg border border-border bg-background/40 hover:border-gold/40 transition-colors"
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
