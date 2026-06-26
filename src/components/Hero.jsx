import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const stats = [
  { n: '10+',  label: 'Projets livrés' },
  { n: '2',    label: 'Co-fondateurs' },
  { n: '100%', label: 'Made in Cameroon' },
]

const fade = (delay, y = 30) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0A0A0A]">

      {/* Background vidéo — desktop + mobile */}
      <video
        className="absolute inset-0 w-full h-full object-cover hero-video"
        autoPlay muted loop playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-bg.webm" type="video/webm" />
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Contenu — ancré à gauche sur desktop */}
      <div className="relative z-10 flex flex-col justify-center flex-1 pl-6 pr-6 md:pl-12 lg:pl-16 pt-32 pb-24 w-full">

        {/* Badge */}
        <motion.div {...fade(0.2, 20)}
          className="mb-8 inline-flex self-start items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1.5 text-xs text-white/70 tracking-[0.2em] uppercase">
          🇨🇲 Ambam · Cameroon · Since 2025
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fade(0.4, 40)}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-white leading-[1.05] tracking-tight max-w-2xl">
          We Build{' '}
          <span className="italic font-light text-white/60">Digital</span>
          <br />Solutions{' '}
          <span style={{ color: '#38BDF8' }}>for Africa.</span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p {...fade(0.7)}
          className="mt-6 text-lg md:text-xl text-white/55 max-w-md leading-relaxed">
          Logiciels sur mesure, sites web et services IT
          depuis Ambam vers le monde entier.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.9)} className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#contact"
            className="bg-white text-[#0F172A] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/90 hover:scale-105 transition-all duration-200">
            Démarrer un projet →
          </a>
          <a href="#services"
            className="border border-white/25 bg-white/5 backdrop-blur-sm text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/15 hover:border-white/40 transition-all duration-200">
            Voir nos services
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div {...fade(1.1, 20)}
          className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-10 md:gap-16">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <div className="text-3xl font-black text-white">{s.n}</div>
              <div className="text-sm text-white/45 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 z-10">
        <span className="text-white/30 text-xs tracking-widest uppercase">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} className="text-white/30" />
        </motion.div>
      </div>
    </section>
  )
}
