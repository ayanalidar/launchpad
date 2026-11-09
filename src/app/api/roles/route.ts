import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/** GET /api/roles, returns all active roles for public display */
export async function GET() {
  try {
    const roles = await db.role.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        level: true,
        description: true,
        skills: true,
        category: true,
        sortOrder: true,
      },
    });
    return NextResponse.json({ items: roles });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
