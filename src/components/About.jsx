import { motion } from 'framer-motion'
import { Shield, Zap, Heart } from 'lucide-react'

const values = [
  { icon: Zap, label: 'Innovation', desc: 'Toujours à la pointe des technologies pour des solutions modernes.' },
  { icon: Heart, label: 'Proximité', desc: 'Nous connaissons le terrain — nous vivons dans le même contexte.' },
  { icon: Shield, label: 'Excellence', desc: 'Chaque livrable reflète notre engagement envers la qualité.' },
]

const pillars = [
  {
    title: 'Ancrage local',
    desc: "Nés et formés en Afrique centrale, nous comprenons les réalités du terrain : connectivité variable, appareils d'entrée de gamme, contextes économiques spécifiques.",
  },
  {
    title: 'Expertise technique',
    desc: 'Formation en génie informatique, spécialisations en développement fullstack, cybersécurité et systèmes logistiques intelligents.',
  },
]

function DotGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="about-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#about-dots)" />
    </svg>
  )
}

export default function About() {
  return (
    <section id="about" className="section-pad bg-white dark:bg-[#0A0A0A]">
      <div className="container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <div className="text-xs font-semibold tracking-widest text-[#8A8A8A] uppercase mb-3">Notre histoire</div>
            <h2 className="section-title">Une vision née sur le terrain.</h2>
            <p className="text-[#8A8A8A] leading-relaxed mb-6">
              MMstack est né d'un constat simple : les solutions IT proposées en Afrique centrale ne correspondent pas toujours aux réalités du terrain. Nous avons décidé de changer ça depuis Ambam, au Cameroun.
            </p>
            <p className="text-[#8A8A8A] leading-relaxed mb-10">
              Nous construisons des outils concrets — des apps qui fonctionnent sans connexion parfaite, des sites optimisés pour les mobiles d'entrée de gamme, des solutions ancrées dans la réalité locale.
            </p>

            {/* Values */}
            <div className="space-y-5">
              {values.map(v => {
                const Icon = v.icon
                return (
                  <div key={v.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                      <Icon size={17} className="text-[#0A0A0A] dark:text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-[#0A0A0A] dark:text-white text-sm mb-0.5">{v.label}</div>
                      <div className="text-[#8A8A8A] text-sm leading-relaxed">{v.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5">

            {/* Pillars */}
            {pillars.map(p => (
              <div key={p.title}
                className="p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-[#F5F5F5] dark:bg-[#1A1A1A] hover:-translate-y-0.5 transition-all duration-200">
                <div className="font-bold text-[#0A0A0A] dark:text-white mb-2">{p.title}</div>
                <p className="text-sm text-[#8A8A8A] leading-relaxed">{p.desc}</p>
              </div>
            ))}

            {/* Styled team block */}
            <div className="rounded-xl overflow-hidden h-52 mt-2 bg-[#0F172A] flex items-center justify-center relative">
              <DotGrid />
              <div className="relative z-10 text-center px-6">
                <p className="text-white/50 font-mono text-xs tracking-widest uppercase mb-2">L'équipe MMstack</p>
                <p className="text-white text-2xl font-black">Notre équipe</p>
                <p className="text-[#38BDF8] text-xs mt-1 tracking-widest">Ambam · Cameroun 🇨🇲</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
