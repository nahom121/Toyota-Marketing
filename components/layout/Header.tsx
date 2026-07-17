"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Event Details", href: "#details" },
  { label: "Tickets", href: "#tickets" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
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
            ? "bg-cream/95 backdrop-blur-md shadow-warm border-b border-charcoal/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-crimson flex items-center justify-center shadow-crimson-glow group-hover:shadow-crimson-glow-lg transition-all">
                <span className="font-script text-white text-lg leading-none">S</span>
              </div>
              <div className="text-left">
                <div className="text-charcoal font-bold text-sm leading-none">Houston Skate Project</div>
                <div className="text-ink-muted text-[10px] leading-none mt-0.5 uppercase tracking-wider">EST. 2026</div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm text-ink-secondary hover:text-charcoal font-medium transition-colors rounded-lg hover:bg-charcoal/5"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:block">
              <button onClick={() => scrollTo("#tickets")} className="btn-primary text-sm px-6 py-2.5">
                Get Tickets — $25
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-charcoal/5 text-charcoal"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-cream border-l border-charcoal/10 p-8 pt-24 flex flex-col gap-2"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="flex items-center justify-between py-4 px-3 text-charcoal font-semibold border-b border-charcoal/10 hover:text-crimson transition-colors text-left"
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-ink-muted" />
                </motion.button>
              ))}
              <div className="mt-8">
                <button onClick={() => scrollTo("#tickets")} className="btn-primary w-full text-center">
                  Get Tickets — $25
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
