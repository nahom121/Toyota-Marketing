"use client";

import { Music2, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Social links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Houston Skate Project · All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            <a href="tel:+12815474601" className="hover:text-white transition-colors">(281) 547-4601</a>
            {" · "}
            <a href="mailto:info@houstonskateproject.org" className="hover:text-white transition-colors">info@houstonskateproject.org</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
