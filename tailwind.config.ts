import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Noto Sans JP', 'sans-serif'],
        serif: ['var(--font-sans)', 'Noto Sans JP', 'sans-serif'],
        display: ['var(--font-display)', 'Playfair Display', 'serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          green: '#1D9E75',
          'green-dark': '#0F6E56',
          'green-light': '#E1F5EE',
          blue: '#378ADD',
          'blue-dark': '#185FA5',
          'blue-light': '#E6F1FB',
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
