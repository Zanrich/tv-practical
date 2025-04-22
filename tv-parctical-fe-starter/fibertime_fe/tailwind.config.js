// tailwind.config.ts (using TypeScript since you're using Next.js 15)
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5722',
        secondary: '#2196F3',
      },
    },
  },
  plugins: [],
}

export default config