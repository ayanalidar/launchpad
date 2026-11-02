import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.jobOpening.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await db.jobOpening.create({ data: body });
  return NextResponse.json(item);
}
