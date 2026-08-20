import Stripe from "stripe";
import { NextResponse } from "next/server";
import { SLOTS, SLOT_CAPACITIES } from "@/lib/slots";
import type { Slot } from "@/lib/slots";

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

    const WORKSHOP2_START = new Date("2026-08-18T00:00:00Z").getTime() / 1000;

    const valid = sessions.filter(
      (s) => s.payment_status === "paid" && !isRefunded(s) && s.created >= WORKSHOP2_START
    );

    const slots = Object.fromEntries(
      SLOTS.map((slot) => {
        const cap = SLOT_CAPACITIES[slot];
        const sold = valid
          .filter((s) => s.metadata?.time_slot === slot || s.metadata?.second_time_slot === slot)
          .reduce((sum, s) => sum + Number(s.metadata?.ticket_count || 1), 0);
        return [slot, { sold, remaining: Math.max(0, cap - sold), isFull: sold >= cap }];
      })
    ) as Record<Slot, { sold: number; remaining: number; isFull: boolean }>;

    return NextResponse.json({ slots, slotCapacity: SLOT_CAPACITIES }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Capacity error:", error);
    const fallback = Object.fromEntries(
      SLOTS.map((slot) => [slot, { sold: 0, remaining: SLOT_CAPACITIES[slot], isFull: false }])
    );
    return NextResponse.json({ slots: fallback, slotCapacity: SLOT_CAPACITIES });
  }
}
