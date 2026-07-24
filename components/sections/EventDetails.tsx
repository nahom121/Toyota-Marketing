"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";

const details = [
  {
    icon: Calendar,
    label: "Date",
    value: "August 9th, 2026",
    sub: "Sunday",
    color: "bg-crimson/10 text-crimson",
  },
  {
    icon: Clock,
    label: "Time",
    value: "4 Sessions",
    sub: "10 AM · 11 AM · 12 PM · 1 PM, 30 spots each",
    color: "bg-sand/30 text-sand-dark",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "KGSP",
    sub: "KGSP · 2633 N Mason Rd, Katy, TX 77449",
    color: "bg-forest/10 text-forest",
  },
  {
    icon: Ticket,
    label: "General Admission",
    value: "$25",
    sub: "Per person · All beginner skaters welcome",
    color: "bg-crimson/10 text-crimson",
  },
];

export default function EventDetails() {
  return (
    <section id="details" className="section-pad bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand/40 to-transparent" />

      <div className="max-w-7xl mx-auto container-pad relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="label-tag-dark mx-auto mb-5">Event Details</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Mark your calendar.
            <br />
            <span className="font-script text-sand" style={{ fontSize: "1.05em" }}>
              August 9th.
            </span>
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-lg mx-auto">
            Learn balance, get rolling, and build real confidence on wheels.
          </p>
        </motion.div>

        {/* Detail cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {details.map(({ icon: Icon, label, value, sub, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-sand/30 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{label}</p>
              <p className="font-display text-2xl text-white mb-1">{value}</p>
              <p className="text-white/50 text-xs leading-relaxed">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Location notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <p className="text-white/40 text-sm">
            📍 KGSP · 2633 N Mason Rd, Katy, TX 77449,{" "}
            <a
              href="https://maps.google.com/?q=2633+N+Mason+Rd+Katy+TX+77449"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand hover:text-sand-light underline transition-colors"
            >
              Get directions
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
