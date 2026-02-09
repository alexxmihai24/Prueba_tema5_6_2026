'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        // Al cargar, revisar preferencia guardada
        const savedTheme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        let initialTheme = 'light'
        if (savedTheme) {
            initialTheme = savedTheme
        } else if (systemPrefersDark) {
            initialTheme = 'dark'
        }

        setTheme(initialTheme)
        document.documentElement.setAttribute('data-theme', initialTheme)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    }

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle-fixed"
            title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
            aria-label="Cambiar tema"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    )
}
