/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "sans-serif"],
        mono: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        bg: "#f8faf9",        // off-white background
        ink: "#1a2e2a",       // dark slate text
        teal: "#0f766e",      // primary accent
        tealdark: "#0b5a54",
        mint: "#d1f0ea",       // soft highlight
        line: "#e2e8e5",       // borders
        muted: "#5f716c",      // secondary text
        card: "#ffffff",
      },
    },
  },
  plugins: [],
};
