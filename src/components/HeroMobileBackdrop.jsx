import { motion, useReducedMotion } from 'framer-motion'

/**
 * Fond hero mobile — pas de vidéo (évite le freeze / data).
 * Atmosphère géométrique « construction digitale », adaptée clair / sombre.
 */
export default function HeroMobileBackdrop() {
  const reduce = useReducedMotion()

  return (
    <div
      className="hero-mobile-bg absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Lavage ciel / profondeur */}
      <div className="absolute inset-0 hero-mobile-wash" />

      {/* Grille fine */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.2] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="var(--hero-grid)" strokeWidth="0.6" />
          </pattern>
          <linearGradient id="hero-grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.15" />
          </linearGradient>
          <mask id="hero-grid-mask">
            <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" mask="url(#hero-grid-mask)" />
      </svg>

      {/* Orbes — thème clair uniquement */}
      <motion.div
        className="absolute -left-16 top-[18%] h-56 w-56 rounded-full blur-3xl dark:hidden"
        style={{ background: 'var(--hero-orb-a)' }}
        animate={reduce ? undefined : { y: [0, 18, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-10 top-[42%] h-72 w-72 rounded-full blur-3xl dark:hidden"
        style={{ background: 'var(--hero-orb-b)' }}
        animate={reduce ? undefined : { y: [0, -22, 0], x: [0, -12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Stack de blocs — métaphore construction / cubes 3D */}
      <motion.svg
        viewBox="0 0 420 520"
        className="absolute bottom-[-6%] right-[-18%] h-[72%] w-auto max-w-none opacity-70 dark:opacity-40 sm:right-[-8%]"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="block-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--block-face-0)" />
            <stop offset="100%" stopColor="var(--block-face-1)" />
          </linearGradient>
          <linearGradient id="block-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--block-top-0)" />
            <stop offset="100%" stopColor="var(--block-top-1)" />
          </linearGradient>
          <linearGradient id="block-side" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--block-side-0)" />
            <stop offset="100%" stopColor="var(--block-side-1)" />
          </linearGradient>
        </defs>

        <ellipse cx="210" cy="470" rx="150" ry="28" fill="var(--block-shadow)" />

        <g transform="translate(40 80)">
          <IsometricBlock x={120} y={260} s={78} />
          <IsometricBlock x={40} y={210} s={78} />
          <IsometricBlock x={200} y={210} s={78} />
          <IsometricBlock x={120} y={160} s={78} accent />
          <IsometricBlock x={40} y={110} s={78} />
          <IsometricBlock x={200} y={110} s={78} />
          <IsometricBlock x={120} y={60} s={78} accent />
        </g>
      </motion.svg>

      <div className="absolute inset-x-0 bottom-0 h-40 hero-mobile-floor" />
    </div>
  )
}

function IsometricBlock({ x, y, s, accent = false }) {
  const h = s * 0.58
  const d = s * 0.5
  const poly = (pts) => pts.map((p) => p.join(',')).join(' ')
  const face = poly([[x, y + h], [x + s, y + h], [x + s, y + h + d], [x, y + h + d]])
  const top = poly([[x, y + h], [x + d, y], [x + s + d, y], [x + s, y + h]])
  const side = poly([[x + s, y + h], [x + s + d, y], [x + s + d, y + d], [x + s, y + h + d]])

  return (
    <g opacity={accent ? 1 : 0.92}>
      <polygon points={face} fill="url(#block-face)" stroke="var(--block-stroke)" strokeWidth="1" />
      <polygon points={top} fill="url(#block-top)" stroke="var(--block-stroke)" strokeWidth="1" />
      <polygon points={side} fill="url(#block-side)" stroke="var(--block-stroke)" strokeWidth="1" />
      {accent && (
        <circle
          cx={x + s * 0.45}
          cy={y + h + d * 0.45}
          r={6}
          fill="var(--block-accent)"
        />
      )}
    </g>
  )
}
