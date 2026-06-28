"use client";

import { motion } from "framer-motion";
import { CheckCircle, Phone, MessageSquare, Calendar } from "lucide-react";

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-[#050507] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>

        <h1 className="font-display text-4xl text-white mb-4">
          You&apos;re All Set!
        </h1>
        <p className="text-ink-secondary text-lg leading-relaxed mb-8">
          I received your request and will reach out within{" "}
          <span className="text-white font-medium">30 minutes</span> during
          business hours. Looking forward to helping you find your perfect Toyota!
        </p>

        <div className="glass rounded-2xl p-6 mb-8 text-left space-y-3">
          <p className="text-white font-semibold text-sm mb-3">Need to reach me sooner?</p>
          <a href="tel:+12025531080" className="flex items-center gap-3 text-ink-secondary hover:text-white transition-colors">
            <Phone className="w-4 h-4 text-green-400" />
            (202) 553-1080 — Call Nahom
          </a>
          <a href="sms:+12025531080" className="flex items-center gap-3 text-ink-secondary hover:text-white transition-colors">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            Text me — usually fastest
          </a>
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="btn-primary"
        >
          <Calendar className="w-4 h-4" />
          Back to Home
        </button>
      </motion.div>
    </main>
  );
}
