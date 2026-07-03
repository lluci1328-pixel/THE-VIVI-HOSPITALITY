"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IMG } from "@/data/lluci";

// Cinematic arrival — a warm curtain that dives into candlelight, reveals the
// LLUCI wordmark, then lifts. Plays on mount so entering feels immersive from
// any route. Time-based completion (safe in backgrounded tabs).
export default function LluciIntro({ onDone }) {
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const REVEAL = 2400;
    const t1 = setTimeout(() => setGone(true), REVEAL);
    const t2 = setTimeout(() => doneRef.current && doneRef.current(), REVEAL + 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0c0906]"
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* candlelit dive */}
          <motion.div className="absolute inset-0"
            initial={{ scale: 1.5, opacity: 0, filter: "blur(24px)" }}
            animate={{ scale: 1, opacity: 0.5, filter: "blur(0px)" }}
            transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }}>
            <Image src={IMG("1517248135467-4c7edcad34c4", 1600, 76)} alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(12,9,6,0.9))]" />
          </motion.div>

          {/* warm glow */}
          <motion.div className="glow-blob" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(224,138,60,0.3), transparent 70%)" }}
            animate={{ opacity: [0.4, 0.75, 0.4], scale: [0.9, 1.05, 0.9] }} transition={{ duration: 3, repeat: Infinity }} />

          <div className="relative z-10 text-center">
            <motion.div className="overline-gold mb-5"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}>
              A THE VIVI Signature
            </motion.div>
            <div className="flex justify-center overflow-hidden">
              {"LLUCI".split("").map((ch, i) => (
                <motion.span key={i} className="font-display text-7xl font-light tracking-[0.18em] md:text-9xl"
                  style={{ background: "linear-gradient(120deg,#e7cd8c,#c8a24a,#9c7a2e)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
                  initial={{ y: "120%", opacity: 0, filter: "blur(10px)" }} animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.1, delay: 0.5 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}>
                  {ch}
                </motion.span>
              ))}
            </div>
            <motion.div className="mx-auto mt-7 h-px bg-gradient-to-r from-transparent via-[#c8a24a] to-transparent"
              initial={{ width: 0, opacity: 0 }} animate={{ width: 240, opacity: 1 }} transition={{ duration: 1.3, delay: 1.3, ease: [0.16, 1, 0.3, 1] }} />
            <motion.div className="mt-5 text-sm tracking-[0.3em] text-[#f3ece0]/50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
              TWO MICHELIN STARS
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
