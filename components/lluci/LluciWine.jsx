"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Wine as WineIcon } from "lucide-react";
import { WINES, IMG } from "@/data/lluci";
import { Reveal } from "../ui";

const TYPES = ["All", "Red", "White", "Sparkling"];

export default function LluciWine() {
  const [type, setType] = useState("All");
  const list = useMemo(() => (type === "All" ? WINES : WINES.filter((w) => w.type === type)), [type]);

  return (
    <section id="wine" className="relative overflow-hidden bg-[#0c0906] py-28 md:py-36">
      <div className="absolute inset-0 opacity-30">
        <Image src={IMG("1510812431401-41d2bd2722f3", 1600, 72)} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0906] via-[#0c0906]/85 to-[#0c0906]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><span className="overline-gold">The Cellar</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-[#f3ece0] md:text-7xl">A Living <span className="text-gold italic">Wine Library</span></h2></Reveal>
            <Reveal delay={0.15}><p className="mt-4 max-w-md text-[#f3ece0]/60">Over 1,200 labels across twelve countries, guided by our head sommelier. A selection below.</p></Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${type === t ? "border-[#c8a24a] bg-[#c8a24a]/15 text-[#c8a24a]" : "border-[#c8a24a]/15 text-[#f3ece0]/60 hover:border-[#c8a24a]/50"}`}>{t}</button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {list.map((w) => (
              <motion.div key={w.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-1 items-center gap-3 rounded-2xl border border-[#c8a24a]/10 bg-[#17110a]/40 px-6 py-5 transition-colors hover:border-[#c8a24a]/30 md:grid-cols-[1fr_auto]">
                <div className="flex items-start gap-4">
                  <WineIcon size={22} className="mt-1 shrink-0 text-[#c8a24a]/70" />
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-2xl text-[#f3ece0]">{w.name}</h3>
                      <span className="rounded-full border border-[#c8a24a]/20 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-[#c8a24a]/80">{w.type} · {w.year}</span>
                    </div>
                    <div className="mt-0.5 text-sm text-[#f3ece0]/50">{w.region}</div>
                    <p className="mt-2 max-w-lg text-sm italic text-[#f3ece0]/60">{w.note}</p>
                  </div>
                </div>
                <div className="flex gap-8 md:justify-end md:text-right">
                  <div><div className="text-[0.6rem] uppercase tracking-wider text-[#f3ece0]/40">Glass</div><div className="font-display text-xl text-gold">₹{w.glass.toLocaleString("en-IN")}</div></div>
                  <div><div className="text-[0.6rem] uppercase tracking-wider text-[#f3ece0]/40">Bottle</div><div className="font-display text-xl text-gold">₹{w.bottle.toLocaleString("en-IN")}</div></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
