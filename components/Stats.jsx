"use client";

import { STATS } from "@/data/site";
import { Counter, Reveal } from "./ui";

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-[#08080b] py-20">
      <div className="glow-blob left-1/2 top-0 -translate-x-1/2" style={{
        width: 600, height: 300,
        background: "radial-gradient(circle, rgba(200,162,74,0.10), transparent 70%)",
      }} />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="font-display text-5xl text-gold-gradient md:text-6xl">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.22em] text-cream/50">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
