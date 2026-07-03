const SITE_URL = "https://thevivi.example.com";
export const metadata = {
  title: "Events & Happenings",
  description: "Wine dinners, rooftop jazz, chef's tables, wellness weekends and grand galas — what's on at THE VIVI.",
  alternates: { canonical: `${SITE_URL}/events` },
  openGraph: { title: "Events · THE VIVI", description: "Evenings to remember.", images: ["https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80"] },
};
export default function EventsLayout({ children }) { return children; }
