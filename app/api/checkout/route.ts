import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houstonskateproject.org";
const SLOT_CAPACITIES: Record<string, number> = {
  "9:30 AM":  32,
  "10:30 AM": 36,
  "11:30 AM": 36,
  "12:30 PM": 31,
};
const SLOT_CAPACITY = 30;

function isRefunded(s: Stripe.Checkout.Session): boolean {
  const pi = s.payment_intent as Stripe.PaymentIntent | null;
  const charge = pi?.latest_charge as Stripe.Charge | null;
  return charge?.refunded === true;
}

export async function POST(request: NextRequest) {
  try {
    const { ticketCount, timeSlot, secondSlot, primaryEmail, primaryName, primaryPhone, registrants } =
      await request.json();

    if (!ticketCount || !timeSlot || !primaryEmail || !primaryName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isBundle = !!secondSlot;
    const unitAmount = isBundle ? 5000 : 2500;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // Capacity check for all booked slots
    const slotsToCheck: string[] = isBundle ? [timeSlot, secondSlot] : [timeSlot];
    const allSessions: Stripe.Checkout.Session[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;
    while (hasMore) {
      const page = await stripe.checkout.sessions.list({
        limit: 100,
        expand: ["data.payment_intent.latest_charge"],
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      allSessions.push(...page.data);
      hasMore = page.has_more;
      if (page.data.length > 0) startingAfter = page.data[page.data.length - 1].id;
    }

    const WORKSHOP2_START = new Date("2026-08-18T00:00:00Z").getTime() / 1000;

    for (const slot of slotsToCheck) {
      const cap = SLOT_CAPACITIES[slot] ?? SLOT_CAPACITY;
      const slotSold = allSessions
        .filter((s) => {
          if (s.payment_status !== "paid" || isRefunded(s)) return false;
          if (s.created < WORKSHOP2_START) return false;
          return s.metadata?.time_slot === slot || s.metadata?.second_time_slot === slot;
        })
        .reduce((sum, s) => sum + Number(s.metadata?.ticket_count || 1), 0);
      const remaining = Math.max(0, cap - slotSold);
      if (ticketCount > remaining) {
        return NextResponse.json(
          { error: `Only ${remaining} spot${remaining === 1 ? "" : "s"} left for the ${slot} session.` },
          { status: 409 }
        );
      }
    }

    const sessionLabel = isBundle ? `${timeSlot} + ${secondSlot}` : `${timeSlot} session`;

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: isBundle
              ? "Houston Skate Project · 2-Session Pass"
              : "Houston Skate Project · General Admission",
            description: `Pop-Up Workshop · August 30th, 2026 · ${sessionLabel} · Houston, TX`,
          },
          unit_amount: unitAmount,
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
        date: "August 30, 2026",
        time_slot: timeSlot,
        ...(isBundle ? { second_time_slot: secondSlot } : {}),
        primary_name: primaryName,
        primary_phone: primaryPhone || "",
        ticket_count: String(ticketCount),
        registrants: JSON.stringify(registrants).slice(0, 490),
      },
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/#tickets`,
      payment_intent_data: {
        description: `Houston Skate Project · ${sessionLabel} · ${ticketCount} ticket(s) · ${primaryName}`,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
