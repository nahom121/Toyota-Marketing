"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export default function Hero() {
  const eventDate = new Date("2026-08-09T10:00:00");
  const { days, hours, minutes, seconds } = useCountdown(eventDate);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-charcoal"
    >
      {/* Sand glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-sand/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-crimson/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-12 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: Text */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <span className="label-tag-dark">Next Pop-Up Workshop · August 9th, 2026</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="font-display text-white leading-[1.0] tracking-tight mb-2">
              <span className="block text-5xl sm:text-6xl lg:text-7xl">Built by a</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl">champion.</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl mt-2">
                Open to{" "}
                <span className="font-script text-sand" style={{ fontSize: "1.1em" }}>
                  everyone.
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 text-lg leading-relaxed mt-6 mb-8 max-w-lg"
          >
            Every style. Every story. Every level. This is one floor where{" "}
            <span className="text-white font-medium">everybody belongs</span>{" "}
            and nobody gets left behind.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <button onClick={() => scrollTo("#tickets")} className="btn-primary text-base px-8 py-4">
              Get Your Tickets — $25
            </button>
            <button onClick={() => scrollTo("#about")} className="btn-outline-white text-base px-8 py-4">
              Meet Michaela
            </button>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Event starts in</p>
            <div className="grid grid-cols-4 gap-3 max-w-xs">
              {[
                { value: days, label: "Days" },
                { value: hours, label: "Hrs" },
                { value: minutes, label: "Min" },
                { value: seconds, label: "Sec" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/8 rounded-xl p-3 text-center border border-white/10">
                  <div className="font-display text-2xl text-white leading-none">
                    {String(value).padStart(2, "0")}
                  </div>
                  <div className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Photo */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Red border frame (poster-inspired) */}
          <div className="absolute -inset-3 border-2 border-crimson/40 rounded-3xl" />

          {/* Sand poster bg */}
          <div className="relative rounded-2xl overflow-hidden bg-sand/20 aspect-[3/4]">
            <Image
              src="/michaela-skate.jpg"
              alt="Michaela skating — Houston Skate Project"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

            {/* Poster-style text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="font-script text-sand text-5xl leading-none mb-1">Skate</div>
              <div className="font-display text-white text-lg tracking-wider uppercase">Houston · 2026</div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-4 bg-sand text-charcoal rounded-2xl px-4 py-3 shadow-warm-lg"
          >
            <div className="font-display text-2xl leading-none">7+</div>
            <div className="text-xs font-bold uppercase tracking-wide leading-none mt-0.5">Years</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-4 -right-4 bg-crimson text-white rounded-2xl px-4 py-3 shadow-crimson-glow"
          >
            <div className="font-display text-2xl leading-none">Natl.</div>
            <div className="text-xs font-bold uppercase tracking-wide leading-none mt-0.5">Champion</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollTo("#about")}
        className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
