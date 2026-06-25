"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp, ArrowRight, Check, DollarSign } from "lucide-react";

const benefits = [
  "Get a fair, no-pressure appraisal",
  "Apply trade value directly to your purchase",
  "We accept all makes and models",
  "Above-market values on clean vehicles",
];

export default function TradeIn() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    year: "",
    make: "",
    model: "",
    mileage: "",
    condition: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="trade-in" className="section-pad relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-[#050507] to-[#0A0812]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/6 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto container-pad relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="label-tag mb-6">
              <DollarSign className="w-3 h-3" />
              Trade-In Program
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Curious What Your
              <br />
              <span className="text-gradient-gold">Vehicle Is Worth?</span>
            </h2>
            <p className="text-ink-secondary text-lg leading-relaxed mb-8">
              Your current vehicle could be worth more than you think. I&apos;ll get you
              a fair, honest appraisal — no games, no lowball offers. We want your trade-in
              and we&apos;ll prove it with a real number.
            </p>

            <div className="space-y-3 mb-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-ink-secondary">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="font-display text-3xl text-gold mb-1">$0</div>
                <div className="text-ink-muted text-xs uppercase tracking-wider">Appraisal Fee</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="font-display text-3xl text-white mb-1">24hr</div>
                <div className="text-ink-muted text-xs uppercase tracking-wider">Value Response</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="font-display text-3xl text-white mb-1">Any</div>
                <div className="text-ink-muted text-xs uppercase tracking-wider">Make or Model</div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong rounded-3xl p-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-5">
                  <TrendingUp className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-display text-2xl text-white mb-3">Request Received!</h3>
                <p className="text-ink-secondary leading-relaxed">
                  I&apos;ll reach out within 24 hours with a fair value for your vehicle.
                  Looking forward to helping you get the most from your trade-in.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-7 space-y-4">
                <h3 className="font-display text-2xl text-white mb-1">Get My Trade Value</h3>
                <p className="text-ink-secondary text-sm mb-5">
                  Free. No obligation. Results within 24 hours.
                </p>

                {/* Name + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">Your Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Full name"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                                 focus:outline-none focus:border-gold/50 focus:bg-white/08 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">Phone Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="(281) 555-0000"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                                 focus:outline-none focus:border-gold/50 focus:bg-white/08 transition-all"
                    />
                  </div>
                </div>

                {/* Year + Make */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">Year *</label>
                    <input
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      required
                      placeholder="2020"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                                 focus:outline-none focus:border-gold/50 focus:bg-white/08 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">Make *</label>
                    <input
                      name="make"
                      value={form.make}
                      onChange={handleChange}
                      required
                      placeholder="Toyota"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                                 focus:outline-none focus:border-gold/50 focus:bg-white/08 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">Model *</label>
                    <input
                      name="model"
                      value={form.model}
                      onChange={handleChange}
                      required
                      placeholder="RAV4"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                                 focus:outline-none focus:border-gold/50 focus:bg-white/08 transition-all"
                    />
                  </div>
                </div>

                {/* Mileage + Condition */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">Mileage</label>
                    <input
                      name="mileage"
                      value={form.mileage}
                      onChange={handleChange}
                      placeholder="45,000"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-ink-muted
                                 focus:outline-none focus:border-gold/50 focus:bg-white/08 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">Condition</label>
                    <select
                      name="condition"
                      value={form.condition}
                      onChange={handleChange}
                      className="w-full bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                                 focus:outline-none focus:border-gold/50 transition-all"
                    >
                      <option value="">Select...</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Needs Work</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full mt-2">
                  <TrendingUp className="w-4 h-4" />
                  Get My Trade-In Value
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-ink-muted text-xs text-center">
                  No spam. No pressure. Just a real number you can use.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
