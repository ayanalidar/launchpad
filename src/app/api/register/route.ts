import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Razorpay REST credentials (server-side only).
// In dev without keys, we fall back to a mock order so the UI flow can be exercised.
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
const RAZORPAY_ENABLED = Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);

const REGISTRATION_FEE = 2000; // INR

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    const required = [
      "fullName",
      "email",
      "phone",
      "experienceYears",
      "preferredLocation",
      "preferredRoleCategory",
      "workMode",
      "termsAccepted",
    ];
    for (const k of required) {
      if (body[k] === undefined || body[k] === null || body[k] === "") {
        return NextResponse.json(
          { error: `Missing required field: ${k}` },
          { status: 400 }
        );
      }
    }

    if (!body.termsAccepted) {
      return NextResponse.json(
        { error: "You must accept the terms to proceed." },
        { status: 400 }
      );
    }

    // Persist registration (paymentStatus = pending)
    const registration = await db.registration.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        currentRole: body.currentRole || null,
        experienceYears: Number(body.experienceYears) || 0,
        highestQualification: body.highestQualification || null,
        keySkills: Array.isArray(body.keySkills)
          ? body.keySkills.join(", ")
          : body.keySkills || null,
        certifications: Array.isArray(body.certifications)
          ? body.certifications.join(", ")
          : body.certifications || null,
        preferredLocation: body.preferredLocation,
        preferredRoleCategory: body.preferredRoleCategory,
        workMode: body.workMode,
        noticePeriod: body.noticePeriod || null,
        currentCtc: body.currentCtc || null,
        expectedCtc: body.expectedCtc || null,
        termsAccepted: true,
        paymentStatus: "pending",
      },
    });

    // Create Razorpay order (or mock)
    let order: {
      id: string;
      amount: number;
      currency: string;
      key_id: string;
      mock?: boolean;
    };

    if (RAZORPAY_ENABLED) {
      const amountPaise = REGISTRATION_FEE * 100;
      const auth = Buffer.from(
        `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
      ).toString("base64");

      const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: amountPaise,
          currency: "INR",
          receipt: `gx-reg-${registration.id.slice(-8)}`,
          notes: {
            registrationId: registration.id,
            candidateEmail: body.email,
          },
        }),
      });

      if (!rzpRes.ok) {
        const errText = await rzpRes.text();
        console.error("Razorpay order creation failed:", errText);
        return NextResponse.json(
          { error: "Failed to create payment order. Please try again." },
          { status: 502 }
        );
      }

      const rzpOrder = await rzpRes.json();
      order = {
        id: rzpOrder.id,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        key_id: RAZORPAY_KEY_ID,
      };

      // Store the order id on the registration
      await db.registration.update({
        where: { id: registration.id },
        data: { razorpayOrderId: rzpOrder.id },
      });
    } else {
      // Mock order for development without Razorpay credentials
      order = {
        id: `mock_order_${registration.id}`,
        amount: REGISTRATION_FEE * 100,
        currency: "INR",
        key_id: "mock_key_id",
        mock: true,
      };

      await db.registration.update({
        where: { id: registration.id },
        data: { razorpayOrderId: order.id },
      });
    }

    return NextResponse.json({
      registrationId: registration.id,
      order,
      registrationFee: REGISTRATION_FEE,
    });
  } catch (err) {
    console.error("Registration API error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
