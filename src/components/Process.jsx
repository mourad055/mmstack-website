import { MessageSquare, FileSearch, Code2, Rocket } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

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

  return (
    <div id="process" className="scroll-mt-24">
      <ScrollReveal direction="right" className="mb-14">
        <h2 className="section-title">Comment on travaille</h2>
        <p className="section-sub mt-4">
          Un processus simple et transparent — de la première conversation à la livraison.
        </p>
      </ScrollReveal>

      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <ScrollReveal
              key={step.title}
              direction="right"
              delay={reduce ? 0 : (i % 2) * 0.08}
              as="li"
            >
              <div className="h-full p-6 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1A1A1A]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#0284C7] dark:text-[#38BDF8] font-mono text-sm font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#38BDF8]/10 flex items-center justify-center">
                    <Icon size={18} className="text-[#0284C7] dark:text-[#38BDF8]" />
                  </div>
                </div>
                <h3 className="font-bold text-[#0A0A0A] dark:text-white mb-2">{step.title}</h3>
                <p className="text-[#6B6B6B] dark:text-[#A0A0A0] text-sm leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          )
        })}
      </ol>
    </div>
  )
}
