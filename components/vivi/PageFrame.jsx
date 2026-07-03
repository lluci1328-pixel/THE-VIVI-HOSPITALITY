"use client";

import SmoothScroll from "@/components/SmoothScroll";
import MouseGlow from "@/components/MouseGlow";
import ScrollProgress from "@/components/ScrollProgress";
import BookingProvider from "@/components/vivi/BookingProvider";
import Sidebar from "@/components/vivi/Sidebar";
import Footer from "@/components/vivi/Footer";

// Shared shell for every secondary hotel page (rooms/weddings/corporate/spa/gym/events).
export default function PageFrame({ children }) {
  return (
    <>
      <MouseGlow />
      <div className="noise-overlay" aria-hidden />
      <BookingProvider>
        <SmoothScroll>
          <ScrollProgress />
          <Sidebar />
          <main className="lg:pl-[80px]">
            {children}
            <Footer />
          </main>
        </SmoothScroll>
      </BookingProvider>
    </>
  );
}
