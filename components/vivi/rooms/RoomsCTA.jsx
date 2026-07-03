"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wifi, Car, Coffee, Dumbbell, Waves, Sparkles } from "lucide-react";
import { IMG } from "@/data/vivi";
import { useBooking } from "../BookingProvider";
import { Reveal, Particles } from "../../ui";

const PERKS = [
  { icon: Coffee, label: "Daily gourmet breakfast" },
  { icon: Wifi, label: "Fibre Wi-Fi throughout" },
  { icon: Car, label: "Complimentary valet" },
  { icon: Waves, label: "Infinity pool & spa access" },
  { icon: Dumbbell, label: "24h performance gym" },
  { icon: Sparkles, label: "Nightly turndown ritual" },
];

export default function RoomsCTA() {
  const { openBooking } = useBooking();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative flex min-h-[80vh] items-center overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image src={IMG("1582719478250-c89cae4dc85b", 1920, 74)} alt="THE VIVI suite terrace" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-base/78" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,6,13,0.9))]" />
      </motion.div>
      <Particles count={34} className="z-[1]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:pl-[calc(80px+3vw)]">
        <Reveal><span className="overline text-sky">Every Stay Includes</span></Reveal>
        <Reveal delay={0.1}><h2 className="mt-5 font-display text-5xl leading-tight text-mist md:text-7xl">More Than a Room — <span className="text-aurora italic">a Sanctuary</span></h2></Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
          {PERKS.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.06}>
              <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left backdrop-blur-sm">
                <p.icon size={18} className="shrink-0 text-sky" />
                <span className="text-sm text-silver/80">{p.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <button onClick={() => openBooking("room")} className="btn-primary shimmer-border mt-12 rounded-full px-11 py-5 text-lg">Reserve Your Stay</button>
        </Reveal>
      </div>
    </section>
  );
}
