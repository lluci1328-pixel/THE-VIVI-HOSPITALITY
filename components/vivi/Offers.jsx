"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { OFFERS, IMG } from "@/data/vivi";
import { useBooking } from "./BookingProvider";
import { Reveal } from "../ui";

export default function Offers() {
  const { openBooking } = useBooking();
  return (
    <section id="offers" className="relative bg-base py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:pl-[calc(80px+3vw)]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><span className="overline text-sky">Curated Offers</span></Reveal>
            <Reveal delay={0.1}><h2 className="mt-4 font-display text-5xl text-mist md:text-7xl">Reasons to <span className="text-aurora italic">Stay Longer</span></h2></Reveal>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.1}>
              <div className="card-lift group relative h-[440px] overflow-hidden rounded-2xl border border-white/8">
                <Image src={IMG(o.img, 700, 78)} alt={o.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-sky/20 px-3 py-1.5 text-xs text-sky backdrop-blur">{o.tag}</span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-3xl text-mist">{o.title}</h3>
                  <p className="mt-2 text-sm text-silver/70">{o.desc}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-aurora">{o.price}</span>
                    <button onClick={() => openBooking("room")} className="flex items-center gap-1 rounded-full border border-white/15 px-4 py-2 text-xs text-silver/85 transition hover:border-sky hover:text-sky">
                      Claim <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
