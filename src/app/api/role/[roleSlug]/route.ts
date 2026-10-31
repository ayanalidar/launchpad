import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/role/:slug
 * Returns deep-dive data for a role category.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ roleSlug: string }> }
) {
  const { roleSlug: slug } = await params;

  const ROLE_DATA: Record<
    string,
    {
      title: string;
      slug: string;
      level: string;
      tagline: string;
      overview: string;
      responsibilities: string[];
      requiredSkills: { name: string; level: "required" | "preferred" }[];
      salaryRange: { min: number; max: number; median: number };
      interviewQuestions: { question: string; difficulty: "easy" | "medium" | "hard" }[];
      careerPath: { stage: string; description: string; typicalCTC: string }[];
      certifications: string[];
    }
  > = {
    "software-engineer": {
      title: "Software Engineer",
      slug: "software-engineer",
      level: "Entry to Lead",
      tagline: "Build, ship, and scale products across the full stack",
      overview:
        "Software Engineers at our partner companies work across backend, frontend, and full-stack domains. You'll design systems, write production code, participate in code reviews, and ship features that impact millions of users. Strong fundamentals in data structures, algorithms, and at least one production language are essential.",
      responsibilities: [
        "Design and implement scalable backend services and APIs",
        "Write clean, tested, and maintainable code in production",
        "Participate in code reviews and mentor junior engineers",
        "Collaborate with product, design, and QA to ship features",
        "Debug production issues and improve system reliability",
        "Contribute to architecture decisions for new features",
      ],
      requiredSkills: [
        { name: "Java / Python / Go / Node.js", level: "required" },
        { name: "Data Structures & Algorithms", level: "required" },
        { name: "System Design basics", level: "required" },
        { name: "SQL & databases (Postgres / MySQL)", level: "required" },
        { name: "Git & CI/CD workflows", level: "required" },
        { name: "React / Vue / Angular", level: "preferred" },
        { name: "Kubernetes / Docker", level: "preferred" },
        { name: "AWS / GCP / Azure", level: "preferred" },
      ],
      salaryRange: { min: 8, max: 45, median: 18 },
      interviewQuestions: [
        { question: "Design a URL shortener service. Walk me through your architecture.", difficulty: "hard" },
        { question: "Implement a rate limiter for an API. What algorithm would you use and why?", difficulty: "medium" },
        { question: "Explain the difference between SQL and NoSQL databases. When would you choose each?", difficulty: "easy" },
        { question: "Write a function to detect a cycle in a linked list.", difficulty: "easy" },
        { question: "How would you design a notification system that delivers 1M notifications per minute?", difficulty: "hard" },
      ],
      careerPath: [
        { stage: "Software Engineer (L1)", description: "0-2 years, ships features under guidance", typicalCTC: "₹8-15 LPA" },
        { stage: "Software Engineer (L2)", description: "2-4 years, owns modules, mentors interns", typicalCTC: "₹15-25 LPA" },
        { stage: "Senior Software Engineer", description: "4-7 years, owns services, drives architecture", typicalCTC: "₹25-45 LPA" },
        { stage: "Staff Engineer / Lead", description: "7+ years, multi-team impact, technical strategy", typicalCTC: "₹45-80 LPA" },
      ],
      certifications: ["AWS Solutions Architect", "Google Cloud Professional", "MongoDB Developer"],
    },
    "cybersecurity-analyst": {
      title: "Cybersecurity Analyst",
      slug: "cybersecurity-analyst",
      level: "Entry to Senior",
      tagline: "Defend organizations against evolving threats",
      overview:
        "Cybersecurity Analysts at our partner companies monitor SIEM platforms, triage security alerts, perform initial incident response, and contribute to threat hunting programs. You'll work across cloud and on-prem environments, collaborating with engineering teams to remediate vulnerabilities.",
      responsibilities: [
        "Monitor SIEM platforms and triage security alerts (L1-L3)",
        "Perform initial incident response and escalation",
        "Conduct threat hunting across network and endpoint telemetry",
        "Tune detection rules and create new detections based on emerging threats",
        "Collaborate with engineering to remediate vulnerabilities",
        "Document incidents and contribute to post-mortem reports",
      ],
      requiredSkills: [
        { name: "SIEM platforms (Splunk / QRadar / Sentinel)", level: "required" },
        { name: "MITRE ATT&CK framework", level: "required" },
        { name: "Network protocols (TCP/IP, DNS, HTTP)", level: "required" },
        { name: "Linux fundamentals & command line", level: "required" },
        { name: "Incident response procedures", level: "required" },
        { name: "Python / Bash scripting", level: "preferred" },
        { name: "Cloud security (AWS / Azure / GCP)", level: "preferred" },
        { name: "Threat intelligence platforms (MISP)", level: "preferred" },
      ],
      salaryRange: { min: 6, max: 35, median: 16 },
      interviewQuestions: [
        { question: "Walk me through how you'd respond to a ransomware detection alert.", difficulty: "hard" },
        { question: "Explain the MITRE ATT&CK framework. How do you use it in detection engineering?", difficulty: "medium" },
        { question: "What's the difference between IDS and IPS? When would you use each?", difficulty: "easy" },
        { question: "How would you detect lateral movement in a Windows environment?", difficulty: "medium" },
        { question: "Design a SOC playbook for phishing email investigation.", difficulty: "hard" },
      ],
      careerPath: [
        { stage: "SOC Analyst L1", description: "0-2 years, triages alerts, follows runbooks", typicalCTC: "₹6-12 LPA" },
        { stage: "SOC Analyst L2", description: "2-4 years, investigates complex incidents", typicalCTC: "₹12-20 LPA" },
        { stage: "SOC Analyst L3 / Senior", description: "4-7 years, leads hunts, mentors L1/L2", typicalCTC: "₹20-35 LPA" },
        { stage: "Detection Engineer / Threat Hunter", description: "7+ years, builds detections, leads IR", typicalCTC: "₹35-60 LPA" },
      ],
      certifications: ["CompTIA Security+", "CEH", "OSCP", "GCIA", "GCFA"],
    },
    "cloud-devops": {
      title: "Cloud / DevOps Engineer",
      slug: "cloud-devops",
      level: "Mid to Senior",
      tagline: "Own the platform that ships products reliably at scale",
      overview:
        "Cloud / DevOps Engineers at our partner companies own infrastructure-as-code, Kubernetes operations, CI/CD pipelines, and platform automation. You'll partner with engineering teams to ship faster, more reliably, and at lower cost. Strong Linux, networking, and at least one programming language are essential.",
      responsibilities: [
        "Design and operate AWS / Azure / GCP infrastructure",
        "Own Terraform / Pulumi IaC for the platform",
        "Operate and tune Kubernetes clusters",
        "Build and optimize CI/CD pipelines (GitHub Actions, ArgoCD, Jenkins)",
        "Implement observability (Prometheus, Grafana, OpenTelemetry)",
        "Drive incident response and post-mortems for production issues",
      ],
      requiredSkills: [
        { name: "AWS / Azure / GCP (any one)", level: "required" },
        { name: "Terraform / Pulumi", level: "required" },
        { name: "Kubernetes & containers (Docker)", level: "required" },
        { name: "Linux & networking fundamentals", level: "required" },
        { name: "CI/CD (GitHub Actions / ArgoCD / Jenkins)", level: "required" },
        { name: "Python / Go / Bash scripting", level: "preferred" },
        { name: "Prometheus / Grafana / OpenTelemetry", level: "preferred" },
        { name: "Service mesh (Istio / Linkerd)", level: "preferred" },
      ],
      salaryRange: { min: 12, max: 55, median: 24 },
      interviewQuestions: [
        { question: "Design a multi-region Kubernetes deployment for a high-traffic SaaS.", difficulty: "hard" },
        { question: "How would you implement zero-downtime deployments for a stateful service?", difficulty: "medium" },
        { question: "Explain the difference between Deployment, StatefulSet, and DaemonSet.", difficulty: "easy" },
        { question: "Walk me through debugging a slow CI pipeline. Where do you start?", difficulty: "medium" },
        { question: "Design an observability stack for a microservices architecture.", difficulty: "hard" },
      ],
      careerPath: [
        { stage: "DevOps Engineer (L1)", description: "1-3 years, owns pipelines under guidance", typicalCTC: "₹10-18 LPA" },
        { stage: "Cloud Engineer", description: "3-5 years, owns IaC, supports k8s ops", typicalCTC: "₹18-30 LPA" },
        { stage: "Senior Cloud / DevOps Engineer", description: "5-8 years, owns platform, drives SLOs", typicalCTC: "₹30-55 LPA" },
        { stage: "Staff / Platform Architect", description: "8+ years, multi-region strategy", typicalCTC: "₹55-90 LPA" },
      ],
      certifications: ["AWS Solutions Architect Pro", "CKA (Kubernetes)", "Terraform Associate"],
    },
  };

  const role = ROLE_DATA[slug];
  if (role) return NextResponse.json(role);

  // Generic fallback for unknown slugs
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return NextResponse.json({
    title,
    slug,
    level: "Entry to Senior",
    tagline: "Detailed role information",
    overview:
      "We actively recruit for this role across our consultancy network. Register to be matched against live openings, or contact our team for more details on current opportunities.",
    responsibilities: [
      "Contribute to product development in your domain",
      "Collaborate with cross-functional teams",
      "Participate in code/design reviews",
      "Drive quality and reliability in your area",
    ],
    requiredSkills: [
      { name: "Domain-specific skills", level: "required" },
      { name: "Communication & collaboration", level: "required" },
    ],
    salaryRange: { min: 8, max: 45, median: 20 },
    interviewQuestions: [
      { question: "Tell me about a recent project you're proud of.", difficulty: "easy" },
      { question: "Walk me through your approach to a typical work week.", difficulty: "easy" },
    ],
    careerPath: [
      { stage: "Junior", description: "0-2 years", typicalCTC: "₹8-15 LPA" },
      { stage: "Mid", description: "2-5 years", typicalCTC: "₹15-28 LPA" },
      { stage: "Senior", description: "5+ years", typicalCTC: "₹28-55 LPA" },
    ],
    certifications: ["Domain-specific certifications preferred"],
  });
}
