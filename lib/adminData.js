// Admin/CRM data layer.
// Aggregates REAL bookings/enquiries saved by the guest site (localStorage)
// and merges them with deterministic demo seed data so the dashboards always
// look production-ready. Status/notes overrides are persisted separately.

import { ROOMS } from "@/data/vivi";

export const STATUSES = ["new", "contacted", "confirmed", "completed", "cancelled"];
export const STATUS_META = {
  new: { label: "New Lead", color: "#7cc0ff", dot: "#7cc0ff" },
  contacted: { label: "Contacted", color: "#6d6ef6", dot: "#6d6ef6" },
  confirmed: { label: "Confirmed", color: "#2e7bff", dot: "#2e7bff" },
  completed: { label: "Completed", color: "#34d399", dot: "#34d399" },
  cancelled: { label: "Cancelled", color: "#f87171", dot: "#f87171" },
};

export const TYPE_META = {
  room: { label: "Room Stay", color: "#2e7bff" },
  table: { label: "Restaurant", color: "#8b5cf6" },
  wedding: { label: "Wedding", color: "#67e8f9" },
  corporate: { label: "Corporate", color: "#6d6ef6" },
  spa: { label: "Spa", color: "#34d399" },
  gym: { label: "Gym", color: "#4f92ff" },
  enquiry: { label: "Enquiry", color: "#94a3b8" },
};

export const fmtINR = (n) =>
  "₹" + Math.round(n || 0).toLocaleString("en-IN");
export const fmtK = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + "Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + "L";
  if (n >= 1000) return "₹" + (n / 1000).toFixed(0) + "K";
  return "₹" + Math.round(n);
};

const roomPrice = (name) => {
  const r = ROOMS.find((x) => x.name === name);
  return r ? r.price : 22000;
};
const nightsBetween = (a, b) => {
  const d = Math.round((new Date(b) - new Date(a)) / 86400000);
  return Math.max(1, isFinite(d) ? d : 2);
};

// deterministic RNG (mulberry32) so seed data is stable across reloads
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const FIRST = ["Aarav", "Isha", "Vivaan", "Ananya", "Kabir", "Meera", "Rohan", "Priya", "Arjun", "Sara", "Dev", "Nyra", "James", "Sofia", "David", "Elena", "Liam", "Aisha", "Noah", "Zara", "Kai", "Leah", "Omar", "Tara"];
const LAST = ["Sharma", "Mehta", "Kapoor", "Nair", "Iyer", "Chen", "Laurent", "Rossi", "Khan", "Verma", "Reddy", "Bose", "Whitmore", "Costa", "Ali", "Sen", "Malhotra", "Rao"];
const TYPES = ["room", "room", "room", "room", "table", "table", "wedding", "corporate", "spa", "enquiry"];
const ROOM_NAMES = ROOMS.map((r) => r.name);

function amountFor(type, r) {
  switch (type) {
    case "room": return roomPrice(ROOM_NAMES[Math.floor(r() * ROOM_NAMES.length)]) * (1 + Math.floor(r() * 4));
    case "table": return 2400 + Math.floor(r() * 12) * 650;
    case "wedding": return 400000 + Math.floor(r() * 22) * 95000;
    case "corporate": return 80000 + Math.floor(r() * 14) * 38000;
    case "spa": return 6000 + Math.floor(r() * 8) * 2800;
    default: return 0;
  }
}

function seedRecords(n = 54) {
  const r = rng(20260703);
  const out = [];
  const now = Date.now();
  for (let i = 0; i < n; i++) {
    const type = TYPES[Math.floor(r() * TYPES.length)];
    const first = FIRST[Math.floor(r() * FIRST.length)];
    const last = LAST[Math.floor(r() * LAST.length)];
    const createdAt = now - Math.floor(r() * 74) * 86400000 - Math.floor(r() * 86400000);
    // status skewed: more confirmed/completed for older, more new for recent
    const ageDays = (now - createdAt) / 86400000;
    let status;
    const s = r();
    if (type === "enquiry") status = s < 0.5 ? "new" : s < 0.8 ? "contacted" : "confirmed";
    else if (ageDays > 45) status = s < 0.7 ? "completed" : s < 0.85 ? "confirmed" : "cancelled";
    else status = s < 0.25 ? "new" : s < 0.5 ? "contacted" : s < 0.85 ? "confirmed" : "completed";
    const guests = type === "wedding" ? 120 + Math.floor(r() * 500) : type === "corporate" ? 12 + Math.floor(r() * 180) : 1 + Math.floor(r() * 5);
    const roomType = type === "room" ? ROOM_NAMES[Math.floor(r() * ROOM_NAMES.length)] : null;
    const stayDays = Math.floor(r() * 40) - 8; // some past, some future
    const eventDate = new Date(now + stayDays * 86400000).toISOString().split("T")[0];
    out.push({
      id: "seed-" + i,
      seeded: true,
      source: type === "table" ? "restaurant" : "hotel",
      type,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@email.com`,
      phone: "+91 " + (90000 + Math.floor(r() * 9999)) + " " + (10000 + Math.floor(r() * 89999)),
      guests,
      roomType,
      date: eventDate,
      amount: amountFor(type, r),
      status,
      createdAt,
      code: (type === "table" ? "LLU-" : "VIVI-") + (1000 + i).toString(36).toUpperCase(),
    });
  }
  return out;
}

// ---- normalize REAL localStorage records ----
function readLS(key) {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
function normalizeReal() {
  const out = [];
  readLS("vivi_bookings").forEach((b, i) => {
    const type = b.type || "room";
    let amount = 0;
    if (type === "room") amount = roomPrice(b.roomType) * nightsBetween(b.checkIn, b.checkOut);
    else if (type === "wedding") amount = 950000;
    else if (type === "corporate") amount = 240000;
    else if (type === "spa") amount = 14000;
    else if (type === "table") amount = 6500;
    out.push({
      id: "vb-" + (b.code || i), seeded: false, source: type === "table" ? "restaurant" : "hotel", type,
      name: b.name || "Guest", email: b.email || "", phone: b.phone || "", guests: b.guests || 2,
      roomType: b.roomType || null, date: b.checkIn || b.date || "", amount, status: "confirmed",
      createdAt: b.at || Date.now(), code: b.code || "VIVI-NEW",
    });
  });
  readLS("lluci_bookings").forEach((b, i) => {
    out.push({
      id: "lb-" + (b.code || i), seeded: false, source: "restaurant", type: "table",
      name: b.name || "Guest", email: b.email || "", phone: b.phone || "", guests: b.guests || 2,
      roomType: null, date: b.date || "", amount: 6500, status: "confirmed",
      createdAt: b.at || Date.now(), code: b.code || "LLU-NEW", table: b.table,
    });
  });
  readLS("vivi_enquiries").forEach((e, i) => out.push({
    id: "ve-" + i, seeded: false, source: "hotel", type: "enquiry", name: e.name || "Lead",
    email: e.email || "", phone: e.phone || "", guests: 1, roomType: null, date: "", amount: 0,
    status: "new", createdAt: e.at || Date.now(), note: e.message,
  }));
  readLS("lluci_enquiries").forEach((e, i) => out.push({
    id: "le-" + i, seeded: false, source: "restaurant", type: "enquiry", name: e.name || "Lead",
    email: e.email || "", phone: "", guests: 1, roomType: null, date: "", amount: 0,
    status: "new", createdAt: e.at || Date.now(), note: e.message,
  }));
  return out;
}

// ---- status / notes overrides (admin edits) ----
export function getOverrides() {
  try { return JSON.parse(localStorage.getItem("vivi_admin_overrides") || "{}"); } catch { return {}; }
}
export function setStatus(id, status) {
  const o = getOverrides();
  o[id] = { ...(o[id] || {}), status };
  localStorage.setItem("vivi_admin_overrides", JSON.stringify(o));
}
export function setNote(id, note) {
  const o = getOverrides();
  o[id] = { ...(o[id] || {}), note };
  localStorage.setItem("vivi_admin_overrides", JSON.stringify(o));
}

// ---- main aggregator ----
export function loadRecords() {
  const overrides = getOverrides();
  const all = [...normalizeReal(), ...seedRecords()];
  const merged = all.map((rec) => ({
    ...rec,
    status: overrides[rec.id]?.status || rec.status,
    note: overrides[rec.id]?.note ?? rec.note,
  }));
  merged.sort((a, b) => b.createdAt - a.createdAt);
  return merged;
}

// ---- derived metrics for the dashboard ----
export function computeMetrics(records) {
  const active = records.filter((r) => r.status !== "cancelled");
  const revenue = active.filter((r) => r.status === "confirmed" || r.status === "completed").reduce((s, r) => s + r.amount, 0);
  const pipeline = records.filter((r) => r.status === "new" || r.status === "contacted").reduce((s, r) => s + r.amount, 0);
  const bookings = records.filter((r) => r.type !== "enquiry").length;
  const leads = records.filter((r) => r.status === "new").length;
  const won = records.filter((r) => r.status === "confirmed" || r.status === "completed").length;
  const total = records.length;
  const conversion = total ? Math.round((won / total) * 100) : 0;
  const nights = active.filter((r) => r.type === "room").length;
  const occupancy = Math.min(96, 48 + Math.round((nights / 40) * 40));
  const adr = nights ? Math.round(active.filter((r) => r.type === "room").reduce((s, r) => s + r.amount, 0) / Math.max(1, active.filter((r) => r.type === "room").reduce((s, r) => s + Math.max(1, r.guests), 0))) : 0;

  // revenue by type
  const byType = {};
  Object.keys(TYPE_META).forEach((t) => (byType[t] = 0));
  active.forEach((r) => { if (r.status === "confirmed" || r.status === "completed") byType[r.type] += r.amount; });

  // bookings over last 8 weeks
  const weeks = Array.from({ length: 8 }).map((_, i) => ({ label: `W${i + 1}`, value: 0, rev: 0 }));
  const now = Date.now();
  records.forEach((r) => {
    const wk = Math.floor((now - r.createdAt) / (7 * 86400000));
    if (wk >= 0 && wk < 8) { const idx = 7 - wk; weeks[idx].value += 1; weeks[idx].rev += (r.status !== "cancelled" ? r.amount : 0); }
  });

  // status counts
  const statusCounts = {};
  STATUSES.forEach((s) => (statusCounts[s] = records.filter((r) => r.status === s).length));

  return { revenue, pipeline, bookings, leads, conversion, occupancy, adr, byType, weeks, statusCounts, total };
}

export function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60); if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60); if (h < 24) return h + "h ago";
  const d = Math.floor(h / 24); if (d < 30) return d + "d ago";
  return Math.floor(d / 30) + "mo ago";
}
