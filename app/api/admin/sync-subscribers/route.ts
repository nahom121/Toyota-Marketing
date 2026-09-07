import Stripe from "stripe";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const event = request.nextUrl.searchParams.get("event") || "workshop3";

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
    const WORKSHOP4_START = new Date("2026-09-07T00:00:00Z").getTime() / 1000;
    const WORKSHOP4_SLOTS = new Set(["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"]);
    const WORKSHOP3_SLOTS = new Set(["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]);
    const WORKSHOP2_SLOTS = new Set(["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM"]);

    const paid = sessions.filter((s) => {
      if (s.payment_status !== "paid") return false;
      const pi = s.payment_intent as Stripe.PaymentIntent | null;
      const charge = pi?.latest_charge as Stripe.Charge | null;
      if (charge?.refunded) return false;
      const slot = s.metadata?.time_slot || "";
      if (event === "current")   return WORKSHOP4_SLOTS.has(slot) && s.created >= WORKSHOP4_START;
      if (event === "workshop3") return WORKSHOP3_SLOTS.has(slot) && s.created >= WORKSHOP2_START && s.created < WORKSHOP4_START;
      if (event === "workshop2") return WORKSHOP2_SLOTS.has(slot) && s.created >= WORKSHOP2_START;
      if (event === "previous")  return s.created < WORKSHOP2_START;
      return false;
    });

    // Dedupe by email, grab first name from primary_name
    const byEmail = new Map<string, string>();
    for (const s of paid) {
      const email = s.customer_email || "";
      if (!email) continue;
      const fullName = s.metadata?.primary_name || "";
      const firstName = fullName.split(" ")[0] || "";
      if (!byEmail.has(email)) byEmail.set(email, firstName);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    let added = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const [email, firstName] of byEmail) {
      try {
        const { error } = await resend.contacts.create({
          email,
          firstName: firstName || undefined,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID!,
        });
        if (error) throw new Error(error.message || "Resend error");
        added++;
      } catch (err) {
        failed++;
        errors.push(`${email}: ${err instanceof Error ? err.message : "unknown error"}`);
      }
    }

    return NextResponse.json({ success: true, total: byEmail.size, added, failed, errors });
  } catch (error) {
    console.error("Sync subscribers error:", error);
    return NextResponse.json({ error: "Failed to sync subscribers" }, { status: 500 });
  }
}
