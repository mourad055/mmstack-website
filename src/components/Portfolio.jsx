import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'MicroLab Virtuel',
    tag: 'Web Platform',
    desc: 'Plateforme pédagogique interactive avec IA intégrée (Anthropic API) pour les cours de réseau. Laravel + Vue.js 3 + Inertia.js.',
    // African student on laptop studying
    img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=70',
    link: '#',
  },
  {
    title: 'MBIO App',
    tag: 'Mobile · Flutter',
    desc: 'Application de taxi-hailing pour le marché camerounais. Google Maps, Firebase, JWT, Twilio OTP.',
    // African city street / urban mobility
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=70',
    link: '#',
  },
  {
    title: 'DocForge',
    tag: 'SaaS · React',
    desc: 'Générateur de documents académiques au format ESTLC officiel. FastAPI + React + LaTeX pipeline.',
    // African student writing documents
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=70',
    link: '#',
  },
  {
    title: 'Site Hôtel Ambam',
    tag: 'Site vitrine',
    desc: 'Site web vitrine avec système de réservation pour un hôtel local. Responsive, SEO optimisé.',
    // African hotel / hospitality
    img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=70',
    link: '#',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-pad bg-[#F5F5F5] dark:bg-[#0D0D0D]">
      <div className="container-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <div className="text-xs font-semibold tracking-widest text-[#8A8A8A] uppercase mb-3">Nos réalisations</div>
          <h2 className="section-title">Ce qu'on a construit</h2>
          <p className="section-sub mb-14">Des projets concrets, des technologies modernes, des problèmes réels résolus.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
              {/* Image */}
              <div className="h-52 overflow-hidden relative">
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-4 left-4 bg-white/90 dark:bg-[#0A0A0A]/90 text-[#0A0A0A] dark:text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>
              <div className="p-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-[#0A0A0A] dark:text-white text-lg mb-2">{p.title}</h3>
                  <p className="text-[#8A8A8A] text-sm leading-relaxed">{p.desc}</p>
                </div>
                <a href={p.link}
                  className="w-9 h-9 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center flex-shrink-0 hover:bg-[#0A0A0A] hover:border-[#0A0A0A] hover:text-white dark:hover:bg-white dark:hover:text-[#0A0A0A] transition-all duration-200">
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
