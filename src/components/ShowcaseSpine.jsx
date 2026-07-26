import { useRef } from 'react'
import Services from './Services'
import Process from './Process'
import Contact from './Contact'
import BuilderShowcase from './three/BuilderShowcase'

/**
 * Regroupe Services + Process + Contact dans une seule mise en scène : colonne
 * gauche sticky (cubes 3D) + colonne droite qui défile.
 */
export default function ShowcaseSpine() {
  const spineRef = useRef(null)

  return (
    <div ref={spineRef} className="relative bg-white dark:bg-[#0A0A0A] border-b border-[#E5E5E5]/70 dark:border-[#2A2A2A]/50">
      <div className="max-w-[1800px] mx-auto pl-0 pr-6 md:pr-12 lg:pr-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,820px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,920px)] gap-x-8 xl:gap-x-12">
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <BuilderShowcase spineRef={spineRef} />
          </div>
        </div>

        <div className="flex flex-col gap-28 lg:gap-40 pt-8 lg:pt-12 pb-20 lg:pb-28">
          <Services />
          <Process />
          <Contact />
        </div>
      </div>
    </div>
  )
}
