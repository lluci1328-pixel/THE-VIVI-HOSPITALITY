"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { TESTIMONIALS, IMG } from "@/data/site";
import { Reveal } from "./ui";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#08080b] py-28 md:py-36">
      <div className="glow-blob left-[10%] top-[20%]" style={{
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(200,162,74,0.10), transparent 70%)",
      }} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <Reveal>
            <span className="overline text-gold">In Their Words</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-5xl text-cream md:text-7xl">
              Loved by <span className="text-gold-gradient italic">Connoisseurs</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              animate={{ y: [0, i % 2 ? -8 : 8, 0] }}
              className="glass group relative rounded-2xl p-6"
            >
              <motion.div
                aria-hidden
                animate={{ y: [0, i % 2 ? 10 : -10, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl"
              />
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-cream/80">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-gold/30">
                  <Image
                    src={IMG(t.avatar, 120, 70)}
                    alt={t.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm text-cream">
                    {t.name}
                    <BadgeCheck size={14} className="text-gold" />
                  </div>
                  <div className="text-xs text-cream/45">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
