"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { IMG } from "@/data/lluci";
import { Magnetic, Particles, SplitWords } from "../ui";

export default function LluciHero({ onReserve }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 z-0">
        <Image src={IMG("1517248135467-4c7edcad34c4", 1920, 76)} alt="Lluci dining room" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0906]/75 via-[#0c0906]/55 to-[#0c0906]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(12,9,6,0.85)_100%)]" />
      </motion.div>

      <motion.div className="glow-blob z-[1]" style={{ left: "12%", top: "22%", width: 440, height: 440, background: "radial-gradient(circle, rgba(224,138,60,0.2), transparent 70%)" }}
        animate={{ opacity: [0.35, 0.6, 0.35] }} transition={{ duration: 6, repeat: Infinity }} />
      <motion.div className="glow-blob z-[1]" style={{ right: "10%", bottom: "14%", width: 400, height: 400, background: "radial-gradient(circle, rgba(200,162,74,0.16), transparent 70%)" }}
        animate={{ opacity: [0.5, 0.25, 0.5] }} transition={{ duration: 7, repeat: Infinity }} />

      <Particles count={52} color="200,162,74" className="z-[2]" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className="mb-7 flex items-center gap-3">
          <span className="h-px w-10 bg-[#c8a24a]/60" />
          <span className="overline-gold flex items-center gap-1.5"><Star size={11} className="fill-[#c8a24a] text-[#c8a24a]" /> Two Michelin Stars · Est. 2011</span>
          <span className="h-px w-10 bg-[#c8a24a]/60" />
        </motion.div>

        <h1 className="font-display text-[13vw] leading-[0.92] text-[#f3ece0] sm:text-7xl md:text-8xl lg:text-[7.2rem]">
          <SplitWords text="Where Every Meal" className="block" delay={0.35} />
          <span className="block text-gold italic"><SplitWords text="Becomes A Memory" delay={0.6} /></span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 1 }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-[#f3ece0]/70 md:text-lg">
          An intimate theatre of seasonal cuisine, rare wine and table-side fire — nested within THE VIVI, yet a world entirely its own.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 1 }} className="mt-11 flex flex-col items-center gap-4 sm:flex-row">
          <Magnetic strength={0.3}><button onClick={onReserve} className="btn-gold rounded-full px-9 py-4 text-base">Reserve a Table</button></Magnetic>
          <Magnetic strength={0.3}>
            <button onClick={() => { const el = document.querySelector("#menu"); if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 }); }}
              className="btn-gold-ghost rounded-full px-9 py-4 text-base">Explore the Menu</button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* rotating signature dish */}
      <motion.div style={{ y: plateY, rotate: plateRotate }}
        initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute bottom-[-9%] right-[5%] z-[3] hidden h-[330px] w-[330px] xl:block">
        <div className="relative h-full w-full">
          <span className="steam" style={{ left: "42%", bottom: "55%", animationDelay: "0s" }} />
          <span className="steam" style={{ left: "52%", bottom: "55%", animationDelay: "1.6s" }} />
          <span className="steam" style={{ left: "60%", bottom: "55%", animationDelay: "3s" }} />
          <div className="h-full w-full overflow-hidden rounded-full border border-[#c8a24a]/20 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]" style={{ animation: "slowspin 46s linear infinite" }}>
            <Image src={IMG("1600891964092-4316c288032e", 700, 80)} alt="Signature dish" fill sizes="330px" className="object-cover" />
          </div>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22),transparent_45%)]" />
        </div>
      </motion.div>

      <motion.button onClick={() => { const el = document.querySelector("#story"); if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 }); }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#f3ece0]/50">
        <span className="overline-gold text-[0.6rem]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}><ChevronDown size={18} className="text-[#c8a24a]" /></motion.span>
      </motion.button>
    </section>
  );
}
