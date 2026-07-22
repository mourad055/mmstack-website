import { Code2, Globe, HardDrive, Lightbulb, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { SpotlightCard } from '../utils/premium'
import ScrollReveal from './ScrollReveal'

const DotGrid = ({ id }) => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.1] dark:opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" className="fill-[#0A0A0A] dark:fill-white" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)
const ScanLines = ({ id }) => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width="1" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="1" className="stroke-[#0A0A0A] dark:stroke-white" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)
const GridLines = ({ id }) => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.09] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" className="stroke-[#0A0A0A] dark:stroke-white" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)
const Hexagons = ({ id }) => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width="28" height="32" patternUnits="userSpaceOnUse">
        <polygon points="14,2 26,8 26,24 14,30 2,24 2,8" fill="none" className="stroke-[#0A0A0A] dark:stroke-white" strokeWidth="0.7" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)

const services = [
  {
    icon: Code2, title: 'Développement logiciel',
    contactService: 'Développement logiciel',
    desc: 'Applications sur mesure pour résoudre vos problèmes spécifiques — web, mobile et desktop. Du concept au déploiement, on construit des produits qui tiennent la charge.',
    Pattern: DotGrid, patternId: 'svc-dots', badge: 'Full-stack', badgeColor: '#38BDF8',
    photo: '/dev-logiciel.jpg', big: true,
  },
  {
    icon: Globe, title: 'Création de sites web',
    contactService: 'Création de site web',
    desc: 'Sites vitrine modernes, rapides et optimisés SEO.',
    Pattern: ScanLines, patternId: 'svc-lines', badge: 'React · WordPress', badgeColor: '#34D399',
    photo: '/sites-web.jpg',
  },
  {
    icon: HardDrive, title: 'Installation & config',
    contactService: 'Installation & config',
    desc: 'Logiciels pro, OS et environnements de travail.',
    Pattern: GridLines, patternId: 'svc-grid', badge: 'Windows · Linux · macOS', badgeColor: '#A78BFA',
    photo: '/configuration-installation.jpg',
  },
  {
    icon: Lightbulb, title: 'Conseil IT',
    contactService: 'Conseil IT',
    desc: 'Audit de vos besoins numériques et accompagnement dans votre transformation digitale — une stratégie claire, des priorités concrètes.',
    Pattern: Hexagons, patternId: 'svc-hex', badge: 'Audit · Stratégie', badgeColor: '#34D399',
    photo: '/conseil-it.jpg',
  },
]

function contactHref(service) {
  return `?service=${encodeURIComponent(service)}#contact`
}

export default function Services() {
  const reduce = useReducedMotion()

  return (
    <div id="services" className="scroll-mt-24">
      <ScrollReveal direction="right" className="mb-14">
        <h2 className="section-title">Nos services</h2>
        <p className="section-sub mt-4">Des solutions digitales pensées pour le contexte camerounais et africain.</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((s, i) => {
          const Icon = s.icon
          return (
            <ScrollReveal
              key={s.title}
              direction="right"
              delay={reduce ? 0 : (i % 2) * 0.08}
              className={s.big ? 'sm:col-span-2' : ''}
            >
              <SpotlightCard className="h-full flex flex-col overflow-hidden rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#1A1A1A] hover:-translate-y-1 transition-transform duration-300">
                {s.photo ? (
                  <div className={`relative ${s.big ? 'h-64 md:h-72' : 'h-44 md:h-48'} overflow-hidden`}>
                    <img
                      src={s.photo}
                      alt={`${s.title} — MMstack`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-[#0F172A]/10 to-transparent" />
                    <span
                      className="absolute bottom-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
                      style={{ color: s.badgeColor, backgroundColor: s.badgeColor + '26', border: `1px solid ${s.badgeColor}33` }}
                    >
                      {s.badge}
                    </span>
                  </div>
                ) : (
                  <div className={`relative ${s.big ? 'h-56' : 'h-44'} bg-[#EFF6FF] dark:bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden`}>
                    <s.Pattern id={s.patternId} />
                    <motion.div
                      whileHover={reduce ? {} : { rotate: 12, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      className={`relative z-10 ${s.big ? 'w-20 h-20' : 'w-16 h-16'} rounded-2xl bg-[#0A0A0A]/5 dark:bg-white/10 backdrop-blur flex items-center justify-center border border-[#0A0A0A]/10 dark:border-white/10`}
                    >
                      <Icon size={s.big ? 38 : 30} className="text-[#0A0A0A] dark:text-white" />
                    </motion.div>
                    <span
                      className="relative z-10 mt-3 text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ color: s.badgeColor, backgroundColor: s.badgeColor + '1A' }}
                    >
                      {s.badge}
                    </span>
                  </div>
                )}

                <div className={`flex flex-col flex-1 ${s.big ? 'p-8' : 'p-7'}`}>
                  <h3 className={`font-bold text-[#0A0A0A] dark:text-white mb-2 ${s.big ? 'text-2xl' : 'text-lg'}`}>{s.title}</h3>
                  <p className={`text-[#6B6B6B] dark:text-[#A0A0A0] leading-relaxed flex-1 ${s.big ? 'text-base max-w-xl' : 'text-sm'}`}>{s.desc}</p>
                  <a
                    href={contactHref(s.contactService)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0284C7] dark:text-[#38BDF8] hover:text-[#0A0A0A] dark:hover:text-white transition-colors group/link"
                  >
                    Demander un devis
                    <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
