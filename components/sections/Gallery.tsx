"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Add your workshop photo filenames here — drop images into /public/gallery/
const photos: { src: string; alt: string }[] = [
  // { src: "/gallery/photo-1.jpg", alt: "Workshop photo 1" },
  // { src: "/gallery/photo-2.jpg", alt: "Workshop photo 2" },
  // { src: "/gallery/photo-3.jpg", alt: "Workshop photo 3" },
  // { src: "/gallery/photo-4.jpg", alt: "Workshop photo 4" },
  // { src: "/gallery/photo-5.jpg", alt: "Workshop photo 5" },
  // { src: "/gallery/photo-6.jpg", alt: "Workshop photo 6" },
];

const placeholderCount = 6;

export default function Gallery() {
  const showPlaceholders = photos.length === 0;

  return (
    <section id="gallery" className="section-pad bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-charcoal/15 to-transparent" />

      <div className="max-w-7xl mx-auto container-pad">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="label-tag mx-auto mb-5">Photo Gallery</div>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight">
            From the{" "}
            <span className="font-script text-crimson" style={{ fontSize: "1.1em" }}>
              floor.
            </span>
          </h2>
          <p className="text-ink-muted text-base mt-3 max-w-md mx-auto">
            Highlights from our workshops — real people, real progress.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {showPlaceholders
            ? Array.from({ length: placeholderCount }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-square rounded-2xl bg-charcoal/5 border-2 border-dashed border-charcoal/15 flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-2xl">🛼</span>
                  <span className="text-ink-muted text-xs">Photo coming soon</span>
                </motion.div>
              ))
            : photos.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-square rounded-2xl overflow-hidden relative"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
