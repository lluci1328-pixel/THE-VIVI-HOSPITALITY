export default function sitemap() {
  const base = "https://thevivi.example.com";
  const now = new Date();
  const page = (p, priority = 0.8) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "weekly", priority });
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    page("/rooms", 0.9),
    page("/restaurant", 0.9),
    page("/weddings", 0.8),
    page("/corporate", 0.8),
    page("/spa", 0.7),
    page("/gym", 0.7),
    page("/events", 0.7),
  ];
}
