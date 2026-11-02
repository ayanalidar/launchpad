import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/admin/subscribers/export
 * Returns all subscribers as CSV for download.
 */
export async function GET() {
  const subscribers = await db.emailSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const csv = [
    "email,source,createdAt",
    ...subscribers.map((s) => {
      const escapedEmail = s.email.includes(",")
        ? `"${s.email}"`
        : s.email;
      return `${escapedEmail},${s.source},${s.createdAt.toISOString()}`;
    }),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="subscribers-${Date.now()}.csv"`,
    },
  });
}
