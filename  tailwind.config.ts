import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#B59410',
        cream: '#FCF9F2',
        charcoal: '#1A1A1A',
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
        cursive: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;