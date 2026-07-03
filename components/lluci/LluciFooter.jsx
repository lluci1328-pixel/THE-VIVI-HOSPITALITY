"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Instagram, Facebook, Twitter, ArrowUp, ArrowLeft } from "lucide-react";
import { NAV } from "@/data/lluci";

export default function LluciFooter({ onReserve }) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const toTop = () => { if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 }); else window.scrollTo({ top: 0, behavior: "smooth" }); };
  const go = (href) => { const el = document.querySelector(href); if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 }); };
  const backToVivi = () => { setLeaving(true); setTimeout(() => router.push("/"), 700); };

  return (
    <footer className="relative overflow-hidden border-t border-[#c8a24a]/10 bg-[#0a0704] pt-20">
      <div className="glow-blob left-1/2 top-0 -translate-x-1/2" style={{ width: 700, height: 260, background: "radial-gradient(circle, rgba(200,162,74,0.08), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#c8a24a]/15 bg-gradient-to-r from-[#c8a24a]/10 to-[#e08a3c]/10 p-8 text-center md:flex-row md:text-left">
          <div><h3 className="font-display text-3xl text-[#f3ece0] md:text-4xl">Your next unforgettable dinner begins here.</h3><p className="mt-2 text-[#f3ece0]/60">Tables are limited each service — reserve early.</p></div>
          <button onClick={onReserve} className="btn-gold shrink-0 rounded-full px-9 py-4 text-base">Reserve a Table</button>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-3xl tracking-[0.2em] text-gold">LLUCI</div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#f3ece0]/55">A two-Michelin-star theatre of fire, time and craft — a THE VIVI signature.</p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a24a]/12 text-[#f3ece0]/70 transition-all duration-500 hover:border-[#c8a24a] hover:text-[#c8a24a] hover:shadow-[0_0_18px_rgba(200,162,74,0.5)]"><Icon size={16} /></a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#f3ece0]/45">Explore</div>
            <ul className="mt-5 space-y-3">{NAV.slice(0, 6).map((l) => <li key={l.href}><button onClick={() => go(l.href)} className="text-sm text-[#f3ece0]/65 transition hover:text-[#c8a24a]">{l.label}</button></li>)}</ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#f3ece0]/45">Hours</div>
            <ul className="mt-5 space-y-3 text-sm text-[#f3ece0]/65">
              <li className="flex justify-between gap-4"><span>Mon</span><span className="text-[#f3ece0]/40">Closed</span></li>
              <li className="flex justify-between gap-4"><span>Tue – Thu</span><span>6:00 – 11:00 PM</span></li>
              <li className="flex justify-between gap-4"><span>Fri – Sat</span><span>6:00 – 11:30 PM</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span>6:00 – 10:30 PM</span></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#f3ece0]/45">Part of</div>
            <p className="mt-5 text-sm text-[#f3ece0]/55">Lluci is the signature restaurant of THE VIVI luxury hotel.</p>
            <button onClick={backToVivi} className="btn-gold-ghost mt-4 flex items-center gap-2 rounded-full px-6 py-3 text-sm"><ArrowLeft size={14} /> Back to THE VIVI</button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#c8a24a]/10 py-8 md:flex-row">
          <p className="text-xs text-[#f3ece0]/40">© {new Date().getFullYear()} LLUCI · A THE VIVI Signature. All rights reserved.</p>
          <button onClick={toTop} className="flex items-center gap-2 rounded-full border border-[#c8a24a]/12 px-4 py-2 text-xs text-[#f3ece0]/60 transition hover:border-[#c8a24a] hover:text-[#c8a24a]">Back to Top <ArrowUp size={13} /></button>
        </div>
      </div>

      {leaving && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#05060d]">
          <span className="font-display text-4xl tracking-[0.3em] text-ice">THE VIVI</span>
        </div>
      )}
    </footer>
  );
}
