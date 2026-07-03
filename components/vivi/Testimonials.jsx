"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { TESTIMONIALS, IMG } from "@/data/vivi";
import { Reveal } from "../ui";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-base py-28 md:py-36">
      <div className="glow-blob left-[12%] top-[20%]" style={{ width: 380, height: 380, background: "radial-gradient(circle, rgba(46,123,255,0.08), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
        <div className="mb-16 text-center">
          <Reveal><span className="overline text-sky">Guest Stories</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-7xl">Loved by the <span className="text-aurora italic">World's Travellers</span></h2></Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure key={t.id}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card card-lift rounded-2xl p-7">
              <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, s) => <Star key={s} size={15} className="fill-sky text-sky" />)}</div>
              <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-silver/85">“{t.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-sky/30">
                  <Image src={IMG(t.avatar, 120, 70)} alt={t.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm text-mist">{t.name} <BadgeCheck size={14} className="text-sky" /></div>
                  <div className="text-xs text-silver/45">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
