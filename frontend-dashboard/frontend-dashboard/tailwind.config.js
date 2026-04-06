/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#16171d',
        surface: '#1f2028',
        border: '#2e303a',
        textMain: '#f3f4f6',
        textMuted: '#9ca3af',
        primary: '#6366f1', // Indigo for active states
        primaryHover: '#4f46e5',
        danger: '#ef4444',
        warning: '#f97316',
        info: '#3b82f6',
        success: '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
