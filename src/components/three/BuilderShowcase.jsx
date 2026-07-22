import { Suspense, lazy } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIsDesktop } from '../../utils/premium'
import { useTheme } from '../../hooks/useDarkMode.jsx'

const BuilderShowcaseCanvas = lazy(() => import('./BuilderShowcaseCanvas'))

/**
 * Placeholder affiché pendant le téléchargement du payload three.js (chunk lazy assez
 * lourd) : un petit cluster de carrés qui "respirent" en pulse, pour que l'espace ne
 * reste jamais vide/figé — améliore la perception de vitesse même si le temps de
 * chargement réel ne change pas.
 */
function ShowcaseLoadingPlaceholder() {
  return (
    <div className="flex items-center justify-center w-full h-full" aria-hidden>
      <div className="grid grid-cols-2 gap-3 opacity-70">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-14 h-14 rounded-lg bg-[#0A0A0A]/10 dark:bg-white/10 animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Porte d'accès à la scène 3D "cluster de blocs qui s'assemble" : gating strict (desktop
 * uniquement, jamais si l'utilisateur préfère un mouvement réduit) + lazy-loading du payload
 * three.js, pour que les visiteurs mobiles ne téléchargent jamais three.js / @react-three/fiber.
 *
 * Rendu à l'intérieur de la colonne `sticky` de ShowcaseSpine — pas de position fixed,
 * pas de z-index à gérer : c'est un élément normal du flux, dans sa propre colonne de grille.
 */
export default function BuilderShowcase({ spineRef }) {
  const reduce = useReducedMotion()
  const isDesktop = useIsDesktop()
  const { theme } = useTheme()

  if (reduce || !isDesktop) return null

  return (
    <div className="w-full h-full pointer-events-none">
      <Suspense fallback={<ShowcaseLoadingPlaceholder />}>
        <BuilderShowcaseCanvas spineRef={spineRef} theme={theme} />
      </Suspense>
    </div>
  )
}
