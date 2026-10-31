/**
 * Seed script: populates the new editable models with the content
 * currently hardcoded in component files, so the admin panel has
 * real data to manage from day one.
 *
 * Run with: bun run scripts/seed.ts
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("Seeding site settings...");
  await db.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });

  console.log("Seeding roles...");
  const roles = [
    {
      title: "Cybersecurity Analyst",
      slug: "cybersecurity-analyst",
      level: "Entry to Senior",
      description: "SOC monitoring, threat hunting, vulnerability assessment, GRC, and penetration testing roles across cloud and on-prem environments. Certifications like Security+, CEH, OSCP preferred.",
      skills: "SIEM,Splunk,MITRE,ISO 27001",
      category: "Security",
      sortOrder: 1,
      tagline: "Defend organizations against evolving threats",
      overview: "Cybersecurity Analysts at our partner companies monitor SIEM platforms, triage security alerts, perform initial incident response, and contribute to threat hunting programs.",
      salaryMin: 6, salaryMax: 35, salaryMedian: 16,
    },
    {
      title: "Software Engineer",
      slug: "software-engineer",
      level: "Entry to Lead",
      description: "Backend, frontend, and full-stack engineering across Java, Python, Go, Node.js, and modern TypeScript stacks. System design and code quality expectations vary by seniority.",
      skills: "Java,Python,Go,React",
      category: "Engineering",
      sortOrder: 2,
      tagline: "Build, ship, and scale products across the full stack",
      overview: "Software Engineers at our partner companies work across backend, frontend, and full-stack domains. You'll design systems, write production code, participate in code reviews, and ship features that impact millions of users.",
      salaryMin: 8, salaryMax: 45, salaryMedian: 18,
    },
    {
      title: "Cloud / DevOps Engineer",
      slug: "cloud-devops",
      level: "Mid to Senior",
      description: "AWS, Azure, GCP platform engineering, infrastructure-as-code, Kubernetes operations, and CI/CD pipeline ownership. Strong Linux and networking fundamentals expected.",
      skills: "AWS,Kubernetes,Terraform,CI/CD",
      category: "Engineering",
      sortOrder: 3,
      tagline: "Own the platform that ships products reliably at scale",
      overview: "Cloud / DevOps Engineers at our partner companies own infrastructure-as-code, Kubernetes operations, CI/CD pipelines, and platform automation.",
      salaryMin: 12, salaryMax: 55, salaryMedian: 24,
    },
    {
      title: "AI / ML Engineer",
      slug: "ai-ml-engineer",
      level: "Mid to Senior",
      description: "Model training, MLOps, LLM applications, computer vision, and NLP roles across product and research teams. Hands-on PyTorch or TensorFlow experience essential.",
      skills: "PyTorch,LLMs,MLOps,Python",
      category: "AI/Data",
      sortOrder: 4,
    },
    {
      title: "Data Engineer",
      slug: "data-engineer",
      level: "Mid to Senior",
      description: "Pipelines, data warehouses, lakehouse architecture, streaming platforms, and analytics engineering with dbt. SQL fluency and distributed systems exposure expected.",
      skills: "Spark,Snowflake,Airflow,SQL",
      category: "AI/Data",
      sortOrder: 5,
    },
    {
      title: "Product Designer",
      slug: "product-designer",
      level: "Mid to Lead",
      description: "UX research, interaction design, design systems, and product strategy for B2B and consumer tech products. Strong portfolio of end-to-end product work required.",
      skills: "Figma,Design Systems,Research,Prototyping",
      category: "Design",
      sortOrder: 6,
    },
    {
      title: "Mobile Engineer",
      slug: "mobile-engineer",
      level: "Mid to Senior",
      description: "iOS (Swift), Android (Kotlin), and cross-platform (React Native, Flutter) engineering. Performance tuning, offline-first, and platform API fluency expected.",
      skills: "Swift,Kotlin,React Native,Flutter",
      category: "Engineering",
      sortOrder: 7,
    },
    {
      title: "Site Reliability Engineer",
      slug: "site-reliability-engineer",
      level: "Mid to Senior",
      description: "Production reliability, observability, incident response, and platform automation. Strong coding skills and distributed systems understanding required.",
      skills: "Prometheus,Go,Kubernetes,Observability",
      category: "Engineering",
      sortOrder: 8,
    },
    {
      title: "QA / Test Engineer",
      slug: "qa-test-engineer",
      level: "Entry to Senior",
      description: "Test automation, integration testing, performance testing, and quality engineering embedded in product teams. Cypress, Playwright, and Python proficiency valued.",
      skills: "Cypress,Playwright,Python,Automation",
      category: "Engineering",
      sortOrder: 9,
    },
    {
      title: "Engineering Manager",
      slug: "engineering-manager",
      level: "Senior to Director",
      description: "Team leadership, technical strategy, hiring, and delivery ownership for engineering teams. People leadership and architecture decision-making experience expected.",
      skills: "Leadership,Architecture,Hiring,Strategy",
      category: "Leadership",
      sortOrder: 10,
    },
    {
      title: "Product Manager",
      slug: "product-manager",
      level: "Mid to Director",
      description: "Discovery, roadmap, execution, and stakeholder management for B2B and consumer products. Strong analytical skills and technical fluency required.",
      skills: "Discovery,Roadmap,Analytics,Stakeholders",
      category: "Leadership",
      sortOrder: 11,
    },
    {
      title: "Platform Engineer",
      slug: "platform-engineer",
      level: "Mid to Senior",
      description: "Internal developer platforms, infrastructure tooling, service frameworks, and developer experience. API design and distributed systems exposure expected.",
      skills: "Platform,Go,Kubernetes,API Design",
      category: "Engineering",
      sortOrder: 12,
    },
  ];
  for (const role of roles) {
    await db.role.upsert({
      where: { slug: role.slug },
      update: {},
      create: role,
    });
  }

  console.log("Seeding placement stories...");
  const stories = [
    { initials: "AK", role: "Software Engineer", location: "Bangalore", companyType: "SaaS unicorn", outcome: "+38% hike", quote: "GuardianX Launchpad understood my target companies before I even named them. Got three interview calls within ten days, accepted an offer in three weeks.", placedAgo: "2 weeks ago", sortOrder: 1 },
    { initials: "RM", role: "Cloud / DevOps Engineer", location: "Hyderabad", companyType: "Fintech scale-up", outcome: "2x CTC", quote: "I was skeptical about paying a fee upfront, but the consultancy model actually worked. The team prepped me for every round and negotiated harder than I would have.", placedAgo: "1 month ago", sortOrder: 2 },
    { initials: "SP", role: "Cybersecurity Analyst", location: "Mumbai", companyType: "Enterprise security firm", outcome: "+25% hike", quote: "What stood out was confidentiality. My current employer never found out I was looking. Got introduced to three SOC roles, picked the one that fit my career plan.", placedAgo: "3 weeks ago", sortOrder: 3 },
    { initials: "VD", role: "AI / ML Engineer", location: "Bangalore", companyType: "AI product startup", outcome: "+42% hike", quote: "Coming from a non-tier-1 college, I expected to be filtered out. GuardianX Launchpad actually advocated for my portfolio work and got me shortlisted at places I wouldn't have reached on my own.", placedAgo: "5 weeks ago", sortOrder: 4 },
    { initials: "NJ", role: "Product Designer", location: "Remote", companyType: "Global SaaS", outcome: "Remote-first", quote: "I wanted a remote-first design role and most consultancies kept pushing me toward on-site. GuardianX Launchpad actually listened. Placed at a global SaaS within four weeks of registering.", placedAgo: "1 week ago", sortOrder: 5 },
  ];
  for (const s of stories) {
    await db.placementStory.create({ data: s }).catch(() => {});
  }

  console.log("Seeding FAQ items...");
  const faqs = [
    { question: "Is the ₹2,000 registration fee refundable?", answer: "The ₹2,000 registration fee is non-refundable. It covers the cost of profile review, screening, and onboarding into our consultancy network. The post-placement consultancy fee only applies if you accept an offer through us, if you do not get placed, you pay nothing further.", category: "payments", sortOrder: 1 },
    { question: "What is the post-placement consultancy fee structure?", answer: "A consultancy fee applies upon successful placement through us. The complete fee structure, payment timelines, refund conditions, and service terms are explained to candidates after registration, before any employer engagement. This allows us to walk you through the specifics in context once we understand your profile and target roles.", category: "payments", sortOrder: 2 },
    { question: "Why are client company names kept confidential initially?", answer: "Many employers in our network require confidentiality during the initial stages of recruitment, subject to client agreements. Relevant role details, employment terms, and expectations will be shared with you at the appropriate stage, typically once you have been shortlisted and your profile is being actively considered.", category: "admissions", sortOrder: 3 },
    { question: "Does registration guarantee a placement?", answer: "No. Final selection and offer letters are subject to the employer's hiring process. Job opportunities depend on candidate eligibility and employer requirements. We coordinate and advocate for you throughout, but we cannot guarantee placement. The fee structure is designed so our incentive is aligned with your successful placement.", category: "admissions", sortOrder: 4 },
    { question: "Can I choose my preferred city or work mode?", answer: "Yes. During registration, you can share your preferred location, work mode (on-site, hybrid, remote), and relocation constraints. We prioritise matching you against openings that fit your geography and preferences. The wider your flexibility, the larger the pool of opportunities we can present.", category: "admissions", sortOrder: 5 },
    { question: "What happens after I register?", answer: "Within five business days, our team reviews your profile and reaches out to discuss your background, expectations, and any active openings that fit. You will then be presented with relevant opportunities as they arise in our consultancy network, with full transparency on role and employer at the appropriate stage.", category: "admissions", sortOrder: 6 },
    { question: "Do you only work with cybersecurity roles?", answer: "No. We recruit across every domain of technology, software engineering, cloud and DevOps, AI/ML, data engineering and analytics, product design, mobile engineering, cybersecurity, platform engineering, and more. Our consultancy network spans the full technology spectrum.", category: "general", sortOrder: 7 },
  ];
  for (const f of faqs) {
    await db.fAQItem.create({ data: f }).catch(() => {});
  }

  console.log("Seeding sample job openings...");
  const jobs = [
    { title: "Software Engineer", company: "SaaS unicorn (Bangalore)", location: "Bangalore", salary: "₹18-28 LPA", matchScore: 92, postedAgo: "1 day ago", status: "new", roleSlug: "software-engineer" },
    { title: "Senior Software Engineer", company: "Fintech scale-up", location: "Hyderabad", salary: "₹25-40 LPA", matchScore: 87, postedAgo: "3 days ago", status: "shortlisted", roleSlug: "software-engineer" },
    { title: "Software Engineer (Remote)", company: "Global SaaS", location: "Remote", salary: "₹22-35 LPA", matchScore: 81, postedAgo: "5 days ago", status: "new", roleSlug: "software-engineer" },
  ];
  for (const j of jobs) {
    await db.jobOpening.create({ data: j }).catch(() => {});
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
