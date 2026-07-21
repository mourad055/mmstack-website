import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Combien de temps prend un projet ?',
    a: 'Un site vitrine prend généralement 1 à 2 semaines. Une application sur mesure dépend du périmètre — on vous donne un planning précis dès le devis, avant tout engagement.',
  },
  {
    q: 'Comment se passe le paiement ?',
    a: "On fonctionne par acompte au démarrage puis solde à la livraison. Le détail est toujours précisé dans le devis, sans frais cachés.",
  },
  {
    q: 'Travaillez-vous avec des entreprises hors du Cameroun ?',
    a: "Oui. Nous travaillons à distance avec des clients partout en Afrique centrale et au-delà. La communication se fait par WhatsApp, email ou appel vidéo selon votre préférence.",
  },
  {
    q: 'Que se passe-t-il après la livraison ?',
    a: 'Chaque projet inclut une formation rapide à la prise en main et une période de support pour corriger tout problème. Un contrat de maintenance est possible pour un suivi continu.',
  },
  {
    q: 'Puis-je vous confier un projet déjà commencé par une autre équipe ?',
    a: "Oui, on audite d'abord l'existant pour évaluer la faisabilité avant de proposer une reprise ou une refonte.",
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  const reduce = useReducedMotion()
  return (
    <div className="border-b border-[#2A2A2A]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group">
        <span className="font-semibold text-white group-hover:text-[#38BDF8] transition-colors">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="shrink-0 text-[#A0A0A0] group-hover:text-[#38BDF8]">
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden">
            <p className="text-[#A0A0A0] text-sm leading-relaxed pb-5 pr-8">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section-pad bg-[#0A0A0A] border-b border-[#2A2A2A]/50">
      <div className="container-xl mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12">
          <h2 className="section-title">Questions fréquentes</h2>
          <p className="section-sub">Ce qu'on nous demande le plus souvent avant de démarrer.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          {faqs.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
