import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/settings
 * Returns public site settings (no auth required).
 * Used by the WhatsApp button to fetch the WhatsApp number at runtime,
 * so changes in the admin panel reflect immediately without redeploy.
 */
export async function GET() {
  try {
    let settings = await db.siteSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) {
      settings = await db.siteSettings.create({ data: { id: "default" } });
    }

    // Return only the fields needed publicly
    return NextResponse.json({
      whatsappNumber: settings.whatsappNumber,
      linkedinUrl: settings.linkedinUrl,
      academyUrl: settings.academyUrl,
      securityUrl: settings.securityUrl,
      registrationFee: settings.registrationFee,
      responseTimeHours: settings.responseTimeHours,
      heroHeadline: settings.heroHeadline,
      heroBody: settings.heroBody,
      postPlacementFeeDescription: settings.postPlacementFeeDescription,
    });
  } catch (err) {
    console.error("Public settings API error:", err);
    // Return hardcoded GuardianX number as fallback so WhatsApp works even
    // if the database is unreachable on production
    return NextResponse.json({
      whatsappNumber: "917006712347",
      linkedinUrl: "https://www.linkedin.com/company/guardianx-academy/",
      academyUrl: "https://www.academy.guardianx.cloud",
      securityUrl: "https://www.guardianx.in",
      registrationFee: 2000,
      responseTimeHours: 48,
      heroHeadline: "Launch your technology career with us.",
      heroBody:
        "GuardianX Launchpad connects skilled professionals with leading tech employers across every domain.",
      postPlacementFeeDescription:
        "A consultancy fee applies upon successful placement. The complete fee structure is explained after registration.",
    });
  }
}
