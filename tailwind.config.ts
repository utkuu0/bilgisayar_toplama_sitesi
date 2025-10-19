import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'background': '#121827',
                'surface': '#1a2233',
                'primary': '#3b82f6',
                'primary-hover': '#2563eb',
                'accent': '#f59e0b',
                'text-main': '#e5e7eb',
                'text-secondary': '#9ca3af',
            },
        },
    },
    plugins: [],
}
export default config