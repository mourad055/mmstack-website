import { useMemo } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { createMockupTexture } from './uiMockupTextures'

/**
 * 8 blocs lumineux qui, au fil du scroll, passent d'un nuage largement dispersé (idées en
 * vrac, poussé vers les extrémités gauche/droite de la scène) à un petit cube parfaitement
 * assemblé (le "produit" livré) — narration littérale de "We Build Digital Solutions".
 * Position purement procédurale, aucun asset externe pour la géométrie.
 *
 * Chaque face est illustrée par un visuel EN RAPPORT AVEC LA STARTUP plutôt qu'un motif
 * abstrait : soit une vraie photo déjà utilisée sur le site (les 4 services), soit une
 * mini maquette d'UI dessinée procéduralement (interface web, appli mobile, éditeur de
 * code, dashboard) — voir uiMockupTextures.js, elle-même sensible au thème (`theme` prop).
 * Shading lisse (pas de flatShading) et matériau doux (roughness/metalness calibrés) pour
 * un rendu "objet réel" plutôt que "wireframe" — pas de liseré néon sur les arêtes.
 *
 * Le parent (BuilderShowcaseCanvas) reçoit `blocksRef` et lerp chaque bloc entre sa
 * position dispersée (calculée à partir de SCATTERED_DIRECTIONS) et ASSEMBLED_POSITIONS
 * selon `assembleProgress`, dans son propre useFrame — ce composant ne fait que déclarer
 * la géométrie et exposer les refs.
 */

// Directions normalisées (pas des positions finales) : le composant X (gauche/droite) est
// multiplié à chaque frame par une amplitude calculée depuis la largeur RÉELLE du viewport
// 3D (voir BuilderShowcaseCanvas) — ainsi la dispersion exploite toujours un maximum de
// l'espace horizontal disponible, quelle que soit la largeur de la colonne à l'écran.
export const SCATTERED_DIRECTIONS = [
  [-0.92, 0.7, 0.4], [0.88, -0.6, -0.5], [-0.7, -1.1, 0.7], [0.78, 1.3, 0.3],
  [0.12, 1.9, -0.6], [-0.14, -1.9, 0.5], [1, 0.3, 0.7], [-0.97, -0.3, -0.7],
]

export const ASSEMBLED_POSITIONS = [
  [-0.27, -0.27, -0.27], [0.27, -0.27, -0.27], [-0.27, 0.27, -0.27], [0.27, 0.27, -0.27],
  [-0.27, -0.27, 0.27], [0.27, -0.27, 0.27], [-0.27, 0.27, 0.27], [0.27, 0.27, 0.27],
]

const PHOTO_PATHS = ['/dev-logiciel.jpg', '/sites-web.jpg', '/conseil-it.jpg', '/configuration-installation.jpg']

const BLOCKS = [
  { visual: { type: 'photo', src: '/dev-logiciel.jpg' } },
  { visual: { type: 'mockup', kind: 'web' } },
  { visual: { type: 'mockup', kind: 'mobile' } },
  { visual: { type: 'photo', src: '/sites-web.jpg' } },
  { visual: { type: 'mockup', kind: 'code' } },
  { visual: { type: 'photo', src: '/conseil-it.jpg' } },
  { visual: { type: 'mockup', kind: 'dashboard' } },
  { visual: { type: 'photo', src: '/configuration-installation.jpg' } },
]

export default function BlockCluster({ blocksRef, theme = 'dark' }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(0.54, 0.54, 0.54), [])

  const photos = useTexture(PHOTO_PATHS)
  const mockups = useMemo(
    () => ({
      web: createMockupTexture('web', theme),
      mobile: createMockupTexture('mobile', theme),
      code: createMockupTexture('code', theme),
      dashboard: createMockupTexture('dashboard', theme),
    }),
    [theme]
  )

  const textures = useMemo(() => {
    const photoBySrc = Object.fromEntries(PHOTO_PATHS.map((src, i) => [src, photos[i]]))
    return BLOCKS.map((b) => {
      if (b.visual.type === 'photo') {
        const tex = photoBySrc[b.visual.src]
        tex.colorSpace = THREE.SRGBColorSpace
        tex.needsUpdate = true
        return tex
      }
      return mockups[b.visual.kind]
    })
  }, [photos, mockups])

  return (
    <group>
      {SCATTERED_DIRECTIONS.map((dir, i) => (
        <mesh
          key={i}
          position={[dir[0] * 2, dir[1], dir[2]]}
          geometry={geometry}
          castShadow
          receiveShadow
          ref={(el) => {
            if (blocksRef?.current) blocksRef.current[i] = el
          }}
        >
          <meshStandardMaterial map={textures[i]} roughness={0.38} metalness={0.06} envMapIntensity={1.1} />
        </mesh>
      ))}
    </group>
  )
}
