"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X, Star, Flame, Clock, Wine, Leaf } from "lucide-react";
import { IMG } from "@/data/site";

export default function MenuModal({ item, onClose, onReserve }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative z-10 grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl md:grid-cols-2"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-obsidian/50 p-2.5 text-cream transition hover:border-gold hover:text-gold"
            >
              <X size={18} />
            </button>

            {/* Image — slow rotate to feel 3D */}
            <div className="relative h-64 overflow-hidden md:h-auto">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "easeOut" }}
              >
                <Image
                  src={IMG(item.photo, 900, 82)}
                  alt={item.name}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent md:bg-gradient-to-r" />
              <span className="glass-strong absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-gold">
                <Star size={12} className="fill-gold text-gold" /> {item.rating} rating
              </span>
            </div>

            {/* Details */}
            <div className="overflow-y-auto p-7 md:p-9">
              <span className="overline text-gold/80">{item.category}</span>
              <h3 className="mt-2 font-display text-4xl text-cream">{item.name}</h3>
              <div className="mt-2 font-display text-3xl text-gold-gradient">
                ₹{item.price.toLocaleString("en-IN")}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-cream/65">
                {item.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-cream/60">
                <span className="flex items-center gap-1.5">
                  <Flame size={14} className="text-gold" /> {item.calories} kcal
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-gold" /> {item.time}
                </span>
                {item.veg && (
                  <span className="flex items-center gap-1.5 text-emerald-400/80">
                    <Leaf size={14} /> Vegetarian
                  </span>
                )}
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase tracking-[0.2em] text-cream/45">
                  Ingredients
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-cream/75"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {item.wine !== "—" && (
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-gold/15 bg-gold/[0.05] px-4 py-3">
                  <Wine size={18} className="text-gold" />
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/45">
                      Sommelier Pairing
                    </div>
                    <div className="text-sm text-cream/85">{item.wine}</div>
                  </div>
                </div>
              )}

              <button
                onClick={onReserve}
                data-cursor="link"
                className="btn-gold mt-7 w-full rounded-full py-3.5 text-base"
              >
                Add to Reservation
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
