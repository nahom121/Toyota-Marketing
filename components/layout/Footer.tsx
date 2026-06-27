"use client";

import { Phone, MessageSquare, Mail, MapPin, Instagram, Facebook, Linkedin, Shield } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { label: "Why Buy From Me", href: "#why-choose-me" },
    { label: "Toyota Vehicles", href: "#vehicles" },
    { label: "Customer Reviews", href: "#testimonials" },
    { label: "Trade-In Estimate", href: "#trade-in" },
    { label: "About Nahom", href: "#about" },
  ],
  "Toyota Models": [
    { label: "RAV4 / RAV4 Hybrid", href: "#vehicles" },
    { label: "Highlander", href: "#vehicles" },
    { label: "Camry / Camry Hybrid", href: "#vehicles" },
    { label: "Tacoma", href: "#vehicles" },
    { label: "Tundra", href: "#vehicles" },
    { label: "Sequoia", href: "#vehicles" },
  ],
  "Areas Served": [
    { label: "All of Texas", href: "#contact" },
    { label: "Katy & Houston", href: "#contact" },
    { label: "Sugar Land, TX", href: "#contact" },
    { label: "Cypress, TX", href: "#contact" },
    { label: "Richmond, TX", href: "#contact" },
    { label: "Brookshire, TX", href: "#contact" },
  ],
};

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/06 bg-[#030305]">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-toyota-red flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Nahom Estifanos</div>
                <div className="text-ink-secondary text-[10px] uppercase tracking-wider">Toyota of Katy</div>
              </div>
            </div>

            <p className="text-ink-secondary text-sm leading-relaxed mb-6 max-w-xs">
              A dedicated Toyota Product Specialist helping Texas families find
              their perfect vehicle — with complete transparency, zero pressure,
              and lifetime powertrain warranty protection.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 mb-6">
              <a href="tel:+12025531080" className="flex items-center gap-2.5 text-sm text-ink-secondary hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                (202) 553-1080
              </a>
              <a href="sms:+12025531080" className="flex items-center gap-2.5 text-sm text-ink-secondary hover:text-white transition-colors group">
                <MessageSquare className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                Text me anytime
              </a>
              <a href="mailto:nahom.estifanos@drivetoyotaofkaty.com" className="flex items-center gap-2.5 text-sm text-ink-secondary hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                nahom.estifanos@drivetoyotaofkaty.com
              </a>
              <a
                href="https://maps.google.com/?q=Toyota+of+Katy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-ink-secondary hover:text-white transition-colors group"
              >
                <MapPin className="w-4 h-4 text-toyota-red group-hover:scale-110 transition-transform" />
                21555 Katy Fwy, Katy, TX 77450
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-ink-secondary hover:text-white hover:border-white/20 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-ink-secondary hover:text-white text-sm transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Warranty highlight */}
        <div className="mt-12 p-5 glass rounded-2xl border border-toyota-red/20 flex items-start gap-4">
          <Shield className="w-6 h-6 text-toyota-red flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-white text-sm mb-1">Lifetime Powertrain Warranty</div>
            <p className="text-ink-secondary text-xs leading-relaxed">
              Every qualifying new Toyota purchased through me at Toyota of Katy includes a
              lifetime powertrain warranty — covering engine, transmission, and drivetrain
              components for as long as you own the vehicle. No mileage cap. No hidden exclusions.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/06 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-ink-muted text-xs text-center md:text-left">
            © {new Date().getFullYear()} Nahom Estifanos · Toyota Product Specialist at Toyota of Katy.
            All rights reserved.
          </p>
          <p className="text-ink-muted text-xs text-center">
            Toyota and the Toyota logo are registered trademarks of Toyota Motor Corporation.
            This site is the personal marketing page of Nahom Estifanos.
          </p>
        </div>
      </div>
    </footer>
  );
}
