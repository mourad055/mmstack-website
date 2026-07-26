import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Globe, AppWindow } from 'lucide-react'

const websites = [
  {
    title: "L'AURA Labs",
    category: 'Site vitrine',
    desc: "Site immersif pour une officine de haute couture cellulaire — diagnostic de peau interactif et personnalisation de sérums botaniques.",
    result: 'En ligne',
    stack: ['React', 'Motion', 'UX'],
    accent: '#34D399',
    visual: 'sites-web.jpg',
    href: 'https://beauty.services-ztf.com',
  },
  {
    title: 'Pharmacie des Trois Frontières',
    category: 'Site vitrine',
    desc: 'Site web moderne pour une pharmacie à Ambam — contact rapide, horaires et présence locale claire pour les patients.',
    result: 'En ligne',
    stack: ['React', 'SEO', 'Responsive'],
    accent: '#38BDF8',
    visual: 'conseil-it.jpg',
    href: 'https://pharmacy.services-ztf.com',
  },
]

const apps = [
  {
    title: 'Lexis',
    category: 'Application SaaS',
    desc: 'Générateur automatique de rapports de stage aux normes ESTLC — export PDF en un clic. Anciennement DocForge.',
    result: 'Adopté par des étudiants',
    stack: ['FastAPI', 'React', 'LaTeX'],
    accent: '#A78BFA',
    logo: 'lexis-logo.png',
    logoBg: 'bg-white',
    href: 'https://lexis.services-ztf.com/',
  },
  {
    title: 'Scolia',
    category: 'Application SaaS',
    desc: 'Génération automatisée de cartes scolaires pour établissements — mise en page, photos et export en lot.',
    result: 'En déploiement',
    stack: ['React', 'Node.js', 'PDF'],
    accent: '#38BDF8',
    logo: 'scolia-logo.png',
    logoBg: 'bg-white',
    href: 'https://scolia.services-ztf.com/login',
  },
]

function WebsiteVisual({ project }) {
  return (
    <div className="relative h-52 md:h-60 overflow-hidden">
      <img
        src={`/${project.visual}`}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/20 to-transparent" />
      <span
        className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm"
        style={{ color: project.accent, backgroundColor: `${project.accent}26`, border: `1px solid ${project.accent}44` }}
      >
        {project.category}
      </span>
      <span className="absolute top-4 right-4 text-[10px] font-mono text-white/90 bg-black/40 border border-white/15 px-2 py-1 rounded-full backdrop-blur-sm">
        {project.result}
      </span>
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="font-bold text-white text-xl md:text-2xl leading-tight">{project.title}</h3>
      </div>
    </div>
  )
}

function AppVisual({ project }) {
  return (
    <div className={`relative h-36 flex items-center justify-center overflow-hidden ${project.logoBg || 'bg-[#EFF6FF] dark:bg-[#0F172A]'}`}>
      <img
        src={`/${project.logo}`}
        alt={`Logo ${project.title}`}
        loading="lazy"
        className="max-h-[70%] max-w-[70%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  )
}

export default function Projects() {
  const reduce = useReducedMotion()
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="projects" className="section-pad bg-white dark:bg-[#0D0D0D] border-b border-[#E5E5E5]/70 dark:border-[#2A2A2A]/50">
      <div className="container-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div className="max-w-xl">
            <h2 className="section-title mb-0">Réalisations sélectionnées</h2>
            <p className="section-sub mt-4">
              Sites web livrés pour des commerces locaux, et applications métier construites depuis Ambam.
            </p>
          </div>
          <a href="#contact" className="btn-outline shrink-0 self-start md:self-auto">
            Votre projet →
          </a>
        </motion.div>

        {/* ——— Sites web (mis en avant) ——— */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#38BDF8]/15 text-[#0284C7] dark:text-[#38BDF8]">
              <Globe size={18} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#0A0A0A] dark:text-white">Sites web réalisés</h3>
              <p className="text-sm text-[#6B6B6B] dark:text-[#A0A0A0]">Vitrines digitales en production</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {websites.map((p, i) => (
              <motion.article
                key={p.title}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1A1A1A] hover:border-[#38BDF8]/60 dark:hover:border-[#38BDF8]/40 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <WebsiteVisual project={p} />

                <div className="flex flex-col flex-1 p-6 md:p-7">
                  <p className="text-[#6B6B6B] dark:text-[#A0A0A0] text-sm leading-relaxed flex-1">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-4 mb-6">
                    {p.stack.map((t) => (
                      <span key={t} className="text-[11px] font-mono text-[#6B6B6B] dark:text-[#A0A0A0] border border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto self-start bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0A0A0A] px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Voir le site
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ——— Applications ——— */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#A78BFA]/15 text-[#7C3AED] dark:text-[#A78BFA]">
              <AppWindow size={18} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#0A0A0A] dark:text-white">Applications</h3>
              <p className="text-sm text-[#6B6B6B] dark:text-[#A0A0A0]">Outils SaaS métier</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {apps.map((p, i) => (
              <motion.article
                key={p.title}
                variants={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: reduce ? 0 : i * 0.08 }}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1A1A1A] hover:border-[#38BDF8]/40 dark:hover:border-[#38BDF8]/30 transition-colors duration-300"
              >
                <AppVisual project={p} />

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: p.accent }}>
                        {p.category}
                      </p>
                      <h3 className="font-bold text-[#0A0A0A] dark:text-white text-lg">{p.title}</h3>
                    </div>
                    <span className="shrink-0 text-[10px] font-mono text-[#6B6B6B] dark:text-[#A0A0A0] bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-1 rounded-full">
                      {p.result}
                    </span>
                  </div>

                  <p className="text-[#6B6B6B] dark:text-[#A0A0A0] text-sm leading-relaxed flex-1">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-4 mb-5">
                    {p.stack.map((t) => (
                      <span key={t} className="text-[11px] font-mono text-[#6B6B6B] dark:text-[#A0A0A0] border border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0284C7] dark:text-[#38BDF8] hover:text-[#0A0A0A] dark:hover:text-white transition-colors"
                  >
                    Accéder à l'app
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
