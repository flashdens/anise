import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  plugins: [
    require("tailwindcss-animate"),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        '51': 'repeat(51, max-content)',
      },
      gridTemplateRows: {
        '51': 'repeat(51, max-content)',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(180deg)' },
        },
      },
      animation: {
        flip: 'flip 0.5s ease-in-out',
      },
    },
  },
  purge: {
      safelist: [
        'text-red-500', 'text-orange-500', 'text-yellow-500',
        'text-green-500', 'text-blue-500', 'text-indigo-500', 'text-purple-500',
        'transition-opacity',
        'opacity-100',
        'opacity-0',
        'duration-500',
        'pointer-events-none',
      ],
    },
};

export default config;
