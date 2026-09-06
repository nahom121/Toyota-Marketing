"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NotifySignup() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), firstName: firstName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("success");
      setFirstName("");
      setEmail("");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setStatus("error");
    }
  };

  return (
    <section className="section-pad bg-cream relative overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand to-transparent" />

      {/* Warm light glows */}
      <div className="absolute top-0 left-1/4 w-96 h-64 rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(ellipse, #D4A86A33 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-64 rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(ellipse, #8B5E3C22 0%, transparent 70%)" }} />

      <div className="relative max-w-2xl mx-auto container-pad">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* Card */}
          <div className="bg-cream-light rounded-3xl border border-charcoal/10 shadow-warm-lg overflow-hidden">

            {/* Top accent strip */}
            <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #D4A86A, #8B5E3C, #D4A86A)" }} />

            <div className="px-8 md:px-12 py-10 md:py-12 text-center">

              {/* Skate + label */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="text-3xl">🛼</span>
                <div className="label-tag">Stay in the Loop</div>
                <span className="text-3xl">🛼</span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight mb-3">
                Be the first to know
                <br />
                <span className="font-script text-crimson" style={{ fontSize: "1.1em" }}>
                  when new dates drop.
                </span>
              </h2>

              {/* Divider */}
              <div className="flex items-center justify-center gap-3 my-5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-sand/50" />
                <span className="text-sand text-lg">✦</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-sand/50" />
              </div>

              {/* Subtext */}
              <p className="text-ink-secondary text-base leading-relaxed mb-8 max-w-md mx-auto">
                Join our email list to be the first to know about upcoming workshops, special events,
                and Houston Skate Project announcements.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-sand/20 border border-sand/40 rounded-2xl px-6 py-8 text-center"
                >
                  <div className="text-4xl mb-3">🛼✨</div>
                  <p className="font-display text-xl text-charcoal mb-1">You&apos;re on the list!</p>
                  <p className="text-ink-muted text-sm">We&apos;ll email you the moment a new workshop drops.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-left">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="flex-1 bg-white border border-charcoal/15 rounded-2xl px-5 py-4 text-sm text-charcoal placeholder-ink-muted/60 focus:outline-none focus:border-sand focus:shadow-sand-glow transition-all"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                      placeholder="Email Address"
                      className="flex-1 bg-white border border-charcoal/15 rounded-2xl px-5 py-4 text-sm text-charcoal placeholder-ink-muted/60 focus:outline-none focus:border-sand focus:shadow-sand-glow transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading" || !email.trim()}
                    className="w-full py-4 rounded-2xl font-bold tracking-widest uppercase text-sm text-white transition-all active:scale-[0.98] disabled:opacity-50 shadow-crimson-glow hover:shadow-crimson-glow-lg"
                    style={{ background: "linear-gradient(135deg, #8B5E3C 0%, #6B4528 100%)" }}
                  >
                    {status === "loading" ? "Saving…" : "Keep Me Updated"}
                  </button>

                  {status === "error" && (
                    <p className="text-crimson text-sm text-center">{errorMsg}</p>
                  )}
                </form>
              )}

              <p className="text-ink-muted/50 text-xs mt-5 text-center">No spam, ever. Unsubscribe anytime.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
