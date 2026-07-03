"use client";

import Image from "next/image";
import { AMENITIES, IMG } from "@/data/vivi";
import { useBooking } from "./BookingProvider";
import { Reveal } from "../ui";

export default function Amenities() {
  const { openBooking } = useBooking();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.4 });
  };

  return (
    <section id="amenities" className="relative bg-base py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
        <div className="mb-14 text-center">
          <Reveal><span className="overline text-sky">The VIVI Life</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-7xl">Everything, <span className="text-aurora italic">Elevated</span></h2></Reveal>
          <Reveal delay={0.15}><p className="mx-auto mt-5 max-w-xl text-silver/60">A subterranean spa, a rooftop infinity pool, a performance gym and a members-style lounge — your day, curated.</p></Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map((a, i) => (
            <Reveal key={a.id} delay={(i % 4) * 0.08}>
              <div className="card-lift group relative h-[420px] overflow-hidden rounded-2xl border border-white/8">
                <Image src={IMG(a.img, 700, 78)} alt={a.name} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 30%, rgba(46,123,255,0.22), transparent 60%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-sky">{a.tag}</span>
                  <h3 className="mt-1 font-display text-2xl text-mist">{a.name}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm text-silver/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">{a.desc}</p>
                  <button
                    onClick={() => (a.id === "spa" ? openBooking("spa") : scrollTo("#gallery"))}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs text-silver/85 transition hover:border-sky hover:text-sky">
                    {a.id === "spa" ? "Book a Ritual" : "Explore"}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
