"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Zap, ArrowRight } from "lucide-react";

type Category = "All" | "Cars" | "SUVs" | "Trucks";

type Vehicle = {
  model: string;
  tagline: string;
  image: string;
  floatDuration: number;
  floatDelay: number;
  category: "Cars" | "SUVs" | "Trucks";
  electric?: boolean;
};

const vehicles: Vehicle[] = [
  // Cars
  { model: "Prius",           tagline: "The Original Hybrid",        image: "/vehicles/prius.png",           floatDuration: 3.1, floatDelay: 0,   category: "Cars" },
  { model: "Corolla",         tagline: "World's Most Dependable",     image: "/vehicles/corolla.png",         floatDuration: 3.4, floatDelay: 0.4, category: "Cars" },
  { model: "Camry",           tagline: "#1 Selling Car in America",   image: "/vehicles/camry.png",           floatDuration: 3.7, floatDelay: 0.8, category: "Cars" },
  { model: "Crown",           tagline: "Bold Sport Sedan",            image: "/vehicles/crown.png",           floatDuration: 2.9, floatDelay: 1.2, category: "Cars" },
  // SUVs
  { model: "C-HR",            tagline: "All-Electric Urban SUV",      image: "/vehicles/chr.png",             floatDuration: 3.3, floatDelay: 0,   category: "SUVs", electric: true },
  { model: "bZ4X",            tagline: "All-Electric SUV",            image: "/vehicles/bz4x.png",            floatDuration: 3.6, floatDelay: 0.3, category: "SUVs", electric: true },
  { model: "RAV4",            tagline: "America's Best-Selling SUV",  image: "/vehicles/rav4.png",            floatDuration: 3.2, floatDelay: 0.6, category: "SUVs" },
  { model: "Crown Signia",    tagline: "Elevated Crossover",          image: "/vehicles/crown-signia.png",    floatDuration: 3.8, floatDelay: 0.9, category: "SUVs" },
  { model: "4Runner",         tagline: "Off-Road Icon",               image: "/vehicles/4runner.png",         floatDuration: 3.5, floatDelay: 1.2, category: "SUVs" },
  { model: "Highlander",      tagline: "3-Row Family SUV",            image: "/vehicles/highlander.png",      floatDuration: 3.9, floatDelay: 0.2, category: "SUVs" },
  { model: "Grand Highlander",tagline: "Maximum Space & Power",       image: "/vehicles/grand-highlander.png",floatDuration: 3.4, floatDelay: 0.5, category: "SUVs" },
  { model: "Sienna",          tagline: "The Ultimate Family Van",     image: "/vehicles/sienna.png",          floatDuration: 3.7, floatDelay: 0.8, category: "SUVs" },
  { model: "Sequoia",         tagline: "Full-Size 3-Row SUV",         image: "/vehicles/sequoia.png",         floatDuration: 4.0, floatDelay: 1.1, category: "SUVs" },
  { model: "Land Cruiser",    tagline: "Reborn Icon · 2027",          image: "/vehicles/land-cruiser.png",    floatDuration: 3.6, floatDelay: 1.4, category: "SUVs" },
  // Trucks
  { model: "Tacoma",          tagline: "Texas Favorite",              image: "/vehicles/tacoma.png",          floatDuration: 3.5, floatDelay: 0,   category: "Trucks" },
  { model: "Tundra",          tagline: "Full-Size Power",             image: "/vehicles/tundra.png",          floatDuration: 3.8, floatDelay: 0.5, category: "Trucks" },
];

const categories: Category[] = ["All", "Cars", "SUVs", "Trucks"];

function selectVehicle(model: string) {
  window.dispatchEvent(new CustomEvent("selectVehicle", { detail: model }));
  const el = document.querySelector("#contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: "easeOut" }}
      onClick={() => selectVehicle(vehicle.model)}
      className="group relative flex flex-col items-center text-center px-3 py-5 rounded-2xl hover:bg-white/04 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-toyota-red/40"
      aria-label={`Inquire about Toyota ${vehicle.model}`}
    >
      {/* EV badge */}
      {vehicle.electric && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-blue-500/15 border border-blue-500/30 rounded-full px-2 py-0.5">
          <Zap className="w-2.5 h-2.5 text-blue-400" />
          <span className="text-[10px] text-blue-300 font-medium">Electric</span>
        </div>
      )}

      {/* Floating image */}
      <div className="relative w-full mb-3">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: vehicle.floatDuration, repeat: Infinity, ease: "easeInOut", delay: vehicle.floatDelay }}
          className="relative w-full aspect-[16/9]"
        >
          <Image
            src={vehicle.image}
            alt={`Toyota ${vehicle.model}`}
            fill
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_20px_60px_rgba(235,10,30,0.3)] transition-all duration-500 group-hover:scale-105"
          />
        </motion.div>

        {/* Ground shadow */}
        <motion.div
          animate={{ scaleX: [1, 0.75, 1], opacity: [0.35, 0.15, 0.35] }}
          transition={{ duration: vehicle.floatDuration, repeat: Infinity, ease: "easeInOut", delay: vehicle.floatDelay }}
          className="mx-auto w-1/2 h-2 bg-black/70 blur-md rounded-full"
        />
      </div>

      {/* Name */}
      <h3 className="font-display text-lg md:text-xl text-white mb-0.5 group-hover:text-toyota-red transition-colors duration-300">
        Toyota {vehicle.model}
      </h3>

      {/* Tagline */}
      <p className="text-ink-muted text-[11px] uppercase tracking-widest mb-3">
        {vehicle.tagline}
      </p>

      {/* CTA hint */}
      <span className="inline-flex items-center gap-1 text-xs text-toyota-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
        Inquire about this model <ArrowRight className="w-3 h-3" />
      </span>
    </motion.button>
  );
}

export default function Vehicles() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = activeCategory === "All"
    ? vehicles
    : vehicles.filter((v) => v.category === activeCategory);

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
          className="text-center mb-10"
        >
          <div className="label-tag mx-auto mb-6">
            <Zap className="w-3 h-3" />
            2026–2027 Toyota Lineup
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
            Which Toyota <span className="text-gradient-red">Fits Your Life?</span>
          </h2>
          <p className="text-ink-secondary text-lg max-w-xl mx-auto leading-relaxed">
            Tap any model and I&apos;ll reach out with availability, pricing, and options — no pressure.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2 mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-toyota-red text-white shadow-red-glow"
                  : "glass text-ink-secondary hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => selectVehicle("Not sure yet — need guidance")}
            className="px-5 py-2 rounded-full text-sm font-medium glass text-ink-secondary hover:text-white hover:border-white/20 transition-all duration-300"
          >
            Not sure yet
          </button>
        </motion.div>

        {/* Vehicle grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-12"
          >
            {filtered.map((vehicle, i) => (
              <VehicleCard key={vehicle.model} vehicle={vehicle} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-ink-muted text-sm"
        >
          Don&apos;t see your model?{" "}
          <button
            onClick={() => selectVehicle("General Question")}
            className="text-toyota-red hover:underline"
          >
            Ask me anyway →
          </button>
        </motion.p>
      </div>
    </section>
  );
}
