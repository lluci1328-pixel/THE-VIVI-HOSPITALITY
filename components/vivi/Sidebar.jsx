"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home, BedDouble, CalendarRange, UtensilsCrossed, Heart, Briefcase,
  Sparkles, Image as ImageIcon, Landmark, Phone, Menu, X, CalendarCheck,
  Flower2, Dumbbell, Ticket,
} from "lucide-react";
import { SIDEBAR, IMG } from "@/data/vivi";
import { useBooking } from "./BookingProvider";

const ICONS = {
  home: Home, bed: BedDouble, calendar: CalendarRange, utensils: UtensilsCrossed,
  heart: Heart, briefcase: Briefcase, sparkles: Sparkles, image: ImageIcon,
  landmark: Landmark, phone: Phone, spa: Flower2, gym: Dumbbell, events: Ticket,
};

export default function Sidebar() {
  const { openBooking } = useBooking();
  const router = useRouter();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState(onHome ? "#home" : pathname);
  const [open, setOpen] = useState(false);
  const [entering, setEntering] = useState(false);

  // Scroll-spy only runs on the home page (where the anchor sections live).
  useEffect(() => {
    if (!onHome) { setActive(pathname); return; }
    const ids = SIDEBAR.filter((l) => l.href.startsWith("#")).map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [onHome, pathname]);

  useEffect(() => {
    ["/restaurant", "/rooms", "/weddings", "/corporate", "/spa", "/gym", "/events"].forEach((r) => router.prefetch(r));
  }, [router]);

  const enterRestaurant = () => {
    setOpen(false);
    setEntering(true);
    if (window.__lenis) window.__lenis.stop();
    setTimeout(() => router.push("/restaurant"), 1100);
  };

  const go = (href) => {
    setOpen(false);
    if (href === "/restaurant") { enterRestaurant(); return; }
    if (href.startsWith("/")) { router.push(href); return; }
    // hash anchor — scroll on home, otherwise route to home + anchor
    if (!onHome) { router.push("/" + href); return; }
    const el = document.querySelector(href);
    if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.4 });
    else if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ---------- Desktop rail ---------- */}
      <aside className="group fixed left-0 top-0 z-[80] hidden h-screen lg:flex">
        <div className="flex h-full w-[80px] flex-col items-center border-r border-white/8 bg-panel/60 py-6 backdrop-blur-2xl transition-[width] duration-500 ease-luxe group-hover:w-[248px]">
          {/* logo */}
          <button onClick={() => go("#home")} className="mb-8 flex w-full items-center gap-3 px-6 tap-highlight-none">
            <span className="font-display text-2xl font-semibold tracking-tight text-ice">V</span>
            <span className="overflow-hidden whitespace-nowrap font-display text-xl tracking-[0.2em] text-ice opacity-0 transition-opacity duration-500 group-hover:opacity-100">THE VIVI</span>
          </button>

          <nav className="no-scrollbar flex w-full min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3">
            {SIDEBAR.map((l) => {
              const Icon = ICONS[l.icon] || Home;
              const isActive = active === l.href;
              return (
                <button key={l.href} onClick={() => go(l.href)}
                  className={`relative flex items-center gap-4 rounded-xl px-3.5 py-3 transition-colors duration-300 ${isActive ? "text-white" : "text-silver/60 hover:text-mist"}`}>
                  {isActive && (
                    <motion.span layoutId="rail-active" className="absolute inset-0 rounded-xl border border-sky/20 bg-gradient-to-r from-electric/20 to-transparent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                  <span className="relative shrink-0"><Icon size={19} className={l.accent ? "text-violet" : ""} /></span>
                  <span className={`relative overflow-hidden whitespace-nowrap text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${l.accent ? "text-violet" : ""}`}>{l.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="w-full px-3">
            <button onClick={() => openBooking("room")}
              className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm">
              <CalendarCheck size={17} />
              <span className="overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-500 group-hover:opacity-100">Book Now</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ---------- Mobile top bar ---------- */}
      <div className="fixed inset-x-0 top-0 z-[80] flex items-center justify-between border-b border-white/8 bg-panel/70 px-5 py-4 backdrop-blur-2xl lg:hidden">
        <button onClick={() => go("#home")} className="font-display text-xl tracking-[0.22em] text-ice">THE VIVI</button>
        <div className="flex items-center gap-2">
          <button onClick={() => openBooking("room")} className="btn-primary rounded-full px-4 py-2 text-xs">Book</button>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-full border border-white/12 p-2.5 text-mist"><Menu size={18} /></button>
        </div>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col bg-base/95 backdrop-blur-2xl lg:hidden">
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-xl tracking-[0.22em] text-ice">THE VIVI</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full border border-white/12 p-2.5 text-mist"><X size={18} /></button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-2">
              {SIDEBAR.map((l, i) => {
                const Icon = ICONS[l.icon] || Home;
                return (
                  <motion.button key={l.href} onClick={() => go(l.href)}
                    initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.08 }}
                    className={`flex items-center gap-4 border-b border-white/5 px-2 py-4 text-left ${l.accent ? "text-violet" : "text-mist/85"}`}>
                    <Icon size={20} /> <span className="font-display text-xl">{l.label}</span>
                  </motion.button>
                );
              })}
            </nav>
            <div className="px-6 pb-8 pt-2">
              <button onClick={() => { setOpen(false); openBooking("room"); }} className="btn-primary w-full rounded-full py-4">Book Your Stay</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* cinematic cover — entering the Lluci restaurant from the nav */}
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
    </>
  );
}
