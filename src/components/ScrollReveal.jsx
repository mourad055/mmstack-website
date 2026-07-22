import { motion, useReducedMotion } from 'framer-motion'

const DIRECTIONS = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: -40 },
  right: { x: 40 },
}

const EASE = [0.16, 1, 0.3, 1]

/**
 * Révélation au scroll : flou → net + glissement.
 * Chaque instance a son propre observateur viewport — idéal pour un dévoilement
 * un-à-un pendant le scroll (pas un stagger groupé qui part en bloc).
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  as = 'div',
  margin = '-18% 0px -12% 0px',
  duration = 0.7,
}) {
  const reduce = useReducedMotion()
  const Mot = motion[as] || motion.div
  const offset = DIRECTIONS[direction] || DIRECTIONS.up

  if (reduce) return <div className={className}>{children}</div>

  return (
    <Mot
      className={className}
      initial={{ opacity: 0, ...offset, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Mot>
  )
}
