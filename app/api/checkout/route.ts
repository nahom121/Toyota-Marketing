import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houstonskateproject.org";
const MAX_CAPACITY = 30;

export async function POST(request: NextRequest) {
  try {
    const { ticketCount, primaryEmail, primaryName, registrants } =
      await request.json();

    if (!ticketCount || !primaryEmail || !primaryName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // Capacity check — count all paid tickets before creating session
    const allSessions: Stripe.Checkout.Session[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;
    while (hasMore) {
      const page = await stripe.checkout.sessions.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      allSessions.push(...page.data);
      hasMore = page.has_more;
      if (page.data.length > 0) startingAfter = page.data[page.data.length - 1].id;
    }
    const sold = allSessions
      .filter((s) => s.payment_status === "paid")
      .reduce((sum, s) => sum + Number(s.metadata?.ticket_count || 1), 0);
    const remaining = Math.max(0, MAX_CAPACITY - sold);
    if (ticketCount > remaining) {
      return NextResponse.json(
        { error: `Only ${remaining} spot${remaining === 1 ? "" : "s"} left.` },
        { status: 409 }
      );
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Houston Skate Project — General Admission",
            description: "Pop-Up Workshop · August 9th, 2026 · Houston, TX",
          },
          unit_amount: 2500,
        },
        quantity: ticketCount,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: primaryEmail,
      metadata: {
        event: "Houston Skate Project",
        date: "August 9, 2026",
        primary_name: primaryName,
        ticket_count: String(ticketCount),
        registrants: JSON.stringify(registrants).slice(0, 490),
      },
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/#tickets`,
      payment_intent_data: {
        description: `Houston Skate Project — ${ticketCount} ticket(s) · ${primaryName}`,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
