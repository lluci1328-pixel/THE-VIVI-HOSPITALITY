"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IndianRupee, CalendarCheck, BedDouble, TrendingUp, UserPlus, ArrowUpRight, ArrowRight,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { AreaChart, Bars, Donut, Ring } from "@/components/admin/charts";
import {
  loadRecords, computeMetrics, STATUS_META, TYPE_META, fmtK, fmtINR, timeAgo,
} from "@/lib/adminData";

export default function AdminPage() {
  const [records, setRecords] = useState(null);
  useEffect(() => { setRecords(loadRecords()); }, []);
  const m = useMemo(() => (records ? computeMetrics(records) : null), [records]);

  const recent = useMemo(() => (records ? records.filter((r) => r.type !== "enquiry").slice(0, 8) : []), [records]);

  const revenueBars = m ? Object.entries(m.byType).filter(([k]) => k !== "enquiry").map(([k, v]) => ({ label: TYPE_META[k].label, value: v, display: fmtK(v), color: TYPE_META[k].color })) : [];
  const statusSegments = m ? Object.entries(m.statusCounts).map(([k, v]) => ({ label: STATUS_META[k].label, value: v, color: STATUS_META[k].color })) : [];

  return (
    <AdminShell title="Dashboard" subtitle="Live overview · updates as guests book on the site"
      actions={<Link href="/crm" className="hidden rounded-full bg-gradient-to-r from-electric to-azure px-4 py-2 text-xs font-medium text-white md:inline-flex md:items-center md:gap-1.5">Open CRM <ArrowRight size={13} /></Link>}>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Kpi icon={<IndianRupee size={16} />} label="Revenue" value={m ? fmtK(m.revenue) : "—"} delta="+12.4%" tone="#2e7bff" />
        <Kpi icon={<CalendarCheck size={16} />} label="Bookings" value={m ? m.bookings : "—"} delta="+8" tone="#6d6ef6" />
        <Kpi icon={<BedDouble size={16} />} label="Occupancy" value={m ? m.occupancy + "%" : "—"} delta="+3.1%" tone="#67e8f9" />
        <Kpi icon={<TrendingUp size={16} />} label="ADR" value={m ? fmtINR(m.adr) : "—"} delta="+5.0%" tone="#34d399" />
        <Kpi icon={<UserPlus size={16} />} label="New Leads" value={m ? m.leads : "—"} delta="+4" tone="#8b5cf6" />
      </div>

      {/* charts row */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Bookings Trend" hint="Last 8 weeks">
          {m ? <AreaChart data={m.weeks} /> : <Skeleton h={180} />}
          <div className="mt-2 flex justify-between px-2 text-[0.6rem] text-silver/40">{m ? m.weeks.map((w) => <span key={w.label}>{w.label}</span>) : null}</div>
        </Panel>
        <Panel title="Occupancy" hint="Current">
          <div className="flex h-full flex-col items-center justify-center gap-4 py-2">
            {m ? <Ring value={m.occupancy} label="Occupied" /> : <Skeleton h={150} circle />}
            <div className="flex gap-6 text-center">
              <div><div className="font-display text-xl text-mist">{m ? m.bookings : "—"}</div><div className="text-[0.6rem] uppercase tracking-wider text-silver/45">Bookings</div></div>
              <div><div className="font-display text-xl text-mist">{m ? m.conversion + "%" : "—"}</div><div className="text-[0.6rem] uppercase tracking-wider text-silver/45">Conversion</div></div>
            </div>
          </div>
        </Panel>
      </div>

      {/* segments row */}
      <div id="segments" className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Revenue by Segment" hint="Confirmed + completed">
          {m ? <Bars data={revenueBars} /> : <Skeleton h={160} />}
        </Panel>
        <Panel title="Lead Distribution" hint="By stage">
          <div className="flex flex-col items-center gap-4">
            {m ? <Donut segments={statusSegments} /> : <Skeleton h={176} circle />}
            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-1.5">
              {statusSegments.map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-xs text-silver/60">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} /> {s.label} <span className="ml-auto text-silver/40">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* recent bookings */}
      <div id="bookings" className="mt-5">
        <Panel title="Recent Bookings" hint="Newest first"
          action={<Link href="/crm" className="flex items-center gap-1 text-xs text-sky hover:underline">View all in CRM <ArrowUpRight size={13} /></Link>}>
          {!records ? <Skeleton h={220} /> : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/8 text-[0.65rem] uppercase tracking-wider text-silver/40">
                    <th className="pb-3 pr-4 font-medium">Guest</th>
                    <th className="pb-3 pr-4 font-medium">Type</th>
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 pr-4 font-medium">Value</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r, i) => (
                    <motion.tr key={r.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="border-b border-white/5 last:border-0">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-electric to-indigo text-[0.65rem] font-medium text-white">{r.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
                          <div><div className="text-mist">{r.name}</div><div className="text-[0.65rem] text-silver/40">{r.code}</div></div>
                        </div>
                      </td>
                      <td className="pr-4"><span className="rounded-full px-2.5 py-1 text-[0.6rem] uppercase tracking-wide" style={{ background: `${TYPE_META[r.type].color}22`, color: TYPE_META[r.type].color }}>{TYPE_META[r.type].label}</span></td>
                      <td className="pr-4 text-silver/60">{r.date || "—"}</td>
                      <td className="pr-4 text-mist">{r.amount ? fmtINR(r.amount) : "—"}</td>
                      <td className="pr-4"><span className="inline-flex items-center gap-1.5 text-xs" style={{ color: STATUS_META[r.status].color }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_META[r.status].dot }} />{STATUS_META[r.status].label}</span></td>
                      <td className="text-silver/50">{timeAgo(r.createdAt)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>
    </AdminShell>
  );
}

function Kpi({ icon, label, value, delta, tone }) {
  const up = delta.startsWith("+");
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/8 bg-panel/40 p-4">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${tone}1f`, color: tone }}>{icon}</span>
        <span className={`text-xs ${up ? "text-emerald-400" : "text-red-400"}`}>{delta}</span>
      </div>
      <div className="mt-3 font-display text-3xl text-mist">{value}</div>
      <div className="text-[0.68rem] uppercase tracking-[0.14em] text-silver/45">{label}</div>
    </motion.div>
  );
}

function Panel({ title, hint, action, children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/8 bg-panel/40 p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <div><h3 className="font-display text-xl text-mist">{title}</h3>{hint && <p className="text-[0.65rem] uppercase tracking-wider text-silver/40">{hint}</p>}</div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Skeleton({ h = 160, circle }) {
  return <div className={`animate-pulse bg-white/5 ${circle ? "rounded-full" : "rounded-xl"}`} style={{ height: h, width: circle ? h : "100%", margin: circle ? "0 auto" : 0 }} />;
}
