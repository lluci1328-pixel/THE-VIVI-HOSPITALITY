// THE VIVI — luxury hospitality content source.

export const IMG = (id, w = 1000, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const SIDEBAR = [
  { label: "Home", href: "#home", icon: "home" },
  { label: "Rooms & Suites", href: "/rooms", icon: "bed" },
  { label: "Availability", href: "#availability", icon: "calendar" },
  { label: "The Lluci Restaurant", href: "/restaurant", icon: "utensils", accent: true },
  { label: "Weddings", href: "/weddings", icon: "heart" },
  { label: "Corporate", href: "/corporate", icon: "briefcase" },
  { label: "The VIVI Spa", href: "/spa", icon: "spa" },
  { label: "Performance Gym", href: "/gym", icon: "gym" },
  { label: "Events", href: "/events", icon: "events" },
  { label: "Gallery", href: "#gallery", icon: "image" },
  { label: "About", href: "#about", icon: "landmark" },
  { label: "Contact", href: "#contact", icon: "phone" },
];

export const HERO_SLIDES = [
  {
    img: "1566073771259-6a8506099945",
    kicker: "Five-Star Sanctuary",
    title: ["Arrive as a Guest,", "Leave as Family"],
  },
  {
    img: "1571896349842-33c89424de2d",
    kicker: "The Art of Stillness",
    title: ["Where Every View", "Feels Infinite"],
  },
  {
    img: "1582719478250-c89cae4dc85b",
    kicker: "Crafted Serenity",
    title: ["A World Designed", "Around You"],
  },
];

export const STATS = [
  { value: 100, suffix: "+", label: "Suites & Rooms" },
  { value: 18, suffix: "", label: "Years of Hospitality" },
  { value: 42, suffix: "", label: "Global Awards" },
  { value: 4.9, suffix: "", label: "Guest Rating", decimals: 1 },
];

// Validated image pool (all confirmed loading) — reused across room galleries.
const RI = {
  bed1: "1611892440504-42a792e24d32",
  bed2: "1631049307264-da0ec9d70304",
  bed3: "1590490360182-c33d57733427",
  villa: "1520250497591-112f2f40a3f4",
  suite: "1618773928121-c32242e63f39",
  garden: "1602002418816-5c0aeef426aa",
  facade: "1566073771259-6a8506099945",
  interior: "1571896349842-33c89424de2d",
  terrace: "1582719478250-c89cae4dc85b",
  romance: "1596394516093-501ba68a0ba6",
  room: "1512918728675-ed5a9ecdebfd",
  bath: "1560448204-e02f11c3d0e2",
  pool: "1571003123894-1f0594d2b5d9",
  grand: "1465101046530-73398c7f28ca",
};

export const ROOM_TIERS = ["All", "Signature Room", "Club Room", "Suite", "Family Suite", "Villa", "Penthouse"];
export const ROOM_VIEWS = ["Any", "City", "Garden", "Sea", "Skyline", "Pool"];

// Room types (demo — the platform holds 100+ rooms; 24 representative types below).
export const ROOMS = [
  { id: "deluxe-king", name: "Deluxe King", tier: "Signature Room", view: "City", floor: "8–14", beds: "1 King", size: 42, guests: 2, price: 18500, rating: 4.7, available: true, img: RI.bed1, gallery: [RI.bed1, RI.bed2, RI.bath], amenities: ["City View", "Rain Shower", "Smart Room", "Nespresso", "65\" OLED"], desc: "A serene urban retreat with floor-to-ceiling glass, hand-tufted linens and a marble spa bath." },
  { id: "deluxe-twin", name: "Deluxe Twin", tier: "Signature Room", view: "City", floor: "8–14", beds: "2 Twin", size: 42, guests: 2, price: 18500, rating: 4.6, available: true, img: RI.bed2, gallery: [RI.bed2, RI.bed1, RI.bath], amenities: ["City View", "Rain Shower", "Smart Room", "Work Desk", "Mini Bar"], desc: "The same considered comfort as our Deluxe King, arranged for two — ideal for colleagues or friends." },
  { id: "premier-garden", name: "Premier Garden King", tier: "Signature Room", view: "Garden", floor: "2–5", beds: "1 King", size: 46, guests: 2, price: 21000, rating: 4.8, available: true, img: RI.garden, gallery: [RI.garden, RI.bed3, RI.bath], amenities: ["Garden View", "Walk-in Rain Shower", "Smart Room", "Nespresso", "Lounge Access"], desc: "Wake to greenery on a low floor, with a private planted balcony and birdsong instead of traffic." },
  { id: "premier-twin", name: "Premier Twin", tier: "Signature Room", view: "Garden", floor: "2–5", beds: "2 Queen", size: 46, guests: 3, price: 21000, rating: 4.6, available: false, img: RI.bed3, gallery: [RI.bed3, RI.garden, RI.bed1], amenities: ["Garden View", "Lounge Access", "Smart Room", "Mini Bar", "Work Desk"], desc: "Generous twin sanctuary framed by lush gardens — ideal for families and companions." },
  { id: "club-king", name: "Club King", tier: "Club Room", view: "Skyline", floor: "15–20", beds: "1 King", size: 50, guests: 2, price: 26500, rating: 4.9, available: true, img: RI.interior, gallery: [RI.interior, RI.bed1, RI.terrace], amenities: ["Club Lounge Access", "Evening Canapés", "Skyline View", "Pillow Menu", "Nespresso"], desc: "High-floor calm with access to THE VIVI Club — all-day refreshments, canapés and a private check-in." },
  { id: "club-corner", name: "Club Corner Suite", tier: "Club Room", view: "Skyline", floor: "18–22", beds: "1 King", size: 62, guests: 2, price: 32000, rating: 4.9, available: true, img: RI.terrace, gallery: [RI.terrace, RI.interior, RI.suite], amenities: ["Corner Windows", "Club Lounge", "Soaking Tub", "Butler on Call", "Skyline View"], desc: "A wraparound corner with dual-aspect skyline windows and an oversized soaking tub for two." },
  { id: "executive-suite", name: "Executive Suite", tier: "Suite", view: "Skyline", floor: "16–21", beds: "1 King + Sofa", size: 68, guests: 3, price: 34000, rating: 4.8, available: true, img: RI.suite, gallery: [RI.suite, RI.bed1, RI.terrace], amenities: ["Separate Lounge", "Butler Service", "Bathtub", "Club Access", "Skyline View"], desc: "A layered suite with a private lounge, curated art and a dawn-to-dusk skyline panorama." },
  { id: "garden-suite", name: "Garden Suite", tier: "Suite", view: "Garden", floor: "1–3", beds: "1 King", size: 58, guests: 2, price: 29500, rating: 4.8, available: true, img: RI.garden, gallery: [RI.garden, RI.bath, RI.villa], amenities: ["Private Garden", "Outdoor Tub", "Yoga Deck", "Nespresso", "Rain Shower"], desc: "Ground-level calm opening onto a private garden with an outdoor soaking tub beneath the sky." },
  { id: "vivi-suite", name: "The VIVI Suite", tier: "Suite", view: "Sea", floor: "20–24", beds: "1 King + Study", size: 84, guests: 3, price: 46000, rating: 4.9, available: true, img: RI.room, gallery: [RI.room, RI.suite, RI.terrace], amenities: ["Sea View", "Private Study", "Walk-in Wardrobe", "Butler", "Freestanding Tub"], desc: "Our signature suite: a sea-facing lounge, a private study and a marble bath framed by the horizon." },
  { id: "ocean-suite", name: "Ocean Terrace Suite", tier: "Suite", view: "Sea", floor: "12–18", beds: "1 King", size: 76, guests: 2, price: 42000, rating: 4.9, available: false, img: RI.terrace, gallery: [RI.terrace, RI.garden, RI.room], amenities: ["Wraparound Terrace", "Sea View", "Outdoor Loungers", "Butler", "Rain Shower"], desc: "A generous private terrace hovering over the water — sunrise coffee and sunset champagne, daily." },
  { id: "family-suite", name: "Family Suite", tier: "Family Suite", view: "Garden", floor: "3–7", beds: "1 King + 2 Twin", size: 92, guests: 5, price: 52000, rating: 4.8, available: true, img: RI.bed3, gallery: [RI.bed3, RI.garden, RI.bath], amenities: ["Two Bedrooms", "Kids' Amenities", "Play Nook", "Kitchenette", "Garden View"], desc: "Two connected bedrooms, a play nook and thoughtful touches so every generation feels at home." },
  { id: "family-loft", name: "Family Loft", tier: "Family Suite", view: "City", floor: "9–13", beds: "2 King", size: 104, guests: 6, price: 58000, rating: 4.7, available: true, img: RI.interior, gallery: [RI.interior, RI.bed1, RI.room], amenities: ["Split-level Loft", "Two Baths", "Cinema Nook", "Kitchenette", "City View"], desc: "A split-level loft with two bathrooms and a cinema nook — space for the whole family to spread out." },
  { id: "pool-villa", name: "VIVI Pool Villa", tier: "Villa", view: "Pool", floor: "Ground", beds: "2 King", size: 120, guests: 4, price: 72000, rating: 5.0, available: false, img: RI.villa, gallery: [RI.villa, RI.garden, RI.pool], amenities: ["Private Pool", "Personal Butler", "Outdoor Deck", "Chef on Call", "Sunken Bar"], desc: "A walled villa with a heated private pool, sun deck and a dedicated butler for every whim." },
  { id: "garden-villa", name: "Garden Villa", tier: "Villa", view: "Garden", floor: "Ground", beds: "2 King", size: 110, guests: 4, price: 66000, rating: 4.9, available: true, img: RI.garden, gallery: [RI.garden, RI.villa, RI.bath], amenities: ["Private Garden", "Plunge Pool", "Outdoor Shower", "Butler", "Fire Pit"], desc: "A secluded villa wrapped in foliage, with a plunge pool, outdoor shower and evening fire pit." },
  { id: "sea-villa", name: "Ocean Villa", tier: "Villa", view: "Sea", floor: "Ground", beds: "2 King", size: 140, guests: 4, price: 88000, rating: 5.0, available: true, img: RI.pool, gallery: [RI.pool, RI.villa, RI.terrace], amenities: ["Infinity Pool", "Direct Beach Path", "Butler", "Outdoor Dining", "Sea View"], desc: "A beachfront villa with an infinity pool that dissolves into the sea and a direct path to the sand." },
  { id: "royal-penthouse", name: "Royal Penthouse", tier: "Penthouse", view: "Skyline", floor: "Top", beds: "3 King", size: 240, guests: 6, price: 165000, rating: 5.0, available: true, img: RI.suite, gallery: [RI.suite, RI.romance, RI.room], amenities: ["Wraparound Terrace", "Private Elevator", "Grand Piano", "Home Cinema", "24k Butler"], desc: "The crown of THE VIVI — a two-storey penthouse with a wraparound terrace and private elevator." },
  { id: "sky-penthouse", name: "Sky Penthouse", tier: "Penthouse", view: "Sea", floor: "Top", beds: "2 King", size: 200, guests: 4, price: 148000, rating: 5.0, available: false, img: RI.romance, gallery: [RI.romance, RI.terrace, RI.suite], amenities: ["360° Views", "Rooftop Jacuzzi", "Private Chef", "Cinema", "Butler"], desc: "A glass crown with 360° views, a rooftop jacuzzi and a private chef's kitchen for intimate dinners." },
  { id: "honeymoon-suite", name: "Honeymoon Suite", tier: "Suite", view: "Sea", floor: "19–23", beds: "1 King", size: 72, guests: 2, price: 49000, rating: 5.0, available: true, img: RI.romance, gallery: [RI.romance, RI.terrace, RI.bath], amenities: ["Sea View", "Rose Turndown", "Couple's Bath", "Private Balcony", "Champagne on Arrival"], desc: "Designed for two: a couple's soaking bath, nightly rose turndown and a balcony made for stargazing." },
  { id: "accessible-king", name: "Accessible King", tier: "Signature Room", view: "City", floor: "2–6", beds: "1 King", size: 48, guests: 2, price: 18500, rating: 4.7, available: true, img: RI.bed1, gallery: [RI.bed1, RI.bath, RI.interior], amenities: ["Step-free Access", "Roll-in Shower", "Lowered Fittings", "Smart Room", "City View"], desc: "Fully step-free with a roll-in shower and lowered fittings — considered comfort, without compromise." },
  { id: "studio-king", name: "Studio King", tier: "Signature Room", view: "City", floor: "6–10", beds: "1 King", size: 40, guests: 2, price: 17000, rating: 4.5, available: true, img: RI.room, gallery: [RI.room, RI.bed2, RI.bath], amenities: ["Kitchenette", "City View", "Smart Room", "Work Desk", "Nespresso"], desc: "A smart long-stay studio with a kitchenette and generous desk — for those who linger a little longer." },
  { id: "club-suite", name: "Club Junior Suite", tier: "Club Room", view: "Skyline", floor: "17–21", beds: "1 King + Sofa", size: 64, guests: 3, price: 38000, rating: 4.9, available: true, img: RI.bed1, gallery: [RI.bed1, RI.interior, RI.terrace], amenities: ["Club Lounge", "Sitting Area", "Skyline View", "Butler", "Soaking Tub"], desc: "A junior suite with a distinct sitting area and full access to THE VIVI Club's all-day service." },
  { id: "presidential", name: "Presidential Suite", tier: "Penthouse", view: "Skyline", floor: "Top", beds: "2 King + Study", size: 180, guests: 4, price: 132000, rating: 5.0, available: true, img: RI.grand, gallery: [RI.grand, RI.suite, RI.romance], amenities: ["Boardroom", "Dining for 10", "Private Elevator", "Butler Team", "Grand Terrace"], desc: "State-visit grandeur: a private boardroom, dining for ten and a dedicated butler team on call." },
  { id: "twin-suite", name: "Twin Bay Suite", tier: "Suite", view: "Sea", floor: "10–15", beds: "2 Queen", size: 70, guests: 4, price: 40000, rating: 4.7, available: true, img: RI.terrace, gallery: [RI.terrace, RI.room, RI.garden], amenities: ["Sea View", "Two Queens", "Lounge", "Soaking Tub", "Butler"], desc: "A sea-facing suite arranged for four, with two queens and a shared lounge overlooking the bay." },
  { id: "loft-penthouse", name: "Atrium Loft", tier: "Penthouse", view: "City", floor: "Top", beds: "2 King", size: 190, guests: 4, price: 128000, rating: 4.9, available: false, img: RI.romance, gallery: [RI.romance, RI.grand, RI.suite], amenities: ["Double-height Atrium", "Library", "Private Bar", "Cinema", "Butler"], desc: "A double-height atrium loft with a private library, bar and cinema — architecture as much as a room." },
];

export const AMENITIES = [
  {
    id: "spa",
    name: "The VIVI Spa",
    tag: "Wellness",
    img: "1544161515-4ab6ce6db874",
    desc: "A subterranean sanctuary of hydrotherapy pools, salt caves and signature rituals.",
  },
  {
    id: "pool",
    name: "Infinity Pool",
    tag: "Leisure",
    img: "1571003123894-1f0594d2b5d9",
    desc: "A rooftop infinity edge dissolving into the skyline, open from dawn to midnight.",
  },
  {
    id: "gym",
    name: "Performance Gym",
    tag: "Fitness",
    img: "1534438327276-14e5300c3a48",
    desc: "Technogym suite, private trainers and a recovery lab with cryotherapy.",
  },
  {
    id: "lounge",
    name: "The Sky Lounge",
    tag: "Social",
    img: "1470337458703-46ad1756a187",
    desc: "A members-style lounge with rare spirits, live jazz and panoramic dusk views.",
  },
];

export const OFFERS = [
  {
    id: "o1",
    title: "Suite Escape",
    tag: "Stay 3, Pay 2",
    img: "1596394516093-501ba68a0ba6",
    desc: "Three nights in any suite with daily breakfast and a spa ritual for two.",
    price: "from ₹68,000",
  },
  {
    id: "o2",
    title: "Romance at VIVI",
    tag: "Couples",
    img: "1512918728675-ed5a9ecdebfd",
    desc: "Private candlelit dinner at Lluci, in-room florals and late checkout.",
    price: "from ₹42,000",
  },
  {
    id: "o3",
    title: "Wellness Retreat",
    tag: "5 Nights",
    img: "1544161515-4ab6ce6db874",
    desc: "A five-night reset with daily spa, yoga at dawn and a nutritionist-designed menu.",
    price: "from ₹1,15,000",
  },
];

export const GALLERY = [
  { id: "g1", img: "1566073771259-6a8506099945", span: "row-span-2", alt: "Hotel facade at dusk" },
  { id: "g2", img: "1618773928121-c32242e63f39", span: "", alt: "Penthouse interior" },
  { id: "g3", img: "1571003123894-1f0594d2b5d9", span: "", alt: "Rooftop infinity pool" },
  { id: "g4", img: "1544161515-4ab6ce6db874", span: "row-span-2", alt: "Spa sanctuary" },
  { id: "g5", img: "1517248135467-4c7edcad34c4", span: "", alt: "Lluci restaurant" },
  { id: "g6", img: "1520250497591-112f2f40a3f4", span: "", alt: "Pool villa" },
  { id: "g7", img: "1465101046530-73398c7f28ca", span: "", alt: "Grand chandelier" },
  { id: "g8", img: "1582719478250-c89cae4dc85b", span: "row-span-2", alt: "Suite terrace view" },
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Isabella Laurent",
    role: "Travel Editor, Condé Nast",
    text: "THE VIVI redefines what a city hotel can be. The service anticipates you before you speak.",
    rating: 5,
    avatar: "1494790108377-be9c29b29330",
  },
  {
    id: "t2",
    name: "David Chen",
    role: "Returning Guest · 14 stays",
    text: "From the penthouse to the spa, every detail is intentional. It genuinely feels like home elevated.",
    rating: 5,
    avatar: "1500648767791-00dcc994a43e",
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Wedding at VIVI, 2025",
    text: "They turned our wedding into cinema. The team handled 400 guests without a single seam showing.",
    rating: 5,
    avatar: "1438761681033-6461ffad8d80",
  },
];

export const AWARDS = [
  { year: "2025", title: "World's Leading Luxury Hotel", body: "Global Travel Awards" },
  { year: "2024", title: "Best Hotel Spa in Asia", body: "Wellness Guild" },
  { year: "2023", title: "Design Hotel of the Year", body: "Architizer" },
];

export const TIME_SLOTS = [
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
];

export const OCCASIONS = ["None", "Birthday", "Anniversary", "Honeymoon", "Business", "Family"];

// Booking flow definitions used by the universal BookingModal.
export const BOOKING_TYPES = {
  room: {
    title: "Reserve Your Stay",
    kicker: "Room Booking",
    accent: "electric",
    fields: ["dates", "guests", "roomType"],
  },
  table: {
    title: "Reserve a Table",
    kicker: "The Lluci Restaurant",
    accent: "violet",
    fields: ["date", "time", "guests", "occasion"],
  },
  wedding: {
    title: "Plan Your Wedding",
    kicker: "Weddings at VIVI",
    accent: "cyan",
    fields: ["date", "guests", "venue"],
  },
  corporate: {
    title: "Book a Corporate Event",
    kicker: "Business & Conferences",
    accent: "indigo",
    fields: ["date", "guests", "room"],
  },
  spa: {
    title: "Book a Spa Ritual",
    kicker: "The VIVI Spa",
    accent: "cyan",
    fields: ["date", "time", "guests"],
  },
  gym: {
    title: "Book a Session",
    kicker: "Performance Gym",
    accent: "electric",
    fields: ["date", "time", "guests"],
  },
};
