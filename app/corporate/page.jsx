"use client";

import Image from "next/image";
import { Presentation, Wifi, Coffee, Users, Car, Shield, Check } from "lucide-react";
import PageFrame from "@/components/vivi/PageFrame";
import PageHero from "@/components/vivi/PageHero";
import { useBooking } from "@/components/vivi/BookingProvider";
import { Reveal, Tilt } from "@/components/ui";
import { IMG } from "@/data/vivi";
import { CORP_SPACES, CORP_PACKAGES, CORP_FEATURES } from "@/data/experiences";

const ACCENT = "#6d6ef6";
const ICONS = { presentation: Presentation, wifi: Wifi, coffee: Coffee, users: Users, car: Car, shield: Shield };

export default function CorporatePage() {
  return <PageFrame><CorporateContent /></PageFrame>;
}

function CorporateContent() {
  const { openBooking } = useBooking();
  return (
    <>
      <PageHero img="1505373877841-8d25f7d46678" kicker="Business & Conferences" titleTop="Where Deals" titleBottom="Are Made"
        subtitle="Six configurable spaces, enterprise-grade AV and a dedicated events team that runs your day like clockwork — from boardroom to 220-seat auditorium."
        accent={ACCENT} shape="crystal" scrollTo="#spaces"
        primary={{ label: "Book a Corporate Event", onClick: () => openBooking("corporate") }} secondary={{ label: "View Spaces" }} />
      <div id="page-body" />

      {/* spaces */}
      <section id="spaces" className="relative bg-base py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="mb-14 max-w-2xl">
            <Reveal><span className="overline" style={{ color: ACCENT }}>Six Spaces</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-7xl">Configured for <span className="italic" style={{ color: ACCENT }}>Every Agenda</span></h2></Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {CORP_SPACES.map((s, i) => (
              <Reveal key={s.id} delay={(i % 2) * 0.1}>
                <Tilt max={5}>
                  <div className="card-lift group relative h-72 overflow-hidden rounded-2xl border border-white/8">
                    <Image src={IMG(s.img, 800, 78)} alt={s.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="flex items-center gap-2 text-xs" style={{ color: ACCENT }}><Users size={14} /> Up to {s.cap}</div>
                      <h3 className="mt-1.5 font-display text-3xl text-mist">{s.name}</h3>
                      <p className="mt-2 max-h-0 overflow-hidden text-sm text-silver/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">{s.desc}</p>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* features */}
      <section className="relative border-y border-white/8 bg-panel/40 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORP_FEATURES.map((f, i) => {
              const Icon = ICONS[f.icon] || Presentation;
              return (
                <Reveal key={f.label} delay={(i % 3) * 0.08}>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${ACCENT}1f`, color: ACCENT }}><Icon size={19} /></span>
                    <span className="text-sm text-silver/85">{f.label}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* packages */}
      <section className="relative bg-base py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="mb-14 text-center">
            <Reveal><span className="overline" style={{ color: ACCENT }}>Delegate Packages</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-6xl">Simple, <span className="italic" style={{ color: ACCENT }}>Transparent</span></h2></Reveal>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {CORP_PACKAGES.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div className={`relative flex h-full flex-col rounded-3xl border p-7 ${p.popular ? "border-indigo/40 bg-indigo/[0.06]" : "border-white/8 bg-panel/40"}`}>
                  {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-medium text-white" style={{ background: ACCENT }}>Most Popular</span>}
                  <h3 className="font-display text-3xl text-mist">{p.name}</h3>
                  <div className="mt-4 font-display text-4xl" style={{ color: ACCENT }}>₹{p.price.toLocaleString("en-IN")}</div>
                  <div className="text-sm text-silver/50">{p.unit}</div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.features.map((f) => <li key={f} className="flex items-center gap-2.5 text-sm text-silver/75"><Check size={15} style={{ color: ACCENT }} /> {f}</li>)}
                  </ul>
                  <button onClick={() => openBooking("corporate")} className="mt-7 rounded-full py-3.5 text-sm font-medium text-white transition hover:opacity-90" style={{ background: ACCENT }}>Request Proposal</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
