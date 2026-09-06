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
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "linear-gradient(135deg, #1a0a14 0%, #1C1C1C 40%, #1a0d08 100%)" }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,16,46,0.18) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,94,60,0.15) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,16,46,0.07) 0%, transparent 70%)", transform: "translate(-50%, -50%)" }} />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* Skate emoji + label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.span
              animate={{ rotate: [0, -8, 8, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              className="text-4xl select-none"
            >
              🛼
            </motion.span>
            <div className="label-tag-dark">Stay in the Loop</div>
            <motion.span
              animate={{ rotate: [0, 8, -8, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, delay: 0.2 }}
              className="text-4xl select-none"
            >
              🛼
            </motion.span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-cream leading-tight mb-4">
            Join our email list &amp;{" "}
            <span className="font-script text-crimson" style={{ fontSize: "1.08em" }}>
              roll with us.
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-cream/55 text-base leading-relaxed mb-10 max-w-md mx-auto">
            Be the first to know about upcoming workshops, special events, and Houston Skate Project announcements.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl px-8 py-8 text-center border border-green-500/20"
              style={{ background: "rgba(20,60,30,0.4)" }}
            >
              <div className="text-4xl mb-3">🛼✨</div>
              <p className="text-green-300 font-display text-xl mb-1">You&apos;re on the list!</p>
              <p className="text-green-300/60 text-sm">We&apos;ll email you the moment a new workshop drops.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Inputs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <label className="absolute -top-2 left-4 text-[10px] font-bold uppercase tracking-widest text-crimson bg-transparent px-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Michaela"
                    className="w-full px-5 py-4 rounded-2xl text-sm text-cream placeholder-cream/30 focus:outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(200,16,46,0.35)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.border = "1.5px solid rgba(200,16,46,0.75)")}
                    onBlur={(e) => (e.currentTarget.style.border = "1.5px solid rgba(200,16,46,0.35)")}
                  />
                </div>
                <div className="flex-1 relative">
                  <label className="absolute -top-2 left-4 text-[10px] font-bold uppercase tracking-widest text-crimson bg-transparent px-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 rounded-2xl text-sm text-cream placeholder-cream/30 focus:outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(200,16,46,0.35)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.border = "1.5px solid rgba(200,16,46,0.75)")}
                    onBlur={(e) => (e.currentTarget.style.border = "1.5px solid rgba(200,16,46,0.35)")}
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="w-full py-4 rounded-full font-black tracking-widest uppercase text-sm text-white transition-all active:scale-[0.98] disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #C8102E 0%, #a00e25 100%)",
                  boxShadow: "0 4px 24px rgba(200,16,46,0.35)",
                }}
              >
                {status === "loading" ? "Saving…" : "Keep Me Updated"}
              </button>

              {status === "error" && (
                <p className="text-crimson text-sm">{errorMsg}</p>
              )}
            </form>
          )}

          <p className="text-cream/20 text-xs mt-5">No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
