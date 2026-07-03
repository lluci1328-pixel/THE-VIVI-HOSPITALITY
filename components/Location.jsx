"use client";

import { motion } from "framer-motion";
import { MapPin, Car, Navigation, Clock, Phone } from "lucide-react";
import { Reveal } from "./ui";

const INFO = [
  { icon: MapPin, label: "Address", value: "1 Aurum Boulevard, Mumbai 400001" },
  { icon: Clock, label: "Hours", value: "Tue–Sun · 6:00 PM – 11:30 PM" },
  { icon: Phone, label: "Reservations", value: "+91 98765 43210" },
  { icon: Car, label: "Valet", value: "Complimentary valet & self-parking" },
];

export default function Location() {
  return (
    <section id="location" className="relative overflow-hidden bg-obsidian py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="overline text-gold">Find Us</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-5xl text-cream md:text-7xl">
              An Address <span className="text-gold-gradient italic">Worth the Journey</span>
            </h2>
          </Reveal>

          <div className="mt-10 space-y-5">
            {INFO.map((i, idx) => (
              <Reveal key={i.label} delay={idx * 0.08}>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold">
                    <i.icon size={17} />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-cream/45">
                      {i.label}
                    </div>
                    <div className="mt-1 text-cream/85">{i.value}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <a
              href="https://maps.google.com/?q=Mumbai"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="btn-gold mt-10 inline-flex items-center gap-2 rounded-full px-8 py-3.5"
            >
              <Navigation size={16} /> Get Directions
            </a>
          </Reveal>
        </div>

        {/* Stylised premium map */}
        <Reveal delay={0.1}>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[#0a0e16]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(11,18,32,1),#060810)]" />
            {/* grid streets */}
            <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
              <defs>
                <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
                  <path d="M46 0H0V46" fill="none" stroke="rgba(200,162,74,0.25)" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* animated route line */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" aria-hidden>
              <motion.path
                d="M40 360 C 120 300, 90 200, 200 190 S 320 120, 340 60"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="10 10"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="routeGrad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9c7a2e" />
                  <stop offset="100%" stopColor="#e7cd8c" />
                </linearGradient>
              </defs>
            </svg>

            {/* destination pin */}
            <motion.div
              initial={{ scale: 0, y: -20 }}
              whileInView={{ scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.4 }}
              className="absolute left-[82%] top-[14%] -translate-x-1/2 -translate-y-full"
            >
              <div className="relative flex flex-col items-center">
                <div className="glass-strong whitespace-nowrap rounded-full px-3 py-1.5 text-xs text-gold">
                  LLUCI
                </div>
                <MapPin size={30} className="mt-1 fill-gold/20 text-gold drop-shadow-[0_0_10px_rgba(200,162,74,0.8)]" />
                <motion.span
                  className="absolute bottom-0 h-3 w-3 rounded-full bg-gold/40"
                  animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* landmarks */}
            <span className="absolute left-[20%] top-[70%] text-[0.6rem] uppercase tracking-widest text-cream/35">◦ Marine Drive</span>
            <span className="absolute left-[55%] top-[35%] text-[0.6rem] uppercase tracking-widest text-cream/35">◦ Opera House</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
