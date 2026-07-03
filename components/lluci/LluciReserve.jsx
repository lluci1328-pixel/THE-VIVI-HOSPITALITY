"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Users, Calendar, Clock, PartyPopper, Armchair, Loader2 } from "lucide-react";
import { TIME_SLOTS, OCCASIONS } from "@/data/lluci";
import { Reveal } from "../ui";

const TABLES = [
  { id: "T1", seats: 2, status: "window", x: 8, y: 12 }, { id: "T2", seats: 2, status: "free", x: 30, y: 12 },
  { id: "T3", seats: 4, status: "taken", x: 54, y: 12 }, { id: "T4", seats: 4, status: "vip", x: 78, y: 12 },
  { id: "T5", seats: 6, status: "free", x: 12, y: 44 }, { id: "T6", seats: 4, status: "free", x: 40, y: 44 },
  { id: "T7", seats: 2, status: "taken", x: 66, y: 44 }, { id: "T8", seats: 8, status: "vip", x: 82, y: 46 },
  { id: "T9", seats: 4, status: "garden", x: 16, y: 76 }, { id: "T10", seats: 2, status: "free", x: 42, y: 76 },
  { id: "T11", seats: 4, status: "garden", x: 66, y: 76 }, { id: "T12", seats: 2, status: "window", x: 86, y: 78 },
];
const STATUS = {
  free: { c: "#3f7f5f", r: "rgba(80,200,140,0.9)", l: "Available" },
  vip: { c: "#c8a24a", r: "rgba(231,205,140,0.95)", l: "VIP" },
  window: { c: "#8a6a2f", r: "rgba(200,162,74,0.7)", l: "Window" },
  garden: { c: "#5a7d4a", r: "rgba(150,210,120,0.9)", l: "Garden" },
  taken: { c: "#3a2a2a", r: "rgba(150,90,90,0.5)", l: "Occupied" },
};
function tomorrow() { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split("T")[0]; }

export default function LluciReserve() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", guests: 2, date: tomorrow(), time: "", occasion: "None", request: "" });
  const [table, setTable] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const code = useMemo(() => "LLU-" + Math.random().toString(36).slice(2, 7).toUpperCase(), [status === "done"]); // eslint-disable-line

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone || !form.email) return setError("Please fill in your name, phone and email.");
    if (!form.time) return setError("Please choose a time slot.");
    if (!table) return setError("Please select a table from the floor plan.");
    setStatus("loading");
    setTimeout(() => {
      try {
        const rec = { ...form, table, code, at: Date.now() };
        const prev = JSON.parse(localStorage.getItem("lluci_bookings") || "[]");
        localStorage.setItem("lluci_bookings", JSON.stringify([rec, ...prev].slice(0, 20)));
      } catch {}
      setStatus("done");
    }, 1400);
  };

  const reset = () => { setStatus("idle"); setTable(null); setForm({ name: "", phone: "", email: "", guests: 2, date: tomorrow(), time: "", occasion: "None", request: "" }); };

  return (
    <section id="reserve" className="relative overflow-hidden bg-gradient-to-b from-[#0c0906] via-[#120b06] to-[#0c0906] py-28 md:py-36">
      <div className="glow-blob left-1/2 top-0 -translate-x-1/2" style={{ width: 600, height: 300, background: "radial-gradient(circle, rgba(224,138,60,0.12), transparent 70%)" }} />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <Reveal><span className="overline-gold">Table Reservation</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-[#f3ece0] md:text-7xl">Reserve Your <span className="text-gold italic">Evening</span></h2></Reveal>
        </div>

        <div className="glass-gold overflow-hidden rounded-3xl">
            {status === "done" ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center px-8 py-20 text-center">
                <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#e7cd8c] to-[#c8a24a] shadow-[0_0_60px_rgba(200,162,74,0.6)]">
                  <Check size={44} className="text-[#17110a]" strokeWidth={3} />
                </motion.div>
                <h3 className="mt-8 font-display text-4xl text-[#f3ece0] md:text-5xl">Your Table Awaits</h3>
                <p className="mt-4 max-w-md text-[#f3ece0]/65">Thank you, {form.name.split(" ")[0]}. A confirmation has been sent to <span className="text-gold">{form.email}</span>.</p>
                <div className="mt-8 grid grid-cols-2 gap-4 text-left sm:grid-cols-4">
                  {[["Booking", code], ["Table", table], ["Date", form.date], ["Time", form.time]].map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-[#c8a24a]/12 bg-[#c8a24a]/[0.04] px-4 py-3"><div className="text-[0.6rem] uppercase tracking-[0.2em] text-[#f3ece0]/45">{k}</div><div className="mt-1 text-sm text-[#f3ece0]">{v}</div></div>
                  ))}
                </div>
                <button onClick={reset} className="btn-gold-ghost mt-9 rounded-full px-8 py-3 text-sm">Book Another</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="grid lg:grid-cols-[1.05fr_1fr]">
                <div className="border-b border-[#c8a24a]/10 p-7 md:p-9 lg:border-b-0 lg:border-r">
                  <span className="overline-gold">Your Details</span>
                  <p className="mt-3 text-sm text-[#f3ece0]/55">We hold your table for 15 minutes past the hour.</p>
                  <div className="mt-6 space-y-4">
                    <Field label="Full Name"><input required value={form.name} onChange={set("name")} placeholder="e.g. Aarav Sharma" className={inp} /></Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Phone"><input required value={form.phone} onChange={set("phone")} inputMode="tel" placeholder="+91 …" className={inp} /></Field>
                      <Field label="Email"><input required type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" className={inp} /></Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Guests" icon={<Users size={13} />}>
                        <div className="flex items-center gap-2">
                          <Step onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))}>–</Step>
                          <span className="w-8 text-center font-display text-2xl text-[#f3ece0]">{form.guests}</span>
                          <Step onClick={() => setForm((f) => ({ ...f, guests: Math.min(20, f.guests + 1) }))}>+</Step>
                        </div>
                      </Field>
                      <Field label="Date" icon={<Calendar size={13} />}><input type="date" min={tomorrow()} value={form.date} onChange={set("date")} className={inp} /></Field>
                    </div>
                    <Field label="Time" icon={<Clock size={13} />}>
                      <div className="flex flex-wrap gap-2">
                        {TIME_SLOTS.map((t) => (
                          <button type="button" key={t} onClick={() => setForm((f) => ({ ...f, time: t }))}
                            className={`rounded-full border px-3.5 py-2 text-xs transition-all ${form.time === t ? "border-[#c8a24a] bg-[#c8a24a]/15 text-[#c8a24a] shadow-[0_0_18px_rgba(200,162,74,0.4)]" : "border-[#c8a24a]/12 text-[#f3ece0]/60 hover:border-[#c8a24a]/50"}`}>{t}</button>
                        ))}
                      </div>
                    </Field>
                    <Field label="Occasion" icon={<PartyPopper size={13} />}>
                      <div className="flex flex-wrap gap-2">
                        {OCCASIONS.map((o) => (
                          <button type="button" key={o} onClick={() => setForm((f) => ({ ...f, occasion: o }))}
                            className={`rounded-full border px-3.5 py-2 text-xs transition-all ${form.occasion === o ? "border-[#c8a24a] bg-[#c8a24a]/15 text-[#c8a24a]" : "border-[#c8a24a]/12 text-[#f3ece0]/60 hover:border-[#c8a24a]/50"}`}>{o}</button>
                        ))}
                      </div>
                    </Field>
                    <Field label="Special Request"><textarea value={form.request} onChange={set("request")} rows={2} placeholder="Allergies, seating preference, celebrations…" className={`${inp} resize-none`} /></Field>
                  </div>
                </div>

                <div className="p-7 md:p-9">
                  <div className="flex items-center gap-2"><Armchair size={16} className="text-[#c8a24a]" /><span className="overline-gold">Live Floor Plan</span></div>
                  <p className="mt-3 text-sm text-[#f3ece0]/55">Tap a table to select. {table ? <span className="text-[#c8a24a]">Selected {table}.</span> : "Grey tables are occupied."}</p>

                  <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl border border-[#c8a24a]/12 bg-[#0c0906]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(200,162,74,0.08),transparent_70%)]" />
                    <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full border border-[#c8a24a]/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-[#f3ece0]/40">Entrance</div>
                    {TABLES.map((t) => {
                      const m = STATUS[t.status]; const disabled = t.status === "taken"; const selected = table === t.id;
                      return (
                        <button type="button" key={t.id} disabled={disabled} onClick={() => setTable(t.id)}
                          aria-label={`Table ${t.id}, ${t.seats} seats, ${m.l}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${t.x + 6}%`, top: `${t.y + 8}%` }}>
                          <motion.span animate={selected ? { scale: [1, 1.18, 1.1] } : { scale: 1 }} transition={{ duration: 0.5 }}
                            className="flex items-center justify-center rounded-lg text-[0.6rem] font-medium"
                            style={{ width: t.seats > 4 ? 46 : 34, height: t.seats > 4 ? 46 : 34, background: m.c, color: t.status === "vip" ? "#17110a" : "#f3ece0", border: `1.5px solid ${selected ? "#fff" : m.r}`, boxShadow: selected ? `0 0 22px ${m.r}` : "none", opacity: disabled ? 0.45 : 1, cursor: disabled ? "not-allowed" : "pointer", transition: "box-shadow .4s, transform .3s" }}>
                            {t.seats}
                          </motion.span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-[0.65rem] text-[#f3ece0]/55">
                    {Object.entries(STATUS).map(([k, m]) => <span key={k} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: m.c }} /> {m.l}</span>)}
                  </div>

                  {error && <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">{error}</motion.div>}

                  <button type="submit" disabled={status === "loading"} className="btn-gold mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base disabled:opacity-70">
                    {status === "loading" ? <><Loader2 size={18} className="animate-spin" /> Securing your table…</> : "Confirm Reservation"}
                  </button>
                  <p className="mt-3 text-center text-xs text-[#f3ece0]/40">Demo booking · no payment required</p>
                </div>
              </motion.form>
            )}
        </div>
      </div>
    </section>
  );
}

const inp = "w-full rounded-xl border border-[#c8a24a]/12 bg-[#c8a24a]/[0.03] px-4 py-3 text-sm text-[#f3ece0] placeholder:text-[#f3ece0]/30 outline-none transition focus:border-[#c8a24a]/60 focus:bg-[#c8a24a]/[0.05]";
function Field({ label, icon, children }) {
  return (<label className="block"><span className="mb-2 flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#f3ece0]/45">{icon} {label}</span>{children}</label>);
}
function Step({ children, onClick }) {
  return (<button type="button" onClick={onClick} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c8a24a]/20 text-lg text-[#f3ece0]/80 transition hover:border-[#c8a24a] hover:text-[#c8a24a]">{children}</button>);
}
