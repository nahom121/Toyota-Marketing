import Stripe from "stripe";
import { NextResponse } from "next/server";

const MAX_CAPACITY = 30;

function isRefunded(s: Stripe.Checkout.Session): boolean {
  const pi = s.payment_intent as Stripe.PaymentIntent | null;
  const charge = pi?.latest_charge as Stripe.Charge | null;
  return charge?.refunded === true;
}

export async function GET() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const sessions: Stripe.Checkout.Session[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;

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

    const sold = sessions
      .filter((s) => s.payment_status === "paid" && !isRefunded(s))
      .reduce((sum, s) => sum + Number(s.metadata?.ticket_count || 1), 0);

    const remaining = Math.max(0, MAX_CAPACITY - sold);

    return NextResponse.json({
      sold,
      remaining,
      capacity: MAX_CAPACITY,
      isSoldOut: remaining === 0,
    });
  } catch (error) {
    console.error("Capacity error:", error);
    return NextResponse.json({
      sold: 0,
      remaining: MAX_CAPACITY,
      capacity: MAX_CAPACITY,
      isSoldOut: false,
    });
  }
}
