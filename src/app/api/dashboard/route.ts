import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/dashboard?email=candidate@example.com
 * Returns a candidate dashboard view: their registration, matched roles, status timeline.
 */
export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required." },
        { status: 400 }
      );
    }

    const registration = await db.registration.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "No registration found for this email." },
        { status: 404 }
      );
    }

    // Compute status timeline based on registration state
    const timeline = [
      {
        step: 1,
        label: "Registration",
        description: `Registered on ${new Date(registration.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`,
        status: "complete",
        timestamp: registration.createdAt,
      },
      {
        step: 2,
        label: "Profile Review",
        description: "Our team is reviewing your profile",
        status: registration.paymentStatus === "paid" ? "in_progress" : "pending",
        timestamp: null,
      },
      {
        step: 3,
        label: "Consultancy Matching",
        description: "We'll introduce you to matched roles",
        status: "pending",
        timestamp: null,
      },
      {
        step: 4,
        label: "Placement",
        description: "Final selection & offer",
        status: "pending",
        timestamp: null,
      },
    ];

    // Mock matched roles (in production, this would query a real match table)
    const matchedRoles = generateMatchedRoles(registration.preferredRoleCategory);

    // Fee structure (disclosed after registration, as user requested)
    const feeStructure = {
      registrationFee: registration.registrationFee,
      registrationFeePaid: registration.paymentStatus === "paid",
      postPlacementFee: {
        type: "disclosed_after_registration",
        description:
          "The post-placement consultancy fee structure is discussed with you after registration. Our team will walk you through the complete fee, payment timelines, refund conditions, and service terms before any employer engagement.",
        schedule: [
          {
            label: "First Installment",
            timing: "After receiving offer letter",
            amount: "Discussed in consultation call",
            status: "upcoming",
          },
          {
            label: "Second Installment",
            timing: "Upon receiving first salary",
            amount: "Discussed in consultation call",
            status: "upcoming",
          },
        ],
      },
    };

    return NextResponse.json({
      registration: {
        id: registration.id,
        fullName: registration.fullName,
        email: registration.email,
        preferredRoleCategory: registration.preferredRoleCategory,
        preferredLocation: registration.preferredLocation,
        workMode: registration.workMode,
        experienceYears: registration.experienceYears,
        paymentStatus: registration.paymentStatus,
        createdAt: registration.createdAt,
      },
      timeline,
      matchedRoles,
      feeStructure,
    });
  } catch (err) {
    console.error("Dashboard API error:", err);
    return NextResponse.json(
      { error: "Failed to load dashboard." },
      { status: 500 }
    );
  }
}

function generateMatchedRoles(category: string | null) {
  const base: Array<{
    title: string;
    company: string;
    location: string;
    salary: string;
    matchScore: number;
    postedAgo: string;
    status: "new" | "shortlisted" | "interviewing";
  }> = [
    {
      title: category || "Software Engineer",
      company: "SaaS unicorn (Bangalore)",
      location: "Bangalore",
      salary: "₹18-28 LPA",
      matchScore: 92,
      postedAgo: "1 day ago",
      status: "new",
    },
    {
      title: "Senior " + (category || "Software Engineer"),
      company: "Fintech scale-up",
      location: "Hyderabad",
      salary: "₹25-40 LPA",
      matchScore: 87,
      postedAgo: "3 days ago",
      status: "shortlisted",
    },
    {
      title: category || "Software Engineer" + " (Remote)",
      company: "Global SaaS",
      location: "Remote",
      salary: "₹22-35 LPA",
      matchScore: 81,
      postedAgo: "5 days ago",
      status: "new",
    },
  ];
  return base;
}
