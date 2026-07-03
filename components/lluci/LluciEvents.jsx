"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { EVENTS, IMG } from "@/data/lluci";
import { Reveal } from "../ui";

export default function LluciEvents({ onReserve }) {
  return (
    <section id="events" className="relative overflow-hidden bg-[#0c0906] py-28 md:py-36">
      <div className="glow-blob" style={{ left: "-6%", top: "10%", width: 420, height: 420, background: "radial-gradient(circle, rgba(200,162,74,0.1), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><span className="overline-gold">What's On</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-[#f3ece0] md:text-7xl">Evenings <span className="text-gold italic">to Remember</span></h2></Reveal>
          </div>
          <Reveal delay={0.15}><p className="max-w-sm text-[#f3ece0]/60">Limited-seat wine dinners, chef's tables and tastings — booked months in advance.</p></Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {EVENTS.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.1}>
              <div className="card-lift-gold group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#c8a24a]/10 bg-[#17110a]/30">
                <div className="relative h-52 overflow-hidden">
                  <Image src={IMG(e.img, 700, 78)} alt={e.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.3s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17110a] to-transparent" />
                  <div className="glass-gold absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-[#c8a24a]"><CalendarDays size={13} /> {e.date}</div>
                  <span className="absolute right-4 top-4 rounded-full bg-[#c8a24a]/20 px-3 py-1 text-[0.6rem] uppercase tracking-wider text-[#e7cd8c]">{e.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl text-[#f3ece0]">{e.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-[#f3ece0]/60">{e.desc}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#c8a24a]/10 pt-4">
                    <span className="text-sm text-gold">{e.price}</span>
                    <button onClick={onReserve} className="flex items-center gap-1 rounded-full border border-[#c8a24a]/20 px-4 py-2 text-xs text-[#f3ece0]/85 transition hover:border-[#c8a24a] hover:text-[#c8a24a]">Reserve <ArrowUpRight size={13} /></button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
