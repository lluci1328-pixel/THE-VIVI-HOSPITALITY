"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import MouseGlow from "@/components/MouseGlow";
import ScrollProgress from "@/components/ScrollProgress";
import BookingProvider from "@/components/vivi/BookingProvider";
import Sidebar from "@/components/vivi/Sidebar";
import Hero from "@/components/vivi/Hero";
import Stats from "@/components/vivi/Stats";
import RoomsPreview from "@/components/vivi/RoomsPreview";
import Availability from "@/components/vivi/Availability";
import RestaurantTeaser from "@/components/vivi/RestaurantTeaser";
import WeddingTeaser from "@/components/vivi/WeddingTeaser";
import CorporateTeaser from "@/components/vivi/CorporateTeaser";
import Amenities from "@/components/vivi/Amenities";
import Offers from "@/components/vivi/Offers";
import AboutPreview from "@/components/vivi/AboutPreview";
import GalleryPreview from "@/components/vivi/GalleryPreview";
import Testimonials from "@/components/vivi/Testimonials";
import Contact from "@/components/vivi/Contact";
import Footer from "@/components/vivi/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
  }, [loaded]);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <MouseGlow />
      <div className="noise-overlay" aria-hidden />

      {/* Content mounts immediately (SEO + resilience); the loader overlays and
          lifts. Scroll stays locked until the intro completes. */}
      <BookingProvider>
        <SmoothScroll>
          <ScrollProgress />
          <Sidebar />

          <main className="lg:pl-[80px]">
            <Hero />
            <Stats />
            <RoomsPreview />
            <Availability />
            <RestaurantTeaser />
            <WeddingTeaser />
            <CorporateTeaser />
            <Amenities />
            <Offers />
            <AboutPreview />
            <GalleryPreview />
            <Testimonials />
            <Contact />
            <Footer />
          </main>
        </SmoothScroll>
      </BookingProvider>
    </>
  );
}
