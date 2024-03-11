import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5e4256',
        secondary: '#b080a2',
        accent: '#a87397',
        textPrimary: '#5e4256',
        textSecondary: '#5e4256',
        bgPrimary: 'rgb(255 255 255)',
        bgSoft: 'rgb(255 255 255 / 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
