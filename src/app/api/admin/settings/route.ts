import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/** GET /api/admin/settings, returns site settings singleton */
export async function GET() {
  let settings = await db.siteSettings.findUnique({
    where: { id: "default" },
  });
  if (!settings) {
    settings = await db.siteSettings.create({ data: { id: "default" } });
  }
  return NextResponse.json(settings);
}

/** PATCH /api/admin/settings, updates site settings */
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const updated = await db.siteSettings.upsert({
    where: { id: "default" },
    update: body,
    create: { id: "default", ...body },
  });
  return NextResponse.json(updated);
}
