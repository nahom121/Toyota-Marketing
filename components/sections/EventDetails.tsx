"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Ticket, Footprints } from "lucide-react";

const details = [
  {
    icon: Calendar,
    label: "Date",
    value: "July 26th, 2026",
    sub: "Saturday",
    color: "bg-crimson/10 text-crimson",
  },
  {
    icon: Clock,
    label: "Time",
    value: "7:00 PM – 11:00 PM",
    sub: "Doors open at 7 · Session runs until 11",
    color: "bg-sand/30 text-sand-dark",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Sky Labs",
    sub: "Sky Labs · 4112 Washington Ave, Houston, TX 77007",
    color: "bg-forest/10 text-forest",
  },
  {
    icon: Ticket,
    label: "General Admission",
    value: "$25",
    sub: "Per person · All skill levels welcome",
    color: "bg-crimson/10 text-crimson",
  },
];

export default function EventDetails() {
  return (
    <section id="details" className="section-pad bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand/40 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sand/6 blur-[140px] pointer-events-none" />

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
              July 26th.
            </span>
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-lg mx-auto">
            One day. One rink. The whole city invited.
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

        {/* Rental add-on highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-sand/15 border border-sand/30 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-5"
        >
          <div className="w-12 h-12 rounded-full bg-sand/30 flex items-center justify-center flex-shrink-0">
            <Footprints className="w-6 h-6 text-sand" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white text-lg mb-1">Don&apos;t have skates? No problem.</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Add a skate rental when you register for just <span className="text-sand font-semibold">$5</span>.
              Select your size at checkout — we&apos;ll have them ready for you.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.querySelector("#tickets");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary text-sm px-6 py-2.5 whitespace-nowrap"
          >
            Register + Add Rental
          </button>
        </motion.div>

        {/* Location TBD notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <p className="text-white/40 text-sm">
            📍 Sky Labs · 4112 Washington Ave, Houston, TX 77007 —{" "}
            <a
              href="https://maps.google.com/?q=4112+Washington+Ave+Houston+TX+77007"
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
