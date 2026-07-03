import { motion, useReducedMotion } from 'framer-motion'

const DIRECTIONS = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: -60 },
  right: { x: 60 },
}

/* Révélation au scroll avec deblur — la signature des sites premium */
export default function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }) {
  const reduce = useReducedMotion()
  const offset = DIRECTIONS[direction] || DIRECTIONS.up

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}
