import Stripe from "stripe";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");
    if (!sessionId) return NextResponse.json({ error: "Missing session_id" }, { status: 400 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    const meta = session.metadata || {};
    const name = meta.primary_name || "Guest";
    const email = session.customer_email || "";
    const ticketCount = meta.ticket_count || "1";
    const rentalCount = meta.rental_count || "0";
    const amountPaid = ((session.amount_total || 0) / 100).toFixed(2);

    // Send confirmation email
    if (email) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Houston Skate Project <info@houstonskateproject.com>",
        to: email,
        subject: "You're in! Houston Skate Project — July 26, 2026 🛼",
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#F5EDD9;padding:32px;border-radius:16px">
            <div style="text-align:center;margin-bottom:24px">
              <div style="display:inline-block;background:#C41E3A;color:white;font-size:32px;width:56px;height:56px;border-radius:50%;line-height:56px;text-align:center;margin-bottom:12px">🛼</div>
              <h1 style="font-size:28px;color:#1C1C1C;margin:0">You&apos;re registered!</h1>
              <p style="color:#4A4A4A;margin-top:8px">Houston Skate Project · Pop-Up Workshop</p>
            </div>

            <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(28,28,28,0.1)">
              <h2 style="font-size:14px;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px">Your Order</h2>
              <table style="width:100%;font-size:14px;color:#1C1C1C;border-collapse:collapse">
                <tr><td style="padding:6px 0">Hi, ${name}!</td></tr>
                <tr><td style="padding:6px 0">Tickets</td><td style="padding:6px 0;text-align:right;font-weight:600">${ticketCount}</td></tr>
                ${Number(rentalCount) > 0 ? `<tr><td style="padding:6px 0">Skate Rentals</td><td style="padding:6px 0;text-align:right;font-weight:600">${rentalCount}</td></tr>` : ""}
                <tr style="border-top:1px solid rgba(28,28,28,0.1)">
                  <td style="padding:10px 0 0;font-weight:bold">Total Paid</td>
                  <td style="padding:10px 0 0;text-align:right;font-weight:bold;color:#C41E3A;font-size:18px">$${amountPaid}</td>
                </tr>
              </table>
            </div>

            <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(28,28,28,0.1)">
              <h2 style="font-size:14px;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px">Event Details</h2>
              <p style="margin:4px 0;font-size:14px;color:#1C1C1C">📅 <strong>Date:</strong> July 26th, 2026</p>
              <p style="margin:4px 0;font-size:14px;color:#1C1C1C">📍 <strong>Location:</strong> Houston, TX — venue TBA</p>
              <p style="margin:8px 0 0;font-size:13px;color:#8A8A8A">Follow <strong>@HoustonSkateProject</strong> on Instagram and TikTok for the venue announcement!</p>
            </div>

            <div style="text-align:center;padding:16px;background:#C41E3A;border-radius:12px;color:white">
              <p style="margin:0;font-size:16px;font-weight:bold">See you on the floor! 🎶</p>
              <p style="margin:6px 0 0;font-size:13px;opacity:0.85">Roll how you want. Express who you are.</p>
            </div>

            <p style="text-align:center;font-size:12px;color:#8A8A8A;margin-top:20px">
              Questions? info@houstonskateproject.com
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      name,
      email,
      ticketCount,
      rentalCount,
      amountPaid,
    });
  } catch (error) {
    console.error("Confirm error:", error);
    return NextResponse.json({ error: "Failed to confirm" }, { status: 500 });
  }
}
