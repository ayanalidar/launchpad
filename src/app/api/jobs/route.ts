import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/** GET /api/jobs, returns active job openings for candidate dashboard */
export async function GET() {
  try {
    const jobs = await db.jobOpening.findMany({
      where: { isActive: true },
      orderBy: [{ createdAt: "desc" }],
    });
    return NextResponse.json({ items: jobs });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
