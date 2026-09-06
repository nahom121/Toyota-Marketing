"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NotifySignup() {
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
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("success");
      setEmail("");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setStatus("error");
    }
  };

  return (
    <section className="section-pad bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #C8102E 0%, transparent 60%), radial-gradient(circle at 70% 50%, #8B5E3C 0%, transparent 60%)" }}
      />
      <div className="max-w-xl mx-auto container-pad text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl mb-4">🛼</div>
          <h2 className="font-display text-3xl md:text-4xl text-cream leading-tight mb-3">
            Be the first to know
            <br />
            <span className="font-script text-crimson" style={{ fontSize: "1.1em" }}>when new dates drop.</span>
          </h2>
          <p className="text-cream/60 text-sm mb-8">
            Sign up and we&apos;ll email you the moment registration opens for the next Houston Skate Project pop-up.
          </p>

          {status === "success" ? (
            <div className="bg-green-900/30 border border-green-500/30 rounded-2xl px-6 py-5 text-green-300 font-semibold">
              You&apos;re on the list! We&apos;ll email you as soon as the next date is announced.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-cream placeholder-cream/40 focus:outline-none focus:border-crimson transition-colors text-sm"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="btn-primary px-7 py-3.5 text-sm shrink-0 disabled:opacity-50"
              >
                {status === "loading" ? "Saving…" : "Notify Me"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-crimson text-sm mt-3">{errorMsg}</p>
          )}

          <p className="text-cream/30 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
