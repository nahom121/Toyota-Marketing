"use client";

import { motion } from "framer-motion";
import { Tag, Clock, Percent, ArrowRight, Zap, BadgeCheck } from "lucide-react";

const offers = [
  {
    type: "APR Special",
    icon: Percent,
    headline: "0% APR for 60 Months",
    vehicle: "Toyota Camry & Corolla",
    detail: "On select new 2024 models. Available through Toyota Financial Services for well-qualified buyers.",
    expires: "June 30, 2025",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "hover:border-blue-500/30",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
    badge: "Limited Time",
  },
  {
    type: "Lease Special",
    icon: Tag,
    headline: "$299/mo for 36 Months",
    vehicle: "2024 Toyota RAV4 LE",
    detail: "$2,999 due at signing. Available on select 2024 RAV4 LE models. 10,000 miles per year.",
    expires: "June 30, 2025",
    color: "from-toyota-red/20 to-toyota-red/5",
    borderColor: "hover:border-toyota-red/30",
    iconColor: "text-toyota-red",
    iconBg: "bg-toyota-red/15",
    badge: "Most Popular",
  },
  {
    type: "Loyalty Bonus",
    icon: BadgeCheck,
    headline: "$1,500 Toyota Loyalty Cash",
    vehicle: "All New Toyota Models",
    detail: "Current Toyota owners receive $1,500 toward any new Toyota purchase. Stackable with other offers.",
    expires: "June 30, 2025",
    color: "from-gold/20 to-gold/5",
    borderColor: "hover:border-gold/30",
    iconColor: "text-gold",
    iconBg: "bg-gold/15",
    badge: "Toyota Owners",
  },
  {
    type: "Cash Back",
    icon: Zap,
    headline: "$2,000 Customer Cash Back",
    vehicle: "2024 Toyota Highlander",
    detail: "Receive $2,000 customer cash on all new 2024 Highlander models. Offer ends soon.",
    expires: "June 30, 2025",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "hover:border-emerald-500/30",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
    badge: "Save Big",
  },
];

export default function SpecialOffers() {
  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="special-offers" className="section-pad relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-toyota-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto container-pad relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="label-tag mx-auto mb-6">
            <Tag className="w-3 h-3" />
            Current Incentives
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Today&apos;s{" "}
            <span className="text-gradient-red">Special Offers</span>
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            Toyota regularly updates incentives. These are today&apos;s best deals —
            but they won&apos;t last forever.
          </p>
        </motion.div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.headline}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative rounded-2xl p-6 border border-white/08 bg-gradient-to-br ${offer.color}
                            ${offer.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${offer.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${offer.iconColor}`} />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-ink-secondary`}>
                      {offer.type}
                    </span>
                    <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-2.5 py-0.5 rounded-full">
                      {offer.badge}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-2xl md:text-3xl text-white mb-1">
                  {offer.headline}
                </h3>
                <p className={`text-sm font-semibold mb-3 ${offer.iconColor}`}>
                  {offer.vehicle}
                </p>
                <p className="text-ink-secondary text-sm leading-relaxed mb-5">
                  {offer.detail}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <Clock className="w-3.5 h-3.5" />
                    Expires {offer.expires}
                  </div>
                  <button
                    onClick={handleContact}
                    className={`flex items-center gap-1.5 text-sm font-semibold ${offer.iconColor} hover:gap-3 transition-all duration-200`}
                  >
                    Claim Offer <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button onClick={handleContact} className="btn-primary mb-6">
            <Zap className="w-4 h-4" />
            Get Current Offers & Pricing
          </button>
          <p className="text-ink-muted text-xs max-w-2xl mx-auto">
            *All offers subject to Toyota Financial Services approval and eligibility. Not all customers will qualify.
            Offers valid on in-stock vehicles. See dealer for complete details. Expires end of month.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
