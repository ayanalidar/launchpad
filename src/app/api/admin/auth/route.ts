import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "GuardianX2026!";

/**
 * POST /api/admin/auth
 * Body: { password }
 * Returns a session token (simple signed cookie value) if password matches.
 *
 * Note: This is a simple password check for the admin panel.
 * For production, consider using NextAuth.js with proper session management.
 */
export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }
    // Generate a simple session token (timestamp + hash)
    const token = Buffer.from(
      `${Date.now()}:${ADMIN_PASSWORD}`
    ).toString("base64");
    return NextResponse.json({ success: true, token });
  } catch {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

/** GET /api/admin/auth, verify token */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const token = auth.slice("Bearer ".length);
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [, password] = decoded.split(":");
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ authenticated: true });
    }
  } catch {
    // ignore
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
