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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "background-primary": "#E0E7FF",
        "background-secondary": "#F3F8FF",
        "color-black": "#333333",
        "color-gray": "#F2F2F7",
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
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
