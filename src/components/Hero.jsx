import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

// Unsplash — African developers collaborating
const BG_IMG = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1800&q=80'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img src={BG_IMG} alt="Tech workspace" className="w-full h-full object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-white/85 dark:bg-[#0A0A0A]/90" />
        {/* Subtle dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#0A0A0A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 container-xl mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-full px-4 py-1.5 text-sm text-[#8A8A8A] mb-8 bg-white/60 dark:bg-[#1A1A1A]/60 backdrop-blur">
            <MapPin size={13} />
            <span>🇨🇲 Based in Cameroon · Ambam</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0A0A] dark:text-white leading-[1.08] mb-6 max-w-3xl">
            We Build Digital<br />
            <span className="text-[#8A8A8A]">Solutions</span> for Africa.
          </h1>

          <p className="text-lg md:text-xl text-[#8A8A8A] mb-10 max-w-xl leading-relaxed">
            Logiciels sur mesure, sites web et services IT — d'Ambam vers le monde.
            Deux fondateurs, une mission : digitaliser l'Afrique centrale.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#services" className="btn-primary flex items-center gap-2">
              Nos services <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-outline">
              Démarrer un projet
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 flex flex-wrap gap-10">
            {[
              { n: '10+', label: 'Projets livrés' },
              { n: '2', label: 'Co-fondateurs passionnés' },
              { n: '100%', label: 'Made in Cameroon' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-[#0A0A0A] dark:text-white">{s.n}</div>
                <div className="text-sm text-[#8A8A8A] mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-9 border-2 border-[#8A8A8A] rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-[#8A8A8A] rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
