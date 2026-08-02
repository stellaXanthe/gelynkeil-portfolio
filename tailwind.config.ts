import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf5e6",
          100: "#f9e0b3",
          200: "#f3c16b",
          300: "#eda63d",
          400: "#f2b84e",
          500: "#d58f1f",
          600: "#a56d19",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
