"use client";

function TikTokLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.22 8.22 0 0 0 4.81 1.54V6.78a4.85 4.85 0 0 1-1.04-.09z"/>
    </svg>
  );
}

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}

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
              <TikTokLogo className="w-4 h-4" />
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
              <InstagramLogo className="w-4 h-4" />
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
