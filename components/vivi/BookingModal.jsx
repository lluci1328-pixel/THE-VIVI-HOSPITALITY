"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Check, Users, Calendar, Clock, PartyPopper, Loader2,
  ChevronRight, ChevronLeft, MapPin, Sparkles,
} from "lucide-react";
import { BOOKING_TYPES, ROOMS, TIME_SLOTS, OCCASIONS } from "@/data/vivi";

function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

const VENUES = ["The Grand Ballroom", "Skyline Terrace", "Garden Pavilion", "The Atrium"];
const CONF_ROOMS = ["Boardroom (12)", "Summit Hall (60)", "Auditorium (220)", "Business Lounge (30)"];

export default function BookingModal({ open, type, preset, onClose }) {
  const cfg = BOOKING_TYPES[type] || BOOKING_TYPES.room;
  const [step, setStep] = useState(0); // 0 details · 1 summary · 2 confirmation
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState(() => base(preset));

  function base(p = {}) {
    return {
      name: "", phone: "", email: "", address: "",
      guests: 2,
      checkIn: addDays(2), checkOut: addDays(4),
      date: addDays(2), time: "",
      roomType: p.roomType || ROOMS[0].name,
      venue: VENUES[0], confRoom: CONF_ROOMS[1], occasion: "None",
      requests: "",
      ...p,
    };
  }

  // Reset whenever a new booking is opened.
  useEffect(() => {
    if (open) {
      setForm(base(preset));
      setStep(0);
      setStatus("idle");
      setError("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, type]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && open && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const code = useMemo(
    () => "VIVI-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    [status === "done"] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const nights = useMemo(() => {
    if (type !== "room") return 0;
    const a = new Date(form.checkIn), b = new Date(form.checkOut);
    return Math.max(1, Math.round((b - a) / 86400000));
  }, [form.checkIn, form.checkOut, type]);

  const roomObj = ROOMS.find((r) => r.name === form.roomType) || ROOMS[0];
  const estTotal = type === "room" ? roomObj.price * nights : null;

  const validateDetails = () => {
    if (!form.name || !form.phone || !form.email) {
      setError("Please share your name, phone and email.");
      return false;
    }
    if (cfg.fields.includes("time") && !form.time) {
      setError("Please pick a time slot.");
      return false;
    }
    if (type === "room" && new Date(form.checkOut) <= new Date(form.checkIn)) {
      setError("Check-out must be after check-in.");
      return false;
    }
    setError("");
    return true;
  };

  const next = () => {
    if (step === 0 && !validateDetails()) return;
    setStep((s) => Math.min(2, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const confirm = () => {
    setStatus("loading");
    setTimeout(() => {
      try {
        const rec = { type, ...form, code, at: Date.now() };
        const prev = JSON.parse(localStorage.getItem("vivi_bookings") || "[]");
        localStorage.setItem("vivi_bookings", JSON.stringify([rec, ...prev].slice(0, 30)));
      } catch {}
      setStatus("done");
      setStep(2);
    }, 1400);
  };

  const summaryRows = useMemo(() => {
    const r = [["Guest", form.name || "—"], ["Contact", form.phone || "—"]];
    if (type === "room") {
      r.push(["Room", form.roomType], ["Check-in", form.checkIn], ["Check-out", form.checkOut], ["Nights", String(nights)], ["Guests", String(form.guests)]);
    } else if (type === "table") {
      r.push(["Date", form.date], ["Time", form.time || "—"], ["Guests", String(form.guests)], ["Occasion", form.occasion]);
    } else if (type === "wedding") {
      r.push(["Event Date", form.date], ["Venue", form.venue], ["Guests", String(form.guests)]);
    } else if (type === "corporate") {
      r.push(["Date", form.date], ["Space", form.confRoom], ["Attendees", String(form.guests)]);
    } else if (type === "spa" || type === "gym") {
      r.push(["Date", form.date], ["Time", form.time || "—"], ["Guests", String(form.guests)]);
    }
    return r;
  }, [form, type, nights]);

  const StepCounter = ({ n }) => (
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-sky/30 text-xs text-sky">{n}</span>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[97] flex items-start justify-center overflow-y-auto p-3 py-6 md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-base/85 backdrop-blur-2xl" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={cfg.title}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative z-10 my-auto w-full max-w-2xl overflow-hidden rounded-3xl"
          >
            {/* glow header */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-electric/25 blur-3xl" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-30 rounded-full border border-white/15 bg-base/50 p-2.5 text-mist transition hover:border-sky hover:text-sky"
            >
              <X size={18} />
            </button>

            {/* Header + steps */}
            <div className="relative px-7 pt-7 md:px-9">
              <span className="overline text-sky">{cfg.kicker}</span>
              <h3 className="mt-2 font-display text-3xl text-mist md:text-4xl">{cfg.title}</h3>
              {status !== "done" && (
                <div className="mt-5 flex items-center gap-3 text-xs text-silver/60">
                  <span className={`flex items-center gap-2 ${step >= 0 ? "text-sky" : ""}`}><StepCounter n={1} /> Details</span>
                  <span className="h-px w-6 bg-white/15" />
                  <span className={`flex items-center gap-2 ${step >= 1 ? "text-sky" : ""}`}><StepCounter n={2} /> Review</span>
                  <span className="h-px w-6 bg-white/15" />
                  <span className={`flex items-center gap-2 ${step >= 2 ? "text-sky" : ""}`}><StepCounter n={3} /> Confirm</span>
                </div>
              )}
            </div>

            <div className="relative max-h-[70vh] overflow-y-auto px-7 py-6 md:px-9">
              {/* STEP 0 — details */}
              {step === 0 && status !== "done" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name"><input className={inp} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Aarav Sharma" /></Field>
                    <Field label="Phone"><input className={inp} value={form.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" placeholder="+91 …" /></Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email"><input type="email" className={inp} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" /></Field>
                    <Field label="Address (optional)"><input className={inp} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="City, Country" /></Field>
                  </div>

                  {/* Type specific */}
                  {type === "room" && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Check-in" icon={<Calendar size={13} />}><input type="date" min={addDays(0)} className={inp} value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} /></Field>
                      <Field label="Check-out" icon={<Calendar size={13} />}><input type="date" min={addDays(1)} className={inp} value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} /></Field>
                      <Field label="Room Type" icon={<Sparkles size={13} />}>
                        <select className={inp} value={form.roomType} onChange={(e) => set("roomType", e.target.value)}>
                          {ROOMS.map((r) => <option key={r.id} value={r.name}>{r.name} — ₹{r.price.toLocaleString("en-IN")}/night</option>)}
                        </select>
                      </Field>
                      <Guests value={form.guests} onChange={(v) => set("guests", v)} />
                    </div>
                  )}

                  {(type === "table" || type === "spa" || type === "gym") && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Date" icon={<Calendar size={13} />}><input type="date" min={addDays(0)} className={inp} value={form.date} onChange={(e) => set("date", e.target.value)} /></Field>
                        <Guests value={form.guests} onChange={(v) => set("guests", v)} />
                      </div>
                      <Field label="Time" icon={<Clock size={13} />}>
                        <div className="flex flex-wrap gap-2">
                          {TIME_SLOTS.map((t) => (
                            <button key={t} type="button" onClick={() => set("time", t)}
                              className={`rounded-full border px-3.5 py-2 text-xs transition-all ${form.time === t ? "border-sky bg-sky/15 text-sky shadow-[0_0_18px_rgba(124,192,255,0.4)]" : "border-white/12 text-silver/70 hover:border-sky/50"}`}>{t}</button>
                          ))}
                        </div>
                      </Field>
                      {type === "table" && (
                        <Field label="Occasion" icon={<PartyPopper size={13} />}>
                          <div className="flex flex-wrap gap-2">
                            {OCCASIONS.map((o) => (
                              <button key={o} type="button" onClick={() => set("occasion", o)}
                                className={`rounded-full border px-3.5 py-2 text-xs transition-all ${form.occasion === o ? "border-sky bg-sky/15 text-sky" : "border-white/12 text-silver/70 hover:border-sky/50"}`}>{o}</button>
                            ))}
                          </div>
                        </Field>
                      )}
                    </>
                  )}

                  {type === "wedding" && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Event Date" icon={<Calendar size={13} />}><input type="date" min={addDays(7)} className={inp} value={form.date} onChange={(e) => set("date", e.target.value)} /></Field>
                      <Field label="Venue" icon={<MapPin size={13} />}>
                        <select className={inp} value={form.venue} onChange={(e) => set("venue", e.target.value)}>{VENUES.map((v) => <option key={v}>{v}</option>)}</select>
                      </Field>
                      <Guests value={form.guests} onChange={(v) => set("guests", v)} label="Estimated Guests" max={800} step={20} />
                    </div>
                  )}

                  {type === "corporate" && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Date" icon={<Calendar size={13} />}><input type="date" min={addDays(1)} className={inp} value={form.date} onChange={(e) => set("date", e.target.value)} /></Field>
                      <Field label="Space" icon={<MapPin size={13} />}>
                        <select className={inp} value={form.confRoom} onChange={(e) => set("confRoom", e.target.value)}>{CONF_ROOMS.map((v) => <option key={v}>{v}</option>)}</select>
                      </Field>
                      <Guests value={form.guests} onChange={(v) => set("guests", v)} label="Attendees" max={250} step={5} />
                    </div>
                  )}

                  <Field label="Special Requests">
                    <textarea rows={2} className={`${inp} resize-none`} value={form.requests} onChange={(e) => set("requests", e.target.value)} placeholder="Dietary needs, accessibility, celebrations…" />
                  </Field>
                </motion.div>
              )}

              {/* STEP 1 — summary */}
              {step === 1 && status !== "done" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-3 text-xs uppercase tracking-[0.2em] text-silver/45">Booking Summary</div>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {summaryRows.map(([k, v]) => (
                        <div key={k} className="flex flex-col">
                          <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-silver/40">{k}</dt>
                          <dd className="mt-0.5 text-sm text-mist">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    {form.requests && (
                      <div className="mt-4 border-t border-white/8 pt-3 text-sm text-silver/70">
                        <span className="text-silver/40">Note: </span>{form.requests}
                      </div>
                    )}
                  </div>

                  {estTotal != null && (
                    <div className="mt-4 flex items-center justify-between rounded-2xl border border-sky/20 bg-sky/[0.06] px-5 py-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.16em] text-silver/50">Estimated Total · {nights} nights</div>
                        <div className="text-[0.7rem] text-silver/40">Taxes calculated at checkout · demo</div>
                      </div>
                      <div className="font-display text-3xl text-aurora">₹{estTotal.toLocaleString("en-IN")}</div>
                    </div>
                  )}

                  <div className="mt-4 rounded-xl border border-violet/20 bg-violet/[0.06] px-4 py-3 text-xs text-silver/70">
                    <span className="text-violet">Demo mode</span> — no payment is taken. Confirming creates a sample reservation.
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — confirmation */}
              {status === "done" && (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-8 text-center">
                  <motion.div initial={{ scale: 0, rotate: -25 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky to-electric shadow-[0_0_50px_rgba(46,123,255,0.6)]">
                    <Check size={38} className="text-white" strokeWidth={3} />
                  </motion.div>
                  <h4 className="mt-6 font-display text-3xl text-mist">Reservation Confirmed</h4>
                  <p className="mt-3 max-w-sm text-sm text-silver/65">
                    Thank you, {(form.name || "Guest").split(" ")[0]}. A confirmation has been sent to <span className="text-sky">{form.email}</span>.
                  </p>
                  <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
                    <Info k="Reference" v={code} />
                    {summaryRows.slice(2, 6).map(([k, v]) => <Info key={k} k={k} v={v} />)}
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">{error}</motion.div>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between gap-3 border-t border-white/8 px-7 py-5 md:px-9">
              {status === "done" ? (
                <button onClick={onClose} className="btn-primary ml-auto rounded-full px-8 py-3 text-sm">Done</button>
              ) : (
                <>
                  <button onClick={step === 0 ? onClose : back}
                    className="flex items-center gap-1.5 rounded-full border border-white/12 px-5 py-3 text-sm text-silver/75 transition hover:border-sky/50 hover:text-mist">
                    {step === 0 ? "Cancel" : <><ChevronLeft size={15} /> Back</>}
                  </button>
                  {step < 1 ? (
                    <button onClick={next} className="btn-primary flex items-center gap-1.5 rounded-full px-8 py-3 text-sm">
                      Continue <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button onClick={confirm} disabled={status === "loading"}
                      className="btn-primary flex items-center gap-2 rounded-full px-8 py-3 text-sm disabled:opacity-70">
                      {status === "loading" ? <><Loader2 size={16} className="animate-spin" /> Confirming…</> : "Confirm Booking"}
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inp = "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-mist placeholder:text-silver/30 outline-none transition focus:border-sky/60 focus:bg-white/[0.05]";

function Field({ label, icon, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-silver/45">{icon} {label}</span>
      {children}
    </label>
  );
}

function Guests({ value, onChange, label = "Guests", max = 20, step = 1 }) {
  return (
    <Field label={label} icon={<Users size={13} />}>
      <div className="flex items-center gap-2">
        <StepBtn onClick={() => onChange(Math.max(1, value - step))}>–</StepBtn>
        <span className="w-12 text-center font-display text-2xl text-mist">{value}</span>
        <StepBtn onClick={() => onChange(Math.min(max, value + step))}>+</StepBtn>
      </div>
    </Field>
  );
}

function StepBtn({ children, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-lg text-silver/80 transition hover:border-sky hover:text-sky">{children}</button>
  );
}

function Info({ k, v }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left">
      <div className="text-[0.58rem] uppercase tracking-[0.16em] text-silver/45">{k}</div>
      <div className="mt-0.5 truncate text-sm text-mist">{v}</div>
    </div>
  );
}
