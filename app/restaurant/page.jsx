"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import LluciIntro from "@/components/lluci/LluciIntro";
import LluciNav from "@/components/lluci/LluciNav";
import LluciHero from "@/components/lluci/LluciHero";
import LluciStory from "@/components/lluci/LluciStory";
import LluciExperience from "@/components/lluci/LluciExperience";
import LluciChef from "@/components/lluci/LluciChef";
import LluciMenu from "@/components/lluci/LluciMenu";
import LluciWine from "@/components/lluci/LluciWine";
import LluciCocktails from "@/components/lluci/LluciCocktails";
import LluciDesserts from "@/components/lluci/LluciDesserts";
import LluciPrivate from "@/components/lluci/LluciPrivate";
import LluciGallery from "@/components/lluci/LluciGallery";
import LluciEvents from "@/components/lluci/LluciEvents";
import LluciReserve from "@/components/lluci/LluciReserve";
import LluciReviews from "@/components/lluci/LluciReviews";
import LluciContact from "@/components/lluci/LluciContact";
import LluciFooter from "@/components/lluci/LluciFooter";

function GoldProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div aria-hidden style={{ scaleX }} className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left">
      <div className="h-full w-full bg-gradient-to-r from-[#9c7a2e] via-[#c8a24a] to-[#e7cd8c] shadow-[0_0_12px_rgba(200,162,74,0.8)]" />
    </motion.div>
  );
}

export default function RestaurantPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
  }, [loaded]);

  const reserve = useCallback(() => {
    const el = document.querySelector("#reserve");
    if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -70, duration: 1.5 });
    else if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="lluci lluci-scroll min-h-screen">
      <LluciIntro onDone={() => setLoaded(true)} />
      <div className="noise-overlay" aria-hidden />

      {/* Content mounts immediately (good for SEO); the intro simply overlays
          and lifts. Scroll stays locked until the intro completes. */}
      <SmoothScroll>
        <GoldProgress />
        <LluciNav onReserve={reserve} />
        <main>
          <LluciHero onReserve={reserve} />
          <LluciStory />
          <LluciExperience onReserve={reserve} />
          <LluciChef />
          <LluciMenu onReserve={reserve} />
          <LluciWine />
          <LluciCocktails />
          <LluciDesserts onReserve={reserve} />
          <LluciPrivate onReserve={reserve} />
          <LluciGallery />
          <LluciEvents onReserve={reserve} />
          <LluciReserve />
          <LluciReviews />
          <LluciContact onReserve={reserve} />
        </main>
        <LluciFooter onReserve={reserve} />
      </SmoothScroll>
    </div>
  );
}
