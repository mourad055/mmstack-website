import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'mmstack-theme'
const ThemeContext = createContext(null)

function getInitialTheme() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

/**
 * Thème clair/sombre partagé via Context : plusieurs composants (Navbar, Footer, App,
 * scène 3D) ont besoin de lire le thème courant et de rester synchronisés entre eux dès
 * qu'un seul bouton (ThemeToggle, dans la Navbar) le change.
 *
 * Le script anti-FOUC dans index.html a déjà posé la classe `dark` sur <html> avant le
 * premier rendu React (préférence système au tout premier chargement, sinon valeur
 * mémorisée dans localStorage) — ce provider lit cet état initial puis garde le DOM et
 * React synchronisés, et mémorise tout changement manuel (qui prime alors sur le système).
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme() doit être utilisé sous <ThemeProvider>')
  return ctx
}
