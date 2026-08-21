import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const PROMO_CODES: Record<string, { slot: string }> = {
  ABATAD: { slot: "9:30 AM" },
  CACDCT: { slot: "9:30 AM" },
};

function isRefunded(s: Stripe.Checkout.Session): boolean {
  const pi = s.payment_intent as Stripe.PaymentIntent | null;
  const charge = pi?.latest_charge as Stripe.Charge | null;
  return charge?.refunded === true;
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    const upper = String(code || "").toUpperCase().trim();
    const promo = PROMO_CODES[upper];

    if (!promo) {
      return NextResponse.json({ valid: false, error: "Invalid code." }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const sessions: Stripe.Checkout.Session[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;
    const WORKSHOP2_START = new Date("2026-08-18T00:00:00Z").getTime() / 1000;

    while (hasMore) {
      const page = await stripe.checkout.sessions.list({
        limit: 100,
        expand: ["data.payment_intent.latest_charge"],
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      sessions.push(...page.data);
      hasMore = page.has_more;
      if (page.data.length > 0) startingAfter = page.data[page.data.length - 1].id;
    }

    const used = sessions.some(
      (s) =>
        s.payment_status === "paid" &&
        !isRefunded(s) &&
        s.created >= WORKSHOP2_START &&
        s.metadata?.promo_code === upper
    );

    if (used) {
      return NextResponse.json({ valid: false, error: "This code has already been used." }, { status: 409 });
    }

    return NextResponse.json({ valid: true, slot: promo.slot });
  } catch (error) {
    console.error("Validate code error:", error);
    return NextResponse.json({ valid: false, error: "Could not validate code. Try again." }, { status: 500 });
  }
}
