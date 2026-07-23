import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import * as THREE from 'three'
import BlockCluster, { SCATTERED_DIRECTIONS, ASSEMBLED_POSITIONS } from './BlockCluster'

/**
 * Payload "lourd" (three.js + @react-three/fiber + drei), chargé UNIQUEMENT via le
 * `React.lazy()` posé dans BuilderShowcase.jsx. Ne jamais l'importer statiquement ailleurs.
 *
 * La progression de scroll est LOCALE à cette portion de page (via `useScroll({ target })`
 * de Framer Motion sur `spineRef`, transmis par ShowcaseSpine), jamais globale — le scroll
 * natif du site n'est jamais détourné.
 *
 * En plus du scroll, le cluster suit le curseur (écoute `window`, car le wrapper canvas
 * est `pointer-events-none`) : influence légère pendant la dispersion, marquée une fois
 * le mega-cube assemblé — sans écraser la chorégraphie scroll (offset ADDITIF sur rotY).
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
  const pointerRef = useRef({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({ target: spineRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v
  })

  // Suivi curseur global : le Canvas est pointer-events-none (clics passent au contenu),
  // donc on lit window plutôt que les events R3F.
  useEffect(() => {
    const onMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => {
      pointerRef.current.x = 0
      pointerRef.current.y = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  useFrame((state) => {
    const p = progressRef.current
    const t = state.clock.elapsedTime
    const px = pointerRef.current.x
    const py = pointerRef.current.y

    // Beats : 0–0.33 Services (idées dispersées) → 0.33–0.66 Testimonials (assemblage en
    // cours) → 0.66–1 Contact (produit livré, assemblé).
    const assembleProgress = remap(p, 0.02, 0.94, 0, 1)
    // Rotation finale à π : la face −Z (où sont les 2 cubes vidéo) regarde
    // plein cadre vers la caméra quand le mega-cube est assemblé.
    const rotY = remap(p, 0, 1, 0, Math.PI)

    // Influence curseur : discrète en dispersion, dominante une fois assemblé.
    const pointerStrength = remap(assembleProgress, 0.35, 1, 0.18, 1)

    if (groupRef.current) {
      const targetRotY = rotY + px * 0.42 * pointerStrength
      const targetRotX = py * 0.28 * pointerStrength
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.045)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.055)
      // Léger décalage de position pour que le mega-cube "suive" vraiment le curseur.
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        px * 0.22 * pointerStrength,
        0.05
      )
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        py * 0.14 * pointerStrength,
        0.05
      )
    }

    const spreadX = THREE.MathUtils.clamp(state.viewport.width * 0.46, 1.2, 4.2)

    const blocks = blocksRef.current
    SCATTERED_DIRECTIONS.forEach((dir, i) => {
      const mesh = blocks[i]
      if (!mesh) return
      const scatteredX = dir[0] * spreadX
      const target = ASSEMBLED_POSITIONS[i]
      // Micro-parallaxe individuelle pendant la dispersion uniquement (s'éteint à l'assemblage).
      const scatterParallax = (1 - assembleProgress) * 0.12
      mesh.position.x = THREE.MathUtils.lerp(
        mesh.position.x,
        THREE.MathUtils.lerp(scatteredX, target[0], assembleProgress) + px * scatterParallax * (i % 2 === 0 ? 1 : -1),
        0.07
      )
      mesh.position.y = THREE.MathUtils.lerp(
        mesh.position.y,
        THREE.MathUtils.lerp(dir[1], target[1], assembleProgress) +
          Math.sin(t * 0.8 + i) * 0.03 * (1 - assembleProgress) +
          py * scatterParallax * 0.6,
        0.07
      )
      mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, THREE.MathUtils.lerp(dir[2], target[2], assembleProgress), 0.07)
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
