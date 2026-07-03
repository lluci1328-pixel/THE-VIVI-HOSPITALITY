"use client";

import { motion } from "framer-motion";

/* ---------- Area / line chart ---------- */
export function AreaChart({ data, height = 180, stroke = "#2e7bff", fill = "rgba(46,123,255,0.18)" }) {
  const w = 640, h = height, pad = 8;
  const max = Math.max(1, ...data.map((d) => d.value));
  const step = (w - pad * 2) / Math.max(1, data.length - 1);
  const pts = data.map((d, i) => [pad + i * step, h - pad - (d.value / max) * (h - pad * 2)]);
  const line = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${line} L${pts[pts.length - 1][0]},${h - pad} L${pts[0][0]},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => <line key={g} x1={pad} x2={w - pad} y1={h * g} y2={h * g} stroke="rgba(255,255,255,0.05)" />)}
      <motion.path d={area} fill="url(#area-grad)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
      <motion.path d={line} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
      {pts.map((p, i) => (
        <motion.circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#05060d" stroke={stroke} strokeWidth="2"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.06 }} />
      ))}
    </svg>
  );
}

/* ---------- Horizontal bars ---------- */
export function Bars({ data }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-silver/70">{d.label}</span>
            <span className="text-silver/50">{d.display}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
            <motion.div className="h-full rounded-full" style={{ background: d.color || "#2e7bff" }}
              initial={{ width: 0 }} whileInView={{ width: `${(d.value / max) * 100}%` }} viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Donut ---------- */
export function Donut({ segments, size = 176, thickness = 20 }) {
  const total = Math.max(1, segments.reduce((s, x) => s + x.value, 0));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const el = (
            <motion.circle key={s.label} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.color} strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} strokeLinecap="butt"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }} />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-3xl text-mist">{total}</div>
        <div className="text-[0.6rem] uppercase tracking-[0.18em] text-silver/45">Total</div>
      </div>
    </div>
  );
}

/* ---------- Ring gauge (occupancy) ---------- */
export function Ring({ value, size = 150, thickness = 12, color = "#2e7bff", label }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={thickness} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} whileInView={{ strokeDashoffset: c - (value / 100) * c }}
          viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-3xl text-mist">{value}%</div>
        {label && <div className="text-[0.6rem] uppercase tracking-[0.18em] text-silver/45">{label}</div>}
      </div>
    </div>
  );
}
