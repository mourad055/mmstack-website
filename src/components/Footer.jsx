import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Mail, Github, Linkedin, MessageCircle, ArrowUp, ChevronUp, Sun, Moon } from 'lucide-react'

/* Bouton back-to-top — apparaît après 500px, en bas à gauche */
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ y: -4, scale: 1.08, boxShadow: '0 0 20px rgba(56,189,248,0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Retour en haut"
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] border border-white/10 dark:border-black/10 flex items-center justify-center">
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

const WA = '237697074455'

const cols = [
  {
    title: 'Services',
    links: [
      { label: 'Développement logiciel', href: '#services' },
      { label: 'Création de sites web', href: '#services' },
      { label: 'Installation & config', href: '#services' },
      { label: 'Conseil IT', href: '#services' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos', href: '#about' },
      { label: 'Notre équipe', href: '#about' },
      { label: 'Témoignages', href: '#' },
    ],
  },
  {
    title: 'Projets',
    links: [
      { label: 'MicroLab Virtuel', href: '#' },
      { label: 'MBIO App', href: '#' },
      { label: 'DocForge', href: '#' },
      { label: 'Site Hôtel Ambam', href: '#' },
    ],
  },
  {
    title: 'Stack',
    links: [
      { label: 'React & Next.js', href: '#' },
      { label: 'FastAPI & Laravel', href: '#' },
      { label: 'Flutter', href: '#' },
      { label: 'Cybersécurité', href: '#' },
    ],
  },
  {
    title: 'Localisation',
    links: [
      { label: 'Ambam', href: '#contact' },
      { label: 'Région du Sud', href: '#contact' },
      { label: 'Cameroun 🇨🇲', href: '#contact' },
      { label: 'Afrique centrale', href: '#contact' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Nous écrire', href: '#contact' },
      { label: 'WhatsApp', href: `https://wa.me/${WA}` },
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
    ],
  },
]

const socials = [
  { icon: Mail, href: 'mailto:nkwanemourad50@gmail.com', label: 'Email' },
  { icon: MessageCircle, href: `https://wa.me/${WA}`, label: 'WhatsApp' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Footer({ dark, setDark }) {
  const reduce = useReducedMotion()
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Top — logo + description */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 py-12 border-b border-white/8">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo-icon-light.png" alt="MMstack logo" className="h-8 w-auto object-contain" />
            <span
              className="text-lg text-white tracking-wide"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}>
              MM<span style={{ fontWeight: 300, letterSpacing: '0.09em' }}>stack</span>
            </span>
          </a>
          <p className="text-white/40 text-sm leading-relaxed max-w-2xl md:ml-6 md:pl-6 md:border-l md:border-white/10">
            MMstack conçoit des logiciels sur mesure, des sites web et des services IT pour les entreprises
            d'Afrique centrale. Basés à Ambam, Cameroun — nous construisons du digital qui tient.
          </p>
        </div>

        {/* Middle — link columns (stagger au scroll) */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 py-12 border-b border-white/8">
          {cols.map(col => (
            <motion.div key={col.title}
              variants={{ hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="text-white/90 text-xs font-semibold uppercase tracking-widest mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-sm text-white/35 hover:text-white transition-colors duration-200">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Social icons + controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-8 border-b border-white/8">
          {socials.map(s => (
            <a key={s.label} href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={s.label}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200">
              <s.icon size={16} />
            </a>
          ))}

          {/* Séparateur visuel */}
          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Retour en haut"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200">
            <ArrowUp size={16} />
          </button>

          {/* Dark / light toggle */}
          {setDark && (
            <button
              onClick={() => setDark(!dark)}
              aria-label="Changer le thème"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
        </div>

        {/* Bottom copyright */}
        <div className="py-6 text-center">
          <p className="text-white/25 text-xs">
            © 2026 MMstack · Fait avec ❤️ depuis{' '}
            <span className="text-white/40">Ambam, Cameroun 🇨🇲</span>
          </p>
        </div>

      </div>
    </footer>
  )
}
