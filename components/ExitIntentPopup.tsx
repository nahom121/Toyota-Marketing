"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Calendar, Shield, ChevronRight } from "lucide-react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
      }
    },
    [dismissed]
  );

  useEffect(() => {
    // Show after 45 seconds even without exit intent
    const timer = setTimeout(() => {
      if (!dismissed) setShow(true);
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [handleMouseLeave, dismissed]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      dismiss();
    }, 2500);
  };

  const scrollToContact = () => {
    dismiss();
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && dismiss()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md glass-strong rounded-3xl overflow-hidden shadow-premium"
          >
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-toyota-red via-toyota-red-light to-toyota-red" />

            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-ink-secondary hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="font-display text-2xl text-white mb-2">You&apos;re on the list!</h3>
                  <p className="text-ink-secondary text-sm">
                    I&apos;ll send you today&apos;s best Toyota deals. Talk soon!
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Shield badge */}
                  <div className="w-12 h-12 rounded-2xl bg-toyota-red/15 flex items-center justify-center mb-5">
                    <Shield className="w-6 h-6 text-toyota-red" />
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl text-white mb-2 leading-tight">
                    Before You Go —<br />
                    <span className="text-gradient-red">Get Today&apos;s Best Deals</span>
                  </h3>
                  <p className="text-ink-secondary text-sm leading-relaxed mb-6">
                    Drop your email and I&apos;ll personally send you the best available
                    Toyota pricing, current incentives, and lease specials. No spam.
                    Just real deals.
                  </p>

                  {/* Email form */}
                  <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="flex-1 bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                                 focus:outline-none focus:border-toyota-red/50 transition-all"
                    />
                    <button type="submit" className="btn-primary px-4 py-3 !min-w-0">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </form>

                  <div className="flex gap-3">
                    <button
                      onClick={scrollToContact}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium glass rounded-xl hover:bg-white/10 transition-all text-white"
                    >
                      <Calendar className="w-4 h-4 text-toyota-red" />
                      Schedule Now
                    </button>
                    <a
                      href="tel:+12025531080"
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium glass rounded-xl hover:bg-white/10 transition-all text-white"
                    >
                      <Phone className="w-4 h-4 text-green-400" />
                      Call Me
                    </a>
                  </div>

                  <button
                    onClick={dismiss}
                    className="w-full mt-3 text-xs text-ink-muted hover:text-ink-secondary transition-colors"
                  >
                    No thanks, I&apos;ll continue browsing
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
