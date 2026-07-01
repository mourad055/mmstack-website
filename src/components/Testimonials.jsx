import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const testimonials = [
  {
    quote: "MMstack nous a livré notre site web en une semaine. Résultat : moderne, rapide, et nos clients le trouvent facilement sur Google. Excellent travail.",
    name: 'Rodrigue Ateba', role: 'Gérant, Hôtel Central Ambam',
  },
  {
    quote: "DocForge m'a sauvé la mise pour mes rapports de stage. Plus besoin de passer des heures sur Word — tout est formaté automatiquement aux normes de l'école.",
    name: 'Chanceline Mendo', role: 'Étudiante, ESTLC Ébolowa',
  },
  {
    quote: "Formation informatique très pratique et adaptée. L'équipe connaît vraiment son sujet et sait l'expliquer à des non-techniciens.",
    name: 'Pastor Emmanuel Nkoa', role: "Directeur, Lycée technique d'Ambam",
  },
]

const PALETTES = [['#0F172A', '#38BDF8'], ['#0C1A12', '#34D399'], ['#1E1B4B', '#A78BFA']]

function RingAvatar({ name, idx }) {
  const reduce = useReducedMotion()
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  const [bg, fg] = PALETTES[idx % PALETTES.length]
  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full border-2 border-dashed"
        style={{ borderColor: fg + '55' }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute inset-[3px] rounded-full flex items-center justify-center font-bold text-sm"
        style={{ backgroundColor: bg, color: fg }}>
        {initials}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), [])

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next])

  const t = testimonials[index]

  return (
    <section className="section-pad bg-white dark:bg-[#0A0A0A]">
      <div className="container-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs font-semibold tracking-widest text-[#8A8A8A] uppercase mb-3">Témoignages</div>
          <h2 className="section-title">Ce que disent nos clients</h2>
          <p className="section-sub mb-14">Des vraies personnes, de vrais résultats.</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="min-h-[280px] md:min-h-[240px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full card">
                <motion.div
                  initial={{ scale: 0.3, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="text-6xl leading-none text-[#38BDF8]/30 font-serif mb-2">"</motion.div>
                <p className="text-[#0A0A0A] dark:text-[#F5F5F5] text-lg leading-relaxed mb-8">{t.quote}</p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <RingAvatar name={t.name} idx={index} />
                  <div>
                    <div className="font-semibold text-[#0A0A0A] dark:text-white text-sm">{t.name}</div>
                    <div className="text-[#8A8A8A] text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Témoignage ${i + 1}`}
                className="p-2 -m-1"
              >
                <motion.span
                  className="block rounded-full"
                  animate={{
                    width: i === index ? 24 : 8,
                    backgroundColor: i === index ? '#38BDF8' : 'rgba(120,120,120,0.4)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ height: 8 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
