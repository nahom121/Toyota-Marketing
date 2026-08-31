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
    const timeSlot = meta.time_slot || "";
    const secondTimeSlot = meta.second_time_slot || "";
    const isBundle = !!secondTimeSlot;
    const amountPaid = ((session.amount_total || 0) / 100).toFixed(2);

    // Already sent — return success without re-sending
    if (meta.confirmation_sent === "true") {
      return NextResponse.json({ success: true, name, email, ticketCount, timeSlot, amountPaid });
    }

    // Mark as sent before sending (prevents double-send on concurrent requests)
    await stripe.checkout.sessions.update(sessionId, {
      metadata: { ...meta, confirmation_sent: "true" },
    });

    if (email) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Houston Skate Project <info@houstonskateproject.org>",
        to: email,
        subject: "You're in! Houston Skate Project · September 6, 2026 🛼",
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#F5EDD9;padding:32px;border-radius:16px">
            <div style="text-align:center;margin-bottom:24px">
              <div style="display:inline-block;background:#8B5E3C;color:white;font-size:32px;width:56px;height:56px;border-radius:50%;line-height:56px;text-align:center;margin-bottom:12px">🛼</div>
              <h1 style="font-size:28px;color:#1C1C1C;margin:0">You're registered!</h1>
              <p style="color:#4A4A4A;margin-top:8px">Houston Skate Project · Pop-Up Workshop</p>
            </div>

            <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(28,28,28,0.1)">
              <h2 style="font-size:14px;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px">Your Order</h2>
              <table style="width:100%;font-size:14px;color:#1C1C1C;border-collapse:collapse">
                <tr><td style="padding:6px 0">Hi, ${name}!</td></tr>
                <tr><td style="padding:6px 0">${isBundle ? "Sessions" : "Session"}</td><td style="padding:6px 0;text-align:right;font-weight:600">${isBundle ? `${timeSlot} + ${secondTimeSlot}` : timeSlot}</td></tr>
                <tr><td style="padding:6px 0">${isBundle ? "Bundle" : "Tickets"}</td><td style="padding:6px 0;text-align:right;font-weight:600">${isBundle ? `${ticketCount} person${Number(ticketCount) > 1 ? "s" : ""} · 2 sessions` : ticketCount}</td></tr>
                <tr style="border-top:1px solid rgba(28,28,28,0.1)">
                  <td style="padding:10px 0 0;font-weight:bold">Total Paid</td>
                  <td style="padding:10px 0 0;text-align:right;font-weight:bold;color:#8B5E3C;font-size:18px">$${amountPaid}</td>
                </tr>
              </table>
            </div>

            <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid rgba(28,28,28,0.1)">
              <h2 style="font-size:14px;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px">Pop-Up Details</h2>
              <p style="margin:4px 0;font-size:14px;color:#1C1C1C">📅 <strong>Date:</strong> September 6th, 2026</p>
              <p style="margin:4px 0;font-size:14px;color:#1C1C1C">🕐 <strong>${isBundle ? "Your sessions:" : "Your session:"}</strong> ${isBundle ? `${timeSlot} &amp; ${secondTimeSlot}` : timeSlot}</p>
              <p style="margin:8px 0 4px;font-size:13px;color:#4A4A4A;background:#FFF8EC;border-left:3px solid #8B5E3C;padding:8px 10px;border-radius:4px">📌 <strong>Arrive at your session time.</strong> The time above is your check-in time — you'll use the first 15 minutes to get your skates on and get comfortable. Class begins 15 minutes after you arrive.</p>
              <p style="margin:4px 0;font-size:14px;color:#1C1C1C">📍 <strong>Location:</strong> 221 Barren Springs Dr, Ste 15, Houston, TX 77090</p>
            </div>

            <div style="text-align:center;padding:16px;background:#8B5E3C;border-radius:12px;color:white">
              <p style="margin:0;font-size:16px;font-weight:bold">See you on the floor! 🎶</p>
              <p style="margin:6px 0 0;font-size:13px;opacity:0.85">Roll how you want. Express who you are.</p>
            </div>

            <p style="text-align:center;font-size:12px;color:#8A8A8A;margin-top:20px">
              Questions? info@houstonskateproject.org
            </p>
          </div>
        `,
      });
    }

    // Notify organizer
    const organizerEmail = process.env.ORGANIZER_EMAIL;
    if (organizerEmail) {
      const resend2 = new Resend(process.env.RESEND_API_KEY);
      await resend2.emails.send({
        from: "Houston Skate Project <info@houstonskateproject.org>",
        to: organizerEmail,
        subject: `New booking: ${name} · ${timeSlot} · ${ticketCount} ticket${Number(ticketCount) > 1 ? "s" : ""}`,
        html: `
          <div style="font-family:sans-serif;max-width:400px;margin:0 auto;padding:24px">
            <h2 style="color:#1C1C1C;margin:0 0 16px">New Registration 🛼</h2>
            <table style="width:100%;font-size:14px;color:#1C1C1C;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#8A8A8A">Name</td><td style="padding:6px 0;font-weight:600;text-align:right">${name}</td></tr>
              <tr><td style="padding:6px 0;color:#8A8A8A">Email</td><td style="padding:6px 0;text-align:right">${email}</td></tr>
              <tr><td style="padding:6px 0;color:#8A8A8A">${isBundle ? "Sessions" : "Session"}</td><td style="padding:6px 0;font-weight:600;text-align:right">${isBundle ? `${timeSlot} + ${secondTimeSlot}` : timeSlot}</td></tr>
              <tr><td style="padding:6px 0;color:#8A8A8A">Tickets</td><td style="padding:6px 0;font-weight:600;text-align:right">${ticketCount}</td></tr>
              <tr style="border-top:1px solid #eee"><td style="padding:10px 0 0;font-weight:bold">Paid</td><td style="padding:10px 0 0;text-align:right;font-weight:bold;color:#8B5E3C;font-size:18px">$${amountPaid}</td></tr>
            </table>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      name,
      email,
      ticketCount,
      timeSlot,
      amountPaid,
    });
  } catch (error) {
    console.error("Confirm error:", error);
    return NextResponse.json({ error: "Failed to confirm" }, { status: 500 });
  }
}
