const SITE_URL = "https://thevivi.example.com";

export const metadata = {
  title: "Rooms & Suites",
  description:
    "Explore 100+ rooms, suites, villas and penthouses at THE VIVI — city, garden, sea and skyline views with butler service, private pools and club access.",
  alternates: { canonical: `${SITE_URL}/rooms` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/rooms`,
    title: "Rooms & Suites · THE VIVI",
    description: "Rest, reimagined — 100+ rooms and suites, each a private world.",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
    ],
  },
};

export default function RoomsLayout({ children }) {
  return children;
}
