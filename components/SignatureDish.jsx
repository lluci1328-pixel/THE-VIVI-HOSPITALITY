"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Flame, Clock, Star } from "lucide-react";
import { IMG } from "@/data/site";
import { Reveal, Particles } from "./ui";

const INGREDIENTS = [
  { name: "A5 Wagyu", pos: "left-[2%] top-[18%]" },
  { name: "Black Garlic", pos: "right-[4%] top-[12%]" },
  { name: "Périgord Truffle", pos: "left-[0%] bottom-[26%]" },
  { name: "Bone Marrow", pos: "right-[2%] bottom-[20%]" },
];

export default function SignatureDish({ onReserve }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-obsidian via-[#0b0b0f] to-obsidian py-28 md:py-40"
    >
      <Particles count={40} color="224,138,60" />
      {/* huge warm halo behind the plate */}
      <motion.div
        style={{
          y: glowY,
          width: 620,
          height: 620,
          background:
            "radial-gradient(circle, rgba(224,138,60,0.16), transparent 68%)",
        }}
        className="glow-blob left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <span className="overline text-gold">The Signature</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight text-cream md:text-7xl">
            Wagyu A5, <span className="text-gold-gradient italic">Reimagined</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-cream/60">
            Twelve years in refinement. Available for only eight guests each
            evening — plated table-side beneath a veil of applewood smoke.
          </p>
        </Reveal>

        {/* Plate + orbiting ingredients */}
        <div className="relative mx-auto mt-16 h-[380px] w-[380px] md:h-[520px] md:w-[520px]">
          {/* steam */}
          <span className="steam left-[44%]" style={{ animationDelay: "0s" }} />
          <span className="steam left-[52%]" style={{ animationDelay: "1.4s" }} />
          <span className="steam left-[58%]" style={{ animationDelay: "2.8s" }} />

          <motion.div
            style={{ scale, rotate }}
            className="absolute inset-0 overflow-hidden rounded-full border border-gold/25 shadow-[0_50px_140px_-30px_rgba(224,138,60,0.55)]"
            data-cursor="food"
            data-cursor-label="Reserve"
          >
            <Image
              src={IMG("1546964124-0cce460f38ef", 900, 82)}
              alt="Wagyu A5 signature dish"
              fill
              sizes="(max-width:768px) 380px, 520px"
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.22),transparent_50%)]" />
          </motion.div>

          {/* Limited badge */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: -12 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.4 }}
            className="glass-strong absolute -top-4 left-1/2 z-20 -translate-x-1/2 rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold"
          >
            Only 8 Nightly
          </motion.div>

          {INGREDIENTS.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.7 }}
              className={`glass absolute ${ing.pos} z-20 rounded-full px-4 py-2 text-sm text-cream/85`}
            >
              <span className="mr-1 text-gold">✦</span> {ing.name}
            </motion.div>
          ))}
        </div>

        {/* meta + CTA */}
        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-cream/70">
            <span className="flex items-center gap-2">
              <Flame size={16} className="text-gold" /> 620 kcal
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-gold" /> 26 min
            </span>
            <span className="flex items-center gap-2">
              <Star size={16} className="text-gold" /> 5.0 · Chef's Pick
            </span>
            <span className="font-display text-2xl text-gold-gradient">₹4,200</span>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <button
            onClick={onReserve}
            data-cursor="link"
            className="btn-gold mt-10 rounded-full px-9 py-4 text-base"
          >
            Reserve Now
          </button>
        </Reveal>
      </div>
    </section>
  );
}
