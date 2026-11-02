import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/admin/registrations/:id
 * Returns a single registration with full detail.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const reg = await db.registration.findUnique({ where: { id } });
  if (!reg) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(reg);
}

/**
 * PATCH /api/admin/registrations/:id
 * Update paymentStatus or other fields.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const updated = await db.registration.update({
    where: { id },
    data: body,
  });
  return NextResponse.json(updated);
}

/**
 * DELETE /api/admin/registrations/:id
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.registration.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
