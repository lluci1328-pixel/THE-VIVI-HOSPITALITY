"use client";

import SmoothScroll from "@/components/SmoothScroll";
import MouseGlow from "@/components/MouseGlow";
import ScrollProgress from "@/components/ScrollProgress";
import BookingProvider from "@/components/vivi/BookingProvider";
import Sidebar from "@/components/vivi/Sidebar";
import RoomsHero from "@/components/vivi/rooms/RoomsHero";
import RoomsExplorer from "@/components/vivi/rooms/RoomsExplorer";
import RoomsCTA from "@/components/vivi/rooms/RoomsCTA";
import Footer from "@/components/vivi/Footer";

export default function RoomsPage() {
  return (
    <>
      <MouseGlow />
      <div className="noise-overlay" aria-hidden />
      <BookingProvider>
        <SmoothScroll>
          <ScrollProgress />
          <Sidebar />
          <main className="lg:pl-[80px]">
            <RoomsHero />
            <RoomsExplorer />
            <RoomsCTA />
            <Footer />
          </main>
        </SmoothScroll>
      </BookingProvider>
    </>
  );
}
