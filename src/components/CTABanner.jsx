import { motion } from 'framer-motion'
import { whatsappHref } from '../config/contacts'

export default function CTABanner() {
  return (
    <section className="relative bg-[#EFF6FF] dark:bg-[#0F172A] overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cta-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" className="stroke-[#0A0A0A] dark:stroke-white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>

      <div className="relative container-xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] dark:text-white tracking-[-0.02em] mb-3">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-[#4B5563] dark:text-white/60 text-lg">
            Réponse sous 24h. Devis clair, sans engagement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4 shrink-0">
          <a href="#contact"
            className="bg-[#0A0A0A] text-white dark:bg-white dark:text-[#0F172A] px-7 py-3.5 rounded-full font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all duration-200">
            Démarrer un projet →
          </a>
          <a href={whatsappHref()} target="_blank" rel="noreferrer"
            className="border border-[#0A0A0A]/25 bg-[#0A0A0A]/5 text-[#0A0A0A] dark:border-white/25 dark:bg-white/5 dark:text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#0A0A0A]/15 dark:hover:bg-white/15 hover:border-[#0A0A0A]/40 dark:hover:border-white/40 transition-all duration-200">
            Discuter sur WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
