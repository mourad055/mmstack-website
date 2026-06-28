import { motion } from 'framer-motion'
import { Code2, Globe, HardDrive, Lightbulb } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Développement logiciel',
    desc: 'Applications sur mesure pour résoudre vos problèmes spécifiques — web, mobile et desktop.',
    img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&q=75',
  },
  {
    icon: Globe,
    title: 'Création de sites web',
    desc: 'Sites vitrine pour hôtels, commerces, institutions — modernes, rapides et optimisés SEO.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=75',
  },
  {
    icon: HardDrive,
    title: 'Installation & config',
    desc: 'Mise en place de logiciels professionnels, systèmes d\'exploitation et environnements de travail.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=75',
  },
  {
    icon: Lightbulb,
    title: 'Conseil IT',
    desc: 'Audit de vos besoins numériques et accompagnement dans votre transformation digitale.',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=75',
  },
]

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }) }

export default function Services() {
  return (
    <section id="services" className="section-pad bg-white dark:bg-[#0A0A0A]">
      <div className="container-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          <div className="text-xs font-semibold tracking-widest text-[#8A8A8A] uppercase mb-3">Ce qu'on fait</div>
          <h2 className="section-title">Nos services</h2>
          <p className="section-sub mb-14">Des solutions digitales pensées pour le contexte camerounais et africain.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group overflow-hidden rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1A1A1A] hover:-translate-y-1 transition-all duration-300 cursor-default">
                {/* Image */}
                <div className="h-44 overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" crossOrigin="anonymous"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[30%]" />
                </div>
                <div className="p-7">
                  <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] dark:bg-white flex items-center justify-center mb-4">
                    <Icon size={18} className="text-white dark:text-[#0A0A0A]" />
                  </div>
                  <h3 className="font-bold text-[#0A0A0A] dark:text-white text-lg mb-2">{s.title}</h3>
                  <p className="text-[#8A8A8A] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
