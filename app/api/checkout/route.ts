import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { FORCE_SOLD_OUT, ACTIVE_WORKSHOPS_START, SLOTS_BY_DATE, SLOT_CAPACITIES_BY_DATE, SLOT_CAPACITY, SLOT_START_UTC_MS_BY_DATE, DISCOUNT_CODES, displayTime, SLOT_LEVELS_BY_DATE } from "@/lib/slots";
import type { WorkshopDate } from "@/lib/slots";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houstonskateproject.org";

const PROMO_CODES: Record<string, { slot: string }> = {
  ABATAD: { slot: "9:30 AM" },
  CACDCT: { slot: "9:30 AM" },
  CKJFVO: { slot: "12:30 PM" },
};

function isRefunded(s: Stripe.Checkout.Session): boolean {
  const pi = s.payment_intent as Stripe.PaymentIntent | null;
  const charge = pi?.latest_charge as Stripe.Charge | null;
  return charge?.refunded === true;
}

// A 100%-off order has nothing to charge, so Stripe marks it
// "no_payment_required" instead of "paid" — treat both as a completed order.
function isCompleted(s: Stripe.Checkout.Session): boolean {
  return s.payment_status === "paid" || s.payment_status === "no_payment_required";
}

export async function POST(request: NextRequest) {
  try {
    const { date, ticketCount, timeSlot, secondSlot, primaryEmail, primaryName, primaryPhone, registrants, promoCode } =
      await request.json();

    if (!date || !ticketCount || !timeSlot || !primaryEmail || !primaryName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const workshopDate = date as WorkshopDate;
    const validSlots = SLOTS_BY_DATE[workshopDate];
    if (!validSlots || !validSlots.includes(timeSlot)) {
      return NextResponse.json({ error: "Invalid workshop date or session." }, { status: 400 });
    }

    if (FORCE_SOLD_OUT && !promoCode) {
      return NextResponse.json({ error: "All sessions are sold out." }, { status: 409 });
    }

    const isBundle = !!secondSlot;
    const baseUnitAmount = isBundle ? 5000 : 2500;
    let unitAmount = baseUnitAmount;
    const SLOT_CAPACITIES = SLOT_CAPACITIES_BY_DATE[workshopDate];
    const SLOT_START_UTC = SLOT_START_UTC_MS_BY_DATE[workshopDate];
    const SLOT_LEVELS = SLOT_LEVELS_BY_DATE[workshopDate];
    // Two different classes can share a clock time (e.g. "11:00 AM" and
    // "11:00 AM (Advanced)") — show the time plus level so it's unambiguous.
    const slotLabel = (slot: string) => {
      const title = SLOT_LEVELS?.[slot]?.title;
      return title ? `${displayTime(slot)} (${title})` : displayTime(slot);
    };

    // Validate promo code if provided. Two kinds: a discount code (public,
    // reusable, % off, valid for specific dates/a time window) or a
    // reservation code (single-use, locks the buyer to one specific slot
    // outside normal capacity).
    const promoUpper = promoCode ? String(promoCode).toUpperCase().trim() : null;
    const discount = promoUpper ? DISCOUNT_CODES[promoUpper] : null;
    if (promoUpper && discount) {
      if (Date.now() >= discount.expiresAt) {
        return NextResponse.json({ error: "This code has expired." }, { status: 400 });
      }
      if (!discount.validDates.includes(workshopDate)) {
        return NextResponse.json({ error: "This code is not valid for this workshop date." }, { status: 400 });
      }
      unitAmount = Math.round(baseUnitAmount * (1 - discount.percentOff / 100));
    } else if (promoUpper) {
      const promo = PROMO_CODES[promoUpper];
      if (!promo) {
        return NextResponse.json({ error: "Invalid code." }, { status: 400 });
      }
      if (promo.slot !== timeSlot) {
        return NextResponse.json({ error: "Reservation code is not valid for this session." }, { status: 400 });
      }
      if (ticketCount !== 1) {
        return NextResponse.json({ error: "Reservation codes are valid for 1 ticket only." }, { status: 400 });
      }
    }

    // Reject if class has already started (applies to all slots in the order)
    const slotsInOrder = isBundle ? [timeSlot, secondSlot] : [timeSlot];
    for (const slot of slotsInOrder) {
      const startUtc = SLOT_START_UTC[slot];
      if (startUtc && Date.now() >= startUtc) {
        return NextResponse.json(
          { error: `Registration for the ${slotLabel(slot)} session is now closed. Class has already started.` },
          { status: 409 }
        );
      }
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const allSessions: Stripe.Checkout.Session[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;
    while (hasMore) {
      const page = await stripe.checkout.sessions.list({
        limit: 100,
        created: { gte: ACTIVE_WORKSHOPS_START },
        expand: ["data.payment_intent.latest_charge"],
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      allSessions.push(...page.data);
      hasMore = page.has_more;
      if (page.data.length > 0) startingAfter = page.data[page.data.length - 1].id;
    }

    // Check a single-use code hasn't been used already — plain reservation
    // codes are always single-use; a discount code only if marked singleUse
    // (most discount codes, like SKATEHSP, are public/reusable).
    if (promoUpper && (!discount || discount.singleUse)) {
      const codeUsed = allSessions.some(
        (s) =>
          isCompleted(s) &&
          !isRefunded(s) &&
          s.metadata?.date === workshopDate &&
          s.metadata?.promo_code === promoUpper
      );
      if (codeUsed) {
        return NextResponse.json({ error: "This code has already been used." }, { status: 409 });
      }
    }

    // Capacity check — skip for reservation-code slots (reserved spots are
    // outside normal cap); discount codes still go through normal capacity.
    const slotsToCheck: string[] = isBundle ? [timeSlot, secondSlot] : [timeSlot];
    for (const slot of slotsToCheck) {
      if (promoUpper && !discount && slot === timeSlot) continue; // reserved spot bypasses capacity
      const cap = SLOT_CAPACITIES[slot] ?? SLOT_CAPACITY;
      const slotSold = allSessions
        .filter((s) => {
          if (!isCompleted(s) || isRefunded(s)) return false;
          if (s.metadata?.date !== workshopDate) return false;
          return s.metadata?.time_slot === slot || s.metadata?.second_time_slot === slot;
        })
        .reduce((sum, s) => sum + Number(s.metadata?.ticket_count || 1), 0);
      const remaining = Math.max(0, cap - slotSold);
      if (ticketCount > remaining) {
        return NextResponse.json(
          { error: `Only ${remaining} spot${remaining === 1 ? "" : "s"} left for the ${slotLabel(slot)} session.` },
          { status: 409 }
        );
      }
    }

    const sessionLabel = isBundle ? `${slotLabel(timeSlot)} + ${slotLabel(secondSlot)}` : `${slotLabel(timeSlot)} session`;

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: isBundle
              ? "Houston Skate Project · 2-Session Pass"
              : "Houston Skate Project · General Admission",
            description: `Pop-Up Workshop · ${workshopDate} · ${sessionLabel} · Houston, TX`,
          },
          unit_amount: unitAmount,
        },
        quantity: ticketCount,
      },
    ];

    const isFree = unitAmount * ticketCount === 0;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: primaryEmail,
      metadata: {
        event: "Houston Skate Project",
        date: workshopDate,
        time_slot: timeSlot,
        ...(isBundle ? { second_time_slot: secondSlot } : {}),
        primary_name: primaryName,
        primary_phone: primaryPhone || "",
        ticket_count: String(ticketCount),
        registrants: JSON.stringify(registrants).slice(0, 490),
        ...(promoUpper ? { promo_code: promoUpper } : {}),
        ...(discount ? { discount_percent: String(discount.percentOff) } : {}),
      },
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/#tickets`,
      // Stripe doesn't create a PaymentIntent for a fully free order, so
      // payment_intent_data isn't valid to pass in that case.
      ...(isFree ? {} : {
        payment_intent_data: {
          description: `Houston Skate Project · ${sessionLabel} · ${ticketCount} ticket(s) · ${primaryName}`,
        },
      }),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
