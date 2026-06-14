import { motion } from 'framer-motion'
import { CheckCircle2, FileText, Zap, Shield, ArrowRight } from 'lucide-react'

const features = [
  { icon: FileText, text: 'Format ESTLC officiel respecté à 100%' },
  { icon: Zap, text: 'Génération PDF instantanée' },
  { icon: Shield, text: 'Données sécurisées et privées' },
  { icon: CheckCircle2, text: 'Tarif étudiant accessible' },
]

// Unsplash — document / academic vibe
const IMG = 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&q=80'

export default function DocForge() {
  return (
    <section id="docforge" className="bg-[#0A0A0A] py-24 px-6 md:px-12 lg:px-20">
      <div className="container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <div className="inline-block border border-white/20 text-white/60 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              Produit phare
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              DocForge
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Génère tes documents académiques au format officiel ESTLC en quelques clics.
              Rapports de stage, demandes, attestations — tout ce dont tu as besoin,
              automatiquement formaté.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map(f => {
                const Icon = f.icon
                return (
                  <li key={f.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-white" />
                    </div>
                    <span className="text-white/80 text-sm">{f.text}</span>
                  </li>
                )
              })}
            </ul>

            <a href="#contact"
              className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#F5F5F5] transition-colors duration-200">
              Essayer DocForge <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right — mockup with real image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative">
            {/* Device frame */}
            <div className="relative bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <div className="flex-1 bg-white/10 rounded h-5 mx-4 flex items-center px-3">
                  <span className="text-white/30 text-xs">docforge.mmstack.cm</span>
                </div>
              </div>
              {/* App screenshot / image */}
              <div className="relative h-72">
                <img src={IMG} alt="DocForge app" className="w-full h-full object-cover object-top opacity-60" />
                {/* Overlay UI elements */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4">
                    <div className="text-white text-xs font-semibold mb-2">📄 Rapport de stage — En cours de génération</div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-3/4 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-white/5 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
