import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/** GET /api/faqs, returns active FAQ items for public display */
export async function GET() {
  try {
    const faqs = await db.fAQItem.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ items: faqs });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
