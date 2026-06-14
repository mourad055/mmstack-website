import { motion } from 'framer-motion'
import { Shield, Zap, Heart } from 'lucide-react'

const values = [
  { icon: Zap, label: 'Innovation', desc: 'Toujours à la pointe des technologies pour des solutions modernes.' },
  { icon: Heart, label: 'Proximité', desc: 'Nous connaissons le terrain — nous vivons dans le même contexte.' },
  { icon: Shield, label: 'Excellence', desc: 'Chaque livrable reflète notre engagement envers la qualité.' },
]

const founders = [
  {
    name: 'Mike Messanga',
    role: 'Co-fondateur & Lead Developer',
    // African young professional male
    img: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&q=80',
    bio: 'Passionné de développement web et mobile. Expert en architecture logicielle et solutions fullstack.'
  },
  {
    name: 'Mourad Nkwane',
    role: 'Co-fondateur & Tech Lead · Cybersécurité',
    // African young professional male
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Ingénieur en systèmes logistiques intelligents. Expert cybersécurité, IoT et développement fullstack.'
  },
]

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
            <h2 className="section-title">Deux dev, une vision commune.</h2>
            <p className="text-[#8A8A8A] leading-relaxed mb-6">
              MMstack est né d'un constat simple : les solutions IT proposées en Afrique centrale ne correspondent pas toujours aux réalités du terrain. Mike et Mourad, deux étudiants en génie informatique à l'ESTLC, ont décidé de changer ça.
            </p>
            <p className="text-[#8A8A8A] leading-relaxed mb-10">
              Basés à Ambam, au Cameroun, nous construisons des outils concrets — des apps qui fonctionnent sans connexion parfaite, des sites optimisés pour les mobiles d'entrée de gamme, des formations ancrées dans la réalité locale.
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

          {/* Right — Founders */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5">
            {founders.map((f, i) => (
              <div key={f.name}
                className="flex gap-5 p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-[#F5F5F5] dark:bg-[#1A1A1A] hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover grayscale" />
                </div>
                <div>
                  <div className="font-bold text-[#0A0A0A] dark:text-white mb-0.5">{f.name}</div>
                  <div className="text-xs text-[#8A8A8A] mb-2">{f.role}</div>
                  <p className="text-sm text-[#8A8A8A] leading-relaxed">{f.bio}</p>
                </div>
              </div>
            ))}

            {/* Team photo — African professionals */}
            <div className="rounded-xl overflow-hidden h-52 mt-4">
              <img
                src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=900&q=80"
                alt="L'équipe MMstack au travail"
                className="w-full h-full object-cover grayscale-[20%]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
