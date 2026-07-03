"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Only load the WebGL scene on the client, on capable devices, and pause it
// for reduced-motion users. Falls back to a soft glow so layout never shifts.
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero3D({ color = "#2e7bff", shape = "crystal", className = "" }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // basic WebGL capability check
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
    } catch { webgl = false; }
    setEnabled(webgl && !reduce);
  }, []);

  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      {enabled ? (
        <Scene3D color={color} shape={shape} />
      ) : (
        <div className="h-full w-full rounded-full" style={{ background: `radial-gradient(circle, ${color}44, transparent 70%)`, filter: "blur(40px)" }} />
      )}
    </div>
  );
}
