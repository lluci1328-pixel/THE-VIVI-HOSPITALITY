"use client";

import Image from "next/image";
import { Heart, Camera, Utensils, Music } from "lucide-react";
import { IMG } from "@/data/vivi";
import { useBooking } from "./BookingProvider";
import { Reveal, Tilt } from "../ui";

const HIGHLIGHTS = [
  { icon: Heart, label: "Up to 800 guests" },
  { icon: Utensils, label: "Bespoke banquet menus" },
  { icon: Camera, label: "In-house cinematography" },
  { icon: Music, label: "Live entertainment" },
];

const GALLERY = ["1519741497674-611481863552", "1465495976277-4387d4b0b4c6", "1511285560929-80b456fea0bc"];

export default function WeddingTeaser() {
  const { openBooking } = useBooking();
  return (
    <section id="weddings" className="relative overflow-hidden bg-base py-28 md:py-36">
      <div className="glow-blob" style={{ right: "-8%", top: "20%", width: 460, height: 460, background: "radial-gradient(circle, rgba(103,232,249,0.1), transparent 70%)" }} />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:pl-[calc(80px+3vw)]">
        {/* gallery collage */}
        <Reveal>
          <div className="grid grid-cols-2 gap-4">
            <Tilt max={7} className="col-span-2">
              <div className="relative h-64 overflow-hidden rounded-2xl border border-white/8">
                <Image src={IMG(GALLERY[0], 800, 78)} alt="Wedding venue" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-base/50 to-transparent" />
              </div>
            </Tilt>
            {GALLERY.slice(1).map((g, i) => (
              <Tilt key={i} max={7}>
                <div className="relative h-44 overflow-hidden rounded-2xl border border-white/8">
                  <Image src={IMG(g, 500, 78)} alt="Wedding decor" fill sizes="20vw" className="object-cover" />
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>

        <div>
          <Reveal><span className="overline text-cyan">Weddings at VIVI</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-6xl">Say <span className="italic" style={{ background: "linear-gradient(110deg,#a5f3fc,#67e8f9,#7cc0ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Forever</span> in Style</h2></Reveal>
          <Reveal delay={0.15}><p className="mt-5 max-w-md text-silver/65">From intimate rooftop vows to 800-guest ballroom galas, our wedding atelier choreographs every moment — décor, cuisine, film and light.</p></Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                  <h.icon size={17} className="text-cyan" /> <span className="text-sm text-silver/80">{h.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => openBooking("wedding")} className="btn-primary rounded-full px-8 py-3.5 text-base" style={{ background: "linear-gradient(120deg,#67e8f9,#7cc0ff)" }}>Plan Your Wedding</button>
              <button onClick={() => { const el = document.querySelector("#gallery"); if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.4 }); }} className="btn-ghost rounded-full px-8 py-3.5 text-base">View Gallery</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
