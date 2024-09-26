import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "4rem",
      },
    },
    extend: {
      spacing: {
        "header-height": "80px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "background-primary": "#E0E7FF",
        "background-secondary": "#F3F8FF",
        "color-black": "#333333",
        "color-gray": "#F2F2F7",
        "color-dark-light": "#374151",
        "color-text-medium": "#8E8E93",
        "color-primary-light": "#C7D2FE",
      },
    },
  },
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#4338CA",
          secondary: "#FFFFFF",
          accent: "#333333",
          info: "F2F2F7",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
