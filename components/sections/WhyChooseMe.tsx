"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  User,
  Eye,
  Truck,
  MapPin,
  Zap,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: User,
    title: "Dedicated Automotive Advisor",
    description:
      "Work directly with me from the moment you say hello to the moment you drive off in your new Toyota. One person. One process. Zero handoffs.",
    highlight: "Personal, one-on-one service",
    gradient: "from-toyota-red/20 to-toyota-red/5",
    iconBg: "bg-toyota-red/15",
    iconColor: "text-toyota-red",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    description:
      "No hidden fees. No bait-and-switch. No games. I'll show you exactly what you're paying for and why — so you feel confident in every decision.",
    highlight: "Clear pricing, no surprises",
    gradient: "from-blue-500/15 to-blue-500/5",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
  {
    icon: Shield,
    title: "Lifetime Powertrain Warranty",
    description:
      "Every qualifying new Toyota I help you purchase comes with a lifetime powertrain warranty — giving you long-term peace of mind that most dealers can't match.",
    highlight: "Protection for as long as you own it",
    gradient: "from-gold/20 to-gold/5",
    iconBg: "bg-gold/15",
    iconColor: "text-gold",
  },
  {
    icon: Truck,
    title: "Complimentary Service Loaners",
    description:
      "When your Toyota needs service, we provide a complimentary loaner vehicle so your life never skips a beat. Stay on the road — always.",
    highlight: "Available on qualifying new Toyotas",
    gradient: "from-purple-500/15 to-purple-500/5",
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
  },
  {
    icon: MapPin,
    title: "Local Houston & Katy Expert",
    description:
      "Born and working in this community. I understand the roads you drive, the needs of your family, and the value of a vehicle that works hard for you.",
    highlight: "Serving Katy, Houston & surrounding areas",
    gradient: "from-emerald-500/15 to-emerald-500/5",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    icon: HeartHandshake,
    title: "Support After the Sale",
    description:
      "My relationship with you doesn't end when you drive off. I'm here for questions, referrals, and every Toyota purchase your family makes going forward.",
    highlight: "A relationship, not a transaction",
    gradient: "from-pink-500/15 to-pink-500/5",
    iconBg: "bg-pink-500/15",
    iconColor: "text-pink-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;
  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.6 }}
      className={`relative group rounded-2xl p-6 border border-white/08 bg-gradient-to-br ${feature.gradient}
                  hover:border-white/16 transition-all duration-400 hover:-translate-y-1 cursor-default`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5`}>
        <Icon className={`w-6 h-6 ${feature.iconColor}`} />
      </div>

      {/* Content */}
      <h3 className="font-display text-xl text-white mb-3 leading-snug">
        {feature.title}
      </h3>
      <p className="text-ink-secondary text-sm leading-relaxed mb-4">
        {feature.description}
      </p>

      {/* Highlight tag */}
      <div className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
        <BadgeCheck className={`w-3.5 h-3.5 ${feature.iconColor}`} />
        {feature.highlight}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
           style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }} />
    </motion.div>
  );
}

export default function WhyChooseMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-choose-me" className="section-pad relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-toyota-red/4 blur-[120px] pointer-events-none" />

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
            Why Buy From Me
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            A Different Kind of{" "}
            <span className="text-gradient-red">Car Buying</span>{" "}
            Experience
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            I believe buying a car should feel good — not stressful. Here's what sets
            working with me apart from every other option in Houston.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-ink-secondary mb-6">
            Ready to experience the difference?
          </p>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
          >
            <HeartHandshake className="w-5 h-5" />
            Let&apos;s Work Together
          </button>
        </motion.div>
      </div>
    </section>
  );
}
