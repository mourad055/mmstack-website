import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Processus', href: '#process' },
  { label: 'Réalisations', href: '#projects' },
  { label: 'À propos', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
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
        ? 'bg-[#0A0E1A]/80 backdrop-blur-xl border-b border-white/10'
        : 'bg-transparent'
    }`}>
      <div className="w-full pl-6 pr-6 md:pl-12 lg:pl-16 md:pr-12 lg:pr-16 flex items-center justify-between h-16">
        {/* Logo — extrémité gauche */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img
            src="/logo-icon-light.png"
            alt="MMstack logo"
            className="h-7 sm:h-8 w-auto object-contain"
          />
          <span
            className="text-base sm:text-lg text-white tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}>
            MM<span style={{ fontWeight: 300, letterSpacing: '0.09em' }}>stack</span>
          </span>
        </a>

        {/* Desktop : nav + actions groupés à droite */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="link-underline text-sm text-white/60 hover:text-white transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn-primary text-sm">
            Nous contacter
          </a>
        </div>

        {/* Mobile : hamburger */}
        <div className="flex items-center lg:hidden">
          <button className="p-2 text-white" onClick={() => setOpen(!open)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}>
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
            className="lg:hidden bg-[#0A0A0A] border-b border-[#2A2A2A] px-6 pb-6 pt-2">
            <nav className="flex flex-col">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="py-3.5 text-[15px] text-[#D4D4D4] hover:text-white border-b border-[#1F1F1F] transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-5">
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary block text-center">
                Nous contacter
              </a>
              <a href="https://wa.me/237697074455" target="_blank" rel="noreferrer"
                className="btn-outline block text-center">
                WhatsApp direct
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
