"use client";

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

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-12 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: Text */}
        <div>
          {/* Badge */}
          <div className="hero-badge mb-6">
            <span className="label-tag-dark">Next Pop-Up Workshop · August 9th, 2026</span>
          </div>

          {/* Headline */}
          <div className="hero-headline">
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
          </div>

          {/* Subhead */}
          <p className="hero-sub text-white/70 text-lg leading-relaxed mt-6 mb-8 max-w-lg">
            Every style. Every story. Every level. This is one floor where{" "}
            <span className="text-white font-medium">everybody belongs</span>{" "}
            and nobody gets left behind.
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row gap-4 mb-12">
            <button onClick={() => scrollTo("#tickets")} className="btn-primary text-base px-8 py-4">
              Get Your Tickets — $25
            </button>
            <button onClick={() => scrollTo("#about")} className="btn-outline-white text-base px-8 py-4">
              Meet Michaela
            </button>
          </div>

          {/* Countdown */}
          <div className="hero-countdown">
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
          </div>
        </div>

        {/* Right: Photo */}
        <div className="hero-image relative hidden lg:block">
          <div className="absolute -inset-3 border-2 border-crimson/40 rounded-3xl" />

          <div className="relative rounded-2xl overflow-hidden bg-sand/20 aspect-[3/4]">
            <Image
              src="/michaela-skate.webp"
              alt="Michaela skating, Houston Skate Project"
              fill
              className="object-cover object-top"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="font-script text-sand text-5xl leading-none mb-1">Skate</div>
              <div className="font-display text-white text-lg tracking-wider uppercase">Houston · 2026</div>
            </div>
          </div>

          <div className="float-up absolute -top-4 -left-4 bg-sand text-charcoal rounded-2xl px-4 py-3 shadow-warm-lg">
            <div className="font-display text-2xl leading-none">7+</div>
            <div className="text-xs font-bold uppercase tracking-wide leading-none mt-0.5">Years</div>
          </div>

          <div className="float-down absolute -bottom-4 -right-4 bg-crimson text-white rounded-2xl px-4 py-3 shadow-crimson-glow">
            <div className="font-display text-2xl leading-none">Natl.</div>
            <div className="text-xs font-bold uppercase tracking-wide leading-none mt-0.5">Champion</div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollTo("#about")}
        className="hero-scroll relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 bounce-slow" />
      </button>
    </section>
  );
}
