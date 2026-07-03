"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Flame, Clock, ChefHat } from "lucide-react";
import { MENU, MENU_CATEGORIES, IMG } from "@/data/site";
import { Reveal } from "./ui";
import MenuModal from "./MenuModal";

export default function Menu({ onReserveDish }) {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);

  const items = useMemo(() => {
    if (cat === "All") return MENU;
    return MENU.filter(
      (m) => m.category === cat || (m.tags && m.tags.includes(cat))
    );
  }, [cat]);

  return (
    <section id="menu" className="relative bg-obsidian py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <Reveal>
            <span className="overline text-gold">The Menu</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-5xl text-cream md:text-7xl">
              Crafted to be <span className="text-gold-gradient italic">Remembered</span>
            </h2>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            {MENU_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                data-cursor="link"
                className={`relative rounded-full px-5 py-2.5 text-sm transition-all duration-500 ${
                  cat === c
                    ? "text-ink"
                    : "text-cream/60 hover:text-cream border border-white/10"
                }`}
              >
                {cat === c && (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-goldlight to-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActive(item)}
                data-cursor="food"
                data-cursor-label="View"
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] tap-highlight-none"
              >
                {/* image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={IMG(item.photo, 700, 78)}
                    alt={item.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                  {/* light sweep */}
                  <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[120%]" />
                  {item.chef && (
                    <span className="glass-strong absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-gold">
                      <ChefHat size={13} /> Chef's Pick
                    </span>
                  )}
                  <span className="glass absolute right-4 top-4 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-cream">
                    <Star size={12} className="fill-gold text-gold" /> {item.rating}
                  </span>
                </div>

                {/* body */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl text-cream transition-colors group-hover:text-goldlight">
                      {item.name}
                    </h3>
                    <span className="whitespace-nowrap font-display text-2xl text-gold-gradient">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cream/55">
                    {item.desc}
                  </p>
                  <div className="mt-5 flex items-center gap-4 border-t border-white/8 pt-4 text-xs text-cream/50">
                    <span className="flex items-center gap-1.5">
                      <Flame size={13} className="text-gold/80" /> {item.calories} kcal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-gold/80" /> {item.time}
                    </span>
                    <span className="ml-auto flex items-center gap-1.5 text-gold/80">
                      {item.popularity}% loved
                    </span>
                  </div>
                </div>

                {/* hover glow ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-gold/40 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <MenuModal
        item={active}
        onClose={() => setActive(null)}
        onReserve={() => {
          setActive(null);
          onReserveDish && onReserveDish();
        }}
      />
    </section>
  );
}
