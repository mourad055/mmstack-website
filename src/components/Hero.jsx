import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { AnimatedCounter, useIsDesktop } from '../utils/premium'

const HEADLINE = ['We', 'Build', 'Digital', 'Solutions', 'for', 'Africa.']

const stats = [
  { target: 24, suffix: 'h', label: 'Réponse garantie' },
  { target: 4, suffix: '', label: 'Services IT' },
  { target: 100, suffix: '%', label: 'Sur mesure' },
]

export default function Hero({ introDone = true }) {
  const reduce = useReducedMotion()
  const isDesktop = useIsDesktop()

  const wordContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  }
  const wordItem = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 50, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }
  const rise = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] } }),
  }

  const anim = introDone ? 'visible' : 'hidden'

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0A0A0A]">

      {/* Fond — vidéo sur desktop, poster statique sur mobile (économie de données) */}
      {isDesktop ? (
        <video
          className="absolute inset-0 w-full h-full object-cover hero-video"
          autoPlay muted loop playsInline preload="metadata" poster="/hero-poster.jpg">
          <source src="/hero-bg.webm" type="video/webm" />
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/hero-poster.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col justify-center flex-1 pl-6 pr-6 md:pl-12 lg:pl-16 pt-32 pb-28 w-full">
        <div className="w-full max-w-3xl">

          {/* Badge */}
          <motion.div variants={rise} custom={0} initial="hidden" animate={anim}
            className="mb-8 inline-flex self-start items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-white/80 tracking-wide">
            🇨🇲 Ambam, Cameroun · Depuis 2025
          </motion.div>

          {/* Titre — mot par mot */}
          <motion.h1
            variants={wordContainer} initial="hidden" animate={anim}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-white leading-[1.05] tracking-tight text-balance">
            {HEADLINE.map((word, i) => (
              <motion.span key={i} variants={wordItem} className="inline-block mr-4">
                {word === 'Digital'
                  ? <span className="italic font-light text-white/70">{word}</span>
                  : word === 'Africa.'
                    ? <span className="text-[#38BDF8]">{word}</span>
                    : word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sous-titre */}
          <motion.p variants={rise} custom={0.9} initial="hidden" animate={anim}
            className="mt-6 text-lg md:text-xl text-white/75 max-w-md leading-relaxed">
            Logiciels sur mesure, sites web et services IT depuis Ambam vers le monde entier.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={rise} custom={1.05} initial="hidden" animate={anim}
            className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#contact"
              className="bg-white text-[#0F172A] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/90 hover:scale-105 transition-all duration-200">
              Démarrer un projet →
            </a>
            <a href="#services"
              className="border border-white/25 bg-white/5 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/15 hover:border-white/40 transition-all duration-200">
              Voir nos services
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={rise} custom={1.2} initial="hidden" animate={anim}
            className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-10 md:gap-16">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-white">
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-sm text-white/65 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 hidden sm:flex flex-col items-center gap-2 z-10">
        <span className="text-white/50 text-xs tracking-widest uppercase">Découvrir</span>
        <motion.div animate={reduce ? {} : { y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} className="text-white/50" />
        </motion.div>
      </div>
    </section>
  )
}
