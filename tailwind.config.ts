import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary, #6EC5B8)",
          foreground: "var(--primary-foreground, #FFFFFF)",
          50: "#F0FDF4",
          100: "#DCFCE7",
          500: "#6EC5B8",
          600: "#48A999",
          700: "#2E7C6F",
        },
        secondary: {
          DEFAULT: "var(--secondary, #2C3032)",
          foreground: "var(--secondary-foreground, #FFFFFF)",
        },
        accent: {
          DEFAULT: "var(--accent, #38BDF8)",
          foreground: "var(--accent-foreground, #0F172A)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius, 1rem)",
        md: "calc(var(--radius, 1rem) - 2px)",
        sm: "calc(var(--radius, 1rem) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
