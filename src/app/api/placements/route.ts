import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/** GET /api/placements, returns active placement stories for Home carousel */
export async function GET() {
  try {
    const stories = await db.placementStory.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ items: stories });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
