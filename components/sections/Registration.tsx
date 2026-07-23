"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, Minus, Plus, ShoppingCart, User, Phone, Mail } from "lucide-react";

const TICKET_PRICE = 25;
const SLOT_CAPACITY = 30;
const SLOTS = ["7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"] as const;
type Slot = typeof SLOTS[number];
type SlotData = { sold: number; remaining: number; isFull: boolean };

type TicketInfo = {
  name: string;
  email: string;
  phone: string;
};

function defaultTicket(isPrimary = false): TicketInfo {
  return { name: "", email: isPrimary ? "" : "N/A", phone: isPrimary ? "" : "N/A" };
}

function StepIndicator({ current }: { current: number }) {
  const steps = ["Tickets", "Attendees", "Waiver", "Review"];
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = current > n;
        const active = current === n;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              done ? "bg-crimson text-white" : active ? "bg-charcoal text-white" : "bg-charcoal/10 text-ink-muted"
            }`}>
              {done ? <Check className="w-4 h-4" /> : n}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${active ? "text-charcoal" : "text-ink-muted"}`}>
              {label}
            </span>
            {i < steps.length - 1 && <div className={`w-6 h-px mx-1 ${done ? "bg-crimson" : "bg-charcoal/15"}`} />}
          </div>
        );
      })}
    </div>
  );
}

function TicketCard({
  ticket, index, isPrimary, onChange,
}: {
  ticket: TicketInfo; index: number; isPrimary: boolean; onChange: (t: TicketInfo) => void;
}) {
  const set = (field: keyof TicketInfo, val: string) =>
    onChange({ ...ticket, [field]: val });

  return (
    <div className="bg-white border border-charcoal/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-sand/30 flex items-center justify-center">
          <User className="w-3.5 h-3.5 text-charcoal" />
        </div>
        <span className="font-semibold text-charcoal text-sm">
          {isPrimary ? "Primary Attendee" : `Attendee ${index + 1}`}
        </span>
        {isPrimary && (
          <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-crimson bg-crimson/10 px-2 py-0.5 rounded-full">
            Ticket Holder
          </span>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-ink-secondary mb-1.5">Full Name *</label>
        <input
          value={ticket.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Enter name"
          required
          className="form-input"
        />
      </div>

      {isPrimary && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink-secondary mb-1.5">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-ink-muted" />
              <input
                type="email"
                value={ticket.email === "N/A" ? "" : ticket.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@email.com"
                required
                className="form-input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-secondary mb-1.5">Phone *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-ink-muted" />
              <input
                type="tel"
                value={ticket.phone === "N/A" ? "" : ticket.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="(713) 000-0000"
                required
                className="form-input pl-10"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Registration() {
  const [step, setStep] = useState(1);
  const [ticketCount, setTicketCount] = useState(1);
  const [tickets, setTickets] = useState<TicketInfo[]>([defaultTicket(true)]);
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [slotData, setSlotData] = useState<Record<string, SlotData> | null>(null);

  useEffect(() => {
    fetch("/api/capacity")
      .then((r) => r.json())
      .then((d) => setSlotData(d.slots))
      .catch(() => {
        const fallback = Object.fromEntries(SLOTS.map((s) => [s, { sold: 0, remaining: SLOT_CAPACITY, isFull: false }]));
        setSlotData(fallback);
      });
  }, []);

  const spotsLeft = selectedSlot && slotData ? slotData[selectedSlot]?.remaining ?? SLOT_CAPACITY : SLOT_CAPACITY;
  const maxTickets = Math.min(10, spotsLeft);

  // Sync ticket array length to count
  useEffect(() => {
    setTickets((prev) => {
      if (ticketCount > prev.length) {
        return [...prev, ...Array(ticketCount - prev.length).fill(null).map(() => defaultTicket(false))];
      }
      return prev.slice(0, ticketCount);
    });
  }, [ticketCount]);

  const total = ticketCount * TICKET_PRICE;

  const updateTicket = (i: number, t: TicketInfo) =>
    setTickets((prev) => { const next = [...prev]; next[i] = t; return next; });

  const isSoldOut = selectedSlot ? slotData?.[selectedSlot]?.isFull ?? false : false;
  const step1Valid = !!selectedSlot && ticketCount >= 1 && ticketCount <= maxTickets && !isSoldOut;
  const step2Valid = tickets.every((t, i) => {
    if (!t.name.trim()) return false;
    if (i === 0 && (!t.email || t.email === "N/A" || !t.phone || t.phone === "N/A")) return false;
    return true;
  });

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketCount,
          timeSlot: selectedSlot,
          primaryEmail: tickets[0].email,
          primaryName: tickets[0].name,
          primaryPhone: tickets[0].phone,
          registrants: tickets.map((t, i) => ({
            name: t.name,
            ...(i === 0 ? { email: t.email, phone: t.phone } : {}),
          })),
        }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError("Something went wrong. Please try again or email info@houstonskateproject.org");
      setLoading(false);
    }
  };

  return (
    <section id="tickets" className="section-pad bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-sand/20 blur-[80px] pointer-events-none" />

      <div className="max-w-3xl mx-auto container-pad relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="label-tag mx-auto mb-5">Register Now</div>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight">
            Secure your spot.
            <br />
            <span className="font-script text-crimson" style={{ fontSize: "1.1em" }}>
              August 9th.
            </span>
          </h2>
          <p className="text-ink-secondary mt-3 text-base">
            General Admission: <span className="font-semibold text-charcoal">$25</span> per person
          </p>
          {slotData && (
            <p className="text-ink-muted text-xs mt-3">Select a session below to see availability</p>
          )}
        </motion.div>

        <StepIndicator current={step} />

        <div className="bg-cream-light border border-charcoal/10 rounded-3xl p-6 md:p-8">
          <AnimatePresence mode="wait">

            {/* STEP 1 — Ticket Count */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl text-charcoal mb-2">Pick your session</h3>
                <p className="text-ink-secondary text-sm mb-6">Each session is 1 hour · 30 spots per session · August 9th, 2026</p>

                {/* Slot selector */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {SLOTS.map((slot) => {
                    const info = slotData?.[slot];
                    const full = info?.isFull ?? false;
                    const left = info?.remaining ?? SLOT_CAPACITY;
                    const selected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => { if (!full) { setSelectedSlot(slot); setTicketCount(1); } }}
                        disabled={full}
                        className={`rounded-2xl p-4 text-left border-2 transition-all ${
                          full
                            ? "border-charcoal/10 bg-charcoal/5 opacity-50 cursor-not-allowed"
                            : selected
                            ? "border-crimson bg-crimson/5"
                            : "border-charcoal/15 hover:border-sand bg-white"
                        }`}
                      >
                        <p className={`font-display text-xl mb-1 ${selected ? "text-crimson" : "text-charcoal"}`}>{slot}</p>
                        {full ? (
                          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Sold Out</p>
                        ) : (
                          <p className={`text-xs font-semibold ${left <= 5 ? "text-crimson" : "text-ink-muted"}`}>
                            {left <= 5 && <span className="inline-block w-1.5 h-1.5 bg-crimson rounded-full mr-1 animate-pulse align-middle" />}
                            {left} spot{left !== 1 ? "s" : ""} left
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Ticket count — only show after slot selected */}
                {selectedSlot && !isSoldOut && (
                  <>
                    <p className="text-ink-secondary text-sm font-medium mb-4">How many tickets for the <strong>{selectedSlot}</strong> session?</p>
                    <div className="flex items-center justify-center gap-6 mb-6">
                      <button
                        onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                        className="w-12 h-12 rounded-full border-2 border-charcoal/20 flex items-center justify-center hover:border-crimson hover:text-crimson transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <div className="text-center">
                        <div className="font-display text-6xl text-charcoal">{ticketCount}</div>
                        <div className="text-ink-muted text-sm">{ticketCount === 1 ? "ticket" : "tickets"}</div>
                      </div>
                      <button
                        onClick={() => setTicketCount(Math.min(maxTickets, ticketCount + 1))}
                        disabled={ticketCount >= maxTickets}
                        className="w-12 h-12 rounded-full border-2 border-charcoal/20 flex items-center justify-center hover:border-crimson hover:text-crimson transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex justify-center gap-2 mb-6 flex-wrap">
                      {[1, 2, 3, 4, 5].filter((n) => n <= maxTickets).map((n) => (
                        <button
                          key={n}
                          onClick={() => setTicketCount(n)}
                          className={`w-10 h-10 rounded-xl text-sm font-semibold border-2 transition-all ${
                            ticketCount === n
                              ? "bg-crimson border-crimson text-white"
                              : "border-charcoal/20 text-ink-secondary hover:border-sand"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Price preview */}
                <div className="bg-sand/20 border border-sand/40 rounded-2xl p-4 text-center mb-6">
                  <p className="text-ink-secondary text-sm">
                    {ticketCount} ticket{ticketCount > 1 ? "s" : ""} × $25
                    {" = "}
                    <span className="font-display text-2xl text-charcoal">${ticketCount * 25}</span>
                  </p>
                </div>

                {!isSoldOut && (
                  <button
                    onClick={() => setStep(2)}
                    disabled={!step1Valid}
                    className="btn-primary w-full py-4 text-base disabled:opacity-50"
                  >
                    Continue — Enter Attendee Info
                  </button>
                )}
              </motion.div>
            )}

            {/* STEP 2 — Attendee Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl text-charcoal mb-2">Attendee details</h3>
                <p className="text-ink-secondary text-sm mb-6">Fill in the info for each person attending.</p>

                <div className="space-y-4 mb-6">
                  {tickets.map((ticket, i) => (
                    <TicketCard
                      key={i}
                      ticket={ticket}
                      index={i}
                      isPrimary={i === 0}
                      onChange={(t) => updateTicket(i, t)}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary px-6 py-3 text-sm">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!step2Valid}
                    className="btn-primary flex-1 py-3 text-sm disabled:opacity-50"
                  >
                    Continue — Waiver
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Waiver */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl text-charcoal mb-2">Safety waiver</h3>
                <p className="text-ink-secondary text-sm mb-6">Please read and agree before proceeding.</p>

                <div className="bg-white border border-charcoal/10 rounded-2xl p-5 mb-6 text-sm text-ink-secondary leading-relaxed">
                  <p className="font-semibold text-charcoal mb-3">Liability Release & Waiver</p>
                  <p className="mb-3">
                    I understand that roller skating involves an inherent risk of injury, including but not limited to
                    falls, collisions, and other accidents. I voluntarily accept and assume all risks associated with
                    participating in Houston Skate Project events.
                  </p>
                  <p className="mb-3">
                    I, on behalf of myself and all attendees registered under my order, agree to release, discharge,
                    and hold harmless Houston Skate Project, its organizers, staff, and volunteers from any and all
                    liability, claims, demands, or causes of action arising from participation in this event.
                  </p>
                  <p>
                    I confirm that all information provided during registration is accurate, and I agree to follow all
                    event rules and safety guidelines provided on the day.
                  </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer mb-8 group">
                  <div
                    onClick={() => setWaiverAccepted(!waiverAccepted)}
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                      waiverAccepted ? "bg-crimson border-crimson" : "border-charcoal/30 group-hover:border-crimson"
                    }`}
                  >
                    {waiverAccepted && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-ink-secondary leading-relaxed">
                    I have read and agree to the waiver above on behalf of myself and all attendees in my order.
                    I confirm that I am 18 years or older, or that I am a parent/guardian agreeing on behalf of any minors.
                  </span>
                </label>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-secondary px-6 py-3 text-sm">
                    Back
                  </button>
                  <button
                    onClick={() => { if (waiverAccepted) setStep(4); }}
                    disabled={!waiverAccepted}
                    className="btn-primary flex-1 py-3 text-sm disabled:opacity-50"
                  >
                    Continue — Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 — Review & Pay */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl text-charcoal mb-2">Review your order</h3>
                <p className="text-ink-secondary text-sm mb-6">Double-check everything before heading to payment.</p>

                {/* Order summary */}
                <div className="bg-white border border-charcoal/10 rounded-2xl overflow-hidden mb-5">
                  <div className="p-4 border-b border-charcoal/08 bg-charcoal/02">
                    <p className="font-semibold text-charcoal text-sm">Order Summary</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {selectedSlot && (
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-secondary">Session</span>
                        <span className="font-semibold text-charcoal">{selectedSlot} · Aug 9</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-ink-secondary">General Admission × {ticketCount}</span>
                      <span className="font-medium text-charcoal">${ticketCount * TICKET_PRICE}</span>
                    </div>
                    <div className="pt-3 border-t border-charcoal/10 flex justify-between">
                      <span className="font-bold text-charcoal">Total</span>
                      <span className="font-display text-2xl text-charcoal">${total}</span>
                    </div>
                  </div>
                </div>

                {/* Attendee list */}
                <div className="bg-white border border-charcoal/10 rounded-2xl overflow-hidden mb-6">
                  <div className="p-4 border-b border-charcoal/08 bg-charcoal/02">
                    <p className="font-semibold text-charcoal text-sm">Attendees</p>
                  </div>
                  <div className="divide-y divide-charcoal/08">
                    {tickets.map((t, i) => (
                      <div key={i} className="p-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-charcoal">{t.name}</p>
                          {i === 0 && <p className="text-xs text-ink-muted">{t.email}</p>}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-crimson text-sm text-center mb-4">{error}</p>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(3)} className="btn-secondary px-6 py-3 text-sm">
                    Back
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="btn-primary flex-1 py-4 text-base gap-3 disabled:opacity-60"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {loading ? "Redirecting…" : `Pay $${total} Securely`}
                  </button>
                </div>

                <p className="text-center text-ink-muted text-xs mt-4">
                  🔒 Secure payment powered by Stripe. You will be redirected to complete payment.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
