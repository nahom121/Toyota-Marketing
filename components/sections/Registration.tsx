"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Check, Minus, Plus, ShoppingCart, User, Phone, Mail } from "lucide-react";

const TICKET_PRICE = 25;
const SLOT_CAPACITY = 30;
const SLOTS = ["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM"] as const;
type Slot = typeof SLOTS[number];

// Slots close 15 min after start time on Aug 30, 2026
const SLOT_CUTOFFS: Record<Slot, Date> = {
  "9:30 AM":  new Date("2026-08-30T09:45:00"),
  "10:30 AM": new Date("2026-08-30T10:45:00"),
  "11:30 AM": new Date("2026-08-30T11:45:00"),
  "12:30 PM": new Date("2026-08-30T12:45:00"),
};

const SLOT_LEVELS: Record<Slot, { title: string; bullets: string[] }> = {
  "9:30 AM": {
    title: "Pre-Beginner",
    bullets: [
      "Have never skated or have very limited experience",
      "Rely on the wall or another person for support",
      "Have difficulty balancing or rolling independently",
      "Use the wall to slow down or stop",
      "Are unsure how to safely fall and get back up",
    ],
  },
  "10:30 AM": {
    title: "Beginner",
    bullets: [
      "Have skated before but may be returning after a long break",
      "Can roll forward independently without holding the wall",
      "Can get around the rink but still feel unsteady",
      "Need more confidence with stopping and turning",
      "Want better balance, control, and comfort on skates",
    ],
  },
  "11:30 AM": {
    title: "Backward Beginner",
    bullets: [
      "Can skate forward confidently and with control",
      "Have little to no backward skating experience",
      "Can skate backward slightly but want stronger fundamentals",
      "Want to learn how to transition from forward to backward",
      "Are ready to build confidence skating backward independently",
    ],
  },
  "12:30 PM": {
    title: "Beginner",
    bullets: [
      "Have skated before but may be returning after a long break",
      "Can roll forward independently without holding the wall",
      "Can get around the rink but still feel unsteady",
      "Need more confidence with stopping and turning",
      "Want better balance, control, and comfort on skates",
    ],
  },
};
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
  const [signature, setSignature] = useState("");
  const [byosAcknowledged, setByosAcknowledged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [secondSlot, setSecondSlot] = useState<Slot | null>(null);
  const [slotData, setSlotData] = useState<Record<string, SlotData> | null>(null);
  const [timeClosedSlots, setTimeClosedSlots] = useState<Set<Slot>>(() => {
    const now = new Date();
    return new Set(SLOTS.filter((s) => now >= SLOT_CUTOFFS[s]));
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      setTimeClosedSlots(new Set(SLOTS.filter((s) => now >= SLOT_CUTOFFS[s])));
    };
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          fetch("/api/capacity")
            .then((r) => r.json())
            .then((d) => setSlotData(d.slots))
            .catch(() => {
              const fallback = Object.fromEntries(SLOTS.map((s) => [s, { sold: 0, remaining: SLOT_CAPACITY, isFull: false }]));
              setSlotData(fallback);
            });
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isBundle = secondSlot !== null;
  const pricePerPerson = isBundle ? 40 : TICKET_PRICE;
  const spotsLeft = selectedSlot && slotData
    ? Math.min(
        slotData[selectedSlot]?.remaining ?? SLOT_CAPACITY,
        secondSlot ? (slotData[secondSlot]?.remaining ?? SLOT_CAPACITY) : SLOT_CAPACITY
      )
    : SLOT_CAPACITY;
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

  const total = ticketCount * pricePerPerson;

  const updateTicket = (i: number, t: TicketInfo) =>
    setTickets((prev) => { const next = [...prev]; next[i] = t; return next; });

  const isSoldOut = selectedSlot ? slotData?.[selectedSlot]?.isFull ?? false : false;
  const isSecondSoldOut = secondSlot ? slotData?.[secondSlot]?.isFull ?? false : false;
  const step1Valid = !!selectedSlot && ticketCount >= 1 && ticketCount <= maxTickets && !isSoldOut && !isSecondSoldOut && byosAcknowledged;
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
          secondSlot: secondSlot ?? undefined,
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
    <section id="tickets" ref={sectionRef} className="section-pad bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand to-transparent" />

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
              August 30th.
            </span>
          </h2>
          <p className="text-ink-secondary mt-3 text-base">
            General Admission: <span className="font-semibold text-charcoal">$25</span> per person
          </p>
          {slotData && (
            <p className="text-ink-muted text-xs mt-3">Select a session below to see availability</p>
          )}
        </motion.div>

        <>

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
                <h3 className="font-display text-2xl text-charcoal mb-1">Pick your session</h3>

                {/* Slot selector */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {SLOTS.map((slot) => {
                    const info = slotData?.[slot];
                    const timeClosed = timeClosedSlots.has(slot);
                    const full = (info?.isFull ?? false) || timeClosed;
                    const left = info?.remaining ?? SLOT_CAPACITY;
                    const selected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => { if (!full) { setSelectedSlot(slot); setTicketCount(1); setSecondSlot(null); } }}
                        disabled={full}
                        className={`rounded-2xl p-4 text-left border-2 transition-all ${
                          full
                            ? "border-charcoal/10 bg-charcoal/5 opacity-50 cursor-not-allowed"
                            : selected
                            ? "border-crimson bg-crimson/5"
                            : "border-charcoal/15 hover:border-sand bg-white"
                        }`}
                      >
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selected ? "text-crimson" : "text-ink-muted"}`}>{SLOT_LEVELS[slot].title}</p>
                        <p className={`font-display text-xl mb-1 ${selected ? "text-crimson" : "text-charcoal"}`}>{slot}</p>
                        {timeClosed ? (
                          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Closed</p>
                        ) : full ? (
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

                {/* Level description — shown when a slot is selected */}
                {selectedSlot && !timeClosedSlots.has(selectedSlot) && (() => {
                  const level = SLOT_LEVELS[selectedSlot];
                  return (
                    <div className="bg-charcoal/4 border border-charcoal/10 rounded-2xl p-5 mb-6">
                      <p className="font-semibold text-charcoal text-sm mb-1">
                        🛼 {level.title} — {selectedSlot}
                      </p>
                      <p className="text-ink-muted text-xs mb-3">This session is for you if you:</p>
                      <ul className="space-y-1.5">
                        {level.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-xs text-ink-secondary">
                            <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-crimson shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-ink-muted mt-4 border-t border-charcoal/10 pt-3">
                        📌 Please arrive at <strong>{selectedSlot}</strong>. Your class will begin 15 minutes after your arrival time.
                      </p>
                    </div>
                  );
                })()}

                {/* 2nd session bundle picker */}
                {selectedSlot && !isSoldOut && !timeClosedSlots.has(selectedSlot) && (
                  <div className="bg-white border border-charcoal/10 rounded-2xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-charcoal text-sm">Add a 2nd session</p>
                        <p className="text-xs text-ink-muted">
                          Bundle: 2 sessions for <span className="font-bold text-charcoal">$40</span> · Save $10
                        </p>
                      </div>
                      {secondSlot && (
                        <button
                          onClick={() => setSecondSlot(null)}
                          className="text-xs text-ink-muted hover:text-crimson transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {SLOTS.filter((s) => s !== selectedSlot).map((slot) => {
                        const info2 = slotData?.[slot];
                        const timeClosed2 = timeClosedSlots.has(slot);
                        const full2 = (info2?.isFull ?? false) || timeClosed2;
                        const picked = secondSlot === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => { if (!full2) setSecondSlot(picked ? null : slot); }}
                            disabled={full2}
                            className={`rounded-xl p-3 text-left border-2 transition-all ${
                              full2
                                ? "border-charcoal/10 bg-charcoal/5 opacity-50 cursor-not-allowed"
                                : picked
                                ? "border-crimson bg-crimson/5"
                                : "border-charcoal/15 hover:border-sand bg-white"
                            }`}
                          >
                            <p className={`font-black uppercase tracking-widest mb-0.5 ${picked ? "text-crimson" : "text-ink-muted"}`} style={{ fontSize: "9px" }}>
                              {SLOT_LEVELS[slot].title}
                            </p>
                            <p className={`font-semibold text-sm ${picked ? "text-crimson" : "text-charcoal"}`}>{slot}</p>
                            <p className={`text-[10px] font-medium mt-0.5 ${picked ? "text-crimson" : "text-ink-muted"}`}>
                              {full2 ? (timeClosed2 ? "Closed" : "Sold Out") : picked ? "✓ Added" : "+ Add"}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Ticket count — only show after slot selected */}
                {selectedSlot && !isSoldOut && (
                  <>
                    <p className="text-ink-secondary text-sm font-medium mb-4">
                      How many people{isBundle ? " (attending both sessions)" : ` for the ${selectedSlot} session`}?
                    </p>
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
                  {isBundle ? (
                    <>
                      <p className="text-ink-secondary text-sm">
                        {ticketCount} person{ticketCount > 1 ? "s" : ""} × 2-session bundle ($40){" = "}
                        <span className="font-display text-2xl text-charcoal">${total}</span>
                      </p>
                      <p className="text-xs font-semibold mt-1" style={{ color: "#2d6a4f" }}>
                        You save ${10 * ticketCount}!
                      </p>
                    </>
                  ) : (
                    <p className="text-ink-secondary text-sm">
                      {ticketCount} ticket{ticketCount > 1 ? "s" : ""} × $25{" = "}
                      <span className="font-display text-2xl text-charcoal">${total}</span>
                    </p>
                  )}
                </div>

                {/* BYOS acknowledgment */}
                <label className="flex items-start gap-3 cursor-pointer mb-5 group">
                  <div
                    onClick={() => setByosAcknowledged(!byosAcknowledged)}
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                      byosAcknowledged ? "bg-crimson border-crimson" : "border-charcoal/30 group-hover:border-crimson"
                    }`}
                  >
                    {byosAcknowledged && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-ink-secondary leading-relaxed">
                    <span className="font-semibold text-charcoal">BYOS: Bring Your Own Skates!</span> I understand that skate rentals are not available for this first pop-up and I will bring my own skates.
                  </span>
                </label>

                {!isSoldOut && (
                  <button
                    onClick={() => setStep(2)}
                    disabled={!step1Valid}
                    className="btn-primary w-full py-4 text-base disabled:opacity-50"
                  >
                    Continue to Attendee Info
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
                    Continue to Waiver
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
                  <p className="mb-3">
                    I confirm that all information provided during registration is accurate, and I agree to follow all
                    pop-up rules and safety guidelines provided on the day.
                  </p>
                  <p className="border-t border-charcoal/10 pt-3">
                    <span className="font-semibold text-charcoal">Media & Photography Consent:</span>{" "}
                    I understand and agree that Houston Skate Project workshops may be filmed or photographed at various
                    points throughout the event for use on social media and promotional content. By registering, I consent
                    on behalf of myself and all attendees in my order to the recording, photographing, and public sharing
                    of such content by Houston Skate Project.
                  </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer mb-5 group">
                  <div
                    onClick={() => setWaiverAccepted(!waiverAccepted)}
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                      waiverAccepted ? "bg-crimson border-crimson" : "border-charcoal/30 group-hover:border-crimson"
                    }`}
                  >
                    {waiverAccepted && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-ink-secondary leading-relaxed">
                    I have read and agree to the waiver above, including the media consent, on behalf of myself and all
                    attendees in my order. I confirm that I am 18 years or older, or that I am a parent/guardian agreeing
                    on behalf of any minors.
                  </span>
                </label>

                {/* Signature */}
                <div className="mb-8">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted mb-2">
                    Signature <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Type your full name to sign"
                    className="w-full border-2 border-charcoal/15 rounded-xl px-4 py-3 text-charcoal font-medium placeholder-ink-muted/50 focus:outline-none focus:border-crimson transition-colors"
                  />
                  <p className="text-[10px] text-ink-muted mt-1.5">
                    By typing your name you are signing this waiver electronically.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-secondary px-6 py-3 text-sm">
                    Back
                  </button>
                  <button
                    onClick={() => { if (waiverAccepted && signature.trim()) setStep(4); }}
                    disabled={!waiverAccepted || !signature.trim()}
                    className="btn-primary flex-1 py-3 text-sm disabled:opacity-50"
                  >
                    Continue to Review
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
                        <span className="text-ink-secondary">{secondSlot ? "Sessions" : "Session"}</span>
                        <span className="font-semibold text-charcoal">
                          {secondSlot ? `${selectedSlot} + ${secondSlot}` : `${selectedSlot} · Aug 30`}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-ink-secondary">
                        {isBundle ? `2-Session Bundle × ${ticketCount}` : `General Admission × ${ticketCount}`}
                      </span>
                      <span className="font-medium text-charcoal">${total}</span>
                    </div>
                    {isBundle && (
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "#2d6a4f" }} className="font-medium">Bundle savings</span>
                        <span style={{ color: "#2d6a4f" }} className="font-medium">-${10 * ticketCount}</span>
                      </div>
                    )}
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
                <p className="text-center text-xs mt-3 text-crimson font-medium">
                  All sales are final. No refunds except if HSP cancels or reschedules.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
        </>
      </div>
    </section>
  );
}
