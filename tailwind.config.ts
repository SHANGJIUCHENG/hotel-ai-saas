import type { Config } from 'tailwindcss'

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // 设计约束：1 个中性色 + 2 个强调色
        neutral: {
          50: '#f6f7f8', 100: '#eceef0', 200: '#d8dde3', 300: '#c1c9d3', 400: '#9aa6b2',
          500: '#6b7785', 600: '#525f6d', 700: '#3d4854', 800: '#2b333d', 900: '#1f252c'
        },
        primary: {
          DEFAULT: '#2563eb'
        },
        accent: {
          DEFAULT: '#06b6d4'
        }
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: []
} satisfies Config