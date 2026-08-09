/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app-root/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      colors: {
        background: "#ffffff",
        foreground: "#252525",
        card: "#ffffff",
        "card-foreground": "#252525",
        primary: "#292929",
        "primary-foreground": "#fafafa",
        secondary: "#f5f5f5",
        "secondary-foreground": "#292929",
        muted: "#f5f5f5",
        "muted-foreground": "#737373",
        accent: "#f5f5f5",
        "accent-foreground": "#292929",
        destructive: "#dc2626",
        border: "#e5e5e5",
        input: "#e5e5e5",
        ring: "#a3a3a3",

        brand: {
          100: "#bacdfa",
          400: "#4e7df3",
          500: "#225df0",
          700: "#1842aa",
        },

        negative: {
          400: "#ea5b6a",
          500: "#f14a55",
          600: "#eb0b0b",
          700: "#cf3a4b",
          wash: "rgba(235, 11, 11, 0.12)",
        },

        wash: "#edeff3",
        disabled: "#e2e3e2",
        "disabled-border": "#edeff3",

        ink: {
          DEFAULT: "rgba(0, 0, 0, 0.87)",
          secondary: "rgba(0, 0, 0, 0.6)",
          tertiary: "rgba(0, 0, 0, 0.25)",
          disabled: "rgba(0, 0, 0, 0.38)",
        },

        "secondary-brand": {
          DEFAULT: "#002857",
          bold: "#001f43",
        },

        positive: "#008cff",
        warning: "#ee7000",
        success: "#00aa55",

        outline: "#e2e3e2",
        "input-active": "#f4f6f9",
      },
      borderRadius: {
        sm: 6,
        md: 8,
        lg: 10,
        xl: 14,
        "2xl": 18,
        "3xl": 22,
        "4xl": 26,
      },
    },
  },
  plugins: [],
};
