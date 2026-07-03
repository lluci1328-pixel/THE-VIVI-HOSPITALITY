"use client";

import Image from "next/image";
import { Presentation, Users, Wifi, Coffee } from "lucide-react";
import { IMG } from "@/data/vivi";
import { useBooking } from "./BookingProvider";
import { Reveal } from "../ui";

const SPACES = [
  { name: "The Boardroom", cap: "12 seats", img: "1497366216548-37526070297c" },
  { name: "Summit Hall", cap: "60 seats", img: "1517502884422-41eaead166d4" },
  { name: "Grand Auditorium", cap: "220 seats", img: "1505373877841-8d25f7d46678" },
];

const FEATURES = [
  { icon: Presentation, label: "4K AV & stage" },
  { icon: Wifi, label: "Dedicated fibre" },
  { icon: Coffee, label: "Curated catering" },
  { icon: Users, label: "Event concierge" },
];

export default function CorporateTeaser() {
  const { openBooking } = useBooking();
  return (
    <section id="corporate" className="relative overflow-hidden border-y border-white/8 bg-panel/40 py-28 md:py-36">
      <div className="glow-blob" style={{ left: "-8%", bottom: "10%", width: 440, height: 440, background: "radial-gradient(circle, rgba(109,110,246,0.12), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><span className="overline text-indigo">Business & Conferences</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-6xl">Where <span className="text-aurora italic">Deals</span> Are Made</h2></Reveal>
          </div>
          <Reveal delay={0.15}><p className="max-w-sm text-silver/60">Six configurable spaces, enterprise-grade AV and a dedicated events team that runs your day like clockwork.</p></Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SPACES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <div className="card-lift group relative h-72 overflow-hidden rounded-2xl border border-white/8">
                <Image src={IMG(s.img, 700, 78)} alt={s.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.3s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-xs uppercase tracking-[0.16em] text-indigo">{s.cap}</div>
                  <h3 className="mt-1 font-display text-2xl text-mist">{s.name}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:flex-row">
          <div className="flex flex-wrap gap-5">
            {FEATURES.map((f) => (
              <span key={f.label} className="flex items-center gap-2 text-sm text-silver/75"><f.icon size={16} className="text-indigo" /> {f.label}</span>
            ))}
          </div>
          <button onClick={() => openBooking("corporate")} className="btn-primary shrink-0 rounded-full px-8 py-3.5 text-sm" style={{ background: "linear-gradient(120deg,#6d6ef6,#8b5cf6)" }}>Book a Corporate Event</button>
        </div>
      </div>
    </section>
  );
}
