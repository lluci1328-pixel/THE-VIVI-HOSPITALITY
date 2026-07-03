"use client";

const WORDS = [
  "Seasonal Tasting Menus",
  "Rare Cellar",
  "Chef's Table",
  "Table-Side Theatre",
  "Two Michelin Stars",
  "Private Dining",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative border-y border-white/8 bg-obsidian py-6">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8">
            <span className="font-display text-2xl italic text-cream/45 md:text-3xl">
              {w}
            </span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-obsidian to-transparent" />
    </div>
  );
}
