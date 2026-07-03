const SITE_URL = "https://thevivi.example.com";
export const metadata = {
  title: "Corporate & Conferences",
  description: "Six configurable spaces, enterprise-grade AV and a dedicated events team — THE VIVI is where deals are made and launches land.",
  alternates: { canonical: `${SITE_URL}/corporate` },
  openGraph: { title: "Corporate & Conferences · THE VIVI", description: "Where deals are made.", images: ["https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80"] },
};
export default function CorporateLayout({ children }) { return children; }
