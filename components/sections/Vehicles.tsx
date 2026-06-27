"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Fuel, Zap } from "lucide-react";

const vehicles = [
  {
    model: "RAV4",
    tagline: "America's Best-Selling SUV",
    passengers: "5 Passengers",
    efficiency: "Up to 41 MPG",
    image: "/vehicles/rav4.png",
    floatDuration: 3.2,
    floatDelay: 0,
  },
  {
    model: "Highlander",
    tagline: "3-Row Family SUV",
    passengers: "Up to 8 Passengers",
    efficiency: "35 MPG Hybrid",
    image: "/vehicles/highlander.png",
    floatDuration: 3.6,
    floatDelay: 0.3,
  },
  {
    model: "Grand Highlander",
    tagline: "Maximum Space & Power",
    passengers: "Up to 8 Passengers",
    efficiency: "36 MPG Hybrid",
    image: "/vehicles/grand-highlander.png",
    floatDuration: 3.9,
    floatDelay: 0.6,
  },
  {
    model: "Camry",
    tagline: "#1 Selling Car in America",
    passengers: "5 Passengers",
    efficiency: "Up to 51 MPG",
    image: "/vehicles/camry.png",
    floatDuration: 3.1,
    floatDelay: 0.9,
  },
  {
    model: "Corolla",
    tagline: "World's Most Dependable",
    passengers: "5 Passengers",
    efficiency: "Up to 52 MPG",
    image: "/vehicles/corolla.png",
    floatDuration: 3.4,
    floatDelay: 1.2,
  },
  {
    model: "Tacoma",
    tagline: "Texas Favorite",
    passengers: "5 Passengers",
    efficiency: "Tows 6,500 lbs",
    image: "/vehicles/tacoma.png",
    floatDuration: 3.7,
    floatDelay: 1.5,
  },
  {
    model: "Tundra",
    tagline: "Full-Size Power",
    passengers: "Up to 6 Passengers",
    efficiency: "Tows 12,000 lbs",
    image: "/vehicles/tundra.png",
    floatDuration: 3.3,
    floatDelay: 1.8,
  },
  {
    model: "Sequoia",
    tagline: "Full-Size 3-Row SUV",
    passengers: "Up to 8 Passengers",
    efficiency: "Tows 9,520 lbs",
    image: "/vehicles/sequoia.png",
    floatDuration: 4.0,
    floatDelay: 0.2,
  },
  {
    model: "Sienna",
    tagline: "The Ultimate Family Van",
    passengers: "Up to 8 Passengers",
    efficiency: "Up to 36 MPG",
    image: "/vehicles/sienna.png",
    floatDuration: 3.5,
    floatDelay: 0.5,
  },
  {
    model: "Crown",
    tagline: "Bold Sport Sedan",
    passengers: "5 Passengers",
    efficiency: "Up to 41 MPG",
    image: "/vehicles/crown.png",
    floatDuration: 2.9,
    floatDelay: 0.8,
  },
  {
    model: "Land Cruiser",
    tagline: "Reborn Icon · 2027",
    passengers: "5 Passengers",
    efficiency: "Off-Road Legend",
    image: "/vehicles/land-cruiser.png",
    floatDuration: 3.8,
    floatDelay: 1.1,
  },
];

function VehicleCard({ vehicle, index }: { vehicle: typeof vehicles[0]; index: number }) {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: "easeOut" }}
      onClick={scrollToContact}
      className="group cursor-pointer flex flex-col items-center text-center px-3 py-6"
    >
      {/* Floating image area */}
      <div className="relative w-full mb-3">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: vehicle.floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: vehicle.floatDelay,
          }}
          className="relative w-full aspect-[16/9]"
        >
          <Image
            src={vehicle.image}
            alt={`Toyota ${vehicle.model}`}
            fill
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_20px_60px_rgba(235,10,30,0.25)] transition-all duration-500"
          />
        </motion.div>

        {/* Ground shadow */}
        <motion.div
          animate={{ scaleX: [1, 0.75, 1], opacity: [0.4, 0.2, 0.4] }}
          transition={{
            duration: vehicle.floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: vehicle.floatDelay,
          }}
          className="mx-auto w-1/2 h-2 bg-black/70 blur-md rounded-full"
        />
      </div>

      {/* Name */}
      <h3 className="font-display text-xl md:text-2xl text-white mb-1 group-hover:text-toyota-red transition-colors duration-300">
        Toyota {vehicle.model}
      </h3>

      {/* Tagline */}
      <p className="text-ink-muted text-[11px] uppercase tracking-widest mb-3">
        {vehicle.tagline}
      </p>

      {/* Stats */}
      <div className="flex gap-2 justify-center flex-wrap">
        <span className="flex items-center gap-1.5 text-xs text-ink-secondary bg-white/05 border border-white/08 px-3 py-1.5 rounded-full">
          <Users className="w-3 h-3 text-ink-muted" />
          {vehicle.passengers}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-ink-secondary bg-white/05 border border-white/08 px-3 py-1.5 rounded-full">
          <Fuel className="w-3 h-3 text-ink-muted" />
          {vehicle.efficiency}
        </span>
      </div>
    </motion.div>
  );
}

export default function Vehicles() {
  return (
    <section id="vehicles" className="section-pad relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#070509] to-[#050507]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-toyota-red/4 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto container-pad relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="label-tag mx-auto mb-6">
            <Zap className="w-3 h-3" />
            2026–2027 Toyota Lineup
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Find Your <span className="text-gradient-red">Perfect Toyota</span>
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need a fuel-efficient commuter, a family hauler, or a
            work truck — I&apos;ll match you with exactly what you want.
          </p>
        </motion.div>

        {/* Vehicle grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-16">
          {vehicles.map((vehicle, i) => (
            <VehicleCard key={vehicle.model} vehicle={vehicle} index={i} />
          ))}
        </div>

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
