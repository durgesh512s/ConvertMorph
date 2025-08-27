import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563eb',
          'primary-light': '#3b82f6',
          'gray-bg': '#f9fafb',
        },
      },
      fontFamily: {
        'brand-heading': ['Inter', 'sans-serif'],
        'brand-body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
