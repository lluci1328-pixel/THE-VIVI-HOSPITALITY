"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin gold reading progress bar pinned to the top of the viewport.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[70]"
    >
      <div className="h-full w-full bg-gradient-to-r from-electric via-sky to-cyan shadow-[0_0_12px_rgba(46,123,255,0.8)]" />
    </motion.div>
  );
}
