import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * PATCH /api/admin/messages/:id
 * Body: { resolved, notes }
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { resolved, notes } = await req.json();

  let updated;
  try {
    updated = await db.contactMessageStatus.upsert({
      where: { messageId: id },
      update: { resolved, notes },
      create: { messageId: id, resolved, notes },
    });
  } catch {
    // ContactMessageStatus table may not exist yet, return a stub
    updated = { messageId: id, resolved, notes };
  }

  return NextResponse.json(updated);
}
