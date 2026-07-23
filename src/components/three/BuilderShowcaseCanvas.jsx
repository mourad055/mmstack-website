import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import * as THREE from 'three'
import BlockCluster, { SCATTERED_DIRECTIONS, ASSEMBLED_POSITIONS } from './BlockCluster'

/**
 * Payload "lourd" (three.js + @react-three/fiber + drei), chargé UNIQUEMENT via le
 * `React.lazy()` posé dans BuilderShowcase.jsx. Ne jamais l'importer statiquement ailleurs.
 *
 * Contrairement à l'itération précédente (cygne en fond d'ambiance sur toute la page),
 * ce Canvas est maintenant le VRAI centre de scène d'une portion dédiée de la page
 * (Services + Testimonials + Contact, colonne gauche `sticky`) : opacité pleine, éclairage
 * 3 points, sol de contact — traité comme le sujet principal, pas comme un filigrane.
 *
 * La progression de scroll est LOCALE à cette portion de page (via `useScroll({ target })`
 * de Framer Motion sur `spineRef`, transmis par ShowcaseSpine), jamais globale — le scroll
 * natif du site n'est jamais détourné.
 */

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const remap = (v, inMin, inMax, outMin, outMax) => {
  const t = clamp01((v - inMin) / (inMax - inMin))
  return outMin + t * (outMax - outMin)
}

function Scene({ spineRef, theme }) {
  const groupRef = useRef(null)
  const blocksRef = useRef({})
  const progressRef = useRef(0)

  const { scrollYProgress } = useScroll({ target: spineRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v
  })

  useFrame((state) => {
    const p = progressRef.current
    const t = state.clock.elapsedTime

    // Beats : 0–0.33 Services (idées dispersées) → 0.33–0.66 Testimonials (assemblage en
    // cours) → 0.66–1 Contact (produit livré, assemblé). Zone morte de départ volontairement
    // très courte : les blocs doivent déjà être en mouvement dès la sortie du Hero, jamais figés.
    const assembleProgress = remap(p, 0.02, 0.94, 0, 1)
    // Rotation finale à π : la face −Z (où sont les 2 cubes vidéo) regarde
    // plein cadre vers la caméra quand le mega-cube est assemblé.
    const rotY = remap(p, 0, 1, 0, Math.PI)

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 0.035)
    }

    // Amplitude horizontale calculée depuis la largeur RÉELLE du viewport 3D à cet instant
    // (state.viewport, fournie par react-three-fiber) : les blocs dispersés exploitent
    // toujours l'essentiel de l'espace gauche/droite disponible, quelle que soit la largeur
    // effective de la colonne 3D sur l'écran de l'utilisateur.
    const spreadX = THREE.MathUtils.clamp(state.viewport.width * 0.46, 1.2, 4.2)

    const blocks = blocksRef.current
    SCATTERED_DIRECTIONS.forEach((dir, i) => {
      const mesh = blocks[i]
      if (!mesh) return
      const scatteredX = dir[0] * spreadX
      const target = ASSEMBLED_POSITIONS[i]
      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, THREE.MathUtils.lerp(scatteredX, target[0], assembleProgress), 0.07)
      mesh.position.y = THREE.MathUtils.lerp(
        mesh.position.y,
        THREE.MathUtils.lerp(dir[1], target[1], assembleProgress) + Math.sin(t * 0.8 + i) * 0.03 * (1 - assembleProgress),
        0.07
      )
      mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, THREE.MathUtils.lerp(dir[2], target[2], assembleProgress), 0.07)
      // Tumbling lent et progressif (vitesse angulaire réduite ~2.5x par rapport à l'itération
      // précédente) + rotation Z ajoutée pour un mouvement de chute libre plus organique,
      // moins "mécanique" — chaque bloc tourne sur son propre axe légèrement décalé (+i).
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, (1 - assembleProgress) * (t * 0.11 + i), 0.04)
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, (1 - assembleProgress) * (t * 0.14 + i), 0.04)
      mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, (1 - assembleProgress) * (t * 0.09 + i * 0.5), 0.04)
    })
  })

  return (
    <group ref={groupRef}>
      <Float speed={0.8} rotationIntensity={0.18} floatIntensity={0.4}>
        <BlockCluster blocksRef={blocksRef} theme={theme} />
      </Float>
    </group>
  )
}

export default function BuilderShowcaseCanvas({ spineRef, theme = 'dark' }) {
  const isLight = theme === 'light'
  return (
    <Canvas shadows camera={{ position: [0, 0.3, 5.5], fov: 32 }} dpr={[1, 1.75]}>
      <ambientLight intensity={isLight ? 0.75 : 0.55} />
      <spotLight position={[4, 6, 5]} angle={0.3} penumbra={1} intensity={isLight ? 0.9 : 1.1} castShadow />
      <pointLight position={[-4, -2, -3]} intensity={0.4} color="#38BDF8" />
      {/* Suspense séparé pour l'Environment : c'est le seul élément qui dépend d'une
          requête réseau externe (HDR sur le CDN pmndrs). En l'isolant dans son propre
          Suspense, les cubes (textures locales, quasi instantanées) s'affichent tout de
          suite au lieu d'attendre que ce fichier distant termine de charger. */}
      <Suspense fallback={null}>
        <Scene spineRef={spineRef} theme={theme} />
        <ContactShadows position={[0, -1.3, 0]} opacity={isLight ? 0.18 : 0.35} scale={8} blur={2.2} far={3} />
      </Suspense>
      <Suspense fallback={null}>
        <Environment preset={isLight ? 'apartment' : 'city'} />
      </Suspense>
    </Canvas>
  )
}
