"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, Heart, Users } from "lucide-react";

const pillars = [
  {
    icon: Trophy,
    title: "National Champion",
    desc: "7+ years of competing and winning at the highest levels of roller skating.",
  },
  {
    icon: Heart,
    title: "Passion-Driven",
    desc: "Every session is built around joy, creativity, and the love of movement.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    desc: "No experience needed. No judgment. Just skates, music, and good people.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad bg-cream-light relative overflow-hidden">
      {/* Subtle top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand to-transparent" />

      <div className="max-w-7xl mx-auto container-pad">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="label-tag mx-auto mb-5">About Michaela</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
            The story behind
            <br />
            <span className="font-script text-crimson" style={{ fontSize: "1.1em" }}>
              the project.
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-16">
          {/* Photos collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-warm-lg border border-charcoal/10">
              <Image
                src="/michaela-lace.jpg"
                alt="Michaela lacing up her skates"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating secondary photo */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-4 md:-right-8 w-40 md:w-52 aspect-[3/4] rounded-xl overflow-hidden shadow-warm-lg border-2 border-cream"
            >
              <Image
                src="/michaela-joy.jpg"
                alt="Michaela smiling"
                fill
                className="object-cover object-top"
              />
            </motion.div>

            {/* Est. badge */}
            <div className="absolute top-4 -left-3 bg-charcoal text-white rounded-xl px-4 py-2 shadow-warm-lg">
              <div className="font-display text-xl leading-none">EST.</div>
              <div className="font-display text-xl leading-none text-sand">2026</div>
            </div>
          </motion.div>

          {/* Story text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="divider-sand mb-6" />

            <p className="text-ink-secondary text-lg leading-relaxed mb-6">
              I&apos;ve been skating since I was young. I&apos;ve competed, I&apos;ve won, and I&apos;ve pushed
              myself harder than I ever thought possible on a pair of skates. But the thing that
              keeps me going isn&apos;t the medals, it&apos;s the feeling you get when you find your flow
              on the floor.
            </p>
            <p className="text-ink-secondary text-lg leading-relaxed mb-6">
              That moment where it&apos;s just you, the music, and the movement.
            </p>
            <p className="text-ink-secondary text-lg leading-relaxed mb-8">
              I created Houston Skate Project because I want everyone in this city to feel that.
              Skating has given me so much: confidence, community, creativity, joy, and I want
              to share all of it. Whether you&apos;ve never worn skates before or you&apos;ve been rolling
              your whole life, there is a place for you here.
            </p>

            {/* Quote block */}
            <div className="border-l-4 border-crimson pl-5 mb-8">
              <p className="font-display text-2xl md:text-3xl text-charcoal leading-snug italic">
                &ldquo;This is for Houston.
                <br />
                This is for you.
                <br />
                Let&apos;s skate.&rdquo;
              </p>
              <p className="text-ink-muted text-sm mt-3 font-medium">— Michaela</p>
            </div>
          </motion.div>
        </div>

        {/* Three pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {pillars.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-sand text-center"
            >
              <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-5 h-5 text-crimson" />
              </div>
              <h3 className="font-display text-xl text-charcoal mb-2">{title}</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
