"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Check, Users, Calendar, Clock, PartyPopper, Armchair, Loader2,
} from "lucide-react";
import { OCCASIONS, TIME_SLOTS } from "@/data/site";

// A visual restaurant floor. status: free | vip | window | garden | taken
const TABLES = [
  { id: "T1", seats: 2, status: "window", x: 8, y: 12 },
  { id: "T2", seats: 2, status: "free", x: 30, y: 12 },
  { id: "T3", seats: 4, status: "taken", x: 54, y: 12 },
  { id: "T4", seats: 4, status: "vip", x: 78, y: 12 },
  { id: "T5", seats: 6, status: "free", x: 12, y: 44 },
  { id: "T6", seats: 4, status: "free", x: 40, y: 44 },
  { id: "T7", seats: 2, status: "taken", x: 66, y: 44 },
  { id: "T8", seats: 8, status: "vip", x: 82, y: 46 },
  { id: "T9", seats: 4, status: "garden", x: 16, y: 76 },
  { id: "T10", seats: 2, status: "free", x: 42, y: 76 },
  { id: "T11", seats: 4, status: "garden", x: 66, y: 76 },
  { id: "T12", seats: 2, status: "window", x: 86, y: 78 },
];

const STATUS_META = {
  free: { color: "#3f7f5f", ring: "rgba(80,200,140,0.9)", label: "Available" },
  vip: { color: "#c8a24a", ring: "rgba(231,205,140,0.95)", label: "VIP" },
  window: { color: "#4a6fa5", ring: "rgba(120,170,240,0.9)", label: "Window" },
  garden: { color: "#5a7d4a", ring: "rgba(150,210,120,0.9)", label: "Garden" },
  taken: { color: "#3a2a2a", ring: "rgba(150,90,90,0.5)", label: "Occupied" },
};

function todayISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function Reservation({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    guests: 2,
    date: "",
    time: "",
    occasion: "None",
    request: "",
  });
  const [table, setTable] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, date: f.date || todayISO() }));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const bookingCode = useMemo(
    () => "LLU-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    [status === "done"] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone || !form.email) {
      setError("Please fill in your name, phone and email.");
      return;
    }
    if (!form.time) {
      setError("Please choose a time slot.");
      return;
    }
    if (!table) {
      setError("Please select a table from the floor plan.");
      return;
    }
    setStatus("loading");
    // Simulated booking — persisted to localStorage for the demo.
    setTimeout(() => {
      try {
        const record = { ...form, table, code: bookingCode, at: Date.now() };
        const prev = JSON.parse(localStorage.getItem("lluci_bookings") || "[]");
        localStorage.setItem(
          "lluci_bookings",
          JSON.stringify([record, ...prev].slice(0, 20))
        );
      } catch {}
      setStatus("done");
    }, 1400);
  };

  const reset = () => {
    setStatus("idle");
    setTable(null);
    setForm({
      name: "", phone: "", email: "", guests: 2,
      date: todayISO(), time: "", occasion: "None", request: "",
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[97] flex items-start justify-center overflow-y-auto p-3 py-6 md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-obsidian/85 backdrop-blur-2xl" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Reserve a table"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative z-10 my-auto w-full max-w-5xl overflow-hidden rounded-3xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-30 rounded-full border border-white/15 bg-obsidian/50 p-2.5 text-cream hover:border-gold hover:text-gold"
            >
              <X size={18} />
            </button>

            {status === "done" ? (
                /* ---------- Confirmation ---------- */
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center px-8 py-20 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-goldlight to-gold shadow-[0_0_60px_rgba(200,162,74,0.6)]"
                  >
                    <Check size={44} className="text-ink" strokeWidth={3} />
                  </motion.div>
                  <h3 className="mt-8 font-display text-4xl text-cream md:text-5xl">
                    Your Table Awaits
                  </h3>
                  <p className="mt-4 max-w-md text-cream/65">
                    Thank you, {form.name.split(" ")[0]}. A confirmation has been
                    sent to <span className="text-gold">{form.email}</span>.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4 text-left sm:grid-cols-4">
                    {[
                      ["Booking", bookingCode],
                      ["Table", table],
                      ["Date", form.date],
                      ["Time", form.time],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <div className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/45">{k}</div>
                        <div className="mt-1 text-sm text-cream">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-9 flex gap-3">
                    <button onClick={reset} className="btn-ghost rounded-full px-6 py-3 text-sm">
                      Book Another
                    </button>
                    <button onClick={onClose} className="btn-gold rounded-full px-6 py-3 text-sm">
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ---------- Booking form ---------- */
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid max-h-[88vh] overflow-y-auto lg:grid-cols-[1.05fr_1fr]"
                >
                  {/* Left — details */}
                  <div className="border-b border-white/8 p-7 md:p-9 lg:border-b-0 lg:border-r">
                    <span className="overline text-gold">Reservation</span>
                    <h3 className="mt-3 font-display text-4xl text-cream">
                      Reserve Your Evening
                    </h3>
                    <p className="mt-2 text-sm text-cream/55">
                      Tables are limited each service. We'll hold yours for 15
                      minutes past the hour.
                    </p>

                    <div className="mt-7 space-y-4">
                      <Field label="Full Name">
                        <input required value={form.name} onChange={set("name")}
                          placeholder="e.g. Aarav Sharma" className={inputCls} />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Phone">
                          <input required value={form.phone} onChange={set("phone")}
                            inputMode="tel" placeholder="+91 …" className={inputCls} />
                        </Field>
                        <Field label="Email">
                          <input required type="email" value={form.email} onChange={set("email")}
                            placeholder="you@email.com" className={inputCls} />
                        </Field>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Guests" icon={<Users size={13} />}>
                          <div className="flex items-center gap-2">
                            <StepBtn onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))}>–</StepBtn>
                            <span className="w-8 text-center font-display text-2xl text-cream">{form.guests}</span>
                            <StepBtn onClick={() => setForm((f) => ({ ...f, guests: Math.min(20, f.guests + 1) }))}>+</StepBtn>
                          </div>
                        </Field>
                        <Field label="Date" icon={<Calendar size={13} />}>
                          <input type="date" min={todayISO()} value={form.date} onChange={set("date")}
                            className={inputCls} />
                        </Field>
                      </div>

                      <Field label="Time" icon={<Clock size={13} />}>
                        <div className="flex flex-wrap gap-2">
                          {TIME_SLOTS.map((t) => (
                            <button type="button" key={t} onClick={() => setForm((f) => ({ ...f, time: t }))}
                              className={`rounded-full border px-3.5 py-2 text-xs transition-all ${
                                form.time === t
                                  ? "border-gold bg-gold/15 text-gold shadow-[0_0_18px_rgba(200,162,74,0.4)]"
                                  : "border-white/12 text-cream/60 hover:border-gold/50"
                              }`}>
                              {t}
                            </button>
                          ))}
                        </div>
                      </Field>

                      <Field label="Occasion" icon={<PartyPopper size={13} />}>
                        <div className="flex flex-wrap gap-2">
                          {OCCASIONS.map((o) => (
                            <button type="button" key={o} onClick={() => setForm((f) => ({ ...f, occasion: o }))}
                              className={`rounded-full border px-3.5 py-2 text-xs transition-all ${
                                form.occasion === o
                                  ? "border-gold bg-gold/15 text-gold"
                                  : "border-white/12 text-cream/60 hover:border-gold/50"
                              }`}>
                              {o}
                            </button>
                          ))}
                        </div>
                      </Field>

                      <Field label="Special Request">
                        <textarea value={form.request} onChange={set("request")} rows={2}
                          placeholder="Allergies, seating preference, celebrations…"
                          className={`${inputCls} resize-none`} />
                      </Field>
                    </div>
                  </div>

                  {/* Right — live table visualizer */}
                  <div className="p-7 md:p-9">
                    <div className="flex items-center gap-2">
                      <Armchair size={16} className="text-gold" />
                      <span className="overline text-gold">Live Floor Plan</span>
                    </div>
                    <p className="mt-3 text-sm text-cream/55">
                      Tap a table to select. {table ? (
                        <span className="text-gold">Selected {table}.</span>
                      ) : "Grey tables are occupied."}
                    </p>

                    <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c11]">
                      {/* floor ambience */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(200,162,74,0.08),transparent_70%)]" />
                      <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full border border-white/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-cream/40">
                        Entrance
                      </div>

                      {TABLES.map((t) => {
                        const meta = STATUS_META[t.status];
                        const disabled = t.status === "taken";
                        const selected = table === t.id;
                        return (
                          <button
                            type="button"
                            key={t.id}
                            disabled={disabled}
                            onClick={() => setTable(t.id)}
                            aria-label={`Table ${t.id}, ${t.seats} seats, ${meta.label}`}
                            className="group absolute -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${t.x + 6}%`, top: `${t.y + 8}%` }}
                          >
                            <motion.span
                              animate={selected ? { scale: [1, 1.18, 1.1] } : { scale: 1 }}
                              transition={{ duration: 0.5 }}
                              className="flex items-center justify-center rounded-lg text-[0.6rem] font-medium"
                              style={{
                                width: t.seats > 4 ? 46 : 34,
                                height: t.seats > 4 ? 46 : 34,
                                background: meta.color,
                                color: t.status === "vip" ? "#14110a" : "#e9e4d8",
                                border: `1.5px solid ${selected ? "#fff" : meta.ring}`,
                                boxShadow: selected
                                  ? `0 0 22px ${meta.ring}`
                                  : disabled ? "none" : `0 0 0 rgba(0,0,0,0)`,
                                opacity: disabled ? 0.45 : 1,
                                cursor: disabled ? "not-allowed" : "pointer",
                                transition: "box-shadow .4s, transform .3s",
                              }}
                            >
                              {t.seats}
                            </motion.span>
                          </button>
                        );
                      })}
                    </div>

                    {/* legend */}
                    <div className="mt-4 flex flex-wrap gap-3 text-[0.65rem] text-cream/55">
                      {Object.entries(STATUS_META).map(([k, m]) => (
                        <span key={k} className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: m.color }} />
                          {m.label}
                        </span>
                      ))}
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
                      >
                        {error}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      data-cursor="link"
                      className="btn-gold mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Securing your table…
                        </>
                      ) : (
                        "Confirm Reservation"
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-cream/40">
                      Demo booking · no payment required
                    </p>
                  </div>
                </motion.form>
              )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none transition focus:border-gold/60 focus:bg-white/[0.05]";

function Field({ label, icon, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-cream/45">
        {icon} {label}
      </span>
      {children}
    </label>
  );
}

function StepBtn({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-lg text-cream/80 transition hover:border-gold hover:text-gold"
    >
      {children}
    </button>
  );
}
