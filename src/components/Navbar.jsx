import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur border-b border-[#E5E5E5] dark:border-[#2A2A2A]'
        : 'bg-transparent'
    }`}>
      <div className="container-xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16">
        {/* Logo — extrémité gauche */}
        <a href="#" aria-label="MMstack — retour en haut" className="flex items-center gap-2 shrink-0">
          <img
            src={dark ? '/logo-icon-light.png' : '/logo-icon-dark.png'}
            alt="Logo MMstack — cygne origami"
            width="461" height="331"
            className="h-8 w-auto object-contain"
          />
          <span className="text-xl font-normal text-[#0A0A0A] dark:text-white">MMstack</span>
        </a>

        {/* Desktop : nav + actions groupés à droite */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-[#8A8A8A] hover:text-[#0A0A0A] dark:hover:text-white transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A] transition-colors">
              {dark ? <Sun size={18} className="text-white" /> : <Moon size={18} className="text-[#0A0A0A]" />}
            </button>
            <a href="#contact" className="btn-primary text-sm">
              Nous contacter
            </a>
          </div>
        </div>

        {/* Mobile : dark toggle + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A] transition-colors">
            {dark ? <Sun size={18} className="text-white" /> : <Moon size={18} className="text-[#0A0A0A]" />}
          </button>
          <button className="p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white dark:bg-[#0A0A0A] border-b border-[#E5E5E5] dark:border-[#2A2A2A] px-6 pb-6 pt-2">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block py-3 text-sm text-[#8A8A8A] hover:text-[#0A0A0A] dark:hover:text-white border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary mt-4 block text-center">
              Nous contacter
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
