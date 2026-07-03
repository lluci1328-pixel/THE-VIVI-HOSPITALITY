"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Maximize, ArrowUpRight } from "lucide-react";
import { ROOMS, IMG } from "@/data/vivi";
import { useBooking } from "./BookingProvider";
import { Reveal, Tilt } from "../ui";
import RoomModal from "./RoomModal";

export default function RoomsPreview() {
  const { openBooking } = useBooking();
  const router = useRouter();
  const [active, setActive] = useState(null);
  const featured = ROOMS.slice(0, 6);

  return (
    <section id="rooms" className="relative bg-base py-28 md:py-36">
      <div className="glow-blob" style={{ left: "-8%", top: "30%", width: 460, height: 460, background: "radial-gradient(circle, rgba(46,123,255,0.1), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><span className="overline text-sky">Rooms & Suites</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-7xl">Rest, <span className="text-aurora italic">Reimagined</span></h2></Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-silver/60">Over 100 rooms and suites, each a private world of light, silence and considered comfort.</p>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 0.08}>
              <Tilt max={6}>
                <article className="card-lift group relative overflow-hidden rounded-2xl border border-white/8 bg-panel/40">
                  <div className="relative h-60 overflow-hidden">
                    <Image src={IMG(r.img, 700, 78)} alt={r.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-base via-base/10 to-transparent" />
                    <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-[120%]" />
                    <span className="absolute left-4 top-4 rounded-full bg-base/50 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-sky backdrop-blur">{r.tier}</span>
                    <span className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[0.62rem] ${r.available ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                      {r.available ? "Available" : "Booked"}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-2xl text-mist transition-colors group-hover:text-sky">{r.name}</h3>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-silver/55">
                      <span className="flex items-center gap-1.5"><Maximize size={13} className="text-sky/80" /> {r.size} m²</span>
                      <span className="flex items-center gap-1.5"><Users size={13} className="text-sky/80" /> {r.guests} guests</span>
                      <span>{r.beds}</span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm text-silver/55">{r.desc}</p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                      <div>
                        <span className="font-display text-2xl text-aurora">₹{r.price.toLocaleString("en-IN")}</span>
                        <span className="text-xs text-silver/45"> / night</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setActive(r)} className="rounded-full border border-white/12 px-4 py-2 text-xs text-silver/80 transition hover:border-sky/60 hover:text-mist">Details</button>
                        <button onClick={() => openBooking("room", { roomType: r.name })} className="btn-primary flex items-center gap-1 rounded-full px-4 py-2 text-xs">Book <ArrowUpRight size={13} /></button>
                      </div>
                    </div>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <button onClick={() => router.push("/rooms")} className="btn-ghost rounded-full px-8 py-3.5">View All Rooms &amp; Suites</button>
          </div>
        </Reveal>
      </div>

      <RoomModal room={active} onClose={() => setActive(null)} />
    </section>
  );
}
