"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, ChevronLeft, ChevronRight, X, Phone, Mail, Calendar,
  Users as UsersIcon, IndianRupee, TrendingUp, UserPlus, CheckCircle2, Layers,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import {
  loadRecords, setStatus as persistStatus, setNote as persistNote,
  STATUSES, STATUS_META, TYPE_META, fmtINR, fmtK, timeAgo,
} from "@/lib/adminData";

export default function CrmPage() {
  const [records, setRecords] = useState(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => { setRecords(loadRecords()); }, []);

  const filtered = useMemo(() => {
    if (!records) return [];
    return records.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        return r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || (r.code || "").toLowerCase().includes(q);
      }
      return true;
    });
  }, [records, query, typeFilter]);

  const columns = useMemo(() => {
    const map = {}; STATUSES.forEach((s) => (map[s] = []));
    filtered.forEach((r) => map[r.status]?.push(r));
    return map;
  }, [filtered]);

  const metrics = useMemo(() => {
    if (!records) return {};
    const total = records.length;
    const newLeads = records.filter((r) => r.status === "new").length;
    const pipeline = records.filter((r) => r.status === "new" || r.status === "contacted").reduce((s, r) => s + r.amount, 0);
    const won = records.filter((r) => r.status === "confirmed" || r.status === "completed").length;
    const conversion = total ? Math.round((won / total) * 100) : 0;
    return { total, newLeads, pipeline, won, conversion };
  }, [records]);

  const move = (rec, dir) => {
    const i = STATUSES.indexOf(rec.status);
    const ni = Math.max(0, Math.min(STATUSES.length - 1, i + dir));
    if (ni === i) return;
    const status = STATUSES[ni];
    persistStatus(rec.id, status);
    setRecords((prev) => prev.map((r) => (r.id === rec.id ? { ...r, status } : r)));
    setSelected((s) => (s && s.id === rec.id ? { ...s, status } : s));
  };
  const applyStatus = (rec, status) => {
    persistStatus(rec.id, status);
    setRecords((prev) => prev.map((r) => (r.id === rec.id ? { ...r, status } : r)));
    setSelected((s) => (s && s.id === rec.id ? { ...s, status } : s));
  };
  const saveNote = (rec, note) => {
    persistNote(rec.id, note);
    setRecords((prev) => prev.map((r) => (r.id === rec.id ? { ...r, note } : r)));
  };

  return (
    <AdminShell title="CRM" subtitle="Leads, guests & booking pipeline">
      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Stat icon={<Layers size={16} />} label="Total Contacts" value={metrics.total ?? "—"} tone="#7cc0ff" />
        <Stat icon={<UserPlus size={16} />} label="New Leads" value={metrics.newLeads ?? "—"} tone="#6d6ef6" />
        <Stat icon={<IndianRupee size={16} />} label="Pipeline Value" value={metrics.pipeline != null ? fmtK(metrics.pipeline) : "—"} tone="#2e7bff" />
        <Stat icon={<CheckCircle2 size={16} />} label="Won" value={metrics.won ?? "—"} tone="#34d399" />
        <Stat icon={<TrendingUp size={16} />} label="Conversion" value={metrics.conversion != null ? metrics.conversion + "%" : "—"} tone="#67e8f9" />
      </div>

      {/* toolbar */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-panel/60 px-4 py-2.5">
          <Search size={15} className="text-silver/50" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, ref…"
            className="w-44 bg-transparent text-sm text-mist outline-none placeholder:text-silver/40 sm:w-56" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["all", ...Object.keys(TYPE_META)].map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`rounded-full border px-3 py-1.5 text-xs capitalize transition ${typeFilter === t ? "border-sky bg-sky/15 text-sky" : "border-white/10 text-silver/55 hover:border-sky/40"}`}>
              {t === "all" ? "All" : TYPE_META[t].label}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-silver/45">{filtered.length} contacts</span>
      </div>

      {/* kanban */}
      {!records ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-5">{STATUSES.map((s) => <div key={s} className="h-72 animate-pulse rounded-2xl border border-white/8 bg-panel/40" />)}</div>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          {STATUSES.map((s) => {
            const col = columns[s] || [];
            const sum = col.reduce((a, r) => a + r.amount, 0);
            return (
              <div key={s} className="flex min-h-[200px] flex-col rounded-2xl border border-white/8 bg-panel/30">
                <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_META[s].dot }} />
                    <span className="text-sm text-mist">{STATUS_META[s].label}</span>
                  </div>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-silver/60">{col.length}</span>
                </div>
                <div className="px-4 pb-2 pt-2 text-[0.65rem] uppercase tracking-wider text-silver/40">{fmtK(sum)}</div>
                <div className="flex-1 space-y-2.5 overflow-y-auto px-3 pb-3">
                  <AnimatePresence mode="popLayout">
                    {col.map((r) => (
                      <motion.button key={r.id} layout onClick={() => setSelected(r)}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        className="group block w-full rounded-xl border border-white/8 bg-panel/60 p-3 text-left transition hover:border-sky/40">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-medium text-mist">{r.name}</span>
                          <span className="rounded-full px-2 py-0.5 text-[0.55rem] uppercase tracking-wide" style={{ background: `${TYPE_META[r.type].color}22`, color: TYPE_META[r.type].color }}>{TYPE_META[r.type].label}</span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-xs text-silver/50">
                          <span>{r.amount ? fmtK(r.amount) : "—"}</span>
                          <span>{timeAgo(r.createdAt)}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
                          <span onClick={(e) => { e.stopPropagation(); move(r, -1); }} className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 text-silver/60 hover:border-sky hover:text-sky"><ChevronLeft size={13} /></span>
                          <span onClick={(e) => { e.stopPropagation(); move(r, 1); }} className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 text-silver/60 hover:border-sky hover:text-sky"><ChevronRight size={13} /></span>
                        </div>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                  {col.length === 0 && <div className="rounded-xl border border-dashed border-white/8 py-6 text-center text-xs text-silver/30">Empty</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* detail drawer */}
      <AnimatePresence>
        {selected && <Drawer rec={selected} onClose={() => setSelected(null)} onStatus={applyStatus} onNote={saveNote} onMove={move} />}
      </AnimatePresence>
    </AdminShell>
  );
}

function Stat({ icon, label, value, tone }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-panel/40 p-4">
      <div className="flex items-center gap-2 text-silver/55" style={{ color: tone }}>{icon}<span className="text-[0.68rem] uppercase tracking-[0.14em] text-silver/50">{label}</span></div>
      <div className="mt-2 font-display text-3xl text-mist">{value}</div>
    </div>
  );
}

function Drawer({ rec, onClose, onStatus, onNote, onMove }) {
  const [note, setNote] = useState(rec.note || "");
  useEffect(() => { setNote(rec.note || ""); }, [rec.id, rec.note]);
  return (
    <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-base/70 backdrop-blur-sm" onClick={onClose} />
      <motion.aside initial={{ x: 460 }} animate={{ x: 0 }} exit={{ x: 460 }} transition={{ type: "spring", stiffness: 280, damping: 32 }}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-panel">
        <div className="flex items-start justify-between border-b border-white/8 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-electric to-indigo text-lg font-medium text-white">{rec.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
            <div>
              <div className="font-display text-2xl text-mist">{rec.name}</div>
              <div className="text-xs text-silver/50">{TYPE_META[rec.type].label} · {rec.code || "—"}</div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg border border-white/10 p-2 text-silver/70 hover:text-mist"><X size={16} /></button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* status pipeline */}
          <div>
            <div className="mb-2 text-[0.65rem] uppercase tracking-[0.16em] text-silver/45">Status</div>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button key={s} onClick={() => onStatus(rec, s)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${rec.status === s ? "text-white" : "border-white/10 text-silver/55 hover:text-mist"}`}
                  style={rec.status === s ? { borderColor: STATUS_META[s].color, background: `${STATUS_META[s].color}22`, color: STATUS_META[s].color } : {}}>
                  {STATUS_META[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* contact */}
          <div className="space-y-2.5">
            <Row icon={<Mail size={15} />} label="Email" value={rec.email || "—"} href={rec.email ? `mailto:${rec.email}` : null} />
            <Row icon={<Phone size={15} />} label="Phone" value={rec.phone || "—"} href={rec.phone ? `tel:${rec.phone.replace(/\s/g, "")}` : null} />
            <Row icon={<Calendar size={15} />} label={rec.type === "room" ? "Check-in" : "Date"} value={rec.date || "—"} />
            <Row icon={<UsersIcon size={15} />} label="Guests" value={rec.guests || "—"} />
            {rec.roomType && <Row icon={<Layers size={15} />} label="Room" value={rec.roomType} />}
            {rec.table && <Row icon={<Layers size={15} />} label="Table" value={rec.table} />}
          </div>

          {/* value */}
          <div className="rounded-2xl border border-sky/20 bg-sky/[0.06] p-4">
            <div className="text-[0.65rem] uppercase tracking-[0.16em] text-silver/50">{rec.type === "enquiry" ? "Estimated Value" : "Booking Value"}</div>
            <div className="mt-1 font-display text-3xl text-aurora">{rec.amount ? fmtINR(rec.amount) : "—"}</div>
            <div className="mt-1 text-xs text-silver/45">Created {timeAgo(rec.createdAt)} · {rec.source}</div>
          </div>

          {/* notes */}
          <div>
            <div className="mb-2 text-[0.65rem] uppercase tracking-[0.16em] text-silver/45">Notes</div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} onBlur={() => onNote(rec, note)} rows={4}
              placeholder="Add a note about this contact…"
              className="w-full resize-none rounded-xl border border-white/10 bg-base/50 px-4 py-3 text-sm text-mist outline-none placeholder:text-silver/30 focus:border-sky/50" />
          </div>
        </div>

        <div className="flex gap-2 border-t border-white/8 p-4">
          <button onClick={() => onMove(rec, 1)} className="btn-primary flex-1 rounded-full py-3 text-sm">Advance Stage →</button>
          {rec.email && <a href={`mailto:${rec.email}`} className="flex items-center justify-center rounded-full border border-white/12 px-4 text-silver/80 hover:text-mist"><Mail size={16} /></a>}
        </div>
      </motion.aside>
    </motion.div>
  );
}

function Row({ icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-base/40 text-sky">{icon}</span>
      <div className="min-w-0">
        <div className="text-[0.6rem] uppercase tracking-[0.14em] text-silver/40">{label}</div>
        <div className="truncate text-sm text-mist">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block rounded-lg transition hover:opacity-80">{content}</a> : content;
}
