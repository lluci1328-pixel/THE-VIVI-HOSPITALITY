const SITE_URL = "https://thevivi.example.com";

export const metadata = {
  title: "The Lluci Restaurant — Two Michelin Stars",
  description:
    "Lluci is the two-Michelin-star signature restaurant of THE VIVI — an intimate theatre of seasonal cuisine, rare wine and table-side fire. Reserve your table.",
  alternates: { canonical: `${SITE_URL}/restaurant` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/restaurant`,
    title: "The Lluci Restaurant — Two Michelin Stars",
    description: "Where every meal becomes a memory. A THE VIVI signature.",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    ],
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Lluci",
  image:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  url: `${SITE_URL}/restaurant`,
  servesCuisine: ["Contemporary", "European", "Tasting Menu"],
  priceRange: "$$$$",
  acceptsReservations: "True",
  telephone: "+91-12345-66666",
  parentOrganization: { "@type": "Hotel", name: "THE VIVI" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Aurum Boulevard",
    addressLocality: "Mumbai",
    addressRegion: "MH",
    postalCode: "400001",
    addressCountry: "IN",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1284",
  },
};

export default function RestaurantLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      {children}
    </>
  );
}
