"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Users, Maximize, BedDouble, Check, ChevronLeft, ChevronRight, Star, Eye, Building2 } from "lucide-react";
import { IMG } from "@/data/vivi";
import { useBooking } from "./BookingProvider";

export default function RoomModal({ room, onClose }) {
  const { openBooking } = useBooking();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!room) return;
    setIdx(0);
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [room, onClose]);

  const gallery = room?.gallery || (room ? [room.img] : []);

  return (
    <AnimatePresence>
      {room && (
        <motion.div className="fixed inset-0 z-[96] flex items-start justify-center overflow-y-auto p-3 py-6 md:items-center md:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="fixed inset-0 bg-base/85 backdrop-blur-2xl" onClick={onClose} />
          <motion.div role="dialog" aria-modal="true" aria-label={room.name}
            initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative z-10 my-auto grid w-full max-w-5xl overflow-hidden rounded-3xl lg:grid-cols-2">
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-30 rounded-full border border-white/15 bg-base/50 p-2.5 text-mist hover:border-sky hover:text-sky"><X size={18} /></button>

            {/* gallery */}
            <div className="relative h-72 lg:h-auto">
              <AnimatePresence mode="wait">
                <motion.div key={idx} className="absolute inset-0" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                  <Image src={IMG(gallery[idx], 1000, 80)} alt={room.name} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
              {gallery.length > 1 && (
                <>
                  <button onClick={() => setIdx((i) => (i - 1 + gallery.length) % gallery.length)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-base/40 p-2 text-mist hover:border-sky"><ChevronLeft size={18} /></button>
                  <button onClick={() => setIdx((i) => (i + 1) % gallery.length)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-base/40 p-2 text-mist hover:border-sky"><ChevronRight size={18} /></button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {gallery.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-sky" : "w-1.5 bg-white/40"}`} />)}
                  </div>
                </>
              )}
              <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs ${room.available ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                {room.available ? "Available" : "Fully Booked"}
              </span>
            </div>

            {/* details */}
            <div className="max-h-[85vh] overflow-y-auto p-7 md:p-9">
              <span className="overline text-sky">{room.tier}</span>
              <h3 className="mt-2 font-display text-4xl text-mist">{room.name}</h3>
              {(room.rating || room.view || room.floor) && (
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-silver/60">
                  {room.rating != null && <span className="flex items-center gap-1"><Star size={12} className="fill-sky text-sky" /> {room.rating}</span>}
                  {room.view && <span className="flex items-center gap-1"><Eye size={12} className="text-sky/80" /> {room.view} view</span>}
                  {room.floor && <span className="flex items-center gap-1"><Building2 size={12} className="text-sky/80" /> Floor {room.floor}</span>}
                </div>
              )}
              <p className="mt-3 text-sm leading-relaxed text-silver/65">{room.desc}</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Stat icon={<Maximize size={15} />} label="Size" value={`${room.size} m²`} />
                <Stat icon={<Users size={15} />} label="Guests" value={room.guests} />
                <Stat icon={<BedDouble size={15} />} label="Beds" value={room.beds} />
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase tracking-[0.2em] text-silver/45">Amenities</div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {room.amenities.map((a) => (
                    <span key={a} className="flex items-center gap-2 text-sm text-silver/75"><Check size={14} className="text-sky" /> {a}</span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-silver/45">Per night</div>
                  <div className="font-display text-3xl text-aurora">₹{room.price.toLocaleString("en-IN")}</div>
                </div>
                <button onClick={() => { onClose(); openBooking("room", { roomType: room.name }); }}
                  disabled={!room.available}
                  className="btn-primary rounded-full px-8 py-3.5 text-sm disabled:opacity-50">
                  {room.available ? "Book This Room" : "Join Waitlist"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center">
      <div className="flex justify-center text-sky">{icon}</div>
      <div className="mt-1.5 text-sm text-mist">{value}</div>
      <div className="text-[0.6rem] uppercase tracking-[0.14em] text-silver/40">{label}</div>
    </div>
  );
}
