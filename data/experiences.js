// THE VIVI — data for Weddings, Corporate, Spa, Gym, Events pages.

export const IMG = (id, w = 1000, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

/* ---------------- WEDDINGS ---------------- */
export const WEDDING_VENUES = [
  { id: "ballroom", name: "The Grand Ballroom", cap: 800, img: "1519741497674-611481863552", desc: "A pillarless ballroom beneath a 6-metre crystal chandelier — the stage for a grand celebration." },
  { id: "terrace", name: "Skyline Terrace", cap: 300, img: "1464366400600-7168b8af9bc3", desc: "Open-air vows against the city skyline, wrapped in fairy light and sea breeze." },
  { id: "pavilion", name: "Garden Pavilion", cap: 200, img: "1465495976277-4387d4b0b4c6", desc: "An intimate glass pavilion set within our private gardens, framed by blossom." },
];
export const WEDDING_PACKAGES = [
  { id: "intimate", name: "Intimate", guests: "Up to 80", price: 850000, popular: false, features: ["Garden Pavilion", "3-course plated dinner", "Floral styling", "Bridal suite night", "Dedicated planner"] },
  { id: "signature", name: "Signature", guests: "Up to 300", price: 2200000, popular: true, features: ["Skyline Terrace", "7-course banquet", "Premium décor & mandap", "Live band + DJ", "Cinematography team", "2 luxury suites"] },
  { id: "royal", name: "Royal", guests: "Up to 800", price: 5500000, popular: false, features: ["The Grand Ballroom", "Bespoke multi-cuisine", "Celebrity décor artist", "Fireworks finale", "Full-floor buyout", "Butler team + valet"] },
];
export const WEDDING_TIMELINE = [
  { step: "01", title: "Discovery", text: "We listen to your story and craft a vision moodboard within 48 hours." },
  { step: "02", title: "Design", text: "3D renders of your décor, menu tastings and a fixed, transparent quote." },
  { step: "03", title: "Rehearsal", text: "A full walkthrough with every vendor, 72 hours before the day." },
  { step: "04", title: "The Day", text: "A dedicated team of 20 runs your celebration so you simply live it." },
];
export const WEDDING_GALLERY = ["1519741497674-611481863552", "1511285560929-80b456fea0bc", "1465495976277-4387d4b0b4c6", "1522673607200-164d1b6ce486", "1464366400600-7168b8af9bc3", "1600891964599-f61ba0e24092"];

/* ---------------- CORPORATE ---------------- */
export const CORP_SPACES = [
  { id: "boardroom", name: "The Boardroom", cap: 12, img: "1497366216548-37526070297c", desc: "An intimate C-suite room with a marble table, 4K conferencing and a private butler." },
  { id: "summit", name: "Summit Hall", cap: 60, img: "1517502884422-41eaead166d4", desc: "A flexible hall for workshops and town halls, with modular staging and daylight." },
  { id: "auditorium", name: "Grand Auditorium", cap: 220, img: "1505373877841-8d25f7d46678", desc: "Tiered seating, a full stage and broadcast-grade AV for launches and conferences." },
  { id: "lounge", name: "Business Lounge", cap: 30, img: "1524758631624-e2822e304c36", desc: "A members-style lounge for networking, breakouts and all-day refreshments." },
];
export const CORP_PACKAGES = [
  { id: "half", name: "Half-Day", price: 45000, unit: "per space", features: ["4 hours", "AV + fibre Wi-Fi", "Tea & coffee station", "Stationery & water"] },
  { id: "full", name: "Full-Day Delegate", price: 3500, unit: "per delegate", popular: true, features: ["8 hours", "Working lunch at Lluci", "Two coffee breaks", "AV technician", "Event concierge"] },
  { id: "residential", name: "Residential Conference", price: 9500, unit: "per delegate", features: ["Overnight stay", "All meals included", "Meeting space", "Evening networking", "Spa access"] },
];
export const CORP_FEATURES = [
  { icon: "presentation", label: "4K stage & broadcast AV" },
  { icon: "wifi", label: "Dedicated 1Gbps fibre" },
  { icon: "coffee", label: "Curated catering by Lluci" },
  { icon: "users", label: "Dedicated event manager" },
  { icon: "car", label: "Valet & VIP arrival" },
  { icon: "shield", label: "Private security & NDA rooms" },
];

/* ---------------- SPA ---------------- */
export const SPA_TREATMENTS = [
  { id: "signature", name: "The VIVI Ritual", time: "120 min", price: 12000, tag: "Signature", img: "1544161515-4ab6ce6db874", desc: "A full-body journey — warm oil massage, salt scrub and a gold facial to close." },
  { id: "hydro", name: "Hydrotherapy Circuit", time: "90 min", price: 7500, tag: "Wellness", img: "1600334129128-685c5582fd35", desc: "Contrast pools, salt cave, steam and an ice fountain to reset the body." },
  { id: "couples", name: "Couple's Sanctuary", time: "150 min", price: 22000, tag: "For Two", img: "1540555700478-4be289fbecef", desc: "A private suite, side-by-side massage, champagne and a rose-petal soak." },
  { id: "facial", name: "24k Radiance Facial", time: "75 min", price: 9500, tag: "Skin", img: "1570172619644-dfd03ed5d881", desc: "Gold-leaf mask, lymphatic sculpting and a bespoke serum for luminous skin." },
  { id: "thai", name: "Royal Thai", time: "90 min", price: 8500, tag: "Bodywork", img: "1519823551278-64ac92734fb1", desc: "Assisted stretching and pressure-point work to release deep tension." },
  { id: "sleep", name: "Deep Sleep Therapy", time: "60 min", price: 6500, tag: "Restore", img: "1600334089648-b0d9d3028eb2", desc: "Scalp and foot ritual with sound bath — engineered for the deepest rest." },
];
export const SPA_STATS = [
  { value: 14, suffix: "", label: "Treatment Rooms" },
  { value: 3, suffix: "", label: "Hydro Pools" },
  { value: 40, suffix: "+", label: "Signature Rituals" },
  { value: 4.9, suffix: "", label: "Guest Rating", decimals: 1 },
];

/* ---------------- GYM ---------------- */
export const GYM_ZONES = [
  { id: "strength", name: "Strength Lab", img: "1534438327276-14e5300c3a48", desc: "Full Technogym Kinesis rig, free weights to 60kg and Olympic platforms." },
  { id: "cardio", name: "Cardio Deck", img: "1571902943202-507ec2618e8f", desc: "Skyline-facing treadmills, assault bikes and rowers with immersive screens." },
  { id: "studio", name: "Movement Studio", img: "1518611012118-696072aa579a", desc: "Yoga, pilates and HIIT classes on a sprung floor, dawn to dusk." },
  { id: "recovery", name: "Recovery Lab", img: "1591258370814-01609b341790", desc: "Cryotherapy, infrared sauna, compression boots and a plunge pool." },
];
export const GYM_TRAINERS = [
  { id: "t1", name: "Marcus Vaughn", role: "Head of Performance", img: "1567013127542-490d757e51fc" },
  { id: "t2", name: "Leah Fernandes", role: "Yoga & Mobility", img: "1594381898411-846e7d193883" },
  { id: "t3", name: "Dmitri Volkov", role: "Strength & Conditioning", img: "1583468982228-19f19164aee2" },
];
export const GYM_CLASSES = [
  { time: "06:00", name: "Sunrise Yoga", coach: "Leah F.", spots: "4 left" },
  { time: "07:30", name: "HIIT Ignite", coach: "Marcus V.", spots: "Full" },
  { time: "12:00", name: "Power Pilates", coach: "Leah F.", spots: "8 left" },
  { time: "18:00", name: "Strength Club", coach: "Dmitri V.", spots: "6 left" },
  { time: "19:30", name: "Sound Bath Recovery", coach: "Leah F.", spots: "10 left" },
];

/* ---------------- EVENTS ---------------- */
export const EVENTS = [
  { id: "e1", date: "Aug 14", month: "Aug", day: "14", title: "Barolo & Truffle Night", tag: "Wine Dinner", img: "1510812431401-41d2bd2722f3", desc: "A six-course journey through Piedmont with rare Barolo verticals at Lluci.", price: "₹18,500", cat: "Dining" },
  { id: "e2", date: "Aug 23", month: "Aug", day: "23", title: "Rooftop Jazz Sessions", tag: "Live Music", img: "1470337458703-46ad1756a187", desc: "A quartet under the stars at the Sky Lounge, with a signature cocktail flight.", price: "₹4,500", cat: "Music" },
  { id: "e3", date: "Sep 02", month: "Sep", day: "02", title: "Elena's Kaiseki Series", tag: "Chef's Table", img: "1467003909585-2f8a72700288", desc: "An intimate ten-seat kaiseki evening — Elena cooks the entire menu before you.", price: "₹24,000", cat: "Dining" },
  { id: "e4", date: "Sep 15", month: "Sep", day: "15", title: "Wellness Weekend", tag: "Retreat", img: "1544161515-4ab6ce6db874", desc: "Two days of sunrise yoga, spa rituals and clean cuisine to fully reset.", price: "₹32,000", cat: "Wellness" },
  { id: "e5", date: "Oct 21", month: "Oct", day: "21", title: "Champagne & Caviar", tag: "Tasting", img: "1566417713940-fe7c737a9ef2", desc: "Grande cuvées poured beside three grades of Ossetra, live jazz until midnight.", price: "₹16,000", cat: "Dining" },
  { id: "e6", date: "Nov 05", month: "Nov", day: "05", title: "Diwali Gala", tag: "Celebration", img: "1514525253161-7a46d19cd819", desc: "A black-tie festival of light — grand buffet, fireworks and live performances.", price: "₹12,000", cat: "Celebration" },
];
export const EVENT_CATS = ["All", "Dining", "Music", "Wellness", "Celebration"];
