import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Engineering color palette
        'slate-dark': '#1f2937',
        'slate-light': '#f3f4f6',
        'engineering-blue': '#0369a1',
        'engineering-green': '#15803d',
        'stress-red': '#dc2626',
        'stress-yellow': '#eab308',
        'stress-green': '#22c55e',
        // Pavement layer colors
        'bc-color': '#1a1a1a',
        'dbm-color': '#3a3a3a',
        'wmm-color': '#c4b5a0',
        'gsb-color': '#d4c5b0',
        'subgrade-color': '#8b7355',
        'geogrid-color': '#e5e7eb',
        'geotextile-color': '#f3e8d8',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Segoe UI', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
    },
  },
  plugins: [],
} satisfies Config;
