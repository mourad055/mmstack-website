import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

// Unsplash — développeurs africains au travail (vérifié 200)
const PHOTO = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1100&q=80'

const proof = ['10+ projets livrés', 'Réponse sous 24h', 'Ambam, Cameroun']

export default function Hero() {
  const reduce = useReducedMotion()

  // Une seule chorégraphie d'entrée. Repli net si l'utilisateur a demandé moins de mouvement.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
  }
  const rise = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  }
  const reveal = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    show: {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="relative overflow-x-clip bg-white dark:bg-[#0A0A0A]">
      {/* Filet d'atelier : trame de points très discrète en haut à droite */}
      <svg aria-hidden className="pointer-events-none absolute -top-10 right-0 h-72 w-72 opacity-[0.05] dark:opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" className="text-[#0A0A0A] dark:text-white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      {/* Watermark cygne — décoratif, très discret, ancré dans le coin bas-gauche, desktop uniquement */}
      <img
        src="/logo-icon-slate.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -left-24 -bottom-16 hidden lg:block h-[58%] w-auto opacity-[0.035] dark:hidden"
      />
      <img
        src="/logo-icon-light.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -left-24 -bottom-16 hidden lg:dark:block h-[58%] w-auto opacity-[0.025]"
      />

      <div className="container-xl mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 lg:pt-36 lg:pb-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Colonne typo */}
          <div className="lg:col-span-7">
            {/* Badge lieu */}
            <motion.div variants={rise}
              className="inline-flex items-center gap-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-full pl-2.5 pr-4 py-1.5 text-sm text-[#6B6B6B] dark:text-[#A0A0A0] mb-7">
              <span className="relative flex h-2 w-2">
                {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-60" />}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
              </span>
              <MapPin size={13} aria-hidden />
              <span>Basés à Ambam, Cameroun</span>
            </motion.div>

            {/* Titre */}
            <motion.h1 variants={rise}
              className="text-[clamp(2.1rem,7vw,5.25rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#0A0A0A] dark:text-white text-balance [overflow-wrap:break-word]">
              Le digital de l'Afrique,
              <br className="hidden sm:block" />{' '}
              façonné à{' '}
              <span className="relative inline-block">
                Ambam
                <span aria-hidden className="absolute -bottom-0.5 left-0 h-1.5 w-full rounded-full bg-clay" />
              </span>
              .
            </motion.h1>

            {/* Sous-titre */}
            <motion.p variants={rise}
              className="mt-7 max-w-xl text-lg md:text-xl leading-relaxed text-[#0A0A0A]/80 dark:text-[#F5F5F5]/75 text-pretty">
              MMstack conçoit des logiciels sur mesure, des sites web et des services IT
              pour les entreprises d'Afrique centrale. Deux fondateurs, une exigence :
              du travail qui tient.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary flex items-center gap-2">
                Démarrer un projet <ArrowRight size={16} aria-hidden />
              </a>
              <a href="#services" className="btn-outline">
                Voir nos services
              </a>
            </motion.div>

            {/* Ligne de réassurance */}
            <motion.ul variants={rise}
              className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#6B6B6B] dark:text-[#A0A0A0]">
              {proof.map((item, i) => (
                <li key={item} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-[#E5E5E5] dark:bg-[#2A2A2A]" />}
                  <span className="font-medium text-[#0A0A0A]/70 dark:text-[#F5F5F5]/70">{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Colonne photo */}
          <motion.div variants={reveal} className="lg:col-span-5">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
                <img
                  src={PHOTO}
                  alt="L'équipe MMstack en plein développement logiciel, à Ambam."
                  className="h-full w-full object-cover"
                  loading="eager"
                  width="1100"
                  height="1375"
                />
              </div>
              {/* Légende d'atelier — l'origine, énoncée une fois */}
              <div className="absolute -bottom-3 left-4 inline-flex items-center gap-2 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] px-3 py-1.5 text-xs font-semibold text-[#0A0A0A] dark:text-white shadow-[0_6px_20px_rgba(10,10,10,0.08)]">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-clay" />
                Atelier MMstack · Sud Cameroun
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
