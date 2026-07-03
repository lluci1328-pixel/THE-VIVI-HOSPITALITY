/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep navy-black base
        base: "#05060d",
        panel: "#0a0d18",
        panel2: "#10141f",
        // Electric blue system
        electric: "#2e7bff",
        azure: "#4f92ff",
        sky: "#7cc0ff",
        cyan: "#67e8f9",
        indigo: "#6d6ef6",
        violet: "#8b5cf6",
        silver: "#c7d2e0",
        mist: "#e8eef8",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.3em",
      },
      screens: {
        xs: "420px",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
