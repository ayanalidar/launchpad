import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/** GET /api/admin/roles, returns all roles */
export async function GET() {
  const roles = await db.role.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ items: roles });
}

/** POST /api/admin/roles, creates a new role */
export async function POST(req: NextRequest) {
  const body = await req.json();
  // Auto-generate slug from title if not provided
  if (!body.slug && body.title) {
    body.slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  const role = await db.role.create({ data: body });
  return NextResponse.json(role);
}
