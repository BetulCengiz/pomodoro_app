/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#d946ef",
                "primary-hover": "#c026d3",
                "secondary": "#8b5cf6",
                "background-dark": "#0f111a",
                "surface-dark": "#171a26",
                "surface-lighter": "#23263a",
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                'gradient-surface': 'linear-gradient(180deg, rgba(30, 32, 50, 0.5) 0%, rgba(20, 22, 35, 0.5) 100%)'
            },
            fontFamily: {
                "display": ["Spline Sans", "sans-serif"],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "2xl": "2rem",
                "full": "9999px"
            },
            animation: {
                'float': 'float 10s infinite ease-in-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/container-queries'),
        require('@tailwindcss/forms'),
    ],
}
