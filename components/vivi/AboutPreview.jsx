"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { AWARDS, IMG } from "@/data/vivi";
import { Reveal, SplitWords } from "../ui";

const TIMELINE = [
  { year: "2007", text: "THE VIVI opens its doors with 40 rooms and a single restaurant." },
  { year: "2014", text: "The subterranean spa and rooftop infinity pool are unveiled." },
  { year: "2019", text: "Lluci earns its first Michelin star; the penthouse floor is added." },
  { year: "2025", text: "Named World's Leading Luxury Hotel with 100+ suites and villas." },
];

export default function AboutPreview() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden border-y border-white/8 bg-panel/40 py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:pl-[calc(80px+3vw)]">
        <div>
          <Reveal><span className="overline text-sky">About THE VIVI</span></Reveal>
          <h2 className="mt-5 font-display text-5xl leading-tight text-mist md:text-6xl">
            <SplitWords text="A Modern Icon" />
            <span className="block text-aurora italic"><SplitWords text="of Hospitality" delay={0.15} /></span>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-md text-lg font-light leading-relaxed text-silver/70">
              Born from a belief that luxury is not excess but intention, THE VIVI is a living landmark — architecture, cuisine and service composed into a single, seamless art form.
            </p>
          </Reveal>

          {/* timeline */}
          <div className="mt-10 space-y-5">
            {TIMELINE.map((t, i) => (
              <motion.div key={t.year}
                initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="font-display text-xl text-sky">{t.year}</span>
                  {i < TIMELINE.length - 1 && <span className="mt-1 h-full w-px bg-gradient-to-b from-sky/40 to-transparent" />}
                </div>
                <p className="pb-4 text-sm text-silver/65">{t.text}</p>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-3">
              {AWARDS.map((a) => (
                <div key={a.title} className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                  <div className="text-sm text-mist">{a.title}</div>
                  <div className="text-[0.65rem] uppercase tracking-wider text-silver/45">{a.year} · {a.body}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* parallax images */}
        <div className="relative h-[560px]">
          <motion.div style={{ y: y1 }} className="absolute right-0 top-0 h-[64%] w-[72%] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image src={IMG("1566073771259-6a8506099945", 800, 78)} alt="THE VIVI facade" fill sizes="35vw" className="object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 h-[56%] w-[60%] overflow-hidden rounded-3xl border border-sky/20 shadow-2xl">
            <Image src={IMG("1465101046530-73398c7f28ca", 700, 78)} alt="Grand interior" fill sizes="30vw" className="object-cover" />
          </motion.div>
          <div className="glass absolute bottom-8 right-6 z-10 rounded-2xl px-5 py-4">
            <div className="font-display text-3xl text-aurora">18</div>
            <div className="text-xs uppercase tracking-[0.18em] text-silver/55">Years of Excellence</div>
          </div>
        </div>
      </div>
    </section>
  );
}
