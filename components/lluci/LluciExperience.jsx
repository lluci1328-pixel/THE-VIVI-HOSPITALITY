"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMG, EXPERIENCE_STEPS } from "@/data/lluci";
import { Reveal, Particles } from "../ui";

export default function LluciExperience({ onReserve }) {
  return (
    <section id="experience" className="relative overflow-hidden bg-gradient-to-b from-[#0c0906] via-[#120b06] to-[#0c0906] py-28 md:py-40">
      <Particles count={34} color="224,138,60" />
      <div className="glow-blob left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 620, height: 620, background: "radial-gradient(circle, rgba(224,138,60,0.12), transparent 68%)" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <Reveal><span className="overline-gold">The Signature Experience</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-5 font-display text-5xl leading-tight text-[#f3ece0] md:text-7xl">An Evening in <span className="text-gold italic">Four Acts</span></h2></Reveal>
          <Reveal delay={0.15}><p className="mt-5 text-[#f3ece0]/60">The nine-course Discovery Menu unfolds over three unhurried hours — a piece of theatre plated for you alone.</p></Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCE_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-[#c8a24a]/12 bg-[#17110a]/40 p-7 card-lift-gold">
                <div className="font-display text-6xl text-[#c8a24a]/25 transition-colors group-hover:text-[#c8a24a]/50">{s.n}</div>
                <h3 className="mt-4 font-display text-2xl text-[#f3ece0]">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#f3ece0]/60">{s.text}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-[#c8a24a]/40 to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* immersive band */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid items-center gap-8 overflow-hidden rounded-3xl border border-[#c8a24a]/12 bg-[#17110a]/40 md:grid-cols-2">
            <div className="relative h-72 md:h-full md:min-h-[300px]">
              <Image src={IMG("1600891964599-f61ba0e24092", 800, 78)} alt="Discovery menu" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#17110a]" />
            </div>
            <div className="p-8 md:p-10">
              <div className="overline-gold">The Discovery Menu</div>
              <h3 className="mt-3 font-display text-4xl text-[#f3ece0]">Nine Courses · Three Hours</h3>
              <p className="mt-4 text-[#f3ece0]/65">A guided journey through Elena's kitchen, with an optional sommelier pairing of rare vintages chosen for each plate.</p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div><div className="font-display text-3xl text-gold">₹9,500</div><div className="text-xs uppercase tracking-wider text-[#f3ece0]/45">per guest</div></div>
                <div><div className="font-display text-3xl text-gold">+₹6,000</div><div className="text-xs uppercase tracking-wider text-[#f3ece0]/45">wine pairing</div></div>
                <button onClick={onReserve} className="btn-gold rounded-full px-7 py-3 text-sm">Reserve the Experience</button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
