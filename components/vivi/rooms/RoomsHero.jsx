"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { IMG } from "@/data/vivi";
import { useBooking } from "../BookingProvider";
import { Magnetic, Particles, SplitWords } from "../../ui";

export default function RoomsHero() {
  const { openBooking } = useBooking();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="rooms-top" className="relative flex min-h-[82vh] items-center overflow-hidden">
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 z-0">
        <Image src={IMG("1618773928121-c32242e63f39", 1920, 76)} alt="THE VIVI suite" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-base/70 via-base/40 to-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/85 via-base/20 to-transparent" />
      </motion.div>

      <motion.div className="glow-blob z-[1]" style={{ left: "8%", top: "20%", width: 440, height: 440, background: "radial-gradient(circle, rgba(46,123,255,0.2), transparent 70%)" }}
        animate={{ opacity: [0.4, 0.65, 0.4] }} transition={{ duration: 7, repeat: Infinity }} />
      <Particles count={40} className="z-[2]" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full pl-6 pr-6 lg:pl-[calc(80px+5vw)] lg:pr-16">
        <div className="max-w-3xl">
          <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }} className="overline text-sky">
            Rooms &amp; Suites · 100+ Sanctuaries
          </motion.span>
          <h1 className="mt-5 font-display text-[13vw] leading-[0.94] text-mist sm:text-7xl md:text-8xl lg:text-[6rem]">
            <SplitWords text="Rest," className="block" delay={0.3} />
            <span className="block text-aurora italic"><SplitWords text="Reimagined" delay={0.45} /></span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}
            className="mt-7 max-w-xl text-base font-light leading-relaxed text-silver/70 md:text-lg">
            From city-view signature rooms to beachfront villas and two-storey penthouses — twenty-four ways to feel completely, quietly at home.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1 }} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Magnetic strength={0.3}>
              <button onClick={() => openBooking("room")} className="btn-primary shimmer-border rounded-full px-9 py-4 text-base">Check Availability</button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button onClick={() => { const el = document.querySelector("#room-grid"); if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.3 }); }}
                className="btn-ghost rounded-full px-9 py-4 text-base">Browse All Rooms</button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.button onClick={() => { const el = document.querySelector("#room-grid"); if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.3 }); }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-silver/50">
        <span className="overline text-[0.6rem]">Explore</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}><ChevronDown size={18} className="text-sky" /></motion.span>
      </motion.button>
    </section>
  );
}
