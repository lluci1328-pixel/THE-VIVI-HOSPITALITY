"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";
import { CHEF, IMG } from "@/data/lluci";
import { Reveal, Counter, SplitWords } from "../ui";

export default function LluciChef() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0.15, 1]);
  const imgScale = useTransform(scrollYProgress, [0.1, 0.6], [1.15, 1]);
  const veil = useTransform(scrollYProgress, [0.1, 0.55], [0.9, 0]);

  return (
    <section id="chef" ref={ref} className="relative overflow-hidden bg-[#0c0906] py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <div className="relative order-2 h-[560px] overflow-hidden rounded-3xl border border-[#c8a24a]/12 lg:order-1">
          <motion.div style={{ opacity: imgOpacity, scale: imgScale }} className="absolute inset-0">
            <Image src={IMG(CHEF.portrait, 900, 80)} alt={CHEF.name} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </motion.div>
          <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-[#0c0906]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0906] via-transparent to-transparent" />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 1 }} className="absolute bottom-8 left-8">
            <div className="font-display text-4xl italic text-[#f3ece0]/90">{CHEF.name}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.3em] text-[#c8a24a]/80">{CHEF.title}</div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal><span className="overline-gold">The Visionary</span></Reveal>
          <h2 className="mt-5 font-display text-5xl leading-tight text-[#f3ece0] md:text-6xl">
            <SplitWords text="The Hands Behind" />
            <span className="block text-gold italic"><SplitWords text="Every Flame" delay={0.15} /></span>
          </h2>
          <motion.p initial={{ opacity: 0, x: -24, filter: "blur(6px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="mt-8 border-l border-[#c8a24a]/30 pl-5 text-xl font-light italic text-[#f3ece0]/70">
            “{CHEF.quote}”
          </motion.p>

          <div className="mt-10 flex gap-10">
            {CHEF.stats.map((st) => (
              <div key={st.l}>
                <div className="font-display text-5xl text-gold"><Counter value={st.v} suffix={st.s} /></div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[#f3ece0]/50">{st.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-3">
            {CHEF.awards.map((a, i) => (
              <motion.div key={a.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }}
                className="flex items-center gap-4 border-b border-[#c8a24a]/10 pb-3">
                <span className="font-display text-2xl text-[#c8a24a]/70">{a.year}</span>
                <div><div className="text-[#f3ece0]">{a.title}</div><div className="text-xs text-[#f3ece0]/45">{a.body}</div></div>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.1}><button onClick={() => setOpen(true)} className="btn-gold-ghost mt-10 rounded-full px-8 py-3.5">Meet Our Chef</button></Reveal>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[95] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-[#0c0906]/88 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-gold relative z-10 grid max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl md:grid-cols-2">
              <button onClick={() => setOpen(false)} aria-label="Close" className="absolute right-4 top-4 z-20 rounded-full border border-[#c8a24a]/20 bg-[#0c0906]/50 p-2.5 text-[#f3ece0] hover:border-[#c8a24a]"><X size={18} /></button>
              <div className="relative h-64 md:h-auto"><Image src={IMG(CHEF.portrait, 700, 80)} alt={CHEF.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" /></div>
              <div className="overflow-y-auto p-8">
                <span className="overline-gold">{CHEF.title}</span>
                <h3 className="mt-2 font-display text-4xl text-[#f3ece0]">{CHEF.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#f3ece0]/65">{CHEF.bio}</p>
                <div className="mt-6 font-display text-3xl italic text-gold">“Fire &amp; Patience.”</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
