import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('mmstack-theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('mmstack-theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('mmstack-theme', 'light')
    }
  }, [dark])

  return [dark, setDark]
}
