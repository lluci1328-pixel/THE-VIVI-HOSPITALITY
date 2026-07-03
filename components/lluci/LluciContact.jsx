"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Check, Send } from "lucide-react";
import { Reveal } from "../ui";

const INFO = [
  { icon: MapPin, label: "Location", value: "Level 2, THE VIVI · 1 Aurum Boulevard, Mumbai" },
  { icon: Phone, label: "Reservations", value: "+91 12345 66666" },
  { icon: Mail, label: "Email", value: "table@lluci.com" },
  { icon: Clock, label: "Dinner", value: "Tue–Sun · 6:00 PM – 11:30 PM" },
];

export default function LluciContact({ onReserve }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    try { const prev = JSON.parse(localStorage.getItem("lluci_enquiries") || "[]"); localStorage.setItem("lluci_enquiries", JSON.stringify([{ ...form, at: Date.now() }, ...prev].slice(0, 20))); } catch {}
    setSent(true); setForm({ name: "", email: "", message: "" }); setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0c0906] py-28 md:py-36">
      <div className="glow-blob" style={{ left: "-6%", bottom: "0%", width: 440, height: 440, background: "radial-gradient(circle, rgba(224,138,60,0.1), transparent 70%)" }} />
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-6 lg:grid-cols-2">
        <div>
          <Reveal><span className="overline-gold">Find Us</span></Reveal>
          <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-[#f3ece0] md:text-6xl">An Address Worth <span className="text-gold italic">the Journey</span></h2></Reveal>
          <div className="mt-9 space-y-4">
            {INFO.map((i, idx) => (
              <Reveal key={i.label} delay={idx * 0.07}>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c8a24a]/25 bg-[#c8a24a]/5 text-[#c8a24a]"><i.icon size={17} /></span>
                  <div><div className="text-xs uppercase tracking-[0.18em] text-[#f3ece0]/45">{i.label}</div><div className="mt-1 text-[#f3ece0]/90">{i.value}</div></div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}><button onClick={onReserve} className="btn-gold mt-9 rounded-full px-8 py-3.5">Reserve a Table</button></Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="glass-gold rounded-3xl p-7 md:p-8">
            <label className="block"><span className="mb-2 block text-[0.68rem] uppercase tracking-[0.18em] text-[#f3ece0]/45">Name</span><input required value={form.name} onChange={set("name")} className={inp} placeholder="Your name" /></label>
            <label className="mt-4 block"><span className="mb-2 block text-[0.68rem] uppercase tracking-[0.18em] text-[#f3ece0]/45">Email</span><input required type="email" value={form.email} onChange={set("email")} className={inp} placeholder="you@email.com" /></label>
            <label className="mt-4 block"><span className="mb-2 block text-[0.68rem] uppercase tracking-[0.18em] text-[#f3ece0]/45">Message</span><textarea rows={4} value={form.message} onChange={set("message")} className={`${inp} resize-none`} placeholder="Private events, press, or a special request…" /></label>
            <button type="submit" className="btn-gold mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base">{sent ? <><Check size={18} /> Message Sent</> : <><Send size={17} /> Send Enquiry</>}</button>
            {sent && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-sm text-[#c8a24a]">Thank you — we'll be in touch shortly.</motion.p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inp = "w-full rounded-xl border border-[#c8a24a]/12 bg-[#c8a24a]/[0.03] px-4 py-3 text-sm text-[#f3ece0] placeholder:text-[#f3ece0]/30 outline-none transition focus:border-[#c8a24a]/60 focus:bg-[#c8a24a]/[0.05]";
