"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/vivi/PageFrame";
import PageHero from "@/components/vivi/PageHero";
import { useBooking } from "@/components/vivi/BookingProvider";
import { Reveal } from "@/components/ui";
import { IMG } from "@/data/vivi";
import { EVENTS, EVENT_CATS } from "@/data/experiences";

const ACCENT = "#8b5cf6";

export default function EventsPage() {
  return <PageFrame><EventsContent /></PageFrame>;
}

function EventsContent() {
  const { openBooking } = useBooking();
  const [cat, setCat] = useState("All");
  const list = useMemo(() => (cat === "All" ? EVENTS : EVENTS.filter((e) => e.cat === cat)), [cat]);

  return (
    <>
      <PageHero img="1514525253161-7a46d19cd819" kicker="What's On" titleTop="Evenings to" titleBottom="Remember"
        subtitle="Rare wine dinners, rooftop jazz, chef's tables and grand galas — a living calendar of moments, booked months in advance."
        accent={ACCENT} shape="torus" scrollTo="#calendar"
        primary={{ label: "Reserve an Event", onClick: () => openBooking("table") }} secondary={{ label: "See Calendar" }} />
      <div id="page-body" />

      <section id="calendar" className="relative bg-base py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><span className="overline" style={{ color: ACCENT }}>The Calendar</span></Reveal>
              <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-7xl">Upcoming at <span className="italic" style={{ color: ACCENT }}>VIVI</span></h2></Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-2">
                {EVENT_CATS.map((c) => (
                  <button key={c} onClick={() => setCat(c)}
                    className={`rounded-full border px-4 py-2 text-xs transition ${cat === c ? "text-white" : "border-white/10 text-silver/55 hover:text-mist"}`}
                    style={cat === c ? { borderColor: ACCENT, background: `${ACCENT}22`, color: ACCENT } : {}}>{c}</button>
                ))}
              </div>
            </Reveal>
          </div>

          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((e) => (
                <motion.article key={e.id} layout initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-panel/40">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={IMG(e.img, 700, 78)} alt={e.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
                    <div className="absolute left-4 top-4 flex flex-col items-center rounded-xl bg-base/60 px-3 py-2 backdrop-blur">
                      <span className="text-[0.6rem] uppercase tracking-wider" style={{ color: ACCENT }}>{e.month}</span>
                      <span className="font-display text-2xl leading-none text-mist">{e.day}</span>
                    </div>
                    <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-wider" style={{ background: `${ACCENT}22`, color: ACCENT }}>{e.tag}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl text-mist">{e.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-silver/60">{e.desc}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                      <span className="text-sm" style={{ color: ACCENT }}>{e.price} <span className="text-silver/40">/ guest</span></span>
                      <button onClick={() => openBooking("table")} className="flex items-center gap-1 rounded-full border border-white/12 px-4 py-2 text-xs text-silver/85 transition hover:text-mist" style={{ borderColor: `${ACCENT}55` }}>Reserve <ArrowUpRight size={13} /></button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
