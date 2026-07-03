"use client";

import { useState } from "react";
import { Instagram, Facebook, Twitter, ArrowUp, Send } from "lucide-react";
import { NAV_LINKS } from "@/data/site";

export default function Footer({ onReserve }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#060608] pt-20">
      <div className="glow-blob left-1/2 top-0 -translate-x-1/2" style={{
        width: 700, height: 300,
        background: "radial-gradient(circle, rgba(200,162,74,0.08), transparent 70%)",
      }} />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display text-4xl tracking-[0.2em] text-gold-gradient">
              LLUCI
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
              Modern luxury dining. Where fire, time and craft compose an evening
              you'll never forget.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-cursor="link"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-cream/70 transition-all duration-500 hover:border-gold hover:text-gold hover:shadow-[0_0_18px_rgba(200,162,74,0.5)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-cream/45">Explore</div>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-cream/65 transition hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-cream/45">Hours</div>
            <ul className="mt-5 space-y-3 text-sm text-cream/65">
              <li className="flex justify-between gap-4"><span>Mon</span><span className="text-cream/40">Closed</span></li>
              <li className="flex justify-between gap-4"><span>Tue – Thu</span><span>6:00 – 11:00 PM</span></li>
              <li className="flex justify-between gap-4"><span>Fri – Sat</span><span>6:00 – 11:30 PM</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span>6:00 – 10:30 PM</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-cream/45">The List</div>
            <p className="mt-5 text-sm text-cream/55">
              Private tastings, chef's dinners & seasonal menus — first.
            </p>
            <form onSubmit={subscribe} className="mt-4 flex overflow-hidden rounded-full border border-white/12 bg-white/[0.03]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/30"
              />
              <button type="submit" aria-label="Subscribe" className="flex items-center justify-center bg-gradient-to-br from-goldlight to-gold px-4 text-ink">
                <Send size={15} />
              </button>
            </form>
            {sent && <p className="mt-2 text-xs text-gold">✦ Welcome to the list.</p>}
            <button onClick={onReserve} className="btn-ghost mt-5 w-full rounded-full py-3 text-sm">
              Reserve a Table
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/8 py-8 md:flex-row">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} LLUCI. Crafted with fire & patience. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-cream/40 hover:text-gold">Privacy</a>
            <a href="#" className="text-xs text-cream/40 hover:text-gold">Terms</a>
            <button
              onClick={toTop}
              data-cursor="link"
              className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs text-cream/60 transition hover:border-gold hover:text-gold"
            >
              Back to Top <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
