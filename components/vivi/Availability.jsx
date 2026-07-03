"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Moon, Sun, CalendarCheck } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { Reveal } from "../ui";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];
const BASE_PRICE = 18500;

function iso(d) { return d.toISOString().split("T")[0]; }
function priceFor(date) {
  const day = date.getDay();
  const weekend = day === 5 || day === 6;
  const month = date.getMonth();
  const peak = month === 11 || month === 0; // Dec/Jan peak season
  let p = BASE_PRICE;
  if (weekend) p += 6500;
  if (peak) p += 9000;
  return p;
}
// deterministic "unavailable" days for demo realism
function isBlocked(date) {
  const n = date.getDate();
  return n % 7 === 3 || n % 11 === 5;
}

export default function Availability() {
  const { openBooking } = useBooking();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [hover, setHover] = useState(null);

  const days = useMemo(() => {
    const first = new Date(view.y, view.m, 1);
    const startDow = first.getDay();
    const total = new Date(view.y, view.m + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(new Date(view.y, view.m, d));
    return cells;
  }, [view]);

  const move = (dir) => {
    let m = view.m + dir, y = view.y;
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    setView({ y, m });
  };

  const pick = (date) => {
    if (!date || date < today || isBlocked(date)) return;
    if (!checkIn || (checkIn && checkOut)) { setCheckIn(date); setCheckOut(null); return; }
    if (date <= checkIn) { setCheckIn(date); return; }
    setCheckOut(date);
  };

  const inRange = (date) => {
    if (!date || !checkIn) return false;
    const end = checkOut || hover;
    if (!end) return false;
    return date > checkIn && date < end;
  };

  const summary = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    const nights = Math.round((checkOut - checkIn) / 86400000);
    let total = 0;
    for (let i = 0; i < nights; i++) { const d = new Date(checkIn); d.setDate(d.getDate() + i); total += priceFor(d); }
    const avail = 100 - (checkIn.getDate() % 9) * 6; // demo rooms left
    return { nights, total, avg: Math.round(total / nights), avail };
  }, [checkIn, checkOut]);

  return (
    <section id="availability" className="relative overflow-hidden border-y border-white/8 bg-panel/40 py-28 md:py-36">
      <div className="glow-blob" style={{ right: "-6%", top: "10%", width: 420, height: 420, background: "radial-gradient(circle, rgba(103,232,249,0.1), transparent 70%)" }} />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:pl-[calc(80px+3vw)]">
        <div>
          <Reveal><span className="overline text-sky">Real-Time Availability</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-6xl">Find Your <span className="text-aurora italic">Perfect Nights</span></h2></Reveal>
          <Reveal delay={0.15}><p className="mt-5 max-w-md text-silver/60">Select your dates to see live pricing. Weekend and peak-season rates adjust automatically — no surprises at checkout.</p></Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4 text-xs text-silver/60">
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-sky" /> Selected</span>
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-sky/25" /> In range</span>
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-white/8" /> Unavailable</span>
              <span className="flex items-center gap-2"><Sun size={13} className="text-cyan" /> Weekend</span>
              <span className="flex items-center gap-2"><Moon size={13} className="text-violet" /> Peak</span>
            </div>
          </Reveal>

          {summary && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-2xl border border-sky/20 bg-sky/[0.05] p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-silver/50">{summary.nights} nights · avg ₹{summary.avg.toLocaleString("en-IN")}/night</div>
                  <div className="mt-1 font-display text-4xl text-aurora">₹{summary.total.toLocaleString("en-IN")}</div>
                  <div className="mt-1 text-xs text-emerald-300">{summary.avail} rooms available for these dates</div>
                </div>
                <button onClick={() => openBooking("room", { checkIn: iso(checkIn), checkOut: iso(checkOut) })}
                  className="btn-primary flex items-center gap-2 rounded-full px-7 py-3.5 text-sm">
                  <CalendarCheck size={16} /> Reserve
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Calendar */}
        <Reveal delay={0.1}>
          <div className="glass-card rounded-3xl p-6 md:p-7">
            <div className="mb-5 flex items-center justify-between">
              <button onClick={() => move(-1)} aria-label="Previous month" className="rounded-full border border-white/12 p-2 text-silver/80 hover:border-sky hover:text-sky"><ChevronLeft size={16} /></button>
              <div className="font-display text-2xl text-mist">{MONTHS[view.m]} {view.y}</div>
              <button onClick={() => move(1)} aria-label="Next month" className="rounded-full border border-white/12 p-2 text-silver/80 hover:border-sky hover:text-sky"><ChevronRight size={16} /></button>
            </div>
            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[0.65rem] uppercase tracking-wider text-silver/40">
              {DOW.map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, i) => {
                if (!date) return <span key={i} />;
                const past = date < today;
                const blocked = isBlocked(date);
                const disabled = past || blocked;
                const isCheckIn = checkIn && iso(date) === iso(checkIn);
                const isCheckOut = checkOut && iso(date) === iso(checkOut);
                const selected = isCheckIn || isCheckOut;
                const ranged = inRange(date);
                const weekend = date.getDay() === 5 || date.getDay() === 6;
                const peak = date.getMonth() === 11 || date.getMonth() === 0;
                return (
                  <button key={i} onClick={() => pick(date)} onMouseEnter={() => setHover(date)} disabled={disabled}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-all duration-200
                      ${disabled ? "cursor-not-allowed text-silver/20" : "text-silver/85 hover:bg-white/5"}
                      ${ranged ? "bg-sky/20 text-mist" : ""}
                      ${selected ? "bg-sky text-white shadow-[0_0_16px_rgba(46,123,255,0.6)]" : ""}`}>
                    <span>{date.getDate()}</span>
                    {!disabled && (
                      <span className="mt-0.5 flex h-1 items-center gap-0.5">
                        {weekend && <span className="h-1 w-1 rounded-full bg-cyan" />}
                        {peak && <span className="h-1 w-1 rounded-full bg-violet" />}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4 text-xs text-silver/55">
              <span>{checkIn ? `Check-in: ${iso(checkIn)}` : "Select check-in date"}</span>
              <span>{checkOut ? `Check-out: ${iso(checkOut)}` : checkIn ? "Select check-out" : ""}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
