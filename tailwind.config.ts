import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
    },
  },
  plugins: [],
  animations: {
    "fade-in": "fade-in 0.5s ease-in-out",
  },
  // Define keyframes for the custom animation
  keyframes: {
    "fade-in": {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
  },
} satisfies Config;
