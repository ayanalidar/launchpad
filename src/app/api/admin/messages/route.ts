import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/admin/messages?resolved=&page=
 * Returns contact messages with their resolution status.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const resolved = url.searchParams.get("resolved");
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 50;

  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  // Fetch statuses (defensive, may not be available if Prisma client wasn't regenerated)
  let statuses: Array<{ messageId: string; resolved: boolean; notes: string | null }> = [];
  try {
    statuses = await db.contactMessageStatus.findMany({
      where: { messageId: { in: messages.map((m) => m.id) } },
    });
  } catch {
    // ignore, default to empty
  }
  const statusMap = new Map(statuses.map((s) => [s.messageId, s]));

  const items = messages.map((m) => ({
    ...m,
    resolved: statusMap.get(m.id)?.resolved || false,
    notes: statusMap.get(m.id)?.notes || null,
  }));

  // Filter by resolved if requested
  const filtered =
    resolved === "true"
      ? items.filter((i) => i.resolved)
      : resolved === "false"
      ? items.filter((i) => !i.resolved)
      : items;

  return NextResponse.json({
    items: filtered,
    total: filtered.length,
    page,
  });
}
