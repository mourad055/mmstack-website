import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTheme } from '../hooks/useDarkMode.jsx'
import ScrollReveal from './ScrollReveal'

const clients = [
  'Hôtel Central Ambam',
  'ESTLC Ébolowa',
  "Lycée technique d'Ambam",
]

const testimonials = [
  {
    quote: "MMstack nous a livré notre site web en une semaine. Résultat : moderne, rapide, et nos clients le trouvent facilement sur Google. Excellent travail.",
    name: 'Rodrigue Ateba', role: 'Gérant, Hôtel Central Ambam',
  },
  {
    quote: "L'équipe a développé une application web adaptée à nos contraintes de connexion. Interface claire, livraison dans les délais — exactement ce qu'il nous fallait.",
    name: 'Chanceline Mendo', role: 'Étudiante, ESTLC Ébolowa',
  },
  {
    quote: "Conseil IT concret et sans jargon. MMstack nous a aidés à structurer notre infrastructure numérique avec un budget maîtrisé.",
    name: 'Pastor Emmanuel Nkoa', role: "Directeur, Lycée technique d'Ambam",
  },
]

const PALETTES_DARK = [['#0F172A', '#38BDF8'], ['#0C1A12', '#34D399'], ['#1E1B4B', '#A78BFA']]
const PALETTES_LIGHT = [['#E0F2FE', '#0284C7'], ['#D1FAE5', '#059669'], ['#EDE9FE', '#7C3AED']]

function RingAvatar({ name, idx, theme }) {
  const reduce = useReducedMotion()
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  const palettes = theme === 'dark' ? PALETTES_DARK : PALETTES_LIGHT
  const [bg, fg] = palettes[idx % palettes.length]
  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full border-2 border-dashed"
        style={{ borderColor: fg + '55' }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className="absolute inset-[3px] rounded-full flex items-center justify-center font-bold text-sm"
        style={{ backgroundColor: bg, color: fg }}
      >
        {initials}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const { theme } = useTheme()

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [next, paused])

  const t = testimonials[index]

  return (
    <div id="testimonials" ref={sectionRef} className="scroll-mt-24">
      <ScrollReveal direction="right" className="mb-8">
        <h2 className="section-title">Ce que disent nos clients</h2>
        <p className="section-sub mt-4">Des vraies personnes, de vrais résultats.</p>
      </ScrollReveal>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-12 text-sm text-[#6B6B6B] dark:text-[#A0A0A0]">
        {clients.map((c, i) => (
          <ScrollReveal key={c} direction="up" delay={reduce ? 0 : i * 0.1} className="flex items-center gap-6">
            {i > 0 && <span className="hidden sm:inline text-[#E5E5E5] dark:text-[#2A2A2A]" aria-hidden>·</span>}
            <span>{c}</span>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal direction="right">
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="min-h-[280px] md:min-h-[220px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full card"
              >
                <p className="text-[#0A0A0A] dark:text-[#F5F5F5] text-lg leading-relaxed mb-8">{t.quote}</p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <RingAvatar name={t.name} idx={index} theme={theme} />
                  <div>
                    <div className="font-semibold text-[#0A0A0A] dark:text-white text-sm">{t.name}</div>
                    <div className="text-[#6B6B6B] dark:text-[#A0A0A0] text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Témoignage ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className="p-2 -m-1"
              >
                <motion.span
                  className="block rounded-full"
                  animate={{
                    width: i === index ? 24 : 8,
                    backgroundColor: i === index ? '#38BDF8' : 'rgba(120,120,120,0.4)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ height: 8 }}
                />
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
