"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Camera, Utensils, Music, Check, Users } from "lucide-react";
import PageFrame from "@/components/vivi/PageFrame";
import PageHero from "@/components/vivi/PageHero";
import { useBooking } from "@/components/vivi/BookingProvider";
import { Reveal, Tilt, Counter } from "@/components/ui";
import { IMG } from "@/data/vivi";
import { WEDDING_VENUES, WEDDING_PACKAGES, WEDDING_TIMELINE, WEDDING_GALLERY } from "@/data/experiences";

const ACCENT = "#67e8f9";

export default function WeddingsPage() {
  return <PageFrame><WeddingsContent /></PageFrame>;
}

function WeddingsContent() {
  const { openBooking } = useBooking();
  return (
    <>
      <PageHero img="1519741497674-611481863552" kicker="Weddings at VIVI" titleTop="Say Forever" titleBottom="in Style"
        subtitle="From intimate rooftop vows to 800-guest ballroom galas, our wedding atelier choreographs every moment — décor, cuisine, film and light."
        accent={ACCENT} shape="torus" scrollTo="#venues"
        primary={{ label: "Plan Your Wedding", onClick: () => openBooking("wedding") }} secondary={{ label: "Explore Venues" }} />

      <div id="page-body" />

      {/* highlights */}
      <section className="relative bg-base py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4 lg:pl-[calc(80px+3vw)]">
          {[[Heart, 800, "+", "Max Guests"], [Utensils, 40, "+", "Banquet Menus"], [Camera, 1, "", "In-house Film Team"], [Music, 12, "+", "Live Acts"]].map(([Icon, v, s, l], i) => (
            <Reveal key={l} delay={i * 0.08} className="text-center">
              <Icon size={22} className="mx-auto" style={{ color: ACCENT }} />
              <div className="mt-3 font-display text-4xl text-mist"><Counter value={v} suffix={s} /></div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-silver/50">{l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* venues */}
      <section id="venues" className="relative bg-base py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="mb-14 max-w-2xl">
            <Reveal><span className="overline" style={{ color: ACCENT }}>Three Venues</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-7xl">A Stage for <span className="italic" style={{ color: ACCENT }}>Every Story</span></h2></Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {WEDDING_VENUES.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.1}>
                <Tilt max={7}>
                  <div className="card-lift group relative h-[460px] overflow-hidden rounded-2xl border border-white/8">
                    <Image src={IMG(v.img, 700, 78)} alt={v.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="flex items-center gap-2 text-xs" style={{ color: ACCENT }}><Users size={14} /> Up to {v.cap} guests</div>
                      <h3 className="mt-2 font-display text-3xl text-mist">{v.name}</h3>
                      <p className="mt-2 max-h-0 overflow-hidden text-sm text-silver/70 opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100">{v.desc}</p>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* packages */}
      <section className="relative border-y border-white/8 bg-panel/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="mb-14 text-center">
            <Reveal><span className="overline" style={{ color: ACCENT }}>Curated Packages</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-6xl">All-Inclusive, <span className="italic" style={{ color: ACCENT }}>Zero Stress</span></h2></Reveal>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {WEDDING_PACKAGES.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div className={`relative flex h-full flex-col rounded-3xl border p-7 ${p.popular ? "border-cyan/40 bg-cyan/[0.05]" : "border-white/8 bg-panel/40"}`}>
                  {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-medium text-[#05060d]" style={{ background: ACCENT }}>Most Chosen</span>}
                  <h3 className="font-display text-3xl text-mist">{p.name}</h3>
                  <div className="mt-1 text-sm text-silver/50">{p.guests}</div>
                  <div className="mt-4 font-display text-4xl" style={{ color: ACCENT }}>₹{(p.price / 100000).toFixed(1)}L<span className="text-sm text-silver/40"> starting</span></div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.features.map((f) => <li key={f} className="flex items-center gap-2.5 text-sm text-silver/75"><Check size={15} style={{ color: ACCENT }} /> {f}</li>)}
                  </ul>
                  <button onClick={() => openBooking("wedding")} className="mt-7 rounded-full py-3.5 text-sm font-medium text-[#05060d] transition hover:opacity-90" style={{ background: ACCENT }}>Enquire Now</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="relative bg-base py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="mb-14 max-w-2xl">
            <Reveal><span className="overline" style={{ color: ACCENT }}>How It Works</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-6xl">From Vision to <span className="italic" style={{ color: ACCENT }}>Vows</span></h2></Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {WEDDING_TIMELINE.map((t, i) => (
              <Reveal key={t.step} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-white/8 bg-panel/40 p-6">
                  <div className="font-display text-5xl" style={{ color: `${ACCENT}44` }}>{t.step}</div>
                  <h3 className="mt-3 font-display text-2xl text-mist">{t.title}</h3>
                  <p className="mt-2 text-sm text-silver/60">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="relative bg-base pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3">
            {WEDDING_GALLERY.map((g, i) => (
              <motion.div key={g} initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-2xl border border-white/8 ${i % 5 === 0 ? "row-span-2" : ""}`}>
                <Image src={IMG(g, 700, 76)} alt="Wedding" fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1.1s] group-hover:translate-x-[120%]" />
              </motion.div>
            ))}
          </div>
          <Reveal delay={0.1}><div className="mt-12 text-center"><button onClick={() => openBooking("wedding")} className="btn-primary rounded-full px-10 py-4 text-base" style={{ background: `linear-gradient(120deg, ${ACCENT}, ${ACCENT}cc)` }}>Begin Your Wedding Journey</button></div></Reveal>
        </div>
      </section>
    </>
  );
}
