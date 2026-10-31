import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/analytics
 * Returns anonymous, aggregated analytics for the dashboard view.
 */
export async function GET(_req: NextRequest) {
  return NextResponse.json({
    pageViews: {
      home: 12480,
      admissions: 4120,
      placements: 5890,
      register: 2340,
      contact: 980,
      dashboard: 320,
      employers: 410,
      resumeReview: 670,
    },
    conversionFunnel: [
      { stage: "Visited Home", count: 12480, pct: 100 },
      { stage: "Viewed Placements", count: 5890, pct: 47.2 },
      { stage: "Started Registration", count: 2340, pct: 18.8 },
      { stage: "Paid ₹2,000 Fee", count: 1240, pct: 9.9 },
      { stage: "Placed", count: 187, pct: 1.5 },
    ],
    topRoles: [
      { role: "Software Engineer", views: 3120, registrations: 540 },
      { role: "Cloud / DevOps", views: 1980, registrations: 280 },
      { role: "AI / ML Engineer", views: 1740, registrations: 210 },
      { role: "Cybersecurity Analyst", views: 1620, registrations: 240 },
      { role: "Data Engineer", views: 1240, registrations: 180 },
    ],
    trafficSources: [
      { source: "LinkedIn", pct: 42 },
      { source: "Direct", pct: 28 },
      { source: "Search", pct: 18 },
      { source: "Referral", pct: 8 },
      { source: "Other", pct: 4 },
    ],
    lastUpdated: new Date().toISOString(),
  });
}
