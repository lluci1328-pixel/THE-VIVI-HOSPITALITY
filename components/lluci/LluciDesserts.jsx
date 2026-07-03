"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { MENU, IMG } from "@/data/lluci";
import { Reveal, Particles } from "../ui";

export default function LluciDesserts({ onReserve }) {
  const desserts = MENU.filter((m) => m.category === "Desserts");
  const feature = desserts.find((d) => d.id === "m6") || desserts[0];
  const rest = desserts.filter((d) => d.id !== feature.id);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.08]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section id="desserts" ref={ref} className="relative overflow-hidden bg-gradient-to-b from-[#0c0906] via-[#120b06] to-[#0c0906] py-28 md:py-36">
      <Particles count={30} color="231,205,140" />
      <div className="glow-blob left-1/2 top-1/3 -translate-x-1/2" style={{ width: 520, height: 520, background: "radial-gradient(circle, rgba(224,138,60,0.14), transparent 68%)" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <Reveal><span className="overline-gold">The Finale</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-[#f3ece0] md:text-7xl">Sweet <span className="text-gold italic">Theatre</span></h2></Reveal>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* feature — gold sphere */}
          <div className="relative mx-auto h-[360px] w-[360px] md:h-[440px] md:w-[440px]">
            <span className="steam" style={{ left: "44%", bottom: "58%", animationDelay: "0s" }} />
            <span className="steam" style={{ left: "54%", bottom: "58%", animationDelay: "1.6s" }} />
            <motion.div style={{ scale, rotate }} className="absolute inset-0 overflow-hidden rounded-full border border-[#c8a24a]/25 shadow-[0_50px_140px_-30px_rgba(224,138,60,0.55)]">
              <Image src={IMG(feature.photo, 800, 82)} alt={feature.name} fill sizes="(max-width:768px) 360px, 440px" className="object-cover" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.22),transparent_50%)]" />
            </motion.div>
            <motion.div initial={{ scale: 0, rotate: -20 }} whileInView={{ scale: 1, rotate: -10 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.3 }}
              className="glass-gold absolute -top-2 left-1/2 z-20 -translate-x-1/2 rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#c8a24a]">Poured Table-Side</motion.div>
          </div>

          <div>
            <Reveal><div className="flex items-center gap-2 text-[#c8a24a]"><Star size={14} className="fill-[#c8a24a]" /> <span className="overline-gold">Signature Dessert</span></div></Reveal>
            <Reveal delay={0.1}><h3 className="mt-4 font-display text-5xl text-[#f3ece0]">{feature.name}</h3></Reveal>
            <Reveal delay={0.15}><p className="mt-4 max-w-md text-lg text-[#f3ece0]/65">{feature.desc}</p></Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 flex items-center gap-6">
                <div className="font-display text-3xl text-gold">₹{feature.price.toLocaleString("en-IN")}</div>
                <button onClick={onReserve} className="btn-gold rounded-full px-7 py-3 text-sm">Reserve to Taste</button>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {rest.map((d, i) => (
                <Reveal key={d.id} delay={i * 0.1}>
                  <div className="flex gap-4 rounded-2xl border border-[#c8a24a]/10 bg-[#17110a]/40 p-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl"><Image src={IMG(d.photo, 200, 78)} alt={d.name} fill sizes="80px" className="object-cover" /></div>
                    <div>
                      <h4 className="font-display text-xl text-[#f3ece0]">{d.name}</h4>
                      <p className="mt-1 line-clamp-2 text-xs text-[#f3ece0]/55">{d.desc}</p>
                      <div className="mt-1 text-sm text-gold">₹{d.price.toLocaleString("en-IN")}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
