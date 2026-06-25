"use client";

import { motion } from "framer-motion";
import { Calendar, Play, Shield, Truck, Star, ChevronDown, MapPin } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "Lifetime Powertrain Warranty", color: "text-gold" },
  { icon: Truck, label: "Complimentary Service Loaners", color: "text-blue-400" },
  { icon: Star, label: "5-Star Customer Experience", color: "text-yellow-400" },
];

const stats = [
  { value: "500+", label: "Vehicles Sold" },
  { value: "5★", label: "Google Rating" },
  { value: "100%", label: "Transparent Pricing" },
  { value: "0", label: "Sales Pressure" },
];

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050507]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Red glow orb - top right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-toyota-red/8 blur-[120px] pointer-events-none" />
      {/* Purple glow orb - bottom left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-900/15 blur-[100px] pointer-events-none" />
      {/* Center subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-toyota-red/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col items-center text-center">

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 mb-8"
        >
          <div className="label-tag">
            <MapPin className="w-3 h-3" />
            Toyota of Katy · Katy, Texas
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-6 max-w-5xl"
        >
          Your Toyota{" "}
          <span className="relative">
            <span className="text-gradient-red">Buying Experience</span>
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 400 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 0 8 Q 100 2 200 8 Q 300 14 400 8"
                stroke="#EB0A1E"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </motion.svg>
          </span>{" "}
          <br />Starts Here
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg md:text-xl text-ink-secondary max-w-2xl mb-10 leading-relaxed"
        >
          Transparent pricing. Personalized service. Lifetime powertrain protection.{" "}
          <span className="text-white font-medium">Serving Houston and Katy, Texas.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
        >
          <button
            onClick={() => handleScroll("#contact")}
            className="btn-primary text-base px-8 py-4 min-w-[220px] group"
          >
            <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Schedule My Appointment
          </button>
          <button
            onClick={() => handleScroll("#vehicles")}
            className="btn-secondary text-base px-8 py-4 min-w-[220px] group"
          >
            <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
            View Available Vehicles
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {trustBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-2 glass rounded-full px-4 py-2 text-sm font-medium"
              >
                <Icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-ink-secondary">{badge.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/08 rounded-2xl overflow-hidden w-full max-w-3xl glass"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex flex-col items-center py-5 px-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
            >
              <span className="font-display text-3xl md:text-4xl text-white mb-1">
                {stat.value}
              </span>
              <span className="text-ink-secondary text-xs font-medium tracking-wide uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => handleScroll("#trust-bar")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-muted hover:text-ink-secondary transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
