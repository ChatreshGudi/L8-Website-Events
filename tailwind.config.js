/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "terminal-bg": "#0c1017",
        "terminal-header": "#111722",
        "terminal-border": "#1e293b",
        "cyber-blue": "#3b82f6",
        "surface": "#fcf8fa",
        "surface-dim": "#dcd9db",
        "surface-bright": "#fcf8fa",
        "surface-container": "#f0edef",
        "surface-container-low": "#f6f3f5",
        "surface-container-high": "#eae7e9",
        "surface-container-highest": "#e4e2e4",
        "on-surface": "#1b1b1d",
        "on-surface-variant": "#45464d",
        "outline": "#76777d",
        "outline-variant": "#c6c6cd",
        "primary": "#000000",
        "on-primary": "#ffffff",
        "primary-container": "#131b2e",
        "on-primary-container": "#7c839b",
        "secondary": "#0058be",
        "on-secondary": "#ffffff",
        "secondary-container": "#2170e4",
        "tertiary": "#000000",
        "success": "#10B981",
        "warning": "#F59E0B",
        "error": "#EF4444"
      },
      fontFamily: {
        display: ["'Hanken Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.375rem",
        xl: "0.5rem",
        "2xl": "0.75rem",
        full: "9999px"
      },
      spacing: {
        "margin-mobile": "16px",
        "margin-desktop": "32px",
        "gutter": "24px",
        "max-width": "1280px"
      }
    },
  },
  plugins: [],
}
