"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Check, Send } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { Reveal } from "../ui";

const INFO = [
  { icon: MapPin, label: "Address", value: "1 Aurum Boulevard, Mumbai 400001" },
  { icon: Phone, label: "Reservations", value: "+91 12345 66666" },
  { icon: Mail, label: "Email", value: "stay@thevivi.com" },
  { icon: Clock, label: "Front Desk", value: "Open 24 hours" },
];

export default function Contact() {
  const { openBooking } = useBooking();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    try {
      const prev = JSON.parse(localStorage.getItem("vivi_enquiries") || "[]");
      localStorage.setItem("vivi_enquiries", JSON.stringify([{ ...form, at: Date.now() }, ...prev].slice(0, 20)));
    } catch {}
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="relative overflow-hidden bg-base py-28 md:py-36">
      <div className="glow-blob" style={{ left: "-6%", bottom: "0%", width: 440, height: 440, background: "radial-gradient(circle, rgba(46,123,255,0.1), transparent 70%)" }} />
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-6 lg:grid-cols-2 lg:pl-[calc(80px+3vw)]">
        <div>
          <Reveal><span className="overline text-sky">Get in Touch</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-6xl">Let's Plan Your <span className="text-aurora italic">Arrival</span></h2></Reveal>
          <Reveal delay={0.15}><p className="mt-5 max-w-md text-silver/60">Our concierge replies within the hour. For instant confirmation, use the live booking flow.</p></Reveal>

          <div className="mt-9 space-y-4">
            {INFO.map((i, idx) => (
              <Reveal key={i.label} delay={idx * 0.07}>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky/25 bg-sky/5 text-sky"><i.icon size={17} /></span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-silver/45">{i.label}</div>
                    <div className="mt-1 text-mist/90">{i.value}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <button onClick={() => openBooking("room")} className="btn-ghost mt-9 rounded-full px-8 py-3.5">Start a Booking Instead</button>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          <form onSubmit={submit} className="glass-card rounded-3xl p-7 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.18em] text-silver/45">Name</span>
                <input required value={form.name} onChange={set("name")} className={inp} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.18em] text-silver/45">Phone</span>
                <input value={form.phone} onChange={set("phone")} className={inp} placeholder="+91 …" inputMode="tel" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.18em] text-silver/45">Email</span>
              <input required type="email" value={form.email} onChange={set("email")} className={inp} placeholder="you@email.com" />
            </label>
            <label className="mt-4 block">
              <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.18em] text-silver/45">Message</span>
              <textarea rows={4} value={form.message} onChange={set("message")} className={`${inp} resize-none`} placeholder="How can we make your stay unforgettable?" />
            </label>

            <button type="submit" className="btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base">
              {sent ? <><Check size={18} /> Message Sent</> : <><Send size={17} /> Send Enquiry</>}
            </button>
            {sent && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-sm text-sky">Thank you — our concierge will be in touch shortly.</motion.p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inp = "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-mist placeholder:text-silver/30 outline-none transition focus:border-sky/60 focus:bg-white/[0.05]";
