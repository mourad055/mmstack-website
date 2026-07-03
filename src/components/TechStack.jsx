import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const techs = [
  'React', 'Flutter', 'Laravel', 'FastAPI', 'Python', 'TypeScript',
  'PostgreSQL', 'Firebase', 'Docker', 'Tailwind', 'Supabase', 'Git',
]

export default function TechStack() {
  const reduce = useReducedMotion()
  const container = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.03 } } }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-[#F5F5F5]/60 dark:bg-[#0D0D0D]">
      <div className="container-xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A0A0A] dark:text-white tracking-[-0.02em] mb-10">
            Technologies que nous maîtrisons
          </h2>
        </ScrollReveal>

        <motion.div
          variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          className="flex flex-wrap items-center justify-center gap-3">
          {techs.map((t) => (
            <motion.span
              key={t}
              variants={item}
              whileHover={reduce ? {} : { scale: 1.08 }}
              className="rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] px-4 py-2 text-sm font-mono text-[#475569] dark:text-[#A0A0A0] hover:border-[#38BDF8] hover:text-[#38BDF8] dark:hover:text-[#38BDF8] transition-colors duration-200 cursor-default">
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
