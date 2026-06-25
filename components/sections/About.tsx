"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Target, Award, Users, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "People First",
    text: "Every decision I make puts the customer's needs above everything else. Your trust matters more than any single sale.",
  },
  {
    icon: Target,
    title: "Purpose-Driven",
    text: "My goal isn't just selling vehicles. It's helping you make the most confident automotive decision of your life.",
  },
  {
    icon: Award,
    title: "Excellence Always",
    text: "I hold myself to the highest standard of professionalism, knowledge, and follow-through on every interaction.",
  },
  {
    icon: Users,
    title: "Community Rooted",
    text: "I live and work in this community. When I help you, I'm helping a neighbor — and that means everything to me.",
  },
];

const highlights = [
  { value: "Toyota", label: "Product Specialist" },
  { value: "Katy, TX", label: "Based in" },
  { value: "100%", label: "Transparent" },
  { value: "5★", label: "Rated" },
];

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-toyota-red/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto container-pad relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left: Photo + card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6"
          >
            {/* Photo */}
            <div className="relative">
              <div className="w-64 h-80 rounded-3xl overflow-hidden border border-white/10 shadow-premium relative">
                <Image
                  src="/headshot.jpg"
                  alt="Nahom Estifanos – Toyota Product Specialist"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 glass rounded-2xl p-3 border border-white/10 shadow-glass"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-toyota-red flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">Toyota Certified</div>
                    <div className="text-ink-muted text-[10px]">Product Specialist</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {highlights.map((h) => (
                <div key={h.label} className="glass rounded-xl p-3 text-center">
                  <div className="font-display text-xl text-white">{h.value}</div>
                  <div className="text-ink-muted text-[10px] uppercase tracking-wider">{h.label}</div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Facebook, label: "Facebook", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-ink-secondary hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="label-tag mb-6">
              <MapPin className="w-3 h-3" />
              Toyota of Katy · Katy, Texas
            </div>

            <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
              Hi, I&apos;m{" "}
              <span className="text-gradient-red">Nahom</span>
            </h2>

            <div className="space-y-4 text-ink-secondary text-lg leading-relaxed mb-8">
              <p>
                I&apos;m a Toyota Product Specialist and Automotive Sales Professional
                at <span className="text-white font-medium">Toyota of Katy</span> in Katy, Texas —
                serving the Houston area and surrounding communities.
              </p>
              <p>
                I got into this industry because I believe the car buying experience should
                feel <span className="text-white italic">good</span>. Not stressful. Not confusing.
                Not manipulative. When you work with me, you get a dedicated advisor who
                knows Toyota inside and out — and who puts your interests first, every time.
              </p>
              <p>
                My goal isn&apos;t just to sell you a vehicle. It&apos;s to help you make
                the most confident automotive decision you&apos;ve ever made — one you&apos;ll
                still feel great about years from now.
              </p>
              <p>
                Whether you&apos;re a first-time buyer, upgrading your family&apos;s ride,
                looking for your next lease, or trading in something you&apos;ve outgrown —
                I&apos;m here to make it simple, transparent, and completely stress-free.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl p-4 hover:border-white/16 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-toyota-red/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-toyota-red" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm mb-1">{value.title}</div>
                        <div className="text-ink-muted text-xs leading-relaxed">{value.text}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
            >
              Let&apos;s Connect
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
