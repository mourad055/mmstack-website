import { useEffect } from 'react'

/** Force le thème sombre — le mode clair a été retiré. */
export function useDarkMode() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('mmstack-theme', 'dark')
  }, [])
}
