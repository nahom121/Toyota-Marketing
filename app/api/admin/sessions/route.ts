import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const event = request.nextUrl.searchParams.get("event") || "current";

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
    const WORKSHOP3_SLOTS = new Set(["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]);
    const WORKSHOP2_SLOTS = new Set(["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM"]);

    const paid = sessions.filter((s) => {
      if (s.payment_status !== "paid") return false;
      const pi = s.payment_intent as Stripe.PaymentIntent | null;
      const charge = pi?.latest_charge as Stripe.Charge | null;
      if (charge?.refunded) return false;
      const slot = s.metadata?.time_slot || "";
      if (event === "current")   return WORKSHOP3_SLOTS.has(slot);
      if (event === "workshop2") return WORKSHOP2_SLOTS.has(slot) && s.created >= WORKSHOP2_START;
      if (event === "previous")  return s.created < WORKSHOP2_START;
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
