import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Mail, Github, MessageCircle, ArrowUp, ChevronUp } from 'lucide-react'
import { useTheme } from '../hooks/useDarkMode.jsx'
import { EMAIL_CC, EMAIL_MAIN, whatsappHref, WHATSAPP_EXTRA, WHATSAPP_MAIN } from '../config/contacts'

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
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A] border border-white/10 dark:border-black/10 flex items-center justify-center">
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

const GITHUB = 'https://github.com/mourad055/mmstack-website'

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
      { label: 'Réalisations', href: '#projects' },
      { label: 'Notre processus', href: '#process' },
      { label: 'Témoignages', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' },
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
    title: 'Nous joindre',
    links: [
      { label: 'Formulaire', href: '#contact' },
      { label: WHATSAPP_MAIN.display.replace('+237 ', 'WA '), href: whatsappHref(), external: true },
      { label: WHATSAPP_EXTRA.display.replace('+237 ', 'WA '), href: whatsappHref(undefined, WHATSAPP_EXTRA.digits), external: true },
      { label: EMAIL_MAIN, href: `mailto:${EMAIL_MAIN}` },
      { label: EMAIL_CC, href: `mailto:${EMAIL_CC}` },
      { label: 'GitHub', href: GITHUB, external: true },
    ],
  },
]

const socials = [
  { icon: Mail, href: `mailto:${EMAIL_MAIN}`, label: 'Email' },
  { icon: Mail, href: `mailto:${EMAIL_CC}`, label: 'Email (copie)' },
  { icon: MessageCircle, href: whatsappHref(), label: 'WhatsApp' },
  { icon: MessageCircle, href: whatsappHref(undefined, WHATSAPP_EXTRA.digits), label: 'WhatsApp (2)' },
  { icon: Github, href: GITHUB, label: 'GitHub' },
]

export default function Footer() {
  const reduce = useReducedMotion()
  const { theme } = useTheme()
  return (
    <footer className="bg-white dark:bg-[#0A0A0A] border-t border-[#E5E5E5] dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        <div className="flex flex-col md:flex-row md:items-center gap-6 py-12 border-b border-[#E5E5E5] dark:border-white/8">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <img
              src={theme === 'dark' ? '/logo-icon-light.png' : '/logo-icon-dark.png'}
              alt="MMstack logo"
              className="h-8 w-auto object-contain"
            />
            <span
              className="text-lg text-[#0A0A0A] dark:text-white tracking-wide"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}>
              MM<span style={{ fontWeight: 300, letterSpacing: '0.09em' }}>stack</span>
            </span>
          </a>
          <p className="text-[#6B6B6B] dark:text-white/50 text-sm leading-relaxed max-w-2xl md:ml-6 md:pl-6 md:border-l md:border-[#E5E5E5] dark:md:border-white/10">
            MMstack conçoit des logiciels sur mesure, des sites web et des services IT pour les entreprises
            d'Afrique centrale. Basés à Ambam, Cameroun — nous construisons du digital qui tient.
          </p>
        </div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-[#E5E5E5] dark:border-white/8">
          {cols.map(col => (
            <motion.div key={col.title}
              variants={{ hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="text-[#0A0A0A]/90 dark:text-white/90 text-xs font-semibold uppercase tracking-widest mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noreferrer' : undefined}
                      className="link-underline inline-block text-sm text-[#0A0A0A]/50 dark:text-white/45 hover:text-[#0A0A0A] dark:hover:text-white transition-colors duration-200">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4 py-8 border-b border-[#E5E5E5] dark:border-white/8">
          {socials.map(s => (
            <a key={s.label} href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={s.label}
              className="w-10 h-10 rounded-full border border-[#E5E5E5] dark:border-white/10 flex items-center justify-center text-[#0A0A0A]/50 dark:text-white/45 hover:text-[#0A0A0A] dark:hover:text-white hover:border-[#0A0A0A]/30 dark:hover:border-white/30 transition-all duration-200">
              <s.icon size={16} />
            </a>
          ))}

          <div className="w-px h-6 bg-[#E5E5E5] dark:bg-white/10 mx-1" />

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Retour en haut"
            className="w-10 h-10 rounded-full border border-[#E5E5E5] dark:border-white/10 flex items-center justify-center text-[#0A0A0A]/50 dark:text-white/45 hover:text-[#0A0A0A] dark:hover:text-white hover:border-[#0A0A0A]/30 dark:hover:border-white/30 transition-all duration-200">
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="py-6 text-center">
          <p className="text-[#0A0A0A]/30 dark:text-white/30 text-xs">© 2026 MMstack · Tous droits réservés</p>
          <p className="text-[#0A0A0A]/45 dark:text-white/45 text-xs mt-3 flex items-center justify-center gap-1.5">
            Built with
            <motion.span
              animate={reduce ? {} : { scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-red-500">❤️</motion.span>
            from 🇨🇲 Cameroon
          </p>
        </div>

      </div>
    </footer>
  )
}
