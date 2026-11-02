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
    return NextResponse.json(
      { whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918000000000" },
      { status: 200 } // return 200 with fallback so client doesn't crash
    );
  }
}
