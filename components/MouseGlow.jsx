"use client";

import { useEffect, useRef } from "react";

// Luxury blue cursor glow — a soft light that trails the pointer. The native
// OS cursor stays fully visible; this only adds an elegant blue halo.
export default function MouseGlow() {
  const glow = useRef(null);
  const core = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let gx = tx, gy = ty, cx = tx, cy = ty;
    let visible = false;

    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!visible) { visible = true; if (glow.current) glow.current.style.opacity = "1"; if (core.current) core.current.style.opacity = "1"; }
    };
    const onLeave = () => { visible = false; if (glow.current) glow.current.style.opacity = "0"; if (core.current) core.current.style.opacity = "0"; };

    let raf;
    const loop = () => {
      // outer glow lags softly, inner core follows tighter
      gx += (tx - gx) * 0.14; gy += (ty - gy) * 0.14;
      cx += (tx - cx) * 0.32; cy += (ty - cy) * 0.32;
      if (glow.current) glow.current.style.transform = `translate3d(${gx - 130}px, ${gy - 130}px, 0)`;
      if (core.current) core.current.style.transform = `translate3d(${cx - 12}px, ${cy - 12}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={glow}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0, width: 260, height: 260,
          borderRadius: "50%", pointerEvents: "none", zIndex: 2, opacity: 0,
          background: "radial-gradient(circle, rgba(46,123,255,0.20) 0%, rgba(124,192,255,0.10) 35%, transparent 68%)",
          mixBlendMode: "screen", filter: "blur(4px)", transition: "opacity .4s ease", willChange: "transform",
        }}
      />
      <div
        ref={core}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0, width: 24, height: 24,
          borderRadius: "50%", pointerEvents: "none", zIndex: 3, opacity: 0,
          background: "radial-gradient(circle, rgba(124,192,255,0.55) 0%, rgba(46,123,255,0.25) 45%, transparent 70%)",
          mixBlendMode: "screen", transition: "opacity .4s ease", willChange: "transform",
        }}
      />
    </>
  );
}
