const SITE_URL = "https://thevivi.example.com";
export const metadata = {
  title: "Weddings",
  description: "Skyline vows to 800-guest galas — THE VIVI's wedding atelier choreographs décor, cuisine, film and light into an unforgettable celebration.",
  alternates: { canonical: `${SITE_URL}/weddings` },
  openGraph: { title: "Weddings · THE VIVI", description: "Say forever in style.", images: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"] },
};
export default function WeddingsLayout({ children }) { return children; }
