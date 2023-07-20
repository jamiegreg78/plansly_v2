/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      padding: {
        'sm': '0.5rem',
        'md': '1rem'
      },
      margin: {
        'sm': '0.5rem',
        'md': '1rem'
      },
      colors: {
        'brand': {
          'primary': '#702cc3'
        },
        'border': '#ddd'
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '1rem'
      },
    },
    colors: {
      'black': '#2c2c2c',
      'white': '#fff',
      'danger': {
        'primary': '#cd3753'
      }
    }
  },
  plugins: [],
}
