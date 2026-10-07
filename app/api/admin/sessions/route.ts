import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const event = request.nextUrl.searchParams.get("event") || "current";

  // Each registration records the actual workshop date it was bought for
  // (set once, at checkout, in metadata.date) — matching against that exact
  // label is the reliable way to know which workshop someone signed up for,
  // instead of guessing from when the sale happened relative to a cutoff.
  const EVENT_DATE_LABELS: Record<string, string> = {
    current: "October 11, 2026",
    workshop6: "October 4, 2026",
    workshop5: "September 27, 2026",
    workshop4: "September 13, 2026",
    workshop3: "September 6, 2026",
  };

  const WORKSHOP2_START = new Date("2026-08-18T00:00:00Z").getTime() / 1000;
  const WORKSHOP2_SLOTS = new Set(["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM"]);

  // Coarse Stripe query bounds with generous padding — only used to limit how
  // much data is fetched for performance. Exact classification below is by
  // metadata.date, so imprecise padding here can't cause anyone to be missed.
  const QUERY_RANGE: Record<string, { gte?: number; lt?: number }> = {
    current:   { gte: new Date("2026-10-02T00:00:00Z").getTime() / 1000 },
    workshop6: { gte: new Date("2026-09-25T00:00:00Z").getTime() / 1000, lt: new Date("2026-10-09T00:00:00Z").getTime() / 1000 },
    workshop5: { gte: new Date("2026-09-20T00:00:00Z").getTime() / 1000, lt: new Date("2026-10-02T00:00:00Z").getTime() / 1000 },
    workshop4: { gte: new Date("2026-09-06T00:00:00Z").getTime() / 1000, lt: new Date("2026-09-21T00:00:00Z").getTime() / 1000 },
    workshop3: { gte: new Date("2026-08-25T00:00:00Z").getTime() / 1000, lt: new Date("2026-09-10T00:00:00Z").getTime() / 1000 },
    workshop2: { gte: WORKSHOP2_START },
    previous:  { lt: WORKSHOP2_START },
  };

  const created = QUERY_RANGE[event] || {};

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const sessions: Stripe.Checkout.Session[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const page = await stripe.checkout.sessions.list({
        limit: 100,
        created,
        expand: ["data.payment_intent.latest_charge"],
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      sessions.push(...page.data);
      hasMore = page.has_more;
      if (page.data.length > 0) startingAfter = page.data[page.data.length - 1].id;
    }

    const paid = sessions.filter((s) => {
      if (s.payment_status !== "paid") return false;
      const pi = s.payment_intent as Stripe.PaymentIntent | null;
      const charge = pi?.latest_charge as Stripe.Charge | null;
      if (charge?.refunded) return false;

      const label = EVENT_DATE_LABELS[event];
      if (label) return s.metadata?.date === label;

      // Workshop 2 / Workshop 1 predate reliable date metadata — fall back
      // to slot-based matching for those.
      const slot = s.metadata?.time_slot || "";
      if (event === "workshop2") return WORKSHOP2_SLOTS.has(slot);
      if (event === "previous")  return true;
      return false;
    });

    const attendees = paid.map((s) => {
      const meta = s.metadata || {};
      let phone = meta.primary_phone || "";
      if (!phone && meta.registrants) {
        try {
          const regs = JSON.parse(meta.registrants);
          phone = regs[0]?.phone || "";
        } catch {}
      }
      return {
        date: new Date(s.created * 1000).toISOString(),
        name: meta.primary_name || "N/A",
        email: s.customer_email || "N/A",
        phone: phone || "N/A",
        timeSlot: meta.second_time_slot
          ? `${meta.time_slot} + ${meta.second_time_slot}`
          : meta.time_slot || "N/A",
        tickets: Number(meta.ticket_count || 1),
        amountPaid: ((s.amount_total || 0) / 100).toFixed(2),
        sessionId: s.id,
      };
    });

    attendees.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ success: true, attendees, total: attendees.length });
  } catch (error) {
    console.error("Admin sessions error:", error);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}
