import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/role/:slug
 * Returns deep-dive data for a role category from the database.
 * Falls back to a generic stub if the role doesn't exist.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ roleSlug: string }> }
) {
  const { roleSlug: slug } = await params;

  try {
    const role = await db.role.findUnique({
      where: { slug },
    });

    if (!role) {
      // Generic fallback
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

    // Parse JSON fields if present, otherwise use defaults
    const parseJson = (field: string | null, fallback: unknown) => {
      if (!field) return fallback;
      try {
        return JSON.parse(field);
      } catch {
        return fallback;
      }
    };

    return NextResponse.json({
      title: role.title,
      slug: role.slug,
      level: role.level,
      tagline: role.tagline || `${role.title} role`,
      overview:
        role.overview ||
        role.description ||
        "We actively recruit for this role across our consultancy network.",
      responsibilities: parseJson(role.responsibilities, [
        "Contribute to product development in your domain",
        "Collaborate with cross-functional teams",
        "Participate in code/design reviews",
        "Drive quality and reliability in your area",
      ]),
      requiredSkills: parseJson(role.requiredSkills, [
        { name: "Domain-specific skills", level: "required" },
        { name: "Communication & collaboration", level: "required" },
      ]),
      salaryRange: {
        min: role.salaryMin || 8,
        max: role.salaryMax || 45,
        median: role.salaryMedian || 20,
      },
      interviewQuestions: parseJson(role.interviewQuestions, [
        { question: "Tell me about a recent project you're proud of.", difficulty: "easy" },
      ]),
      careerPath: parseJson(role.careerPath, [
        { stage: "Junior", description: "0-2 years", typicalCTC: "₹8-15 LPA" },
        { stage: "Mid", description: "2-5 years", typicalCTC: "₹15-28 LPA" },
        { stage: "Senior", description: "5+ years", typicalCTC: "₹28-55 LPA" },
      ]),
      certifications: role.certifications
        ? role.certifications.split(",").map((c) => c.trim())
        : ["Domain-specific certifications preferred"],
      skills: role.skills,
      category: role.category,
    });
  } catch (err) {
    console.error("Role API error:", err);
    return NextResponse.json(
      { error: "Failed to load role" },
      { status: 500 }
    );
  }
}
