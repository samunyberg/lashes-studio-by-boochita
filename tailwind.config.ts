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
        bgSofter: 'rgb(255 255 255 / 0.5)',
        bgMain: 'rgba(251, 215, 199, 255)',
      },
    },
  },
  plugins: [],
};
export default config;
