/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-merriweather)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-merriweather)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        paper: "#FDFBF7",
        ink: "#4A3B33",
        amber: {
          DEFAULT: "#B45309",
          hover: "#A16207",
          light: "#E4C090",
        },
        border: {
          light: "#E4D9BC",
          DEFAULT: "hsl(var(--border))",
        },
        dark: {
          DEFAULT: "#1C1917",
          card: "#232020",
        },
        primary: {
          DEFAULT: "#534AB7",
          light: "#6E65D0",
          dark: "#3F3793",
        },
        accent: {
          DEFAULT: "#E8650A",
          light: "#FF7D2A",
        },
        bg: {
          DEFAULT: "#0A0A0A",
          card: "#141414",
          elevated: "#1A1A1A",
          input: "#1E1E1E",
        },
        text: {
          DEFAULT: "#FAFAFA",
          muted: "#A1A1AA",
          dim: "#71717A",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        "soft-lg": "var(--shadow-soft-lg)",
      },
    },
  },
  plugins: [],
};
