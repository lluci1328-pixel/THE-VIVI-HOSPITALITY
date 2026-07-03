"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "@/data/site";
import { Particles, SplitWords, Magnetic } from "./ui";

export default function FinalCTA({ onReserve }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src={IMG("1550966871-3ed3cdb5ed0c", 1920, 74)}
          alt="LLUCI ambience"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,6,0.9))]" />
      </motion.div>

      <Particles count={40} className="z-[1]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overline text-gold"
        >
          The Invitation
        </motion.span>
        <h2 className="mt-6 font-display text-5xl leading-[1.02] text-cream md:text-8xl">
          <SplitWords text="Your Next Unforgettable" className="block" />
          <span className="block text-gold-gradient italic">
            <SplitWords text="Dinner Begins Here" delay={0.2} />
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-8 max-w-lg text-cream/65"
        >
          A table at LLUCI is more than a reservation — it is the beginning of a
          story you'll tell for years.
        </motion.p>
        <Magnetic strength={0.3} className="mt-11 inline-block">
          <button
            onClick={onReserve}
            data-cursor="link"
            className="btn-gold shimmer-border rounded-full px-12 py-5 text-lg"
          >
            Reserve Your Table
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
