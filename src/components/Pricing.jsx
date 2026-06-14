import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '50 000',
    sub: 'Idéal pour démarrer',
    highlight: false,
    features: [
      'Site vitrine 5 pages',
      'Design responsive mobile',
      'Formulaire de contact',
      'Hébergement 1 an inclus',
      'Livraison en 7 jours',
      'Support 30 jours',
    ],
    cta: 'Commencer',
  },
  {
    name: 'Pro',
    price: '150 000',
    sub: 'Le plus populaire',
    highlight: true,
    features: [
      'Site complet jusqu\'à 15 pages',
      'Dashboard d\'administration',
      'Intégration paiement Mobile Money',
      'SEO avancé + Google Analytics',
      'Livraison en 14 jours',
      'Support 3 mois prioritaire',
    ],
    cta: 'Choisir Pro',
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    sub: 'Solution sur mesure',
    highlight: false,
    features: [
      'Application sur mesure',
      'Architecture cloud scalable',
      'Intégrations API tierces',
      'Formation équipe incluse',
      'Délai selon complexité',
      'Support dédié 12 mois',
    ],
    cta: 'Nous contacter',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad bg-[#F5F5F5] dark:bg-[#0D0D0D]">
      <div className="container-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <div className="text-xs font-semibold tracking-widest text-[#8A8A8A] uppercase mb-3">Tarifs</div>
          <h2 className="section-title">Simple et transparent</h2>
          <p className="section-sub mb-14">Aucun frais caché. Paiement Mobile Money accepté.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-8 border flex flex-col ${
                p.highlight
                  ? 'bg-[#0A0A0A] dark:bg-white border-transparent text-white dark:text-[#0A0A0A] shadow-2xl scale-105'
                  : 'bg-white dark:bg-[#1A1A1A] border-[#E5E5E5] dark:border-[#2A2A2A]'
              }`}>
              <div className="mb-6">
                {p.highlight && (
                  <span className="text-xs font-bold bg-white/20 dark:bg-[#0A0A0A]/20 px-3 py-1 rounded-full mb-4 inline-block">
                    ⭐ Recommandé
                  </span>
                )}
                <div className={`text-sm font-semibold mb-2 ${p.highlight ? 'text-white/60 dark:text-[#0A0A0A]/60' : 'text-[#8A8A8A]'}`}>
                  {p.name}
                </div>
                <div className={`text-3xl font-extrabold mb-1 ${p.highlight ? 'text-white dark:text-[#0A0A0A]' : 'text-[#0A0A0A] dark:text-white'}`}>
                  {p.price}
                  {p.price !== 'Sur devis' && <span className={`text-sm font-normal ml-1 ${p.highlight ? 'text-white/60 dark:text-[#0A0A0A]/60' : 'text-[#8A8A8A]'}`}>XAF</span>}
                </div>
                <div className={`text-xs ${p.highlight ? 'text-white/50 dark:text-[#0A0A0A]/50' : 'text-[#8A8A8A]'}`}>{p.sub}</div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map(f => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${p.highlight ? 'text-white/80 dark:text-[#0A0A0A]/80' : 'text-[#8A8A8A]'}`}>
                    <Check size={15} className={`flex-shrink-0 mt-0.5 ${p.highlight ? 'text-white dark:text-[#0A0A0A]' : 'text-[#0A0A0A] dark:text-white'}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contact" className={`block text-center py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                p.highlight
                  ? 'bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A]'
                  : 'border border-[#0A0A0A] dark:border-white text-[#0A0A0A] dark:text-white hover:bg-[#0A0A0A] hover:text-white dark:hover:bg-white dark:hover:text-[#0A0A0A]'
              }`}>
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
