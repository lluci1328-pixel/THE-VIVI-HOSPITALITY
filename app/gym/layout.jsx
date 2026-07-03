const SITE_URL = "https://thevivi.example.com";
export const metadata = {
  title: "Performance Gym",
  description: "A Technogym suite, private trainers, movement studio and a recovery lab with cryotherapy — THE VIVI's 24-hour performance gym.",
  alternates: { canonical: `${SITE_URL}/gym` },
  openGraph: { title: "Performance Gym · THE VIVI", description: "Train like it's your sanctuary.", images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"] },
};
export default function GymLayout({ children }) { return children; }
