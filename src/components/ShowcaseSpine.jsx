import { useRef } from 'react'
import Services from './Services'
import Testimonials from './Testimonials'
import Contact from './Contact'
import BuilderShowcase from './three/BuilderShowcase'

/**
 * Regroupe Services + Testimonials + Contact dans une seule mise en scène : une colonne
 * gauche `sticky` (le cluster de blocs 3D qui s'assemble, visible desktop uniquement)
 * qui reste épinglée pendant que la colonne droite (cards, carrousel, formulaire) défile
 * normalement à côté — le modèle est ainsi TOUJOURS en évidence, jamais recouvert par un
 * fond opaque (chaque colonne a sa propre cellule de grille, sans superposition).
 *
 * La colonne 3D est volontairement `1fr` (flexible) contre une colonne de contenu à
 * largeur FIXE : sur grand écran, ça laisse au cluster de blocs énormément de place pour
 * exploiter les extrémités gauche/droite de l'écran, sans jamais risquer de chevaucher le
 * texte (les deux colonnes restent side-by-side, aucune superposition).
 *
 * `spineRef` délimite la portion de scroll sur laquelle la progression 0→1 de l'animation
 * 3D est calculée (voir BuilderShowcaseCanvas) — jamais le scroll global de la page.
 */
export default function ShowcaseSpine() {
  const spineRef = useRef(null)

  return (
    <div ref={spineRef} className="relative bg-white dark:bg-[#0A0A0A] border-b border-[#E5E5E5]/70 dark:border-[#2A2A2A]/50">
      <div className="max-w-[1800px] mx-auto pl-0 pr-6 md:pr-12 lg:pr-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_640px] xl:grid-cols-[minmax(0,1fr)_720px] gap-x-8 xl:gap-x-16">
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <BuilderShowcase spineRef={spineRef} />
          </div>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32 pt-8 lg:pt-12 pb-20 lg:pb-28">
          <Services />
          <Testimonials />
          <Contact />
        </div>
      </div>
    </div>
  )
}
