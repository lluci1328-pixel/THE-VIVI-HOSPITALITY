"use client";

import Image from "next/image";
import { IMG, COCKTAILS } from "@/data/lluci";
import { Reveal, Tilt } from "../ui";

export default function LluciCocktails() {
  return (
    <section id="cocktails" className="relative bg-[#0c0906] py-28 md:py-36">
      <div className="glow-blob" style={{ right: "-6%", top: "20%", width: 420, height: 420, background: "radial-gradient(circle, rgba(224,138,60,0.1), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <Reveal><span className="overline-gold">The Bar</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-[#f3ece0] md:text-7xl">Liquid <span className="text-gold italic">Alchemy</span></h2></Reveal>
          <Reveal delay={0.15}><p className="mx-auto mt-5 max-w-xl text-[#f3ece0]/60">Signature cocktails built like courses — smoke, gold and hand-carved ice, mixed table-side.</p></Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COCKTAILS.map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 0.08}>
              <Tilt max={7}>
                <div className="group relative h-[420px] overflow-hidden rounded-2xl border border-[#c8a24a]/10 card-lift-gold">
                  <Image src={IMG(c.img, 600, 78)} alt={c.name} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0906] via-[#0c0906]/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl text-[#f3ece0]">{c.name}</h3>
                      <span className="font-display text-xl text-gold">₹{c.price}</span>
                    </div>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm text-[#f3ece0]/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">{c.note}</p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
