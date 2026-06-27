"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Car, Zap } from "lucide-react";

const vehicles = [
  {
    model: "RAV4",
    tagline: "America's Best-Selling SUV",
    description: "The RAV4 goes all-hybrid for 2026 — more efficient, more capable. Choose standard hybrid or plug-in hybrid with up to 50 miles of EV range.",
    badge: "All-Hybrid Lineup",
    badgeColor: "bg-toyota-red text-white",
    specs: ["5 Passengers", "Up to 47 City / 40 Hwy MPG", "PHEV: Up to 50 mi EV Range"],
    gradient: "from-red-950/80 via-red-900/40 to-transparent",
    accentColor: "text-red-400",
    borderColor: "hover:border-red-500/30",
    bgGlow: "bg-red-900/10",
    category: "SUV",
  },
  {
    model: "Highlander",
    tagline: "Family Favorite",
    description: "Premium comfort for the whole family. AWD is now standard across the entire Highlander lineup — gas or hybrid.",
    badge: "AWD Standard",
    badgeColor: "bg-blue-600 text-white",
    specs: ["Up to 8 Passengers", "35-36 MPG Combined (Hybrid)", "AWD Standard Across Lineup"],
    gradient: "from-blue-950/80 via-blue-900/40 to-transparent",
    accentColor: "text-blue-400",
    borderColor: "hover:border-blue-500/30",
    bgGlow: "bg-blue-900/10",
    category: "3-Row SUV",
  },
  {
    model: "Grand Highlander",
    tagline: "Room to Spare",
    description: "More space, more power, more versatility. Available in Gas, Hybrid, or Hybrid MAX — with serious towing capability.",
    badge: "Hybrid MAX",
    badgeColor: "bg-gold text-black",
    specs: ["Up to 8 Passengers", "Gas, Hybrid or Hybrid MAX", "Tows up to 5,000 lbs"],
    gradient: "from-yellow-950/80 via-yellow-900/40 to-transparent",
    accentColor: "text-yellow-400",
    borderColor: "hover:border-yellow-500/30",
    bgGlow: "bg-yellow-900/10",
    category: "3-Row SUV",
  },
  {
    model: "Camry",
    tagline: "#1 Selling Car",
    description: "America's best-selling car goes fully hybrid for 2026. Incredible efficiency, available AWD, and a sportier look than ever.",
    badge: "All-Hybrid Lineup",
    badgeColor: "bg-purple-600 text-white",
    specs: ["5 Passengers", "Up to 51 MPG Combined", "AWD Available"],
    gradient: "from-purple-950/80 via-purple-900/40 to-transparent",
    accentColor: "text-purple-400",
    borderColor: "hover:border-purple-500/30",
    bgGlow: "bg-purple-900/10",
    category: "Sedan",
  },
  {
    model: "Corolla",
    tagline: "Best Value",
    description: "The world's most dependable compact car. Hybrid trims deliver up to 50 MPG combined and available AWD — unbeatable value.",
    badge: "Best Value",
    badgeColor: "bg-emerald-600 text-white",
    specs: ["5 Passengers", "Up to 50 MPG Combined (Hybrid)", "AWD on Hybrid Trims"],
    gradient: "from-emerald-950/80 via-emerald-900/40 to-transparent",
    accentColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/30",
    bgGlow: "bg-emerald-900/10",
    category: "Sedan",
  },
  {
    model: "Tacoma",
    tagline: "Texas Favorite",
    description: "Texas's most beloved truck. The i-FORCE MAX hybrid delivers 326 HP and tows up to 6,500 lbs — built for everything you throw at it.",
    badge: "i-FORCE MAX",
    badgeColor: "bg-orange-600 text-white",
    specs: ["5 Passengers", "Up to 326 HP (i-FORCE MAX)", "Tows up to 6,500 lbs"],
    gradient: "from-orange-950/80 via-orange-900/40 to-transparent",
    accentColor: "text-orange-400",
    borderColor: "hover:border-orange-500/30",
    bgGlow: "bg-orange-900/10",
    category: "Midsize Truck",
  },
  {
    model: "Tundra",
    tagline: "i-FORCE MAX",
    description: "Full-size power, hybrid efficiency. The Tundra's i-FORCE MAX twin-turbo hybrid delivers 437 HP and tows up to 12,000 lbs.",
    badge: "437 HP Hybrid",
    badgeColor: "bg-slate-600 text-white",
    specs: ["Up to 6 Passengers (CrewMax)", "Up to 437 HP i-FORCE MAX", "Tows up to 12,000 lbs"],
    gradient: "from-slate-950/80 via-slate-800/40 to-transparent",
    accentColor: "text-slate-300",
    borderColor: "hover:border-slate-400/30",
    bgGlow: "bg-slate-800/15",
    category: "Full-Size Truck",
  },
  {
    model: "Sequoia",
    tagline: "437 HP Standard",
    description: "The only full-size SUV with a standard hybrid powertrain. 437 HP, three rows, and serious towing — no compromises.",
    badge: "Hybrid Standard",
    badgeColor: "bg-toyota-red text-white",
    specs: ["Up to 8 Passengers", "437 HP i-FORCE MAX (Standard)", "Tows up to 9,520 lbs"],
    gradient: "from-red-950/80 via-slate-900/40 to-transparent",
    accentColor: "text-red-400",
    borderColor: "hover:border-red-400/30",
    bgGlow: "bg-red-900/8",
    category: "Full-Size SUV",
  },
  {
    model: "Sienna",
    tagline: "Standard Hybrid",
    description: "Every Sienna is a hybrid — no exceptions. Maximum space, up to 36 MPG, and available AWD. The ultimate family hauler.",
    badge: "Hybrid-Only",
    badgeColor: "bg-teal-600 text-white",
    specs: ["Up to 8 Passengers", "Up to 36 MPG Combined", "AWD Available"],
    gradient: "from-teal-950/80 via-teal-900/40 to-transparent",
    accentColor: "text-teal-400",
    borderColor: "hover:border-teal-500/30",
    bgGlow: "bg-teal-900/10",
    category: "Minivan",
  },
  {
    model: "Crown",
    tagline: "AWD Standard",
    description: "Bold fastback design, AWD standard. Choose 236 HP hybrid for 41 MPG or Hybrid MAX for 340 HP — both with on-demand AWD.",
    badge: "AWD Standard",
    badgeColor: "bg-gold text-black",
    specs: ["5 Passengers", "Up to 41 MPG Combined (236 HP)", "Hybrid MAX: 340 HP Option"],
    gradient: "from-yellow-950/80 via-yellow-900/40 to-transparent",
    accentColor: "text-yellow-400",
    borderColor: "hover:border-yellow-500/30",
    bgGlow: "bg-yellow-900/8",
    category: "Sport Sedan",
  },
  {
    model: "Land Cruiser",
    tagline: "Reborn Icon",
    description: "An off-road legend reborn with a modern hybrid powertrain. The 2027 Land Cruiser brings 326 HP, full-time 4WD, and legendary capability.",
    badge: "2027 Model",
    badgeColor: "bg-green-700 text-white",
    specs: ["5 Passengers", "326 HP i-FORCE MAX Hybrid", "Tows up to 6,000 lbs | Full-Time 4WD"],
    gradient: "from-green-950/80 via-green-900/40 to-transparent",
    accentColor: "text-green-400",
    borderColor: "hover:border-green-500/30",
    bgGlow: "bg-green-900/10",
    category: "Off-Road SUV",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: "easeOut" as const },
  }),
};

function VehicleCard({ vehicle, index }: { vehicle: typeof vehicles[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className={`group relative rounded-2xl overflow-hidden border border-white/08 ${vehicle.borderColor}
                  transition-all duration-400 hover:-translate-y-2 hover:shadow-premium cursor-pointer`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => {
        const el = document.querySelector("#contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <div className={`relative h-48 ${vehicle.bgGlow} overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${vehicle.gradient}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-display text-7xl font-bold opacity-10 select-none pointer-events-none ${vehicle.accentColor}`}
            style={{ letterSpacing: "-0.04em" }}
          >
            {vehicle.model}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Car
            className={`w-20 h-20 ${vehicle.accentColor} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
            strokeWidth={0.8}
          />
        </div>
        <div className="absolute top-3 left-3">
          <span className="glass text-xs text-ink-secondary font-medium px-2.5 py-1 rounded-full">
            {vehicle.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${vehicle.badgeColor}`}>
            {vehicle.badge}
          </span>
        </div>
      </div>

      <div className="p-5 bg-[#0D0D12]">
        <h3 className="font-display text-2xl text-white mb-1">Toyota {vehicle.model}</h3>
        <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${vehicle.accentColor}`}>
          {vehicle.tagline}
        </p>
        <p className="text-ink-secondary text-sm leading-relaxed mb-4">{vehicle.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {vehicle.specs.map((spec) => (
            <span key={spec} className="text-xs text-ink-secondary glass px-2.5 py-1 rounded-full border border-white/06">
              {spec}
            </span>
          ))}
        </div>
        <div className={`flex items-center gap-1.5 text-sm font-semibold ${vehicle.accentColor} group-hover:gap-3 transition-all duration-300`}>
          Check Availability
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Vehicles() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="vehicles" className="section-pad relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto container-pad">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="label-tag mx-auto mb-6">
            <Car className="w-3 h-3" />
            2026–2027 Toyota Lineup
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Find Your <span className="text-gradient-red">Perfect Toyota</span>
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need a fuel-efficient commuter, a family hauler, or a work truck —
            I&apos;ll match you with the exact model, trim, and color you want.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12"
        >
          {vehicles.map((vehicle, i) => (
            <VehicleCard key={vehicle.model} vehicle={vehicle} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-ink-secondary mb-5">Don&apos;t see exactly what you&apos;re looking for?</p>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
          >
            <Zap className="w-4 h-4" />
            Ask Me About Inventory
          </button>
        </motion.div>
      </div>
    </section>
  );
}
