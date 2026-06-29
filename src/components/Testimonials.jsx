import { motion } from 'framer-motion'
import InitialsAvatar from '../utils/InitialsAvatar'

const testimonials = [
  {
    quote: "MMstack nous a livré notre site web en une semaine. Résultat : moderne, rapide, et nos clients le trouvent facilement sur Google. Excellent travail.",
    name: "Rodrigue Ateba",
    role: "Gérant, Hôtel Central Ambam",
  },
  {
    quote: "DocForge m'a sauvé la mise pour mes rapports de stage. Plus besoin de passer des heures sur Word — tout est formaté automatiquement aux normes de l'école.",
    name: "Chanceline Mendo",
    role: "Étudiante, ESTLC Ébolowa",
  },
  {
    quote: "Formation informatique très pratique et adaptée. Mourad et Mike connaissent vraiment leur sujet et savent l'expliquer à des non-techniciens.",
    name: "Pastor Emmanuel Nkoa",
    role: "Directeur, Lycée technique d'Ambam",
  },
]

export default function Testimonials() {
  return (
    <section className="section-pad bg-white dark:bg-[#0A0A0A]">
      <div className="container-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <div className="text-xs font-semibold tracking-widest text-[#8A8A8A] uppercase mb-3">Témoignages</div>
          <h2 className="section-title">Ce que disent nos clients</h2>
          <p className="section-sub mb-14">Des vraies personnes, de vrais résultats.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card flex flex-col justify-between">
              <div>
                <div className="text-4xl text-[#E5E5E5] dark:text-[#2A2A2A] font-serif mb-4 leading-none">"</div>
                <p className="text-[#0A0A0A] dark:text-[#F5F5F5] text-sm leading-relaxed mb-6">{t.quote}</p>
              </div>
              <div className="flex items-center gap-3 pt-5 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                <InitialsAvatar name={t.name} size={40} />
                <div>
                  <div className="font-semibold text-[#0A0A0A] dark:text-white text-sm">{t.name}</div>
                  <div className="text-[#8A8A8A] text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
