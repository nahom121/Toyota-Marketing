"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2, Infinity as InfinityIcon, Wrench, Heart } from "lucide-react";

const trustItems = [
  "No mileage limit — ever",
  "Transferable to future owners",
  "Valid at any Toyota dealership nationwide",
  "No deductible on covered repairs",
];

export default function LifetimeWarranty() {
  return (
    <section id="warranty" className="section-pad relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050507] via-[#08050A] to-[#050507]" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-toyota-red/6 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto container-pad relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {/* Shield graphic */}
            <div className="relative w-full max-w-sm mx-auto aspect-square flex items-center justify-center">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-toyota-red/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-toyota-red/10 animate-[spin_15s_linear_infinite_reverse]" />

              {/* Glow */}
              <div className="absolute inset-8 rounded-full bg-toyota-red/8 blur-xl" />

              {/* Center shield */}
              <div className="relative glass-strong rounded-3xl w-48 h-56 flex flex-col items-center justify-center gap-3 shadow-red-glow">
                <Shield className="w-16 h-16 text-toyota-red" strokeWidth={1.5} />
                <div className="text-center">
                  <div className="font-display text-2xl text-white">Lifetime</div>
                  <div className="text-xs text-ink-secondary tracking-widest uppercase">Powertrain Coverage</div>
                </div>
              </div>

              {/* Orbiting badges */}
              {[
                { label: "No Mileage Limit", icon: InfinityIcon, angle: 0 },
                { label: "Transferable", icon: Heart, angle: 120 },
                { label: "All Dealers", icon: Wrench, angle: 240 },
              ].map(({ label, icon: Icon, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 130;
                const y = Math.sin(rad) * 130;
                return (
                  <motion.div
                    key={label}
                    className="absolute glass rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 whitespace-nowrap"
                    style={{
                      left: `calc(50% + ${x}px - 50px)`,
                      top: `calc(50% + ${y}px - 20px)`,
                    }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3 + angle / 100,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="w-3 h-3 text-toyota-red" />
                    <span className="text-xs font-medium text-white">{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="label-tag mb-6">
              <Shield className="w-3 h-3" />
              Exclusive Advantage
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Lifetime Powertrain
              <br />
              <span className="text-gradient-red">Warranty.</span>
              <br />
              <span className="text-ink-secondary text-3xl md:text-4xl">Forever.</span>
            </h2>

            <p className="text-ink-secondary text-lg leading-relaxed mb-8">
              Every qualifying new Toyota purchased through me at Toyota of Katy comes
              with a <span className="text-white font-medium">lifetime powertrain warranty</span> —
              the most comprehensive ownership protection in the automotive industry.
              No mileage limit. No expiration. As long as you own the vehicle.
            </p>

            {/* Plain-language coverage */}
            <div className="glass rounded-2xl px-5 py-4 mb-6 border-l-2 border-toyota-red">
              <p className="text-white text-base leading-relaxed">
                Covers your <span className="font-semibold">engine and transmission</span>, plus your <span className="font-semibold">front and back driving axle</span>.
              </p>
            </div>

            {/* Trust items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {trustItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-toyota-red mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-ink-secondary">{item}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
            >
              <Shield className="w-4 h-4" />
              Ask Me About the Warranty
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
