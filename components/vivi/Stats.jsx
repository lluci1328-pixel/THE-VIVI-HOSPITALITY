"use client";

import { STATS } from "@/data/vivi";
import { Counter, Reveal } from "../ui";

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-panel/40 py-20">
      <div className="glow-blob left-1/2 top-0 -translate-x-1/2" style={{ width: 600, height: 260, background: "radial-gradient(circle, rgba(46,123,255,0.1), transparent 70%)" }} />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 md:grid-cols-4 lg:pl-[calc(80px+3vw)]">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="font-display text-5xl text-aurora md:text-6xl">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-silver/50">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
