"use client";

import Image from "next/image";
import { Clock, Sparkles, Leaf } from "lucide-react";
import PageFrame from "@/components/vivi/PageFrame";
import PageHero from "@/components/vivi/PageHero";
import { useBooking } from "@/components/vivi/BookingProvider";
import { Reveal, Tilt, Counter } from "@/components/ui";
import { IMG } from "@/data/vivi";
import { SPA_TREATMENTS, SPA_STATS } from "@/data/experiences";

const ACCENT = "#34d399";

export default function SpaPage() {
  return <PageFrame><SpaContent /></PageFrame>;
}

function SpaContent() {
  const { openBooking } = useBooking();
  const feature = SPA_TREATMENTS[0];
  return (
    <>
      <PageHero img="1544161515-4ab6ce6db874" kicker="The VIVI Spa" titleTop="A Sanctuary" titleBottom="Beneath the City"
        subtitle="Descend into a world of hydrotherapy pools, salt caves and gold rituals — engineered to slow time and restore the body."
        accent={ACCENT} shape="crystal" scrollTo="#treatments"
        primary={{ label: "Book a Ritual", onClick: () => openBooking("spa") }} secondary={{ label: "View Treatments" }} />
      <div id="page-body" />

      {/* stats */}
      <section className="relative border-b border-white/8 bg-base py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4 lg:pl-[calc(80px+3vw)]">
          {SPA_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-display text-5xl" style={{ color: ACCENT }}><Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} /></div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-silver/50">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* feature ritual */}
      <section className="relative overflow-hidden bg-base py-24 md:py-32">
        <div className="glow-blob" style={{ left: "-6%", top: "20%", width: 460, height: 460, background: `radial-gradient(circle, ${ACCENT}18, transparent 70%)` }} />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:pl-[calc(80px+3vw)]">
          <Reveal><Tilt max={6}><div className="relative h-[460px] overflow-hidden rounded-3xl border border-white/10">
            <Image src={IMG(feature.img, 800, 80)} alt={feature.name} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </div></Tilt></Reveal>
          <div>
            <Reveal><span className="overline flex items-center gap-2" style={{ color: ACCENT }}><Sparkles size={13} /> Signature Ritual</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-6xl">{feature.name}</h2></Reveal>
            <Reveal delay={0.15}><p className="mt-5 max-w-md text-lg text-silver/65">{feature.desc}</p></Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 flex items-center gap-6">
                <span className="flex items-center gap-2 text-silver/70"><Clock size={16} style={{ color: ACCENT }} /> {feature.time}</span>
                <span className="font-display text-3xl" style={{ color: ACCENT }}>₹{feature.price.toLocaleString("en-IN")}</span>
              </div>
            </Reveal>
            <Reveal delay={0.25}><button onClick={() => openBooking("spa")} className="mt-8 rounded-full px-8 py-3.5 text-sm font-medium text-[#05201a] transition hover:opacity-90" style={{ background: ACCENT }}>Reserve This Ritual</button></Reveal>
          </div>
        </div>
      </section>

      {/* treatments grid */}
      <section id="treatments" className="relative border-y border-white/8 bg-panel/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
          <div className="mb-14 text-center">
            <Reveal><span className="overline" style={{ color: ACCENT }}>The Menu</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-7xl">Rituals for <span className="italic" style={{ color: ACCENT }}>Body & Mind</span></h2></Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SPA_TREATMENTS.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 0.08}>
                <div className="card-lift group overflow-hidden rounded-2xl border border-white/8 bg-base/40">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={IMG(t.img, 600, 78)} alt={t.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-base/70 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-wider" style={{ background: `${ACCENT}22`, color: ACCENT }}>{t.tag}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-2xl text-mist">{t.name}</h3>
                      <span className="whitespace-nowrap font-display text-xl" style={{ color: ACCENT }}>₹{t.price.toLocaleString("en-IN")}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-silver/55">{t.desc}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                      <span className="flex items-center gap-1.5 text-xs text-silver/55"><Clock size={13} style={{ color: ACCENT }} /> {t.time}</span>
                      <button onClick={() => openBooking("spa")} className="rounded-full border border-white/12 px-4 py-2 text-xs text-silver/85 transition hover:text-mist" style={{ borderColor: `${ACCENT}55` }}>Book</button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}><div className="mt-12 flex items-center justify-center gap-2 text-sm text-silver/50"><Leaf size={15} style={{ color: ACCENT }} /> All rituals include sanctuary &amp; hydro-circuit access</div></Reveal>
        </div>
      </section>
    </>
  );
}
