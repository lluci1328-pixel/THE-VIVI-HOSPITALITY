"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { HERO_SLIDES, IMG } from "@/data/vivi";
import { useBooking } from "./BookingProvider";
import { Magnetic, Particles } from "../ui";

export default function Hero() {
  const { openBooking } = useBooking();
  const ref = useRef(null);
  const [slide, setSlide] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const cur = HERO_SLIDES[slide];

  return (
    <section ref={ref} id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background slides */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div key={slide} className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6, ease: "easeInOut" }, scale: { duration: 7, ease: "easeOut" } }}>
            <Image src={IMG(cur.img, 1920, 76)} alt="THE VIVI" fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-base/70 via-base/45 to-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/85 via-base/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_30%,rgba(5,6,13,0.75)_100%)]" />
      </motion.div>

      {/* electric ambient glows */}
      <motion.div className="glow-blob z-[1]" style={{ left: "8%", top: "18%", width: 480, height: 480, background: "radial-gradient(circle, rgba(46,123,255,0.22), transparent 70%)" }}
        animate={{ opacity: [0.4, 0.65, 0.4] }} transition={{ duration: 7, repeat: Infinity }} />
      <motion.div className="glow-blob z-[1]" style={{ right: "12%", bottom: "14%", width: 420, height: 420, background: "radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.25, 0.5] }} transition={{ duration: 8, repeat: Infinity }} />

      <Particles count={48} className="z-[2]" />

      {/* Content */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full pl-6 pr-6 lg:pl-[calc(80px+5vw)] lg:pr-16">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
            className="mb-7 flex items-center gap-3">
            <span className="flex items-center gap-1 rounded-full border border-sky/25 bg-sky/5 px-3 py-1.5 text-xs text-sky">
              <Star size={12} className="fill-sky text-sky" /> 4.9 · World's Leading Luxury Hotel
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={slide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <span className="overline text-silver/70">{cur.kicker}</span>
              <h1 className="mt-4 font-display text-[13vw] leading-[0.94] text-mist sm:text-7xl md:text-8xl lg:text-[6.6rem]">
                {cur.title.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span className={`inline-block ${i === 1 ? "text-aurora italic" : ""}`}
                      initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </motion.div>
          </AnimatePresence>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-silver/70 md:text-lg">
            A landmark of modern luxury — 100+ suites, a two-Michelin-star restaurant, a subterranean spa and skyline weddings, all beneath one extraordinary roof.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Magnetic strength={0.3}>
              <button onClick={() => openBooking("room")} className="btn-primary shimmer-border rounded-full px-9 py-4 text-base">Book Your Stay</button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button onClick={() => { const el = document.querySelector("#rooms"); if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.4 }); }}
                className="btn-ghost rounded-full px-9 py-4 text-base">Explore Rooms</button>
            </Magnetic>
          </motion.div>

          {/* slide dots */}
          <div className="mt-12 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${slide === i ? "w-8 bg-sky" : "w-3 bg-white/25 hover:bg-white/50"}`} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.button onClick={() => { const el = document.querySelector("#rooms"); if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.4 }); }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-silver/50">
        <span className="overline text-[0.6rem]">Discover</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}><ChevronDown size={18} className="text-sky" /></motion.span>
      </motion.button>
    </section>
  );
}
