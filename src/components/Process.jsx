import { motion, useReducedMotion } from 'framer-motion'
import { MessageSquare, FileSearch, Code2, Rocket } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    title: 'Brief & échange',
    desc: 'On comprend votre besoin, votre contexte et vos contraintes — connectivité, budget, délais.',
  },
  {
    icon: FileSearch,
    title: 'Proposition claire',
    desc: 'Devis détaillé, périmètre précis et planning réaliste. Pas de surprise en cours de route.',
  },
  {
    icon: Code2,
    title: 'Développement',
    desc: 'Construction itérative avec points réguliers. Vous voyez avancer, on ajuste si besoin.',
  },
  {
    icon: Rocket,
    title: 'Livraison & suivi',
    desc: 'Mise en production, formation rapide et support post-livraison pour que ça tienne.',
  },
]

export default function Process() {
  const reduce = useReducedMotion()
  const container = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } } }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="process" className="section-pad bg-white dark:bg-[#0D0D0D] border-b border-[#E5E5E5]/70 dark:border-[#2A2A2A]/50">
      <div className="container-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14">
          <h2 className="section-title">Comment on travaille</h2>
          <p className="section-sub">
            Un processus simple et transparent — de la première conversation à la livraison.
          </p>
        </motion.div>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.li key={step.title} variants={item} className="relative">
                <div className="h-full p-6 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1A1A1A]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#0284C7] dark:text-[#38BDF8] font-mono text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
                    <div className="w-9 h-9 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
                      <Icon size={18} className="text-[#0284C7] dark:text-[#38BDF8]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#0A0A0A] dark:text-white mb-2">{step.title}</h3>
                  <p className="text-[#6B6B6B] dark:text-[#A0A0A0] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.li>
            )
          })}
        </motion.ol>
      </div>
    </section>
  )
}
