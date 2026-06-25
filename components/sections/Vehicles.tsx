"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Car, Users, Fuel, Zap } from "lucide-react";

const vehicles = [
  {
    model: "RAV4",
    tagline: "America's Best-Selling SUV",
    description: "The perfect blend of capability and fuel efficiency. Ideal for families and adventurers alike.",
    badge: "Most Popular",
    badgeColor: "bg-toyota-red text-white",
    specs: ["5 Passengers", "27–38 MPG", "Available AWD"],
    gradient: "from-red-950/80 via-red-900/40 to-transparent",
    accentColor: "text-red-400",
    borderColor: "hover:border-red-500/30",
    bgGlow: "bg-red-900/10",
    category: "SUV",
  },
  {
    model: "Highlander",
    tagline: "3-Row Family Luxury",
    description: "Premium comfort for the whole family with intelligent AWD and a refined interior.",
    badge: "Family Favorite",
    badgeColor: "bg-blue-600 text-white",
    specs: ["8 Passengers", "27–36 MPG", "AWD Available"],
    gradient: "from-blue-950/80 via-blue-900/40 to-transparent",
    accentColor: "text-blue-400",
    borderColor: "hover:border-blue-500/30",
    bgGlow: "bg-blue-900/10",
    category: "3-Row SUV",
  },
  {
    model: "Grand Highlander",
    tagline: "Next-Level 3-Row SUV",
    description: "More space, more power, more capability. The Grand Highlander redefines what a family SUV can be.",
    badge: "New Model",
    badgeColor: "bg-gold text-black",
    specs: ["8 Passengers", "2.4L Turbo", "Available PHEV"],
    gradient: "from-yellow-950/80 via-yellow-900/40 to-transparent",
    accentColor: "text-yellow-400",
    borderColor: "hover:border-yellow-500/30",
    bgGlow: "bg-yellow-900/10",
    category: "3-Row SUV",
  },
  {
    model: "Camry",
    tagline: "The Sedan Reimagined",
    description: "Sporty, elegant, and fuel-efficient. The Camry proves sedans never went out of style.",
    badge: "#1 Selling Car",
    badgeColor: "bg-purple-600 text-white",
    specs: ["5 Passengers", "28–32 MPG", "Hybrid Option"],
    gradient: "from-purple-950/80 via-purple-900/40 to-transparent",
    accentColor: "text-purple-400",
    borderColor: "hover:border-purple-500/30",
    bgGlow: "bg-purple-900/10",
    category: "Sedan",
  },
  {
    model: "Corolla",
    tagline: "Trusted Worldwide",
    description: "The world's most dependable compact car. Smart, efficient, and built to last decades.",
    badge: "Best Value",
    badgeColor: "bg-emerald-600 text-white",
    specs: ["5 Passengers", "31–40 MPG", "Hybrid Option"],
    gradient: "from-emerald-950/80 via-emerald-900/40 to-transparent",
    accentColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/30",
    bgGlow: "bg-emerald-900/10",
    category: "Sedan",
  },
  {
    model: "Tacoma",
    tagline: "Born for the Outdoors",
    description: "Texas's most beloved truck. Built tough, capable everywhere, and ready for anything you throw at it.",
    badge: "Texas Favorite",
    badgeColor: "bg-orange-600 text-white",
    specs: ["5 Passengers", "4x4 Available", "Trail Hunter Ready"],
    gradient: "from-orange-950/80 via-orange-900/40 to-transparent",
    accentColor: "text-orange-400",
    borderColor: "hover:border-orange-500/30",
    bgGlow: "bg-orange-900/10",
    category: "Midsize Truck",
  },
  {
    model: "Tundra",
    tagline: "Full-Size Powerhouse",
    description: "Dominate with the Tundra's twin-turbo V6 hybrid powertrain. Capability redefined.",
    badge: "iForce MAX",
    badgeColor: "bg-slate-600 text-white",
    specs: ["5-6 Passengers", "20–23 MPG", "Hybrid Available"],
    gradient: "from-slate-950/80 via-slate-800/40 to-transparent",
    accentColor: "text-slate-300",
    borderColor: "hover:border-slate-400/30",
    bgGlow: "bg-slate-800/15",
    category: "Full-Size Truck",
  },
  {
    model: "Sequoia",
    tagline: "Full-Size 3-Row SUV",
    description: "The Sequoia's twin-turbo hybrid engine delivers 437 horsepower with class-leading towing.",
    badge: "437 HP",
    badgeColor: "bg-toyota-red text-white",
    specs: ["8 Passengers", "19–22 MPG", "Twin-Turbo Hybrid"],
    gradient: "from-red-950/80 via-slate-900/40 to-transparent",
    accentColor: "text-red-400",
    borderColor: "hover:border-red-400/30",
    bgGlow: "bg-red-900/8",
    category: "Full-Size SUV",
  },
  {
    model: "Sienna",
    tagline: "The Ultimate Family Van",
    description: "Every Sienna is a hybrid. Maximum space, maximum efficiency, and standard all-wheel drive.",
    badge: "Standard AWD",
    badgeColor: "bg-teal-600 text-white",
    specs: ["8 Passengers", "35–36 MPG", "Standard Hybrid"],
    gradient: "from-teal-950/80 via-teal-900/40 to-transparent",
    accentColor: "text-teal-400",
    borderColor: "hover:border-teal-500/30",
    bgGlow: "bg-teal-900/10",
    category: "Minivan",
  },
  {
    model: "Crown",
    tagline: "The Future of Toyota",
    description: "Bold. Hybrid. Iconic. The Crown sits above every sedan with its striking fastback design.",
    badge: "PHEV Option",
    badgeColor: "bg-gold text-black",
    specs: ["5 Passengers", "41–43 MPG", "Sport Tuned AWD"],
    gradient: "from-yellow-950/80 via-yellow-900/40 to-transparent",
    accentColor: "text-yellow-400",
    borderColor: "hover:border-yellow-500/30",
    bgGlow: "bg-yellow-900/8",
    category: "Sport Sedan",
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
      {/* Vehicle visual area */}
      <div className={`relative h-48 ${vehicle.bgGlow} overflow-hidden`}>
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${vehicle.gradient}`} />

        {/* Model name as typography art */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-display text-7xl font-bold opacity-10 select-none pointer-events-none ${vehicle.accentColor}`}
            style={{ letterSpacing: "-0.04em" }}
          >
            {vehicle.model}
          </span>
        </div>

        {/* Car icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Car className={`w-20 h-20 ${vehicle.accentColor} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
               strokeWidth={0.8}
          />
        </div>

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="glass text-xs text-ink-secondary font-medium px-2.5 py-1 rounded-full">
            {vehicle.category}
          </span>
        </div>

        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${vehicle.badgeColor}`}>
            {vehicle.badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-[#0D0D12]">
        <h3 className="font-display text-2xl text-white mb-1">
          Toyota {vehicle.model}
        </h3>
        <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${vehicle.accentColor}`}>
          {vehicle.tagline}
        </p>
        <p className="text-ink-secondary text-sm leading-relaxed mb-4">
          {vehicle.description}
        </p>

        {/* Specs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {vehicle.specs.map((spec) => (
            <span key={spec} className="text-xs text-ink-secondary glass px-2.5 py-1 rounded-full border border-white/06">
              {spec}
            </span>
          ))}
        </div>

        {/* CTA */}
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="label-tag mx-auto mb-6">
            <Car className="w-3 h-3" />
            Toyota Lineup
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Find Your{" "}
            <span className="text-gradient-red">Perfect Toyota</span>
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need a fuel-efficient commuter, a family hauler, or a work truck —
            I'll match you with the exact model, trim, and color you want.
          </p>
        </motion.div>

        {/* Vehicle grid */}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-ink-secondary mb-5">
            Don&apos;t see exactly what you&apos;re looking for?
          </p>
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
