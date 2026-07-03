"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY, IMG } from "@/data/site";
import { Reveal } from "./ui";

export default function Gallery() {
  const [index, setIndex] = useState(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i + 1) % GALLERY.length),
    []
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length),
    []
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  // touch swipe
  const [touchX, setTouchX] = useState(null);
  const onTouchStart = (e) => setTouchX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (dx > 50) prev();
    else if (dx < -50) next();
    setTouchX(null);
  };

  return (
    <section id="gallery" className="relative bg-obsidian py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <Reveal>
            <span className="overline text-gold">The Atmosphere</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-5xl text-cream md:text-7xl">
              Moments, <span className="text-gold-gradient italic">Framed in Gold</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid auto-rows-[210px] grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((g, i) => (
            <motion.button
              key={g.id}
              onClick={() => setIndex(i)}
              data-cursor="image"
              data-cursor-label="Open"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl border border-white/8 ${g.span}`}
            >
              <Image
                src={IMG(g.img, 700, 76)}
                alt={g.alt}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
              {/* light sweep */}
              <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1.1s] group-hover:translate-x-[120%]" />
              <span className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.2em] text-cream/0 transition-colors duration-500 group-hover:text-cream/80">
                {g.alt}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-obsidian/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button onClick={close} aria-label="Close" className="absolute right-5 top-5 z-20 rounded-full border border-white/15 p-3 text-cream hover:border-gold hover:text-gold">
              <X size={20} />
            </button>
            <button onClick={prev} aria-label="Previous" className="absolute left-4 z-20 rounded-full border border-white/15 p-3 text-cream hover:border-gold hover:text-gold md:left-10">
              <ChevronLeft size={22} />
            </button>
            <button onClick={next} aria-label="Next" className="absolute right-4 z-20 rounded-full border border-white/15 p-3 text-cream hover:border-gold hover:text-gold md:right-10">
              <ChevronRight size={22} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[70vh] w-[90vw] max-w-5xl overflow-hidden rounded-2xl border border-gold/20"
              >
                <Image
                  src={IMG(GALLERY[index].img, 1400, 82)}
                  alt={GALLERY[index].alt}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-cream/60">
              {index + 1} / {GALLERY.length} — {GALLERY[index].alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
