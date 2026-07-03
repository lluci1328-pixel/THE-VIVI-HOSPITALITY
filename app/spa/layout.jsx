const SITE_URL = "https://thevivi.example.com";
export const metadata = {
  title: "The VIVI Spa",
  description: "A subterranean sanctuary of hydrotherapy pools, salt caves and signature rituals. Book your escape at THE VIVI Spa.",
  alternates: { canonical: `${SITE_URL}/spa` },
  openGraph: { title: "The VIVI Spa · THE VIVI", description: "A sanctuary beneath the city.", images: ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80"] },
};
export default function SpaLayout({ children }) { return children; }
