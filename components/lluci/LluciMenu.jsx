"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Flame, Clock, ChefHat } from "lucide-react";
import { MENU, MENU_CATEGORIES, IMG } from "@/data/lluci";
import { Reveal } from "../ui";
import LluciMenuModal from "./LluciMenuModal";

export default function LluciMenu({ onReserve }) {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);

  const items = useMemo(() => {
    if (cat === "All") return MENU;
    return MENU.filter((m) => m.category === cat || (m.tags && m.tags.includes(cat)));
  }, [cat]);

  return (
    <section id="menu" className="relative bg-[#0c0906] py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <Reveal><span className="overline-gold">The Menu</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 font-display text-5xl text-[#f3ece0] md:text-7xl">Crafted to be <span className="text-gold italic">Remembered</span></h2></Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            {MENU_CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`relative rounded-full px-5 py-2.5 text-sm transition-all duration-500 ${cat === c ? "text-[#17110a]" : "border border-[#c8a24a]/15 text-[#f3ece0]/60 hover:text-[#f3ece0]"}`}>
                {cat === c && <motion.span layoutId="lluci-pill" className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(120deg,#e7cd8c,#c8a24a)" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.article key={item.id} layout
                initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} onClick={() => setActive(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#c8a24a]/10 bg-[#17110a]/30 tap-highlight-none">
                <div className="relative h-60 overflow-hidden">
                  <Image src={IMG(item.photo, 700, 78)} alt={item.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0906] via-[#0c0906]/20 to-transparent" />
                  <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[120%]" />
                  {item.chef && <span className="glass-gold absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-[#c8a24a]"><ChefHat size={13} /> Chef's Pick</span>}
                  <span className="glass-gold absolute right-4 top-4 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-[#f3ece0]"><Star size={12} className="fill-[#c8a24a] text-[#c8a24a]" /> {item.rating}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl text-[#f3ece0] transition-colors group-hover:text-[#e7cd8c]">{item.name}</h3>
                    <span className="whitespace-nowrap font-display text-2xl text-gold">₹{item.price.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#f3ece0]/55">{item.desc}</p>
                  <div className="mt-5 flex items-center gap-4 border-t border-[#c8a24a]/10 pt-4 text-xs text-[#f3ece0]/50">
                    <span className="flex items-center gap-1.5"><Flame size={13} className="text-[#c8a24a]/80" /> {item.calories} kcal</span>
                    <span className="flex items-center gap-1.5"><Clock size={13} className="text-[#c8a24a]/80" /> {item.time}</span>
                    <span className="ml-auto text-[#c8a24a]/80">{item.popularity}% loved</span>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-[#c8a24a]/40 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <LluciMenuModal item={active} onClose={() => setActive(null)} onReserve={() => { setActive(null); onReserve(); }} />
    </section>
  );
}
