import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

// Persists attendance / notes directly on the Stripe checkout session's
// metadata, so it shows up the same way on every device the admin page is
// opened on — instead of localStorage, which is per-browser only.
export async function POST(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { sessionId, slotIndex, field, value } = await request.json();
    if (!sessionId || !field) {
      return NextResponse.json({ error: "Missing sessionId or field" }, { status: 400 });
    }
    if (field !== "attendance" && field !== "note") {
      return NextResponse.json({ error: "Invalid field" }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const key = slotIndex === 2 ? `${field}_2` : field;

    await stripe.checkout.sessions.update(sessionId, {
      metadata: { ...(session.metadata || {}), [key]: value },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Attendance update error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
