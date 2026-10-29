"use client";

import { motion } from "framer-motion";
import {
  UserCheck,
  GraduationCap,
  Briefcase,
  MapPin,
  Receipt,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Info,
  Lock,
  ArrowRight,
} from "lucide-react";
import { type PageId } from "../use-router";
import { Background } from "../ui/Background";
import { SectionHeading } from "../ui/SectionHeading";
import { CTAButton } from "../ui/CTAButton";
import { FAQ } from "../ui/FAQ";
import { SectionDivider } from "../ui/SectionDivider";
import { BentoCard } from "../ui/BentoCard";

interface AdmissionsPageProps {
  onNavigate: (p: PageId) => void;
}

const eligibility = [
  {
    icon: GraduationCap,
    title: "Qualifications",
    description:
      "A degree in computer science, engineering, information systems, or a related field is preferred. Candidates with industry certifications (CompTIA, AWS, Azure, CEH, OSCP, PMP, Scrum, etc.) are encouraged to register. Self-taught professionals with demonstrable hands-on experience through open-source work, hackathons, or portfolio projects are also welcome.",
  },
  {
    icon: Briefcase,
    title: "Experience",
    description:
      "We work with candidates across the experience spectrum, fresh graduates seeking entry-level roles, mid-career professionals seeking their next step, and senior practitioners targeting lead or architect positions. Your experience level helps us match you with appropriate openings.",
  },
  {
    icon: UserCheck,
    title: "Skills",
    description:
      "Hands-on skills in any technology domain, software engineering, cloud, data, AI/ML, cybersecurity, design, DevOps, mobile, or platform engineering, are valued. We assess candidates based on practical capability, not just credentials. Expect a discussion of real-world scenarios during screening.",
  },
  {
    icon: MapPin,
    title: "Preferred Location",
    description:
      "You can share your preferred location, which will be considered while exploring suitable opportunities. We currently work with employers across Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, and remote-first teams. Relocation preferences are captured during registration.",
  },
];

const feeSchedule = [
  {
    label: "Registration Fee",
    amount: "₹2,000",
    timing: "At registration",
    description:
      "One-time, non-refundable registration fee payable before your profile is activated in our consultancy network. Covers initial screening, profile review, and onboarding into the candidate pool.",
    highlight: true,
  },
  {
    label: "Post-Placement Consultancy Fee",
    amount: "Discussed after registration",
    timing: "After placement",
    description:
      "A consultancy fee applies upon successful placement. The complete fee structure, payment timelines, refund conditions, and service terms are explained to you after registration, before you proceed with any employer engagement.",
    highlight: false,
  },
];

const includedItems = [
  "Profile review and skills qualification by our technology recruitment team",
  "Listing in our candidate pool, searchable against active requirements",
  "Direct introductions to employers in our consultancy network, with relevant role and employment details shared at the appropriate stage",
  "Interview preparation and employer briefing before each engagement",
  "Coordination through offer letter, salary negotiation, and onboarding",
  "Confidentiality of your profile, shared only with employers actively considering you",
  "Full transparency on all fees and service terms, disclosed before registration",
];

const faqItems = [
  {
    question: "Is the ₹2,000 registration fee refundable?",
    answer:
      "The ₹2,000 registration fee is non-refundable. It covers the cost of profile review, screening, and onboarding into our consultancy network. The post-placement consultancy fee only applies if you accept an offer through us, if you do not get placed, you pay nothing further.",
  },
  {
    question: "What is the post-placement consultancy fee structure?",
    answer:
      "A consultancy fee applies upon successful placement through us. The complete fee structure, payment timelines, refund conditions, and service terms are explained to candidates after registration, before any employer engagement. This allows us to walk you through the specifics in context once we understand your profile and target roles.",
  },
  {
    question: "Why are client company names kept confidential initially?",
    answer:
      "Many employers in our network require confidentiality during the initial stages of recruitment, subject to client agreements. Relevant role details, employment terms, and expectations will be shared with you at the appropriate stage, typically once you have been shortlisted and your profile is being actively considered.",
  },
  {
    question: "Does registration guarantee a placement?",
    answer:
      "No. Final selection and offer letters are subject to the employer's hiring process. Job opportunities depend on candidate eligibility and employer requirements. We coordinate and advocate for you throughout, but we cannot guarantee placement. The fee structure is designed so our incentive is aligned with your successful placement.",
  },
  {
    question: "Can I choose my preferred city or work mode?",
    answer:
      "Yes. During registration, you can share your preferred location, work mode (on-site, hybrid, remote), and relocation constraints. We prioritise matching you against openings that fit your geography and preferences. The wider your flexibility, the larger the pool of opportunities we can present.",
  },
  {
    question: "What happens after I register?",
    answer:
      "Within five business days, our team reviews your profile and reaches out to discuss your background, expectations, and any active openings that fit. You will then be presented with relevant opportunities as they arise in our consultancy network, with full transparency on role and employer at the appropriate stage.",
  },
  {
    question: "Do you only work with cybersecurity roles?",
    answer:
      "No. We recruit across every domain of technology, software engineering, cloud and DevOps, AI/ML, data engineering and analytics, product design, mobile engineering, cybersecurity, platform engineering, and more. Our consultancy network spans the full technology spectrum.",
  },
];

export function AdmissionsPage({ onNavigate }: AdmissionsPageProps) {
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
            <FileText className="h-3.5 w-3.5 text-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Admissions · Program Details
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]"
          >
            Admissions
            <br />
            <span className="text-gradient-gold italic">&amp; Program Details</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            GuardianX assists candidates in exploring technology job
            opportunities across every domain through our consultancy network.
            Below is everything you need to know about eligibility, the
            registration process, fee structure, and what to expect, all
            explained before you register.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <CTAButton onClick={() => onNavigate("register")}>
              Start Registration
            </CTAButton>
            <CTAButton variant="ghost" onClick={() => onNavigate("contact")}>
              Talk to Our Team
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="relative py-12 sm:py-16 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Eligibility"
            title={
              <>
                Who can register
                <br />
                <span className="text-gradient-gold italic">with GuardianX</span>
              </>
            }
            description="We welcome candidates from across the technology spectrum, from fresh graduates targeting entry-level roles to senior practitioners seeking their next leadership position. Below are the four factors we consider during qualification."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibility.map((e, i) => (
              <BentoCard key={e.title} delay={i * 0.08}>
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/5 text-gold">
                    <e.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {e.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {e.description}
                    </p>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Fee structure, simplified */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Fee Structure"
            title={
              <>
                Transparent pricing,
                <br />
                <span className="text-gradient-gold italic">no hidden surprises.</span>
              </>
            }
            description="The registration fee is paid upfront. The post-placement consultancy fee structure, payment timelines, refund conditions, and service terms are discussed with you after registration, before any employer engagement."
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {feeSchedule.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative p-8 rounded-xl border ${
                  f.highlight
                    ? "border-gold/40 bg-gold/[0.04]"
                    : "border-border bg-card/30"
                } backdrop-blur-sm overflow-hidden`}
              >
                {f.highlight && (
                  <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                )}
                <div className="flex items-center gap-2 mb-5">
                  {f.highlight ? (
                    <Receipt className="h-4 w-4 text-gold" />
                  ) : (
                    <Lock className="h-4 w-4 text-gold/70" />
                  )}
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                    {f.timing}
                  </span>
                </div>
                <h3 className="font-display text-base font-medium text-foreground mb-3">
                  {f.label}
                </h3>
                <div
                  className={`font-display font-semibold text-gradient-gold mb-4 ${
                    f.amount.length > 10 ? "text-2xl sm:text-3xl" : "text-4xl"
                  }`}
                >
                  {f.amount}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 p-5 rounded-lg border border-gold/20 bg-gold/[0.03] flex items-start gap-4"
          >
            <Info className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Note:</span> Final
              selection and offer letters are subject to the employer&apos;s
              hiring process. Job opportunities depend on candidate eligibility
              and employer requirements. Please review all terms before
              proceeding with registration.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider label="What's Included" className="my-2" />

      {/* What's included */}
      <section className="relative py-12 sm:py-16 border-y border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="What Registration Includes"
                title={
                  <>
                    More than a CV
                    <br />
                    <span className="text-gradient-gold italic">forwarding service.</span>
                  </>
                }
                description="Registration activates you in our consultancy network, our team works your profile against live requirements, prepares you for interviews, and stays engaged through offer and onboarding."
              />
              <div className="mt-6">
                <CTAButton onClick={() => onNavigate("register")}>
                  Register Now, ₹2,000
                </CTAButton>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-2.5">
                {includedItems.map((o, i) => (
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

      {/* FAQ */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Frequently Asked"
            title="Admissions questions, answered."
            description="Still have questions? Our team is available to clarify any of these points before you register, feel free to reach out via the contact page."
          />

          <div className="mt-10">
            <FAQ items={faqItems} />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <CTAButton onClick={() => onNavigate("register")}>
              Begin Registration
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </CTAButton>
            <CTAButton variant="ghost" onClick={() => onNavigate("contact")}>
              Contact Our Team
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
