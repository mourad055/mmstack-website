import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'MicroLab Virtuel',
    tag: 'Web Platform',
    desc: 'Plateforme pédagogique interactive avec IA intégrée. Laravel + Vue.js 3.',
    bgColor: '#0F172A',
    accentColor: '#38BDF8',
    icon: '🔬',
    lines: ['import { Claude } from "@anthropic"', 'const lab = new VirtualLab()', 'lab.run(experiment)'],
    link: '#',
  },
  {
    title: 'MBIO App',
    tag: 'Mobile · Flutter',
    desc: 'Application taxi-hailing camerounaise. Firebase, Google Maps.',
    bgColor: '#0A0A0A',
    accentColor: '#34D399',
    icon: '🚕',
    lines: ['Widget build(context) {', '  return MBIOApp(', '    city: "Ambam, CM")'],
    link: '#',
  },
  {
    title: 'DocForge',
    tag: 'SaaS · React',
    desc: 'Générateur de documents ESTLC. FastAPI + React + LaTeX.',
    bgColor: '#1E1B4B',
    accentColor: '#A78BFA',
    icon: '📄',
    lines: ['POST /api/generate', '{ "type": "rapport_stage",', '  "student": "NKWANE M." }'],
    link: '#',
  },
  {
    title: 'Site Hôtel Ambam',
    tag: 'Site vitrine',
    desc: 'Site avec réservation pour hôtel local. Responsive + SEO.',
    bgColor: '#0C1A12',
    accentColor: '#34D399',
    icon: '🏨',
    lines: ['<HotelPage>', '  <BookingSystem />', '</HotelPage>'],
    link: '#',
  },
]

function BrowserMockup({ project }) {
  const slug = project.title.toLowerCase().replace(/ /g, '-')
  return (
    <div className="h-52 relative overflow-hidden rounded-t-xl" style={{ backgroundColor: project.bgColor }}>
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 px-4 pt-4 pb-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="flex-1 ml-2 h-4 rounded bg-white/10 flex items-center px-2">
          <span className="text-white/30 text-[9px] font-mono">mmstack.cm/{slug}</span>
        </div>
      </div>

      {/* Code area */}
      <div className="px-4 py-3 font-mono text-xs leading-6">
        {project.lines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-white/20 select-none w-3">{i + 1}</span>
            <span style={{ color: i === 0 ? project.accentColor : 'rgba(255,255,255,0.6)' }}>{line}</span>
          </div>
        ))}
      </div>

      {/* Big icon */}
      <div className="absolute bottom-4 right-4 text-3xl opacity-20">{project.icon}</div>

      {/* Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Tag */}
      <span className="absolute top-10 right-3 text-[10px] font-semibold bg-white/10 text-white/70 px-2 py-0.5 rounded-full border border-white/10">
        {project.tag}
      </span>
    </div>
  )
}

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
              <BrowserMockup project={p} />
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
