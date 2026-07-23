"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Instagram, Music2, Calendar } from "lucide-react";
import { Suspense } from "react";

type ConfirmData = {
  name: string;
  ticketCount: string;
  rentalCount: string;
  amountPaid: string;
};

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [data, setData] = useState<ConfirmData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) { setLoading(false); return; }
    fetch(`/api/confirm?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setData(d); })
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Check */}
        <div className="w-24 h-24 rounded-full bg-crimson/10 border-2 border-crimson/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-crimson" />
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-3">
          {data?.name ? `You're in, ${data.name}!` : "You're in!"}
        </h1>
        <p className="text-ink-secondary text-lg leading-relaxed mb-8">
          Your registration for the Houston Skate Project is confirmed.
          We can&apos;t wait to see you on July 26th!
        </p>

        {/* Order summary */}
        {!loading && data && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-cream-light border border-charcoal/10 rounded-2xl p-5 mb-6 text-left space-y-2"
          >
            <p className="font-semibold text-charcoal text-sm mb-3">Order Confirmed</p>
            <div className="flex justify-between text-sm">
              <span className="text-ink-secondary">Tickets</span>
              <span className="font-medium text-charcoal">{data.ticketCount}</span>
            </div>
            {Number(data.rentalCount) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-ink-secondary">Skate Rentals</span>
                <span className="font-medium text-charcoal">{data.rentalCount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm pt-2 border-t border-charcoal/10">
              <span className="font-bold text-charcoal">Total Paid</span>
              <span className="font-bold text-crimson">${data.amountPaid}</span>
            </div>
          </motion.div>
        )}

        {/* Event reminder */}
        <div className="bg-charcoal text-white rounded-2xl p-5 mb-6">
          <Calendar className="w-6 h-6 text-sand mx-auto mb-3" />
          <p className="font-display text-xl mb-1">July 26th, 2026</p>
          <p className="text-white/60 text-sm">Sky Lab · 4112 Washington Ave, Houston, TX 77007</p>
          <p className="text-white/50 text-xs mt-2">
            Doors open at 7:00 PM · See you on the floor!
          </p>
        </div>

        {/* Social follow */}
        <p className="text-ink-secondary text-sm mb-4">
          Follow along for updates and highlights:
        </p>
        <div className="flex gap-3 justify-center mb-8">
          <a
            href="https://www.instagram.com/houstonskateproject"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-charcoal text-white rounded-full text-sm font-medium hover:bg-charcoal-soft transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@houstonskateproject"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-charcoal text-white rounded-full text-sm font-medium hover:bg-charcoal-soft transition-colors"
          >
            <Music2 className="w-4 h-4" />
            TikTok
          </a>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="btn-secondary px-8 py-3 text-sm"
        >
          Back to Home
        </button>

        <p className="text-ink-muted text-xs mt-6">
          A confirmation email has been sent to your inbox.
          Questions? info@houstonskateproject.org
        </p>
      </motion.div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-ink-muted text-sm">Loading…</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
