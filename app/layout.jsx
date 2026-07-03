import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://thevivi.example.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "THE VIVI — Modern Luxury Hospitality",
    template: "%s · THE VIVI",
  },
  description:
    "THE VIVI is a modern icon of luxury hospitality — 100+ suites and villas, a subterranean spa, a rooftop infinity pool, skyline weddings and the two-Michelin-star Lluci restaurant.",
  keywords: [
    "THE VIVI",
    "luxury hotel",
    "five star hotel",
    "luxury suites",
    "spa resort",
    "wedding venue",
    "corporate events",
    "Lluci restaurant",
    "hotel booking",
  ],
  authors: [{ name: "THE VIVI" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "THE VIVI — Modern Luxury Hospitality",
    description:
      "Arrive as a guest, leave as family. A modern icon of luxury hospitality.",
    siteName: "THE VIVI",
    images: [
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "THE VIVI luxury hotel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE VIVI — Modern Luxury Hospitality",
    description: "Arrive as a guest, leave as family.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    ],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#05060d",
  width: "device-width",
  initialScale: 1,
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "THE VIVI",
  image:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  url: SITE_URL,
  starRating: { "@type": "Rating", ratingValue: "5" },
  priceRange: "$$$$",
  telephone: "+91-12345-66666",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Aurum Boulevard",
    addressLocality: "Mumbai",
    addressRegion: "MH",
    postalCode: "400001",
    addressCountry: "IN",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
    { "@type": "LocationFeatureSpecification", name: "Infinity Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Fitness Center", value: true },
    { "@type": "LocationFeatureSpecification", name: "Fine Dining", value: true },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "3120",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
