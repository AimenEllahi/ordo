// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["Cubao Wide", "sans-serif"],
        sub: ["Bebas Neue", "sans-serif"],
        body: ["Julius Sans One", "sans-serif"],
      },
      colors: {
        beige: {
          100: "#e4ddc3", // primary background
          200: "#e4ddc2",
          300: "#e3e0c6",
        },
        brand: {
          black: "#000000",
          red: "#ad462c", // accent stripe
          bordeaux: "#964848", // secondary background
        },
        // optional neutrals from guide
        neutralx: {
          1: "#999966",
          2: "#999933",
          3: "#666633",
          4: "#999999",
          5: "#666600",
          6: "#996633",
        },
      },
      // we’ll add brand colors & fonts here
    },
  },
  plugins: [],
};

export default config;
