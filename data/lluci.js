// THE LLUCI RESTAURANT — a THE VIVI signature. Warm, Michelin-tier content.

export const IMG = (id, w = 1000, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const NAV = [
  { label: "Story", href: "#story" },
  { label: "Chef", href: "#chef" },
  { label: "Menu", href: "#menu" },
  { label: "Wine", href: "#wine" },
  { label: "Cocktails", href: "#cocktails" },
  { label: "Private", href: "#private" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
  { label: "Reserve", href: "#reserve" },
];

export const MENU_CATEGORIES = ["All", "Chef Specials", "Starters", "Main Course", "Desserts", "Vegetarian"];

export const MENU = [
  {
    id: "m1", name: "Saffron Lobster Bisque", category: "Starters", tags: ["Chef Specials"],
    price: 1450, calories: 320, time: "18 min", popularity: 96, chef: true, veg: false,
    photo: "1476718406336-bb5a9690ee2a",
    desc: "Slow-simmered blue lobster, Kashmiri saffron cream, aged brandy foam and micro-herb dust.",
    ingredients: ["Blue lobster", "Kashmiri saffron", "Aged brandy", "Crème fraîche", "Chervil"],
    wine: "Chablis Grand Cru 2016", rating: 4.9,
  },
  {
    id: "m2", name: "Charred Beetroot Tartare", category: "Starters", tags: ["Vegetarian"],
    price: 980, calories: 210, time: "14 min", popularity: 88, chef: false, veg: true,
    photo: "1540189549336-e6e99c3679fe",
    desc: "Smoked heirloom beetroot, capers, cured egg yolk and a shard of sourdough crisp.",
    ingredients: ["Heirloom beetroot", "Cured yolk", "Capers", "Dijon", "Sourdough"],
    wine: "Sancerre Rosé 2021", rating: 4.7,
  },
  {
    id: "m3", name: "Wagyu A5 Sirloin", category: "Main Course", tags: ["Chef Specials"],
    price: 4200, calories: 620, time: "26 min", popularity: 99, chef: true, veg: false,
    photo: "1600891964092-4316c288032e",
    desc: "Japanese A5 wagyu, black-garlic jus, smoked bone marrow and truffle pomme purée.",
    ingredients: ["A5 Wagyu", "Black garlic", "Périgord truffle", "Bone marrow", "Maldon salt"],
    wine: "Barolo Riserva 2011", rating: 5.0,
  },
  {
    id: "m4", name: "Miso Glazed Black Cod", category: "Main Course", tags: [],
    price: 2650, calories: 480, time: "22 min", popularity: 92, chef: false, veg: false,
    photo: "1467003909585-2f8a72700288",
    desc: "72-hour marinated black cod, yuzu-miso lacquer and pickled ginger pearls.",
    ingredients: ["Black cod", "White miso", "Yuzu", "Mirin", "Sansho pepper"],
    wine: "Riesling Kabinett 2019", rating: 4.8,
  },
  {
    id: "m5", name: "Truffle Risotto Nerano", category: "Main Course", tags: ["Vegetarian", "Chef Specials"],
    price: 1980, calories: 540, time: "24 min", popularity: 90, chef: true, veg: true,
    photo: "1633436375153-d7045cb93e38",
    desc: "Carnaroli risotto, aged parmesan and fresh Alba white truffle shaved table-side.",
    ingredients: ["Carnaroli rice", "Alba truffle", "Parmigiano 36mo", "Butter", "Vegetable nage"],
    wine: "Gavi di Gavi 2021", rating: 4.9,
  },
  {
    id: "m6", name: "Valrhona Gold Sphere", category: "Desserts", tags: ["Chef Specials"],
    price: 1150, calories: 390, time: "table-side", popularity: 97, chef: true, veg: true,
    photo: "1606313564200-e75d5e30476c",
    desc: "Dark chocolate sphere, warm salted caramel poured table-side, finished with 24k gold leaf.",
    ingredients: ["Valrhona 70%", "Salted caramel", "Vanilla bourbon", "24k gold", "Hazelnut"],
    wine: "Pedro Ximénez Sherry", rating: 5.0,
  },
  {
    id: "m7", name: "Deconstructed Tiramisu", category: "Desserts", tags: ["Vegetarian"],
    price: 890, calories: 340, time: "12 min", popularity: 85, chef: false, veg: true,
    photo: "1542124948-dc391252a940",
    desc: "Mascarpone cloud, espresso soil, cocoa air and an amaretto glass shard.",
    ingredients: ["Mascarpone", "Single-origin espresso", "Amaretto", "Cocoa", "Ladyfinger"],
    wine: "Vin Santo 2015", rating: 4.6,
  },
  {
    id: "m8", name: "Hand-Dived Scallops", category: "Starters", tags: ["Chef Specials"],
    price: 1680, calories: 260, time: "16 min", popularity: 91, chef: true, veg: false,
    photo: "1607330289024-1535c6b4e1c1",
    desc: "Orkney scallops, brown-butter hollandaise, apple and a whisper of vanilla oil.",
    ingredients: ["Orkney scallops", "Brown butter", "Granny Smith", "Vanilla", "Sea herbs"],
    wine: "Puligny-Montrachet 2018", rating: 4.9,
  },
];

export const WINES = [
  { id: "w1", name: "Château Margaux", region: "Bordeaux, France", year: "2009", type: "Red", glass: 4200, bottle: 68000, note: "Velvet tannins, cassis, cedar and violet." },
  { id: "w2", name: "Domaine Leflaive Montrachet", region: "Burgundy, France", year: "2016", type: "White", glass: 5200, bottle: 92000, note: "Flint, white peach and a saline finish." },
  { id: "w3", name: "Sassicaia Tenuta", region: "Tuscany, Italy", year: "2015", type: "Red", glass: 3400, bottle: 54000, note: "Blackcurrant, graphite, Mediterranean herbs." },
  { id: "w4", name: "Krug Grande Cuvée", region: "Champagne, France", year: "NV", type: "Sparkling", glass: 3800, bottle: 46000, note: "Brioche, citrus zest, endless fine mousse." },
  { id: "w5", name: "Cloudy Bay", region: "Marlborough, NZ", year: "2022", type: "White", glass: 1400, bottle: 8600, note: "Passionfruit, lime and cut grass." },
  { id: "w6", name: "Penfolds Grange", region: "South Australia", year: "2014", type: "Red", glass: 4600, bottle: 78000, note: "Plum, mocha, dark spice, decades of ageing." },
];

export const COCKTAILS = [
  { id: "c1", name: "Smoked Old Fashioned", price: 950, img: "1470337458703-46ad1756a187", note: "Applewood-smoked bourbon, bitter orange, demerara, hand-carved clear ice." },
  { id: "c2", name: "Gold Negroni", price: 1050, img: "1514362545857-3bc16c4c7d1b", note: "Barrel-aged gin, Campari, sweet vermouth, edible gold." },
  { id: "c3", name: "Saffron Sour", price: 890, img: "1551024709-8f23befc6f87", note: "Saffron-infused whisky, aquafaba, citrus, honey." },
  { id: "c4", name: "Midnight Martini", price: 1150, img: "1575023782549-62ca0d244b39", note: "Charcoal-washed vodka, dry vermouth, olive caviar." },
];

export const CHEF = {
  name: "Elena Cruz",
  title: "Executive Chef · Founder of Lluci",
  portrait: "1577219491135-ce391730fb2c",
  quote: "I do not cook to feed. I cook to stop time.",
  bio: "Trained under three-Michelin masters across San Sebastián, Kyoto and Copenhagen, Elena founded Lluci within THE VIVI in 2011 with a single belief: that a meal, done right, can suspend time. Her cooking fuses classical French precision with the restraint of Japanese kaiseki and the fire of her native coast.",
  stats: [{ v: 27, s: "+", l: "Years" }, { v: 9, s: "", l: "Countries" }, { v: 2, s: "", l: "Michelin Stars" }],
  awards: [
    { year: "2024", title: "Two Michelin Stars", body: "Guide International" },
    { year: "2023", title: "World's 50 Best · #14", body: "Restaurant Awards" },
    { year: "2022", title: "Chef of the Year", body: "Culinary Society" },
    { year: "2021", title: "Art of Plating Grand Prix", body: "Gastronomie" },
  ],
};

export const EXPERIENCE_STEPS = [
  { n: "I", title: "The Welcome", text: "A glass of vintage Krug and a warm hand cloth as you cross the threshold into candlelight." },
  { n: "II", title: "The Journey", text: "Nine seasonal courses, each introduced by the chef who created it, paced like chapters of a novel." },
  { n: "III", title: "The Theatre", text: "Fire, smoke and gold — signature dishes finished at your table beneath a veil of applewood smoke." },
  { n: "IV", title: "The Farewell", text: "A final sweet, a signed menu and a memory you'll carry for years." },
];

export const PRIVATE_ROOMS = [
  { id: "p1", name: "The Cellar Vault", guests: 8, style: "Stone & Oak", img: "1510812431401-41d2bd2722f3", services: ["1,200-label wine wall", "Chef interaction", "Cheese trolley"], price: 65000 },
  { id: "p2", name: "The Gold Salon", guests: 12, style: "Art-Deco Gold", img: "1533777857889-4be7c70b33f7", services: ["Dedicated sommelier", "Bespoke tasting menu", "Live piano"], price: 85000 },
  { id: "p3", name: "The Chef's Table", guests: 6, style: "Kitchen-side Counter", img: "1414235077428-338989a2e8c0", services: ["Front-row to the pass", "Off-menu courses", "Elena hosts personally"], price: 110000 },
];

export const EVENTS = [
  { id: "e1", date: "Aug 14", title: "Barolo & Truffle Night", tag: "Wine Dinner", img: "1510812431401-41d2bd2722f3", desc: "A six-course journey through Piedmont with rare Barolo verticals and shaved Alba truffle.", price: "₹18,500 / guest" },
  { id: "e2", date: "Sep 02", title: "Elena's Kaiseki Series", tag: "Chef's Table", img: "1467003909585-2f8a72700288", desc: "An intimate ten-seat kaiseki evening — Elena cooks the entire menu before you.", price: "₹24,000 / guest" },
  { id: "e3", date: "Oct 21", title: "Champagne & Caviar", tag: "Tasting", img: "1470337458703-46ad1756a187", desc: "Grande cuvées poured beside three grades of Ossetra, live jazz until midnight.", price: "₹16,000 / guest" },
];

export const GALLERY = [
  { id: "g1", img: "1517248135467-4c7edcad34c4", span: "row-span-2", alt: "Candlelit dining room" },
  { id: "g2", img: "1414235077428-338989a2e8c0", span: "", alt: "Plated course" },
  { id: "g3", img: "1424847651672-bf20a4b0982b", span: "", alt: "Chef plating" },
  { id: "g4", img: "1600891964599-f61ba0e24092", span: "row-span-2", alt: "Signature dish" },
  { id: "g5", img: "1510812431401-41d2bd2722f3", span: "", alt: "Wine cellar" },
  { id: "g6", img: "1466978913421-dad2ebd01d17", span: "", alt: "Cocktail craft" },
  { id: "g7", img: "1476718406336-bb5a9690ee2a", span: "", alt: "Bisque" },
  { id: "g8", img: "1559339352-11d035aa65de", span: "row-span-2", alt: "Private booth" },
];

export const REVIEWS = [
  { id: "r1", name: "Aria Mehta", role: "Food Critic, Vogue", text: "The most cinematic dinner of my life. Every course felt like a scene from a film.", rating: 5, avatar: "1494790108377-be9c29b29330" },
  { id: "r2", name: "James Whitmore", role: "Guest from London", text: "Aman-level service with food that made the whole table go silent. The gold sphere — unreal.", rating: 5, avatar: "1500648767791-00dcc994a43e" },
  { id: "r3", name: "Sofia Rossi", role: "Michelin Inspector (ret.)", text: "Precision, warmth and theatre in perfect balance. Lluci belongs in the global elite.", rating: 5, avatar: "1438761681033-6461ffad8d80" },
];

export const TIME_SLOTS = ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"];
export const OCCASIONS = ["None", "Birthday", "Anniversary", "Business Meeting", "Family Dinner", "Proposal"];
