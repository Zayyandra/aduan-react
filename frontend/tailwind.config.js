/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        bg: "#f5f8fc",         // off-white background
        ink: "#14233b",        // dark navy text
        navy: "#1e3a5f",       // primary brand
        navydark: "#15293f",
        navymid: "#2a4a73",
        gold: "#d4a017",       // accent
        golddark: "#b8860f",
        tint: "#eef2f7",       // soft navy surface
        line: "#dde5ef",       // borders
        muted: "#5a6b80",      // secondary text
        card: "#ffffff",
      },
    },
  },
  plugins: [],
};
