import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
    default: {
        name: 'Purple',
        colors: {
            primary: '#a855f7', // purple-500
            secondary: '#ec4899', // pink-500
            bg: '#0b0d14',
            surface: '#151925'
        }
    },
    ocean: {
        name: 'Ocean Blue',
        colors: {
            primary: '#3b82f6', // blue-500
            secondary: '#06b6d4', // cyan-500
            bg: '#0f172a', // slate-900
            surface: '#1e293b' // slate-800

        }
    },
    forest: {
        name: 'Forest Green',
        colors: {
            primary: '#22c55e', // green-500
            secondary: '#84cc16', // lime-500
            bg: '#052e16', // emerald-950
            surface: '#064e3b' // emerald-900
        }
    },
    sunset: {
        name: 'Sunset Orange',
        colors: {
            primary: '#f97316', // orange-500
            secondary: '#eab308', // yellow-500
            bg: '#020100ff', // amber-950
            surface: '#020100ff' // amber-9

        }
    },
    midnight: {
        name: 'Smoky',
        colors: {
            primary: '#d7eef5ff', // indigo-500
            secondary: '#c2c9e5ff', // violet-500
            bg: '#000000',
            surface: '#111111'
        }
    },
    rose: {
        name: 'Romantic Rose',
        colors: {
            primary: '#f43f5e', // rose-500
            secondary: '#ec4899', // pink-500
            bg: '#4c0519', // rose-950
            surface: '#881337' // rose-900
        }
    }
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('default');

    useEffect(() => {
        const savedTheme = localStorage.getItem('appTheme');
        if (savedTheme && THEMES[savedTheme]) {
            setCurrentTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        const theme = THEMES[currentTheme];
        const root = document.documentElement;

        root.style.setProperty('--color-primary', theme.colors.primary);
        root.style.setProperty('--color-secondary', theme.colors.secondary);
        root.style.setProperty('--color-bg', theme.colors.bg);
        root.style.setProperty('--color-surface', theme.colors.surface);

        localStorage.setItem('appTheme', currentTheme);
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes: THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
};
