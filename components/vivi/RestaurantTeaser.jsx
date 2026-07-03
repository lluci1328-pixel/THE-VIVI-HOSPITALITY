"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { IMG } from "@/data/vivi";
import { useBooking } from "./BookingProvider";
import { Reveal, Particles } from "../ui";

export default function RestaurantTeaser() {
  const { openBooking } = useBooking();
  const router = useRouter();
  const [entering, setEntering] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  // Prefetch the restaurant route so the cinematic transition is instant.
  useEffect(() => { router.prefetch("/restaurant"); }, [router]);

  const enter = () => {
    setEntering(true);
    if (window.__lenis) window.__lenis.stop();
    setTimeout(() => router.push("/restaurant"), 1100);
  };

  return (
    <section id="restaurant" ref={ref} className="relative overflow-hidden bg-black py-28 md:py-40">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <Image src={IMG("1414235077428-338989a2e8c0", 1600, 74)} alt="Lluci" fill sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base" />
      </motion.div>
      <Particles count={30} color="139,92,246" className="z-[1]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
        <div className="max-w-2xl">
          <Reveal><span className="flex items-center gap-2 text-violet"><span className="h-px w-10 bg-violet/60" /><span className="overline">A THE VIVI Signature</span></span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-6xl leading-[0.95] text-white md:text-8xl">
              The <span className="italic" style={{ background: "linear-gradient(110deg,#c4b5fd,#8b5cf6,#6d6ef6)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Lluci</span> Restaurant
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex items-center gap-4 text-sm text-silver/70">
              <span className="flex items-center gap-1"><Star size={14} className="fill-violet text-violet" /> Two Michelin Stars</span>
              <span className="h-4 w-px bg-white/20" /><span>World's 50 Best · #14</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-silver/70">
              Housed within THE VIVI yet a universe of its own — Lluci is a two-Michelin-star theatre of seasonal cuisine, rare wine and table-side fire. Step inside for a completely separate experience.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={enter}
                className="group relative flex items-center gap-3 overflow-hidden rounded-full px-9 py-4 text-base font-medium text-white shadow-[0_12px_40px_-12px_rgba(139,92,246,0.7)]"
                style={{ background: "linear-gradient(120deg,#8b5cf6,#6d6ef6)" }}>
                Enter The Lluci Restaurant
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => openBooking("table")} className="btn-ghost rounded-full px-9 py-4 text-base">Reserve a Table</button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* cinematic cover — camera dive into candlelight before route swap */}
      <AnimatePresence>
        {entering && (
          <motion.div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#0c0906]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.div className="absolute inset-0" initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.6, opacity: 0.8 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
              <Image src={IMG("1517248135467-4c7edcad34c4", 1600, 76)} alt="" fill priority sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(12,9,6,0.92))]" />
            </motion.div>
            <motion.div className="relative z-10 font-display text-6xl tracking-[0.2em] md:text-8xl"
              style={{ background: "linear-gradient(120deg,#e7cd8c,#c8a24a,#9c7a2e)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
              initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              LLUCI
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
