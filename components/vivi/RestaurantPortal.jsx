"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, ArrowRight } from "lucide-react";
import { IMG } from "@/data/vivi";
import { useBooking } from "./BookingProvider";

const DISHES = [
  { img: "1600891964092-4316c288032e", name: "Wagyu A5", note: "Signature" },
  { img: "1476718406336-bb5a9690ee2a", name: "Saffron Lobster", note: "Chef's Pick" },
  { img: "1606313564200-e75d5e30476c", name: "Gold Sphere", note: "Dessert" },
];

// A cinematic "camera dives into the restaurant" transition + immersive intro.
export default function RestaurantPortal({ open, onClose }) {
  const { openBooking } = useBooking();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      if (window.__lenis) window.__lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
    }
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[98] overflow-hidden bg-black"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6 } }}>
          {/* camera dive background */}
          <motion.div className="absolute inset-0"
            initial={{ scale: 1.6, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}>
            <Image src={IMG("1517248135467-4c7edcad34c4", 1920, 78)} alt="The Lluci Restaurant" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.85))]" />
          </motion.div>

          {/* violet ambient */}
          <motion.div className="glow-blob" style={{ left: "20%", top: "25%", width: 500, height: 500, background: "radial-gradient(circle, rgba(139,92,246,0.28), transparent 70%)" }}
            animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 6, repeat: Infinity }} />

          <button onClick={onClose} aria-label="Close" className="absolute right-6 top-6 z-30 rounded-full border border-white/20 bg-black/40 p-3 text-white/80 backdrop-blur hover:border-violet hover:text-violet">
            <X size={20} />
          </button>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }}
              className="overline text-violet/90">A THE VIVI Signature · Two Michelin Stars</motion.span>

            <motion.h2 initial={{ opacity: 0, letterSpacing: "0.6em", filter: "blur(12px)" }} animate={{ opacity: 1, letterSpacing: "0.25em", filter: "blur(0px)" }}
              transition={{ delay: 1.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-display text-7xl font-light text-white md:text-9xl">LLUCI</motion.h2>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1 }}
              className="mt-6 max-w-lg text-silver/75">
              Step through the doors into a separate world of fire, patience and theatre — an intimate stage where every plate becomes a memory.
            </motion.p>

            {/* signature dishes */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 1 }}
              className="mt-10 flex flex-wrap justify-center gap-4">
              {DISHES.map((d, i) => (
                <motion.div key={d.name} className="group relative h-36 w-44 overflow-hidden rounded-2xl border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2 + i * 0.12 }}>
                  <Image src={IMG(d.img, 400, 78)} alt={d.name} fill sizes="176px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-left">
                    <div className="text-sm text-white">{d.name}</div>
                    <div className="flex items-center gap-1 text-[0.6rem] uppercase tracking-wider text-violet"><Star size={9} className="fill-violet" /> {d.note}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6, duration: 1 }}
              className="mt-11 flex flex-col items-center gap-4 sm:flex-row">
              <button onClick={() => { onClose(); setTimeout(() => openBooking("table"), 400); }}
                className="btn-primary rounded-full px-9 py-4 text-base" style={{ background: "linear-gradient(120deg,#8b5cf6,#6d6ef6)" }}>
                Reserve a Table
              </button>
              <button onClick={onClose} className="flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base text-silver/85 transition hover:border-violet hover:text-white">
                The full experience opens next <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
