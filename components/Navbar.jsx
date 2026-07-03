"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import { Magnetic } from "./ui";

export default function Navbar({ onReserve }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [lang, setLang] = useState("EN");
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 top-4 z-[80] w-[min(1180px,94vw)] -translate-x-1/2"
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled
              ? "glass-strong shadow-[0_20px_60px_-25px_rgba(0,0,0,0.9)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            data-cursor="link"
            className="font-display text-2xl font-semibold tracking-[0.28em] text-gold-gradient tap-highlight-none"
          >
            LLUCI
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="link"
                className="group relative px-3 py-2 text-sm text-cream/75 transition-colors hover:text-cream"
              >
                {l.label}
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[1.5px] origin-left rounded-full bg-gradient-to-r from-gold to-goldlight transition-transform duration-500 ${
                    active === l.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen((v) => !v)}
                data-cursor="link"
                className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-xs text-cream/70 transition hover:border-gold/50 hover:text-cream"
                aria-label="Select language"
              >
                <Globe size={14} /> {lang}
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="glass-strong absolute right-0 mt-2 w-28 overflow-hidden rounded-xl p-1"
                  >
                    {["EN", "हिं", "FR", "日本"].map((l) => (
                      <li key={l}>
                        <button
                          onClick={() => {
                            setLang(l);
                            setLangOpen(false);
                          }}
                          className="block w-full rounded-lg px-3 py-2 text-left text-xs text-cream/80 hover:bg-gold/10 hover:text-cream"
                        >
                          {l}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Reserve CTA */}
            <Magnetic strength={0.25} className="hidden sm:block">
              <button
                onClick={onReserve}
                data-cursor="link"
                className="btn-gold rounded-full px-5 py-2.5 text-sm"
              >
                Book Table
              </button>
            </Magnetic>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(true)}
              className="rounded-full border border-white/10 p-2.5 text-cream lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col bg-obsidian/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-2xl tracking-[0.28em] text-gold-gradient">
                LLUCI
              </span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 p-2.5 text-cream"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  className="border-b border-white/5 py-4 font-display text-4xl text-cream/85"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-8 pb-10">
              <button
                onClick={() => {
                  setOpen(false);
                  onReserve && onReserve();
                }}
                className="btn-gold w-full rounded-full py-4 text-base"
              >
                Reserve a Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
