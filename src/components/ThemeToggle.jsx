import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTheme } from '../hooks/useDarkMode.jsx'

/**
 * Bascule clair/sombre — icône Sun/Moon qui se croise en rotation+fondu. `aria-pressed`
 * reflète l'état sombre pour les lecteurs d'écran, `title` donne un libellé explicite.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Activer le thème clair' : 'Activer le thème sombre'}
      title={isDark ? 'Thème clair' : 'Thème sombre'}
      className={`relative flex items-center justify-center w-9 h-9 rounded-full border border-[#E5E5E5] dark:border-white/15 text-[#0A0A0A] dark:text-white hover:border-[#38BDF8] dark:hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors duration-200 ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center">
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
