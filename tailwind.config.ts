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
        primary: '#524237',
        secondary: '#e8ad80',
        accent: '#c9a489',
        bgSoft: 'rgb(255 255 255 / 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
