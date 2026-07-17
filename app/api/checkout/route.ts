import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houstonskateproject.org";

export async function POST(request: NextRequest) {
  try {
    const { ticketCount, rentalCount, primaryEmail, primaryName, registrants } =
      await request.json();

    if (!ticketCount || !primaryEmail || !primaryName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Houston Skate Project — General Admission",
            description: "Pop-Up Workshop · July 26th, 2026 · Houston, TX",
          },
          unit_amount: 2500,
        },
        quantity: ticketCount,
      },
    ];

    if (rentalCount > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Skate Rental",
            description: "White quad roller skates — size selected during registration",
          },
          unit_amount: 500,
        },
        quantity: rentalCount,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: primaryEmail,
      metadata: {
        event: "Houston Skate Project",
        date: "July 26, 2026",
        primary_name: primaryName,
        ticket_count: String(ticketCount),
        rental_count: String(rentalCount),
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
