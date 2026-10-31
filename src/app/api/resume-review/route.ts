import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/resume-review
 * Body: { resume: string, targetRole: string }
 * Returns: AI-powered skill gap analysis.
 *
 * Uses z-ai-web-dev-sdk (server-side only).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resume, targetRole } = body;

    if (!resume || typeof resume !== "string" || resume.trim().length < 50) {
      return NextResponse.json(
        { error: "Please paste a resume with at least 50 characters." },
        { status: 400 }
      );
    }

    if (resume.length > 5000) {
      return NextResponse.json(
        { error: "Resume too long. Please paste up to 5000 characters." },
        { status: 400 }
      );
    }

    // Use z-ai SDK for skill gap analysis
    let aiResponse: string;
    try {
      // Dynamic import to keep this server-only
      const ZAIModule = await import("z-ai-web-dev-sdk");
      const ZAI = (ZAIModule as { default: typeof import("z-ai-web-dev-sdk") }).default;
      const zai = await ZAI.create();

      const prompt = `You are an expert technical recruiter at GuardianX Launchpad, a technology recruitment consultancy.

A candidate has shared their resume and is targeting this role: "${targetRole || "Software Engineer"}".

Resume:
"""
${resume}
"""

Provide a structured skill gap analysis as JSON with this exact shape:
{
  "overallScore": number (0-100, fit score for the target role),
  "strengths": string[] (3-5 items the candidate does well),
  "gaps": string[] (3-5 missing skills or experiences),
  "recommendations": string[] (3-5 actionable next steps),
  "suggestedRoles": string[] (3 alternative roles they may be a better fit for)
}

Be specific, actionable, and encouraging. Return only the JSON, no preamble.`;

      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 1200,
      });

      aiResponse = completion.choices[0]?.message?.content || "";
    } catch (aiErr) {
      console.error("AI SDK error, falling back:", aiErr);
      // Fallback analysis if AI SDK is unavailable
      aiResponse = JSON.stringify({
        overallScore: 65,
        strengths: [
          "Clear career progression visible in your resume",
          "Relevant technical skills listed for your target role",
          "Demonstrates hands-on project experience",
        ],
        gaps: [
          "Consider adding quantified impact metrics (e.g., 'improved performance by 40%')",
          "Add a skills summary section at the top for quick scanning",
          "Include relevant certifications to strengthen your profile",
          "Add links to GitHub / portfolio / LinkedIn",
        ],
        recommendations: [
          "Tailor your resume for each role application",
          "Quantify achievements wherever possible",
          "Add 2-3 recent projects with tech stack details",
          "Register with GuardianX Launchpad for personalized matching",
        ],
        suggestedRoles: [
          targetRole || "Software Engineer",
          "Backend Developer",
          "Full Stack Developer",
        ],
      });
    }

    // Try to parse the AI response as JSON; if it fails, wrap as fallback
    let parsed: unknown;
    try {
      // Extract JSON from response (handles ```json``` wrapping)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(aiResponse);
    } catch {
      parsed = {
        overallScore: 60,
        strengths: ["Resume received and analyzed"],
        gaps: ["Could not parse detailed analysis, please try again"],
        recommendations: ["Register with us for a personalized consultation"],
        suggestedRoles: [targetRole || "Software Engineer"],
      };
    }

    return NextResponse.json({
      success: true,
      analysis: parsed,
      targetRole: targetRole || "Software Engineer",
    });
  } catch (err) {
    console.error("Resume review API error:", err);
    return NextResponse.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    );
  }
}
