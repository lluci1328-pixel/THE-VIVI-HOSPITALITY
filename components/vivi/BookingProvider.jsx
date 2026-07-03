"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import BookingModal from "./BookingModal";

const BookingCtx = createContext(null);

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

export default function BookingProvider({ children }) {
  const [state, setState] = useState({ open: false, type: "room", preset: {} });

  const openBooking = useCallback((type = "room", preset = {}) => {
    setState({ open: true, type, preset });
    // pause Lenis while modal is open
    if (typeof window !== "undefined" && window.__lenis) window.__lenis.stop();
  }, []);

  const closeBooking = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    if (typeof window !== "undefined" && window.__lenis) window.__lenis.start();
  }, []);

  const value = useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingCtx.Provider value={value}>
      {children}
      <BookingModal
        open={state.open}
        type={state.type}
        preset={state.preset}
        onClose={closeBooking}
      />
    </BookingCtx.Provider>
  );
}
