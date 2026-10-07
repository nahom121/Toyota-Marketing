import Stripe from "stripe";
import { NextResponse } from "next/server";
import { WORKSHOP_DATES, SLOTS_BY_DATE, SLOT_CAPACITIES_BY_DATE, FORCE_SOLD_OUT, ACTIVE_WORKSHOPS_START } from "@/lib/slots";
import type { WorkshopDate } from "@/lib/slots";

type SlotInfo = { sold: number; remaining: number; isFull: boolean };

function isRefunded(s: Stripe.Checkout.Session): boolean {
  const pi = s.payment_intent as Stripe.PaymentIntent | null;
  const charge = pi?.latest_charge as Stripe.Charge | null;
  return charge?.refunded === true;
}

function fallbackSlots(date: WorkshopDate): Record<string, SlotInfo> {
  const caps = SLOT_CAPACITIES_BY_DATE[date];
  return Object.fromEntries(
    SLOTS_BY_DATE[date].map((slot) => [slot, { sold: 0, remaining: caps[slot], isFull: false }])
  );
}

export async function GET() {
  // Short-circuit: skip Stripe entirely and return all slots sold out
  if (FORCE_SOLD_OUT) {
    const dates = Object.fromEntries(
      WORKSHOP_DATES.map(({ value }) => {
        const caps = SLOT_CAPACITIES_BY_DATE[value];
        const slots = Object.fromEntries(
          SLOTS_BY_DATE[value].map((slot) => [slot, { sold: caps[slot], remaining: 0, isFull: true }])
        );
        return [value, { slots, slotCapacity: caps }];
      })
    );
    return NextResponse.json({ dates }, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
    });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const sessions: Stripe.Checkout.Session[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const page = await stripe.checkout.sessions.list({
        limit: 100,
        created: { gte: ACTIVE_WORKSHOPS_START },
        expand: ["data.payment_intent.latest_charge"],
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      sessions.push(...page.data);
      hasMore = page.has_more;
      if (page.data.length > 0) startingAfter = page.data[page.data.length - 1].id;
    }

    const valid = sessions.filter((s) => s.payment_status === "paid" && !isRefunded(s));

    const dates = Object.fromEntries(
      WORKSHOP_DATES.map(({ value }) => {
        const caps = SLOT_CAPACITIES_BY_DATE[value];
        const sessionsForDate = valid.filter((s) => s.metadata?.date === value);
        const slots = Object.fromEntries(
          SLOTS_BY_DATE[value].map((slot) => {
            const cap = caps[slot];
            const sold = sessionsForDate
              .filter((s) => s.metadata?.time_slot === slot || s.metadata?.second_time_slot === slot)
              .reduce((sum, s) => sum + Number(s.metadata?.ticket_count || 1), 0);
            return [slot, { sold, remaining: Math.max(0, cap - sold), isFull: sold >= cap }];
          })
        );
        return [value, { slots, slotCapacity: caps }];
      })
    );

    return NextResponse.json({ dates }, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
    });
  } catch (error) {
    console.error("Capacity error:", error);
    const dates = Object.fromEntries(
      WORKSHOP_DATES.map(({ value }) => [value, { slots: fallbackSlots(value), slotCapacity: SLOT_CAPACITIES_BY_DATE[value] }])
    );
    return NextResponse.json({ dates });
  }
}
