"use client";

import { motion } from "framer-motion";
import { Shield, Truck, Clock, Users, Award, ThumbsUp } from "lucide-react";

const items = [
  { icon: Shield, label: "Lifetime Powertrain Warranty", sub: "On qualifying new Toyotas" },
  { icon: Truck, label: "Complimentary Loaners", sub: "No disruption to your life" },
  { icon: Clock, label: "Fast, Streamlined Process", sub: "Respect for your time" },
  { icon: Users, label: "One Dedicated Advisor", sub: "From hello to keys in hand" },
  { icon: Award, label: "Toyota Certified Professional", sub: "Product Specialist" },
  { icon: ThumbsUp, label: "Zero Sales Pressure", sub: "Your comfort, your timeline" },
];

export default function TrustBar() {
  return (
    <section id="trust-bar" className="relative border-y border-white/06 bg-surface/60 overflow-hidden">
      {/* Marquee container */}
      <div className="py-6 overflow-hidden">
        <motion.div
          className="flex gap-0 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="inline-flex items-center gap-3 px-8 border-r border-white/06 shrink-0"
              >
                <div className="w-8 h-8 rounded-lg bg-toyota-red/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-toyota-red" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                  <div className="text-xs text-ink-muted">{item.sub}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
