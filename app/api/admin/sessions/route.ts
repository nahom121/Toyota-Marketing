import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const sessions: Stripe.Checkout.Session[] = [];
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const page = await stripe.checkout.sessions.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      sessions.push(...page.data);
      hasMore = page.has_more;
      if (page.data.length > 0) startingAfter = page.data[page.data.length - 1].id;
    }

    const paid = sessions.filter((s) => s.payment_status === "paid");

    const attendees = paid.map((s) => {
      const meta = s.metadata || {};
      return {
        date: new Date((s.created) * 1000).toISOString(),
        name: meta.primary_name || "—",
        email: s.customer_email || "—",
        phone: meta.primary_phone || "—",
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
