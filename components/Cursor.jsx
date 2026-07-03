"use client";

import { useEffect, useRef, useState } from "react";

// Luxury custom cursor: a small dot + a lagging ring that expands and
// changes label over interactive targets. Desktop / fine-pointer only.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState("default"); // default | link | image | food
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-luxe");

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

      const t = e.target.closest("[data-cursor]");
      if (t) {
        const kind = t.getAttribute("data-cursor");
        setVariant(kind);
        setLabel(t.getAttribute("data-cursor-label") || "");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onDown = () => ring.classList.add("cursor-press");
    const onUp = () => ring.classList.remove("cursor-press");
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("cursor-luxe");
    };
  }, []);

  if (!enabled) return null;

  const ringSize =
    variant === "image" ? 84 : variant === "food" ? 96 : variant === "link" ? 56 : 34;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          background: "#e7cd8c",
          pointerEvents: "none",
          transition: "opacity .3s",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: "50%",
          border: "1px solid rgba(200,162,74,0.75)",
          background:
            variant === "default"
              ? "transparent"
              : "rgba(200,162,74,0.10)",
          backdropFilter: variant === "default" ? "none" : "blur(2px)",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition:
            "width .4s cubic-bezier(.16,1,.3,1), height .4s cubic-bezier(.16,1,.3,1), margin .4s cubic-bezier(.16,1,.3,1), background .4s, opacity .3s",
          fontFamily: "var(--font-body)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#e7cd8c",
        }}
      >
        {label}
      </div>
      <style>{`.cursor-press{ scale:0.8; }`}</style>
    </>
  );
}
