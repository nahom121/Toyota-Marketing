"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Can I bring my own skates?",
    a: "Absolutely! If you have your own skates, bring them. If not, you can add a rental right at checkout for just $5 per person.",
  },
  {
    q: "What skill level is this for?",
    a: "All levels are welcome — and we mean it. Whether you've never touched a pair of skates in your life or you've been rolling for years, this event is built for you. Michaela's whole mission is to make skating accessible and fun for everyone.",
  },
  {
    q: "Is there an age limit?",
    a: "Houston Skate Project is a family-friendly event. Kids are welcome! Children under 12 should be accompanied by a parent or guardian. Exact age guidelines will be confirmed closer to the event date.",
  },
  {
    q: "What should I wear?",
    a: "Wear comfortable clothes you can move in — athletic wear, leggings, joggers, whatever feels good. Avoid loose laces or anything that could get caught in skate wheels. Bring water and wear layers if the venue is outdoors.",
  },
  {
    q: "Will there be music?",
    a: "Yes! Music is a huge part of the Houston Skate Project experience. Expect a curated mix that keeps the energy up all session long.",
  },
  {
    q: "What is the refund policy?",
    a: "Tickets are generally non-refundable, but if the event is cancelled or rescheduled, you will receive a full refund or the option to transfer your ticket to the new date. Reach out to hello@houstonskateproject.com with any questions.",
  },
  {
    q: "When will the location be announced?",
    a: "The venue will be announced closer to the event date. Follow @HoustonSkateProject on Instagram and TikTok to be the first to know. Your registration confirmation will also be updated with the venue details.",
  },
  {
    q: "How do I add a skate rental?",
    a: "During registration, you'll see an option to add a rental for each ticket. Toggle it on, select your size, and the $5 rental fee will be added to your order at checkout.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-charcoal/10 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-semibold text-charcoal group-hover:text-crimson transition-colors text-base">
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-5 h-5 text-ink-muted flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-ink-secondary text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-pad bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand to-transparent" />

      <div className="max-w-3xl mx-auto container-pad">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="label-tag mx-auto mb-5">FAQ</div>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight">
            Got questions?
            <br />
            <span className="font-script text-crimson" style={{ fontSize: "1.1em" }}>
              We&apos;ve got answers.
            </span>
          </h2>
        </motion.div>

        <div className="bg-cream-light rounded-3xl border border-charcoal/10 px-6 md:px-10 py-2">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-ink-muted text-sm mt-8"
        >
          Still have questions?{" "}
          <a href="mailto:hello@houstonskateproject.com" className="text-crimson hover:underline">
            hello@houstonskateproject.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
