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
    <section className="relative overflow-hidden bg-charcoal py-20 md:py-28">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 60%, rgba(200,16,46,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, rgba(139,94,60,0.10) 0%, transparent 55%)",
        }}
      />
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
        >
          {/* Label */}
          <div className="label-tag-dark mx-auto mb-6 w-fit">Stay in the loop</div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-cream leading-tight mb-4">
            Want priority access to{" "}
            <span
              className="font-script text-crimson block sm:inline"
              style={{ fontSize: "1.05em" }}
            >
              upcoming workshops
            </span>{" "}
            &amp; announcements?
          </h2>

          {/* Subtext */}
          <p className="text-cream/60 text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Join our email list to be the first to know about upcoming workshops, special events,
            and Houston Skate Project announcements.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-900/25 border border-green-500/25 rounded-2xl px-8 py-8 text-center"
            >
              <div className="text-3xl mb-3">🛼</div>
              <p className="text-green-300 font-display text-xl mb-1">You&apos;re on the list!</p>
              <p className="text-green-300/70 text-sm">
                We&apos;ll email you the moment a new workshop drops.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Two input fields side by side on sm+ */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="flex-1 px-5 py-4 rounded-2xl bg-white/8 border border-white/12 text-cream placeholder-cream/35 focus:outline-none focus:border-crimson/60 focus:bg-white/10 transition-all text-sm"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder="Email Address"
                  className="flex-1 px-5 py-4 rounded-2xl bg-white/8 border border-white/12 text-cream placeholder-cream/35 focus:outline-none focus:border-crimson/60 focus:bg-white/10 transition-all text-sm"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="w-full sm:w-auto sm:self-center mt-1 inline-flex items-center justify-center gap-2 px-10 py-4 bg-crimson text-white font-bold tracking-widest uppercase text-sm rounded-full hover:bg-crimson/90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-crimson/20"
              >
                {status === "loading" ? "Saving…" : "Keep Me Updated"}
              </button>

              {status === "error" && (
                <p className="text-crimson text-sm mt-1">{errorMsg}</p>
              )}
            </form>
          )}

          <p className="text-cream/25 text-xs mt-6">No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
