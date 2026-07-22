import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Shield, Zap, Heart } from 'lucide-react'

const values = [
  { icon: Zap, label: 'Innovation', desc: 'Toujours à la pointe des technologies pour des solutions modernes.' },
  { icon: Heart, label: 'Proximité', desc: 'Nous connaissons le terrain — nous vivons dans le même contexte.' },
  { icon: Shield, label: 'Excellence', desc: 'Chaque livrable reflète notre engagement envers la qualité.' },
]

const pillars = [
  { title: 'Ancrage local', desc: "Nés et formés en Afrique centrale, nous comprenons les réalités du terrain : connectivité variable, appareils d'entrée de gamme, contextes économiques spécifiques." },
  { title: 'Expertise technique', desc: 'Formation en génie informatique, spécialisations en développement fullstack, cybersécurité et systèmes logistiques intelligents.' },
]

function ValueIcon({ Icon }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  return (
    <div ref={ref} className="relative w-11 h-11 flex-shrink-0">
      <svg className="absolute inset-0 w-11 h-11 -rotate-90" viewBox="0 0 44 44">
        <motion.circle
          cx="22" cy="22" r="20" fill="none" stroke="#38BDF8" strokeWidth="1.5"
          strokeDasharray="126"
          initial={{ strokeDashoffset: reduce ? 0 : 126 }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon size={17} className="text-[#0A0A0A] dark:text-white" />
      </div>
    </div>
  )
}

export default function About() {
  const reduce = useReducedMotion()
  const valueContainer = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.15 } } }
  const valueItem = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="about" className="section-pad bg-white dark:bg-[#0A0A0A] overflow-hidden border-b border-[#E5E5E5]/70 dark:border-[#2A2A2A]/50">
      <div className="container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="section-title">Une vision née sur le terrain.</h2>
            <p className="text-[#6B6B6B] dark:text-[#A0A0A0] leading-relaxed mb-6">
              MMstack est né d'un constat simple : les solutions IT proposées en Afrique centrale ne correspondent pas toujours aux réalités du terrain. Nous avons décidé de changer ça depuis Ambam, au Cameroun.
            </p>
            <p className="text-[#6B6B6B] dark:text-[#A0A0A0] leading-relaxed mb-10">
              Nous construisons des outils concrets — des apps qui fonctionnent sans connexion parfaite, des sites optimisés pour les mobiles d'entrée de gamme, des solutions ancrées dans la réalité locale.
            </p>

            <motion.div variants={valueContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
              {values.map((v) => (
                <motion.div key={v.label} variants={valueItem} className="flex gap-4 items-start">
                  <ValueIcon Icon={v.icon} />
                  <div>
                    <div className="font-bold text-[#0A0A0A] dark:text-white text-sm mb-0.5">{v.label}</div>
                    <div className="text-[#6B6B6B] dark:text-[#A0A0A0] text-sm leading-relaxed">{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="space-y-5">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-[#F5F5F5] dark:bg-[#1A1A1A] hover:border-[#38BDF8]/40 dark:hover:border-[#38BDF8]/20 transition-colors duration-300">
                <div className="font-bold text-[#0A0A0A] dark:text-white mb-2">{p.title}</div>
                <p className="text-sm text-[#6B6B6B] dark:text-[#A0A0A0] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <img
                src="/team-mmstack.jpg"
                alt="L'équipe MMstack à Ambam, Cameroun"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-semibold text-sm">L'équipe MMstack</p>
                <p className="text-white/70 text-xs mt-0.5">Ambam, Cameroun 🇨🇲</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
