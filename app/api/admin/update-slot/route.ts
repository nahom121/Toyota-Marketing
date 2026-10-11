import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { sessionId, slotIndex, timeSlot } = await request.json();
    if (!sessionId || !timeSlot || (slotIndex !== 1 && slotIndex !== 2)) {
      return NextResponse.json({ error: "Missing sessionId, slotIndex, or timeSlot" }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const key = slotIndex === 2 ? "second_time_slot" : "time_slot";

    await stripe.checkout.sessions.update(sessionId, {
      metadata: { ...(session.metadata || {}), [key]: timeSlot },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update slot error:", error);
    return NextResponse.json({ error: "Failed to update slot" }, { status: 500 });
  }
}
