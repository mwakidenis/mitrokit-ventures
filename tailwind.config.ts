import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core Background Colors
        background: {
          primary: '#000000',
          deep: '#0A0A0A',
          panel: '#111111',
        },
        // Primary Neon Range
        neon: {
          blue: '#00F5FF',
          green: '#00FFB2',
          lime: '#39FF14',
          orange: '#FF6A00',
          'orange-deep': '#FF8C00',
          yellow: '#FFFF00',
          'yellow-deep': '#FFD000',
          red: '#FF0033',
        },
        // Semantic Colors
        brand: {
          primary: '#00F5FF',
          secondary: '#00FFB2',
          accent: '#FF6A00',
          warning: '#FF8C00',
          highlight: '#FFD000',
          success: '#00FFB2',
          danger: '#FF0033',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-blue': 'glow-blue 2s ease-in-out infinite alternate',
        'glow-green': 'glow-green 2s ease-in-out infinite alternate',
        'glow-orange': 'glow-orange 2s ease-in-out infinite alternate',
        'glow-yellow': 'glow-yellow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        'glow-blue': {
          '0%': { boxShadow: '0 0 5px #00F5FF, 0 0 10px #00F5FF' },
          '100%': { boxShadow: '0 0 20px #00F5FF, 0 0 30px #00F5FF' },
        },
        'glow-green': {
          '0%': { boxShadow: '0 0 5px #00FFB2, 0 0 10px #00FFB2' },
          '100%': { boxShadow: '0 0 20px #00FFB2, 0 0 30px #00FFB2' },
        },
        'glow-orange': {
          '0%': { boxShadow: '0 0 5px #FF6A00, 0 0 10px #FF6A00' },
          '100%': { boxShadow: '0 0 20px #FF6A00, 0 0 30px #FF6A00' },
        },
        'glow-yellow': {
          '0%': { boxShadow: '0 0 5px #FFD000, 0 0 10px #FFD000' },
          '100%': { boxShadow: '0 0 20px #FFD000, 0 0 30px #FFD000' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'neon-grid': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300F5FF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
}

export default config
