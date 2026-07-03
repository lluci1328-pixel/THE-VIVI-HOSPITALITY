"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, IndianRupee, PieChart, Building2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { AreaChart, Bars, Donut } from "@/components/admin/charts";
import { loadRecords, computeMetrics, TYPE_META, fmtK, fmtINR } from "@/lib/adminData";

export default function AnalyticsPage() {
  const [records, setRecords] = useState(null);
  useEffect(() => { setRecords(loadRecords()); }, []);
  const m = useMemo(() => (records ? computeMetrics(records) : null), [records]);

  // revenue trend (weekly rev)
  const revTrend = m ? m.weeks.map((w) => ({ label: w.label, value: Math.round(w.rev / 1000) })) : [];

  // segment revenue bars
  const segBars = m ? Object.entries(m.byType).filter(([k, v]) => k !== "enquiry" && v > 0).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ label: TYPE_META[k].label, value: v, display: fmtK(v), color: TYPE_META[k].color })) : [];

  // source donut (hotel vs restaurant)
  const sources = useMemo(() => {
    if (!records) return [];
    const hotel = records.filter((r) => r.source === "hotel").length;
    const rest = records.filter((r) => r.source === "restaurant").length;
    return [{ label: "Hotel", value: hotel, color: "#2e7bff" }, { label: "Restaurant", value: rest, color: "#8b5cf6" }];
  }, [records]);

  // top rooms
  const topRooms = useMemo(() => {
    if (!records) return [];
    const map = {};
    records.filter((r) => r.type === "room" && r.roomType).forEach((r) => {
      map[r.roomType] = map[r.roomType] || { name: r.roomType, count: 0, rev: 0 };
      map[r.roomType].count += 1; map[r.roomType].rev += r.amount;
    });
    return Object.values(map).sort((a, b) => b.rev - a.rev).slice(0, 6);
  }, [records]);
  const maxRoomRev = Math.max(1, ...topRooms.map((r) => r.rev));

  return (
    <AdminShell title="Analytics" subtitle="Performance across every revenue stream">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi icon={<IndianRupee size={16} />} label="Total Revenue" value={m ? fmtK(m.revenue) : "—"} tone="#2e7bff" />
        <Kpi icon={<TrendingUp size={16} />} label="Pipeline" value={m ? fmtK(m.pipeline) : "—"} tone="#6d6ef6" />
        <Kpi icon={<PieChart size={16} />} label="Conversion" value={m ? m.conversion + "%" : "—"} tone="#67e8f9" />
        <Kpi icon={<Building2 size={16} />} label="Occupancy" value={m ? m.occupancy + "%" : "—"} tone="#34d399" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Revenue Trend" hint="₹ thousands · last 8 weeks">
          {m ? <AreaChart data={revTrend} stroke="#34d399" fill="rgba(52,211,153,0.18)" /> : <Sk h={180} />}
          <div className="mt-2 flex justify-between px-2 text-[0.6rem] text-silver/40">{m ? revTrend.map((w) => <span key={w.label}>{w.label}</span>) : null}</div>
        </Panel>
        <Panel title="Booking Source" hint="Hotel vs Restaurant">
          <div className="flex flex-col items-center gap-4">
            {m ? <Donut segments={sources} /> : <Sk h={176} circle />}
            <div className="flex gap-5">
              {sources.map((s) => <div key={s.label} className="flex items-center gap-2 text-xs text-silver/60"><span className="h-2 w-2 rounded-full" style={{ background: s.color }} /> {s.label}</div>)}
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel title="Revenue by Segment" hint="All streams">
          {m ? <Bars data={segBars} /> : <Sk h={200} />}
        </Panel>
        <Panel title="Top Performing Rooms" hint="By revenue">
          {!records ? <Sk h={200} /> : (
            <div className="space-y-3">
              {topRooms.map((r, i) => (
                <motion.div key={r.name} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-silver/80">{r.name} <span className="text-silver/40">· {r.count} bookings</span></span>
                    <span className="text-mist">{fmtK(r.rev)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-electric to-azure" initial={{ width: 0 }} whileInView={{ width: `${(r.rev / maxRoomRev) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.06 }} />
                  </div>
                </motion.div>
              ))}
              {topRooms.length === 0 && <div className="py-8 text-center text-sm text-silver/40">No room bookings yet.</div>}
            </div>
          )}
        </Panel>
      </div>
    </AdminShell>
  );
}

function Kpi({ icon, label, value, tone }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/8 bg-panel/40 p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${tone}1f`, color: tone }}>{icon}</span>
      <div className="mt-3 font-display text-3xl text-mist">{value}</div>
      <div className="text-[0.68rem] uppercase tracking-[0.14em] text-silver/45">{label}</div>
    </motion.div>
  );
}
function Panel({ title, hint, children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/8 bg-panel/40 p-5 ${className}`}>
      <div className="mb-4"><h3 className="font-display text-xl text-mist">{title}</h3>{hint && <p className="text-[0.65rem] uppercase tracking-wider text-silver/40">{hint}</p>}</div>
      {children}
    </div>
  );
}
function Sk({ h = 160, circle }) {
  return <div className={`animate-pulse bg-white/5 ${circle ? "rounded-full" : "rounded-xl"}`} style={{ height: h, width: circle ? h : "100%", margin: circle ? "0 auto" : 0 }} />;
}
