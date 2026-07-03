"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Users, Maximize, Star, ArrowUpRight, SlidersHorizontal, Eye } from "lucide-react";
import { ROOMS, ROOM_TIERS, ROOM_VIEWS, IMG } from "@/data/vivi";
import { useBooking } from "../BookingProvider";
import { Tilt } from "../../ui";
import RoomModal from "../RoomModal";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · Low to High" },
  { id: "price-desc", label: "Price · High to Low" },
  { id: "rating", label: "Top Rated" },
  { id: "size", label: "Largest" },
];

export default function RoomsExplorer() {
  const { openBooking } = useBooking();
  const [tier, setTier] = useState("All");
  const [view, setView] = useState("Any");
  const [sort, setSort] = useState("featured");
  const [onlyAvail, setOnlyAvail] = useState(false);
  const [active, setActive] = useState(null);

  const rooms = useMemo(() => {
    let list = ROOMS.filter((r) => (tier === "All" || r.tier === tier) && (view === "Any" || r.view === view) && (!onlyAvail || r.available));
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "size": list = [...list].sort((a, b) => b.size - a.size); break;
      default: break;
    }
    return list;
  }, [tier, view, sort, onlyAvail]);

  return (
    <section id="room-grid" className="relative bg-base py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
        {/* Filter bar */}
        <div className="sticky top-3 z-30 mb-10 rounded-2xl border border-white/8 bg-panel/70 p-4 backdrop-blur-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal size={16} className="mr-1 text-sky" />
            {ROOM_TIERS.map((t) => (
              <button key={t} onClick={() => setTier(t)}
                className={`relative rounded-full px-4 py-2 text-xs transition-all duration-400 ${tier === t ? "text-white" : "text-silver/60 hover:text-mist"}`}>
                {tier === t && <motion.span layoutId="tier-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-electric to-azure" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-white/6 pt-3">
            <label className="flex items-center gap-2 text-xs text-silver/60">
              <Eye size={13} className="text-sky" /> View
              <select value={view} onChange={(e) => setView(e.target.value)} className="rounded-lg border border-white/12 bg-panel px-3 py-1.5 text-xs text-mist outline-none focus:border-sky/60">
                {ROOM_VIEWS.map((v) => <option key={v}>{v}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-2 text-xs text-silver/60">
              Sort
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-white/12 bg-panel px-3 py-1.5 text-xs text-mist outline-none focus:border-sky/60">
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
            <button onClick={() => setOnlyAvail((v) => !v)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${onlyAvail ? "border-sky bg-sky/15 text-sky" : "border-white/12 text-silver/60 hover:border-sky/50"}`}>
              <span className={`h-2 w-2 rounded-full ${onlyAvail ? "bg-sky" : "bg-white/25"}`} /> Available only
            </button>
            <span className="ml-auto text-xs text-silver/50">{rooms.length} of {ROOMS.length} room types</span>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rooms.map((r) => (
              <motion.article key={r.id} layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <Tilt max={6}>
                  <div className="card-lift group relative overflow-hidden rounded-2xl border border-white/8 bg-panel/40">
                    <div className="relative h-56 overflow-hidden">
                      <Image src={IMG(r.img, 700, 78)} alt={r.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/10 to-transparent" />
                      <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-[120%]" />
                      <span className="absolute left-4 top-4 rounded-full bg-base/50 px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-sky backdrop-blur">{r.tier}</span>
                      <span className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[0.6rem] ${r.available ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>{r.available ? "Available" : "Booked"}</span>
                      <span className="absolute bottom-3 right-4 flex items-center gap-1 rounded-full bg-base/50 px-2.5 py-1 text-[0.65rem] text-mist backdrop-blur"><Star size={11} className="fill-sky text-sky" /> {r.rating}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-2xl text-mist transition-colors group-hover:text-sky">{r.name}</h3>
                        <span className="mt-1 shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-silver/60">{r.view}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-silver/55">
                        <span className="flex items-center gap-1.5"><Maximize size={13} className="text-sky/80" /> {r.size} m²</span>
                        <span className="flex items-center gap-1.5"><Users size={13} className="text-sky/80" /> {r.guests}</span>
                        <span>{r.beds}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                        <div><span className="font-display text-2xl text-aurora">₹{r.price.toLocaleString("en-IN")}</span><span className="text-xs text-silver/45"> / night</span></div>
                        <div className="flex gap-2">
                          <button onClick={() => setActive(r)} className="rounded-full border border-white/12 px-4 py-2 text-xs text-silver/80 transition hover:border-sky/60 hover:text-mist">Details</button>
                          <button onClick={() => openBooking("room", { roomType: r.name })} className="btn-primary flex items-center gap-1 rounded-full px-4 py-2 text-xs">Book <ArrowUpRight size={13} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {rooms.length === 0 && (
          <div className="py-20 text-center text-silver/50">
            No rooms match these filters.
            <button onClick={() => { setTier("All"); setView("Any"); setOnlyAvail(false); }} className="ml-2 text-sky underline">Reset filters</button>
          </div>
        )}
      </div>

      <RoomModal room={active} onClose={() => setActive(null)} />
    </section>
  );
}
