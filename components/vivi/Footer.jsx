"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Instagram, Facebook, Twitter, ArrowUp, Send } from "lucide-react";
import { SIDEBAR } from "@/data/vivi";
import { useBooking } from "./BookingProvider";

export default function Footer() {
  const { openBooking } = useBooking();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const go = (href) => {
    const el = document.querySelector(href);
    if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.4 });
  };
  const subscribe = (e) => { e.preventDefault(); if (!email) return; setSent(true); setEmail(""); setTimeout(() => setSent(false), 3500); };

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-panel/60 pt-20">
      <div className="glow-blob left-1/2 top-0 -translate-x-1/2" style={{ width: 700, height: 260, background: "radial-gradient(circle, rgba(46,123,255,0.08), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
        {/* CTA band */}
        <div className="mb-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-sky/15 bg-gradient-to-r from-electric/10 to-violet/10 p-8 text-center md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-3xl text-mist md:text-4xl">Your next unforgettable stay begins here.</h3>
            <p className="mt-2 text-silver/60">Book direct for our best rate, guaranteed.</p>
          </div>
          <button onClick={() => openBooking("room")} className="btn-primary shrink-0 rounded-full px-9 py-4 text-base">Book Your Stay</button>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-3xl tracking-[0.2em] text-ice">THE VIVI</div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver/55">A modern icon of hospitality — suites, spa, weddings and a two-Michelin-star restaurant beneath one roof.</p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-silver/70 transition-all duration-500 hover:border-sky hover:text-sky hover:shadow-[0_0_18px_rgba(46,123,255,0.5)]"><Icon size={16} /></a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-silver/45">Explore</div>
            <ul className="mt-5 space-y-3">
              {SIDEBAR.slice(0, 6).map((l) => (
                <li key={l.href}><button onClick={() => go(l.href)} className="text-sm text-silver/65 transition hover:text-sky">{l.label}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-silver/45">Contact</div>
            <ul className="mt-5 space-y-3 text-sm text-silver/65">
              <li>1 Aurum Boulevard</li>
              <li>Mumbai 400001, India</li>
              <li>+91 12345 66666</li>
              <li>stay@thevivi.com</li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-silver/45">The VIVI List</div>
            <p className="mt-5 text-sm text-silver/55">Private offers, new suites and seasonal experiences — first.</p>
            <form onSubmit={subscribe} className="mt-4 flex overflow-hidden rounded-full border border-white/12 bg-white/[0.03]">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full bg-transparent px-4 py-3 text-sm text-mist outline-none placeholder:text-silver/30" />
              <button type="submit" aria-label="Subscribe" className="flex items-center justify-center bg-gradient-to-br from-sky to-electric px-4 text-white"><Send size={15} /></button>
            </form>
            {sent && <p className="mt-2 text-xs text-sky">✦ Welcome to the list.</p>}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/8 py-8 md:flex-row">
          <p className="text-xs text-silver/40">© {new Date().getFullYear()} THE VIVI. A modern luxury hospitality brand. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-silver/40 hover:text-sky">Privacy</a>
            <a href="#" className="text-xs text-silver/40 hover:text-sky">Terms</a>
            <button onClick={() => router.push("/admin")} className="text-xs text-silver/40 transition hover:text-sky">Staff · Operations</button>
            <button onClick={toTop} className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs text-silver/60 transition hover:border-sky hover:text-sky">Back to Top <ArrowUp size={13} /></button>
          </div>
        </div>
      </div>
    </footer>
  );
}
