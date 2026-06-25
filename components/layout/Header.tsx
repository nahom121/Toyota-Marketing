"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Why Nahom", href: "#why-choose-me" },
  { label: "Vehicles", href: "#vehicles" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Trade-In", href: "#trade-in" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-dark shadow-premium border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#hero" onClick={() => handleLinkClick("#hero")} className="flex items-center gap-3 group">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-toyota-red flex items-center justify-center shadow-red-glow group-hover:shadow-red-glow-lg transition-all duration-300">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm leading-none">Nahom Estifanos</div>
                  <div className="text-ink-secondary text-[10px] leading-none mt-0.5 font-medium tracking-wider uppercase">Toyota of Katy</div>
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="px-4 py-2 text-sm text-ink-secondary hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+12815551234"
                className="flex items-center gap-2 px-4 py-2 text-sm text-ink-secondary hover:text-white transition-colors duration-200 font-medium"
              >
                <Phone className="w-4 h-4 text-toyota-red" />
                (281) 555-1234
              </a>
              <button
                onClick={() => handleLinkClick("#contact")}
                className="btn-primary text-sm px-6 py-2.5"
              >
                Schedule Appointment
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg glass text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm glass-dark border-l border-white/08 p-8 pt-24 flex flex-col gap-2"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between py-4 px-3 text-white font-medium border-b border-white/08 hover:text-toyota-red transition-colors"
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-ink-muted" />
                </motion.button>
              ))}

              <div className="mt-8 flex flex-col gap-3">
                <a href="tel:+12815551234" className="btn-secondary text-center w-full">
                  <Phone className="w-4 h-4" />
                  Call Nahom
                </a>
                <button
                  onClick={() => handleLinkClick("#contact")}
                  className="btn-primary text-center w-full"
                >
                  Schedule Appointment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
