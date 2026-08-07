"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

export default function ContactStrip() {
  return (
    <section id="contact" className="section-pad bg-cream relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent" />

      <div className="max-w-3xl mx-auto container-pad text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="label-tag mx-auto mb-5">Contact Us</div>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight mb-4">
            Still have{" "}
            <span className="font-script text-crimson" style={{ fontSize: "1.1em" }}>
              questions?
            </span>
          </h2>
          <p className="text-ink-muted text-base mb-10">
            We&apos;re happy to help. Reach out by phone or email and we&apos;ll get back to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+12815474601"
              className="flex items-center justify-center gap-3 bg-charcoal text-white rounded-2xl px-8 py-4 font-semibold text-base hover:bg-charcoal/85 transition-colors shadow-warm"
            >
              <Phone className="w-5 h-5 shrink-0" />
              +1 (281) 547-4601
            </a>

            <a
              href="mailto:info@houstonskateproject.org"
              className="flex items-center justify-center gap-3 border-2 border-charcoal text-charcoal rounded-2xl px-8 py-4 font-semibold text-base hover:bg-charcoal hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5 shrink-0" />
              info@houstonskateproject.org
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
