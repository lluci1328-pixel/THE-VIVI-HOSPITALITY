"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowLeft } from "lucide-react";
import { NAV } from "@/data/lluci";

export default function LluciNav({ onReserve }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 });
    else if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const backToVivi = () => {
    setLeaving(true);
    setTimeout(() => router.push("/"), 700);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${scrolled ? "glass-gold border-b border-[#c8a24a]/15" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <button onClick={backToVivi} className="group flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#f3ece0]/60 transition hover:text-[#c8a24a]">
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" /> THE VIVI
          </button>

          <button onClick={() => go("#top")} className="font-display text-2xl tracking-[0.3em] text-gold">LLUCI</button>

          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 lg:flex">
              {NAV.slice(0, 6).map((l) => (
                <button key={l.href} onClick={() => go(l.href)} className="text-sm text-[#f3ece0]/70 transition-colors hover:text-[#c8a24a]">{l.label}</button>
              ))}
            </nav>
            <button onClick={onReserve} className="btn-gold hidden rounded-full px-6 py-2.5 text-sm sm:block">Reserve</button>
            <button onClick={() => setOpen(true)} aria-label="Menu" className="rounded-full border border-[#c8a24a]/25 p-2.5 text-[#f3ece0] lg:hidden"><Menu size={18} /></button>
          </div>
        </div>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col bg-[#0c0906]/97 backdrop-blur-2xl lg:hidden">
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-2xl tracking-[0.3em] text-gold">LLUCI</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full border border-[#c8a24a]/25 p-2.5 text-[#f3ece0]"><X size={18} /></button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {NAV.map((l, i) => (
                <motion.button key={l.href} onClick={() => go(l.href)}
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}
                  className="border-b border-[#c8a24a]/10 py-4 text-left font-display text-3xl text-[#f3ece0]/85">{l.label}</motion.button>
              ))}
            </nav>
            <div className="px-8 pb-10"><button onClick={() => { setOpen(false); onReserve(); }} className="btn-gold w-full rounded-full py-4">Reserve a Table</button></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* leaving cover (cinematic back to hotel) */}
      <AnimatePresence>
        {leaving && (
          <motion.div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#05060d]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <motion.span className="font-display text-4xl tracking-[0.3em] text-ice"
              initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.3em" }} transition={{ duration: 0.7 }}>THE VIVI</motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
