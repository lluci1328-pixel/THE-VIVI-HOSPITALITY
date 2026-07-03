"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-base px-6 text-center">
      <div className="glow-blob left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(46,123,255,0.16), transparent 70%)" }} />
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.span key={i} className="absolute h-1 w-1 rounded-full bg-sky/50" style={{ left: `${(i * 61) % 100}%`, top: `${(i * 37) % 100}%` }}
          animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }} transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }} />
      ))}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative z-10">
        <div className="font-display text-[22vw] leading-none text-aurora md:text-[12rem]">404</div>
        <div className="overline mt-2 text-silver/50">A Suite That Doesn't Exist</div>
        <p className="mx-auto mt-6 max-w-md text-silver/60">This page has checked out. Let us guide you back to THE VIVI.</p>
        <Link href="/" className="btn-primary mt-9 inline-block rounded-full px-9 py-4 text-base">Return Home</Link>
      </motion.div>
    </main>
  );
}
