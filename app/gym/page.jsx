"use client";

import Image from "next/image";
import { Dumbbell, Clock, Zap } from "lucide-react";
import PageFrame from "@/components/vivi/PageFrame";
import PageHero from "@/components/vivi/PageHero";
import { useBooking } from "@/components/vivi/BookingProvider";
import { Reveal, Tilt } from "@/components/ui";
import { IMG } from "@/data/vivi";
import { GYM_ZONES, GYM_TRAINERS, GYM_CLASSES } from "@/data/experiences";

const ACCENT = "#2e7bff";

export default function GymPage() {
  return <PageFrame><GymContent /></PageFrame>;
}

function GymContent() {
  const { openBooking } = useBooking();
  return (
    <>
      <PageHero img="1534438327276-14e5300c3a48" kicker="Performance Gym" titleTop="Train Like It's" titleBottom="Your Sanctuary"
        subtitle="A full Technogym suite, private coaches, a movement studio and a recovery lab with cryotherapy — open 24 hours, skyline-facing."
        accent={ACCENT} shape="crystal" scrollTo="#zones"
        primary={{ label: "Book a Session", onClick: () => openBooking("gym") }} secondary={{ label: "See Facilities" }} />
      <div id="page-body" />

      {/* zones */}
      <section id="zones" className="relative bg-base py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="mb-14 max-w-2xl">
            <Reveal><span className="overline" style={{ color: ACCENT }}>Four Zones</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-7xl">Every Way to <span className="italic" style={{ color: ACCENT }}>Move</span></h2></Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {GYM_ZONES.map((z, i) => (
              <Reveal key={z.id} delay={(i % 2) * 0.1}>
                <Tilt max={5}>
                  <div className="card-lift group relative h-72 overflow-hidden rounded-2xl border border-white/8">
                    <Image src={IMG(z.img, 800, 78)} alt={z.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="flex items-center gap-2 text-xs" style={{ color: ACCENT }}><Dumbbell size={14} /> {z.name}</div>
                      <p className="mt-2 text-sm text-silver/70">{z.desc}</p>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* class schedule */}
      <section className="relative border-y border-white/8 bg-panel/40 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="mb-12 text-center">
            <Reveal><span className="overline" style={{ color: ACCENT }}>Today's Classes</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-6xl">Reserve Your <span className="italic" style={{ color: ACCENT }}>Spot</span></h2></Reveal>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-base/40">
            {GYM_CLASSES.map((c, i) => {
              const full = c.spots === "Full";
              return (
                <Reveal key={c.name} delay={i * 0.06}>
                  <div className="flex items-center gap-4 border-b border-white/6 px-6 py-4 last:border-0">
                    <div className="w-16 font-display text-2xl" style={{ color: ACCENT }}>{c.time}</div>
                    <div className="flex-1">
                      <div className="text-mist">{c.name}</div>
                      <div className="text-xs text-silver/50">with {c.coach}</div>
                    </div>
                    <span className={`text-xs ${full ? "text-red-400" : "text-emerald-400"}`}>{c.spots}</span>
                    <button onClick={() => !full && openBooking("gym")} disabled={full}
                      className="rounded-full px-5 py-2 text-xs font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-40" style={{ background: full ? "#334155" : ACCENT }}>
                      {full ? "Full" : "Book"}
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* trainers */}
      <section className="relative bg-base py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="mb-14 text-center">
            <Reveal><span className="overline" style={{ color: ACCENT }}>The Team</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-6xl">Coached by the <span className="italic" style={{ color: ACCENT }}>Best</span></h2></Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {GYM_TRAINERS.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <div className="card-lift group relative h-96 overflow-hidden rounded-2xl border border-white/8">
                  <Image src={IMG(t.img, 600, 78)} alt={t.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: ACCENT }}><Zap size={12} /> {t.role}</div>
                    <h3 className="mt-1 font-display text-2xl text-mist">{t.name}</h3>
                    <button onClick={() => openBooking("gym")} className="mt-3 rounded-full border border-white/15 px-4 py-2 text-xs text-silver/85 opacity-0 transition-all duration-500 group-hover:opacity-100 hover:text-mist">Train with {t.name.split(" ")[0]}</button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
