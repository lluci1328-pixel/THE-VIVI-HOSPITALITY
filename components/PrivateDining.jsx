"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Sparkles } from "lucide-react";
import { ROOMS, IMG } from "@/data/site";
import { Reveal } from "./ui";

export default function PrivateDining({ onReserve }) {
  return (
    <section id="private" className="relative overflow-hidden bg-obsidian py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="overline text-gold">Private Dining</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-5xl text-cream md:text-7xl">
              Your Own <span className="text-gold-gradient italic">Private World</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-cream/60">
              Three curated spaces for celebrations that deserve total privacy —
              each with a dedicated brigade, sommelier and bespoke menu.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {ROOMS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-white/8"
              data-cursor="image"
            >
              <div className="relative h-[440px] overflow-hidden">
                <Image
                  src={IMG(r.img, 700, 78)}
                  alt={r.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                {/* ambient light that responds to hover */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_30%,rgba(224,138,60,0.22),transparent_60%)]" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-center gap-2 text-xs text-gold">
                  <Users size={14} /> Up to {r.guests} guests
                </div>
                <h3 className="mt-2 font-display text-3xl text-cream">{r.name}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-cream/55">
                  <Sparkles size={13} className="text-gold/70" /> {r.style}
                </div>

                <ul className="mt-4 max-h-0 space-y-1.5 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                  {r.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-cream/70">
                      <span className="text-gold">✦</span> {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/40">
                      From
                    </div>
                    <div className="font-display text-2xl text-gold-gradient">
                      ₹{r.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <button
                    onClick={onReserve}
                    data-cursor="link"
                    className="btn-ghost rounded-full px-5 py-2.5 text-sm"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
