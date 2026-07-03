"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, BadgeCheck, Quote } from "lucide-react";
import { REVIEWS, IMG } from "@/data/lluci";
import { Reveal } from "../ui";

export default function LluciReviews() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-[#0c0906] py-28 md:py-36">
      <div className="glow-blob left-[12%] top-[20%]" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(200,162,74,0.1), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <Reveal><span className="overline-gold">In Their Words</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-[#f3ece0] md:text-7xl">Loved by <span className="text-gold italic">Connoisseurs</span></h2></Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((t, i) => (
            <motion.figure key={t.id} initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-gold card-lift-gold relative rounded-2xl p-7">
              <Quote size={28} className="text-[#c8a24a]/30" />
              <div className="mt-2 flex gap-0.5">{Array.from({ length: t.rating }).map((_, s) => <Star key={s} size={14} className="fill-[#c8a24a] text-[#c8a24a]" />)}</div>
              <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-[#f3ece0]/85">“{t.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#c8a24a]/30"><Image src={IMG(t.avatar, 120, 70)} alt={t.name} fill sizes="48px" className="object-cover" /></div>
                <div>
                  <div className="flex items-center gap-1 text-sm text-[#f3ece0]">{t.name} <BadgeCheck size={14} className="text-[#c8a24a]" /></div>
                  <div className="text-xs text-[#f3ece0]/45">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
