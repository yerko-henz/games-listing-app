import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        page: {
          bgPrimary: "#EFEDF3",
          bgSecondary: "#EEEEEE",
          bgTertiary: "#404040",
        },
        text: {
          primary: "#3B3B3B",
          secondary: "#737373",
        },
        border: {
          primary: "#8F8F8F",
          secondary: "#3B3B3B",
        },
        button: {
          bgPrimary: "#585660",
          bgSecondary: "#FFFFFF",
        },
      },
      screens: {
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
