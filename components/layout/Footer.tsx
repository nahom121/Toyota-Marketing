"use client";

import { Instagram, Music2 } from "lucide-react";

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2.5 justify-center md:justify-start mb-3">
              <div className="w-10 h-10 rounded-full bg-crimson flex items-center justify-center shadow-crimson-glow">
                <span className="font-script text-white text-xl leading-none">S</span>
              </div>
              <div>
                <div className="font-bold text-base leading-none">Houston Skate Project</div>
                <div className="text-white/50 text-[10px] leading-none mt-0.5 uppercase tracking-wider">EST. 2026</div>
              </div>
            </div>
            <p className="text-white/60 text-sm max-w-xs leading-relaxed">
              A pop-up skating workshop built on joy, creativity, and community.
              Roll how you want. Express who you are.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Quick Links</p>
            {[
              { label: "About Michaela", href: "#about" },
              { label: "Event Details", href: "#details" },
              { label: "Get Tickets", href: "#tickets" },
              { label: "FAQ", href: "#faq" },
            ].map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-white/70 hover:text-white text-sm transition-colors text-left"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-white/40 text-xs uppercase tracking-widest">Follow Along</p>
            <a
              href="https://www.instagram.com/houstonskateproject"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-crimson flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">@HoustonSkateProject</span>
            </a>
            <a
              href="https://www.tiktok.com/@houstonskateproject"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-crimson flex items-center justify-center transition-colors">
                <Music2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">@HoustonSkateProject</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Houston Skate Project · All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            For questions: <a href="mailto:hello@houstonskateproject.com" className="hover:text-white transition-colors">hello@houstonskateproject.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
