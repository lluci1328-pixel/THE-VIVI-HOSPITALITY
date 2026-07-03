"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { IMG } from "@/data/site";
import { Magnetic, Particles, SplitWords } from "./ui";

export default function Hero({ onReserve }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Cinematic "camera zoom" + fade as the user starts scrolling.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, 22]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Background image — parallax + zoom */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={IMG("1517248135467-4c7edcad34c4", 1920, 75)}
          alt="LLUCI candlelit dining room"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* cinematic grade */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/55 to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,5,6,0.85)_100%)]" />
      </motion.div>

      {/* ambient warm glows */}
      <motion.div
        className="glow-blob z-[1]"
        style={{
          left: "12%",
          top: "20%",
          width: 460,
          height: 460,
          background:
            "radial-gradient(circle, rgba(224,138,60,0.18), transparent 70%)",
        }}
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="glow-blob z-[1]"
        style={{
          right: "10%",
          bottom: "12%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(200,162,74,0.16), transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.25, 0.5] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* floating dust particles */}
      <Particles count={54} className="z-[2]" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gold/60" />
          <span className="overline text-gold/90">Two Michelin Stars · Est. 2011</span>
          <span className="h-px w-10 bg-gold/60" />
        </motion.div>

        <h1 className="font-display text-[13vw] leading-[0.92] tracking-tight text-cream sm:text-[10vw] md:text-8xl lg:text-[7.4rem]">
          <SplitWords text="Where Every Meal" className="block" delay={0.35} />
          <span className="block text-gold-gradient italic">
            <SplitWords text="Becomes A Memory" delay={0.65} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-8 max-w-xl text-balance text-base font-light leading-relaxed text-cream/70 md:text-lg"
        >
          An intimate theatre of seasonal cuisine, rare wine and cinematic
          ambience — crafted table-side, moment by moment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.3}>
            <button
              onClick={onReserve}
              data-cursor="link"
              className="btn-gold shimmer-border rounded-full px-9 py-4 text-base"
            >
              Reserve a Table
            </button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#menu"
              data-cursor="link"
              className="btn-ghost rounded-full px-9 py-4 text-base"
            >
              Explore the Menu
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* 3D signature dish — real photography on a slowly rotating plate */}
      <motion.div
        style={{ y: plateY, scale: plateScale, rotate: plateRotate }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute bottom-[-9%] right-[6%] z-[3] hidden h-[340px] w-[340px] xl:block"
      >
        <div className="relative h-full w-full">
          {/* steam */}
          <span className="steam left-[42%]" style={{ animationDelay: "0s" }} />
          <span className="steam left-[52%]" style={{ animationDelay: "1.6s" }} />
          <span className="steam left-[60%]" style={{ animationDelay: "3s" }} />
          <div
            className="h-full w-full overflow-hidden rounded-full border border-gold/20 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
            style={{ animation: "slowspin 44s linear infinite" }}
          >
            <Image
              src={IMG("1600891964092-4316c288032e", 700, 80)}
              alt="LLUCI signature dish"
              fill
              sizes="340px"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.25),transparent_45%)]" />
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        data-cursor="link"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/50"
      >
        <span className="overline text-[0.6rem]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown size={18} className="text-gold" />
        </motion.span>
      </motion.a>
    </section>
  );
}
