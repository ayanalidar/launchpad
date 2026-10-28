import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
const RAZORPAY_ENABLED = Boolean(
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      registrationId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      mock,
    } = body;

    if (!registrationId) {
      return NextResponse.json(
        { error: "Missing registrationId" },
        { status: 400 }
      );
    }

    const registration = await db.registration.findUnique({
      where: { id: registrationId },
    });
    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Mock flow (no Razorpay credentials configured)
    if (mock || !RAZORPAY_ENABLED) {
      await db.registration.update({
        where: { id: registrationId },
        data: {
          paymentStatus: "paid",
          razorpayPaymentId: razorpayPaymentId || `mock_pay_${Date.now()}`,
          razorpaySignature: razorpaySignature || "mock_signature",
        },
      });
      return NextResponse.json({
        success: true,
        mock: true,
        registrationId,
        message: "Mock payment verified (no Razorpay keys configured).",
      });
    }

    // Real verification — HMAC SHA256 signature check
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { error: "Missing payment parameters" },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    const signatureValid =
      expectedSignature === razorpaySignature ||
      // constant-time compare
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "hex"),
        Buffer.from(razorpaySignature, "hex")
      );

    if (!signatureValid) {
      await db.registration.update({
        where: { id: registrationId },
        data: { paymentStatus: "failed" },
      });
      return NextResponse.json(
        { error: "Payment signature verification failed" },
        { status: 400 }
      );
    }

    await db.registration.update({
      where: { id: registrationId },
      data: {
        paymentStatus: "paid",
        razorpayPaymentId,
        razorpaySignature,
      },
    });

    return NextResponse.json({ success: true, registrationId });
  } catch (err) {
    console.error("Payment verification error:", err);
    return NextResponse.json(
      { error: "Internal server error during payment verification" },
      { status: 500 }
    );
  }
}
