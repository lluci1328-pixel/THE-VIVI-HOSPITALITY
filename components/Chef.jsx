"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";
import { AWARDS, IMG } from "@/data/site";
import { Reveal, Counter, SplitWords } from "./ui";

const PHILOSOPHY = [
  "I do not cook to feed. I cook to stop time.",
  "A guest should forget the world for three hours.",
  "Perfection is quiet. It never announces itself.",
];

export default function Chef() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Portrait emerges from darkness.
  const imgOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0.15, 1]);
  const imgScale = useTransform(scrollYProgress, [0.1, 0.6], [1.15, 1]);
  const veil = useTransform(scrollYProgress, [0.1, 0.55], [0.9, 0]);

  return (
    <section id="chef" ref={ref} className="relative overflow-hidden bg-obsidian py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* Portrait from darkness */}
        <div className="relative order-2 h-[560px] overflow-hidden rounded-3xl border border-white/10 lg:order-1">
          <motion.div style={{ opacity: imgOpacity, scale: imgScale }} className="absolute inset-0" data-cursor="image">
            <Image
              src={IMG("1577219491135-ce391730fb2c", 900, 80)}
              alt="Chef Elena Cruz portrait"
              fill
              sizes="(max-width:1024px) 100vw, 45vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-obsidian" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, pathLength: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute bottom-8 left-8"
          >
            <div className="font-display text-4xl italic text-cream/90">Elena Cruz</div>
            <div className="mt-1 text-xs uppercase tracking-[0.3em] text-gold/80">
              Executive Chef · Founder
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="overline text-gold">The Visionary</span>
          </Reveal>
          <h2 className="mt-5 font-display text-5xl leading-tight text-cream md:text-6xl">
            <SplitWords text="The Hands Behind" />
            <span className="block text-gold-gradient italic">
              <SplitWords text="Every Flame" delay={0.15} />
            </span>
          </h2>

          <div className="mt-8 space-y-4">
            {PHILOSOPHY.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="border-l border-gold/30 pl-5 text-lg font-light italic text-cream/70"
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Counters */}
          <div className="mt-10 flex gap-10">
            <div>
              <div className="font-display text-5xl text-gold-gradient">
                <Counter value={27} suffix="+" />
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/50">Years</div>
            </div>
            <div>
              <div className="font-display text-5xl text-gold-gradient">
                <Counter value={9} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/50">Countries</div>
            </div>
          </div>

          {/* Awards one by one */}
          <div className="mt-10 space-y-3">
            {AWARDS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.14, duration: 0.7 }}
                className="flex items-center gap-4 border-b border-white/8 pb-3"
              >
                <span className="font-display text-2xl text-gold/70">{a.year}</span>
                <div>
                  <div className="text-cream">{a.title}</div>
                  <div className="text-xs text-cream/45">{a.body}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.1}>
            <button
              onClick={() => setOpen(true)}
              data-cursor="link"
              className="btn-ghost mt-10 rounded-full px-8 py-3.5"
            >
              Meet Our Chef
            </button>
          </Reveal>
        </div>
      </div>

      {/* Chef modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-obsidian/85 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong relative z-10 grid max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl md:grid-cols-2"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-obsidian/50 p-2.5 text-cream hover:border-gold hover:text-gold"
              >
                <X size={18} />
              </button>
              <div className="relative h-64 md:h-auto">
                <Image
                  src={IMG("1577219491135-ce391730fb2c", 700, 80)}
                  alt="Chef Elena Cruz"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="overflow-y-auto p-8">
                <span className="overline text-gold/80">Founder &amp; Executive Chef</span>
                <h3 className="mt-2 font-display text-4xl text-cream">Elena Cruz</h3>
                <p className="mt-4 text-sm leading-relaxed text-cream/65">
                  Trained under three-Michelin masters across San Sebastián,
                  Kyoto and Copenhagen, Elena founded LLUCI in 2011 with a single
                  belief: that a meal, done right, can suspend time. Her cooking
                  fuses classical French precision with the restraint of Japanese
                  kaiseki and the fire of her native coast.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-cream/65">
                  Today she leads a brigade of 40, personally plating every
                  Chef's Table service herself — a ritual she has never missed in
                  fourteen years.
                </p>
                <div className="mt-6 font-display text-3xl italic text-gold-gradient">
                  “Fire &amp; Patience.”
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
