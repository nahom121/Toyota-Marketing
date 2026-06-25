"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

const testimonials = [
  {
    name: "Marcus & Destiny W.",
    location: "Katy, TX",
    vehicle: "2024 Toyota RAV4 XLE",
    rating: 5,
    text: "Nahom made buying our RAV4 the easiest car purchase we've ever made. He was completely upfront about pricing, didn't play any games, and had us in and out in under 2 hours. The lifetime warranty was the cherry on top. We've already sent three family members his way.",
    initials: "MW",
    color: "bg-toyota-red",
  },
  {
    name: "Jennifer C.",
    location: "Houston, TX",
    vehicle: "2024 Toyota Highlander Platinum",
    rating: 5,
    text: "I was dreading the car buying process but Nahom completely changed my expectations. He listened to exactly what I needed, never pushed me toward something more expensive, and I left feeling great about my purchase. The complimentary loaner cars have been a huge plus too!",
    initials: "JC",
    color: "bg-blue-600",
  },
  {
    name: "Robert T.",
    location: "Sugar Land, TX",
    vehicle: "2024 Toyota Tacoma TRD Pro",
    rating: 5,
    text: "Found Nahom through Instagram and drove from Sugar Land — totally worth it. He found exactly the Tacoma I wanted, got me a great trade-in value for my old truck, and the whole process was smooth. He even checked in a week after to make sure I was happy. That kind of service is rare.",
    initials: "RT",
    color: "bg-orange-600",
  },
  {
    name: "Sandra & Luis M.",
    location: "Cypress, TX",
    vehicle: "2024 Toyota Sienna XSE AWD",
    rating: 5,
    text: "We needed a minivan for our growing family and Nahom was incredible. He helped us understand every feature, got us a great deal, and was completely transparent about every number. Never felt rushed or pressured. We love our Sienna and we love working with Nahom.",
    initials: "SM",
    color: "bg-teal-600",
  },
  {
    name: "David K.",
    location: "Katy, TX",
    vehicle: "2024 Toyota Tundra Platinum",
    rating: 5,
    text: "Leased with Nahom for 3 years and just bought my first Tundra through him. He remembered everything about my preferences and made the whole upgrade completely seamless. He's the only person I trust for my vehicles. Already told everyone at my company about him.",
    initials: "DK",
    color: "bg-slate-500",
  },
  {
    name: "Ashley P.",
    location: "Houston, TX",
    vehicle: "2024 Toyota Camry SE Hybrid",
    rating: 5,
    text: "First time buying a car on my own and Nahom made it so easy. He took the time to explain financing, warranty, everything — without being condescending or rushing me. I got an amazing deal on a Camry hybrid and feel 100% confident in my purchase. 10/10 would recommend.",
    initials: "AP",
    color: "bg-purple-600",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const prev = () => {
    setDirection(-1);
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setActive((p) => (p + 1) % testimonials.length);
  };

  const t = testimonials[active];

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-yellow-400/4 blur-[120px] pointer-events-none" />

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
            <Star className="w-3 h-3" />
            Customer Stories
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Real Customers,{" "}
            <span className="text-gradient-gold">Real Results</span>
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what customers across
            Houston and Katy are saying.
          </p>
        </motion.div>

        {/* Main testimonial */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glass-strong rounded-3xl p-8 md:p-12 relative">
            {/* Quote icon */}
            <Quote className="w-10 h-10 text-toyota-red/30 absolute top-8 right-8" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {/* Stars */}
                <div className="mb-6">
                  <StarRating count={t.rating} />
                </div>

                {/* Text */}
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed font-light mb-8">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center font-bold text-white`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-ink-secondary text-sm">{t.location} · {t.vehicle}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/08">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-8 bg-toyota-red" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4 text-ink-secondary" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4 text-ink-secondary" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.slice(0, 3).map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-5 hover:border-white/16 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full ${review.color} flex items-center justify-center font-bold text-white text-sm`}>
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{review.name}</div>
                    <div className="text-xs text-ink-muted">{review.location}</div>
                  </div>
                </div>
                <StarRating count={5} />
              </div>
              <p className="text-ink-secondary text-sm leading-relaxed line-clamp-3">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-ink-secondary mb-4">
            Join hundreds of happy customers in Houston and Katy.
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
          >
            <MessageSquare className="w-4 h-4" />
            Become My Next Success Story
          </button>
        </motion.div>
      </div>
    </section>
  );
}
