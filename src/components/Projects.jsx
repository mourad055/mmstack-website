import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    title: 'Site Hôtel Central Ambam',
    category: 'Site vitrine',
    desc: 'Site web moderne avec fiche hôtel, galerie et référencement local pour un établissement à Ambam.',
    result: 'Livré en 1 semaine',
    stack: ['React', 'SEO', 'Responsive'],
    accent: '#34D399',
    visual: 'sites-web.jpg',
  },
  {
    title: 'MicroLab Virtuel',
    category: 'Plateforme web',
    desc: 'Environnement pédagogique interactif pour travaux pratiques en ligne, avec parcours guidés.',
    result: 'Usage académique',
    stack: ['Laravel', 'Vue.js', 'IA'],
    accent: '#38BDF8',
    visual: 'dev-logiciel.jpg',
  },
  {
    title: 'MBIO App',
    category: 'Application mobile',
    desc: 'Application de mobilité pensée pour le contexte camerounais — géolocalisation et réservation.',
    result: 'Prototype fonctionnel',
    stack: ['Flutter', 'Firebase', 'Maps'],
    accent: '#34D399',
    visual: null,
    icon: '🚕',
  },
  {
    title: 'DocForge',
    category: 'Outil SaaS',
    desc: 'Générateur automatique de rapports de stage aux normes ESTLC — export PDF en un clic.',
    result: 'Adopté par des étudiants',
    stack: ['FastAPI', 'React', 'LaTeX'],
    accent: '#A78BFA',
    visual: null,
    icon: '📄',
  },
]

function ProjectVisual({ project }) {
  if (project.visual) {
    return (
      <div className="relative h-44 overflow-hidden">
        <img
        src={`/${project.visual}`}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>
    )
  }

  return (
    <div
      className="relative h-44 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0F172A' }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: `radial-gradient(circle at 30% 50%, ${project.accent}, transparent 60%)` }}
      />
      <span className="text-5xl opacity-80" aria-hidden>{project.icon}</span>
    </div>
  )
}

export default function Projects() {
  const reduce = useReducedMotion()
  const container = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } } }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="projects" className="section-pad bg-[#0D0D0D] border-b border-[#2A2A2A]/50">
      <div className="container-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <h2 className="section-title mb-0">Réalisations sélectionnées</h2>
            <p className="section-sub mt-4">
              Quelques projets concrets livrés depuis Ambam — du site vitrine à l'application sur mesure.
            </p>
          </div>
          <a href="#contact" className="btn-outline shrink-0 self-start md:self-auto">
            Votre projet →
          </a>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <motion.article
              key={p.title}
              variants={item}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#38BDF8]/30 transition-colors duration-300">
              <ProjectVisual project={p} />

              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: p.accent }}>
                      {p.category}
                    </p>
                    <h3 className="font-bold text-white text-lg">{p.title}</h3>
                  </div>
                  <span className="shrink-0 text-[10px] font-mono text-[#A0A0A0] bg-[#0A0A0A] border border-[#2A2A2A] px-2 py-1 rounded-full">
                    {p.result}
                  </span>
                </div>

                <p className="text-[#A0A0A0] text-sm leading-relaxed flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mt-4 mb-5">
                  {p.stack.map((t) => (
                    <span key={t} className="text-[11px] font-mono text-[#A0A0A0] border border-[#2A2A2A] px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#38BDF8] hover:text-white transition-colors">
                  Projet similaire
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
