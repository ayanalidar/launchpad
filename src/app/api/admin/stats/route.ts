import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/** GET /api/admin/stats, returns dashboard summary stats */
export async function GET() {
  const [
    registrations,
    paidCount,
    pendingCount,
    messages,
    subscribers,
    activeRoles,
    activeStories,
    activeFaqs,
    activeJobs,
  ] = await Promise.all([
    db.registration.count(),
    db.registration.count({ where: { paymentStatus: "paid" } }),
    db.registration.count({ where: { paymentStatus: "pending" } }),
    db.contactMessage.count(),
    db.emailSubscriber.count(),
    db.role.count({ where: { isActive: true } }),
    db.placementStory.count({ where: { isActive: true } }),
    db.fAQItem.count({ where: { isActive: true } }),
    db.jobOpening.count({ where: { isActive: true } }),
  ]);

  // ContactMessageStatus may not be available if Prisma client wasn't regenerated
  let unresolvedMessages = 0;
  try {
    unresolvedMessages = await db.contactMessageStatus.count({
      where: { resolved: false },
    });
  } catch {
    // ignore, default to 0
  }

  // Total revenue from paid registrations
  const paidRegs = await db.registration.findMany({
    where: { paymentStatus: "paid" },
    select: { registrationFee: true },
  });
  const revenue = paidRegs.reduce((s, r) => s + r.registrationFee, 0);

  // Recent registrations (last 7 days count)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentRegistrations = await db.registration.count({
    where: { createdAt: { gte: sevenDaysAgo } },
  });

  // Last 5 registrations for the dashboard table
  const recentItems = await db.registration.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      fullName: true,
      email: true,
      preferredRoleCategory: true,
      paymentStatus: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    counts: {
      registrations,
      paid: paidCount,
      pending: pendingCount,
      messages,
      unresolvedMessages,
      subscribers,
      activeRoles,
      activeStories,
      activeFaqs,
      activeJobs,
    },
    revenue,
    recentRegistrations,
    recentItems,
  });
}
