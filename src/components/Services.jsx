import { motion } from 'framer-motion'
import { Code2, Globe, HardDrive, Lightbulb } from 'lucide-react'

const DotGrid = ({ id }) => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="white" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)

const ScanLines = ({ id }) => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width="1" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="1" stroke="white" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)

const GridLines = ({ id }) => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)

const Hexagons = ({ id }) => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width="28" height="32" patternUnits="userSpaceOnUse">
        <polygon points="14,2 26,8 26,24 14,30 2,24 2,8" fill="none" stroke="white" strokeWidth="0.7" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)

const services = [
  {
    icon: Code2,
    title: 'Développement logiciel',
    desc: 'Applications sur mesure pour résoudre vos problèmes spécifiques — web, mobile et desktop.',
    Pattern: DotGrid,
    patternId: 'svc-dots',
    badge: 'Full-stack',
    badgeColor: '#38BDF8',
  },
  {
    icon: Globe,
    title: 'Création de sites web',
    desc: 'Sites vitrine pour hôtels, commerces, institutions — modernes, rapides et optimisés SEO.',
    Pattern: ScanLines,
    patternId: 'svc-lines',
    badge: 'React · WordPress',
    badgeColor: '#34D399',
  },
  {
    icon: HardDrive,
    title: 'Installation & config',
    desc: "Mise en place de logiciels professionnels, systèmes d'exploitation et environnements de travail.",
    Pattern: GridLines,
    patternId: 'svc-grid',
    badge: 'Windows · Linux · macOS',
    badgeColor: '#A78BFA',
  },
  {
    icon: Lightbulb,
    title: 'Conseil IT',
    desc: 'Audit de vos besoins numériques et accompagnement dans votre transformation digitale.',
    Pattern: Hexagons,
    patternId: 'svc-hex',
    badge: 'Audit · Stratégie',
    badgeColor: '#34D399',
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

                {/* Visual block */}
                <div className="relative h-44 bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden">
                  <s.Pattern id={s.patternId} />
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/10">
                    <Icon size={30} className="text-white" />
                  </div>
                  <span
                    className="relative z-10 mt-3 text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ color: s.badgeColor, backgroundColor: s.badgeColor + '1A' }}>
                    {s.badge}
                  </span>
                </div>

                <div className="p-7">
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
