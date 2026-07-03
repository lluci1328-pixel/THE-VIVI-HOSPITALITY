"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Sparkles } from "lucide-react";
import { PRIVATE_ROOMS, IMG } from "@/data/lluci";
import { Reveal } from "../ui";

export default function LluciPrivate({ onReserve }) {
  return (
    <section id="private" className="relative overflow-hidden bg-[#0c0906] py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <Reveal><span className="overline-gold">Private Dining</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 font-display text-5xl text-[#f3ece0] md:text-7xl">Your Own <span className="text-gold italic">Private Stage</span></h2></Reveal>
          <Reveal delay={0.15}><p className="mt-5 text-[#f3ece0]/60">Three intimate spaces for celebrations that deserve total privacy — each with a dedicated brigade and sommelier.</p></Reveal>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {PRIVATE_ROOMS.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-[#c8a24a]/10">
              <div className="relative h-[440px] overflow-hidden">
                <Image src={IMG(r.img, 700, 78)} alt={r.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0906] via-[#0c0906]/40 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 30%, rgba(224,138,60,0.22), transparent 60%)" }} />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-center gap-2 text-xs text-[#c8a24a]"><Users size={14} /> Up to {r.guests} guests</div>
                <h3 className="mt-2 font-display text-3xl text-[#f3ece0]">{r.name}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-[#f3ece0]/55"><Sparkles size={13} className="text-[#c8a24a]/70" /> {r.style}</div>
                <ul className="mt-4 max-h-0 space-y-1.5 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                  {r.services.map((s) => <li key={s} className="flex items-center gap-2 text-sm text-[#f3ece0]/70"><span className="text-[#c8a24a]">✦</span> {s}</li>)}
                </ul>
                <div className="mt-5 flex items-center justify-between">
                  <div><div className="text-[0.6rem] uppercase tracking-[0.2em] text-[#f3ece0]/40">From</div><div className="font-display text-2xl text-gold">₹{r.price.toLocaleString("en-IN")}</div></div>
                  <button onClick={onReserve} className="btn-gold-ghost rounded-full px-5 py-2.5 text-sm">Enquire</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
