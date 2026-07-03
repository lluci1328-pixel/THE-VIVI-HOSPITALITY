"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Premium cinematic intro — no progress bar, no percentage.
// A wordmark blooms out of an aurora of light, then the scene dissolves.
export default function Loader({ onDone }) {
  const [gone, setGone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    // Time-based completion so a backgrounded/throttled tab can never hang.
    const REVEAL = 2600;
    const t1 = setTimeout(() => setGone(true), REVEAL);
    const t2 = setTimeout(() => onDoneRef.current && onDoneRef.current(), REVEAL + 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const letters = "THE VIVI".split("");

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-base"
          exit={{ opacity: 0, filter: "blur(16px)", scale: 1.08 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* aurora field */}
          <motion.div
            aria-hidden
            className="absolute h-[90vmax] w-[90vmax] opacity-70"
            style={{
              background:
                "radial-gradient(circle at 35% 40%, rgba(46,123,255,0.35), transparent 45%), radial-gradient(circle at 65% 60%, rgba(139,92,246,0.28), transparent 45%), radial-gradient(circle at 50% 50%, rgba(103,232,249,0.18), transparent 55%)",
              animation: "auroraShift 9s ease-in-out infinite",
              filter: "blur(40px)",
            }}
          />

          {/* expanding light ring */}
          <motion.div
            aria-hidden
            className="absolute rounded-full"
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 620, height: 620, opacity: 0 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ border: "1px solid rgba(124,192,255,0.5)" }}
          />

          {/* wordmark */}
          <div className="relative z-10 text-center">
            <div className="flex items-end justify-center overflow-hidden">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  className="font-display text-6xl font-light tracking-[0.15em] text-ice md:text-8xl"
                  initial={{ y: "115%", opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="overline mt-5 text-silver/60"
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.36em" }}
              transition={{ duration: 1.4, delay: 1 }}
            >
              Luxury Hospitality
            </motion.div>

            {/* thin hairline that draws, then the dot pulse (no bar/percent) */}
            <motion.div
              className="mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-sky/70 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
