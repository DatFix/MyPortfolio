import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.add(storedTheme)
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);

        localStorage.setItem('theme', newTheme);
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative bg-gray-500/10 p-2 rounded-lg transition-colors"
        >
            <Sun
                className={`h-5 w-5 transition-all duration-300 ease-in-out ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                    }`}
            />
            <Moon
                className={`absolute top-2 left-2 h-5 w-5 transition-all duration-300 ease-in-out dark:text-white/80 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                    }`}
            />
        </button>
    )
}
