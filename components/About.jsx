"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "@/data/site";
import { Reveal, SplitWords } from "./ui";

const STORY = [
  "Born from a single candlelit table in 2011,",
  "LLUCI began as a quiet rebellion against the ordinary.",
  "We believe dinner is not a service — it is a performance.",
  "Every plate is composed like a scene. Every flame, intentional.",
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-8%", "14%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-obsidian py-28 md:py-40"
    >
      <div className="glow-blob" style={{
        left: "-10%", top: "20%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(11,18,32,0.9), transparent 70%)",
      }} />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left — storytelling text */}
        <div>
          <Reveal>
            <span className="overline text-gold">Our Story</span>
          </Reveal>
          <h2 className="mt-6 font-display text-4xl leading-tight text-cream md:text-6xl">
            <SplitWords text="A Ritual Of Fire," />
            <span className="block text-gold-gradient italic">
              <SplitWords text="Time & Craft" delay={0.2} />
            </span>
          </h2>

          <div className="mt-10 space-y-5">
            {STORY.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg font-light leading-relaxed text-cream/70 md:text-xl"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-12 flex gap-10">
            <div>
              <div className="font-display text-4xl text-gold-gradient">14</div>
              <div className="mt-1 text-xs uppercase tracking-[0.25em] text-cream/50">
                Years
              </div>
            </div>
            <div>
              <div className="font-display text-4xl text-gold-gradient">40+</div>
              <div className="mt-1 text-xs uppercase tracking-[0.25em] text-cream/50">
                Signature Plates
              </div>
            </div>
            <div>
              <div className="font-display text-4xl text-gold-gradient">1</div>
              <div className="mt-1 text-xs uppercase tracking-[0.25em] text-cream/50">
                Obsession
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — parallax image stack */}
        <div className="relative h-[520px] md:h-[620px]">
          <motion.div
            style={{ y: y1 }}
            className="absolute right-0 top-0 h-[68%] w-[74%] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            data-cursor="image"
          >
            <Image
              src={IMG("1414235077428-338989a2e8c0", 800, 78)}
              alt="Plated course at LLUCI"
              fill
              sizes="(max-width:1024px) 60vw, 30vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-0 left-0 h-[58%] w-[62%] overflow-hidden rounded-2xl border border-gold/20 shadow-2xl"
            data-cursor="image"
          >
            <Image
              src={IMG("1424847651672-bf20a4b0982b", 700, 78)}
              alt="Chef plating"
              fill
              sizes="(max-width:1024px) 55vw, 26vw"
              className="object-cover"
            />
          </motion.div>
          <div className="glass absolute bottom-6 right-4 z-10 rounded-xl px-5 py-4">
            <div className="font-display text-2xl text-cream">“Fire &amp; Patience.”</div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-gold/80">
              — Chef Elena Cruz
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
