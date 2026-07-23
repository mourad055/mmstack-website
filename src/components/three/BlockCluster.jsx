import { useMemo } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { createMockupTexture } from './uiMockupTextures'
import { useVideoTextures } from './useVideoTextures'

/**
 * 8 blocs qui s'assemblent en un mega-cube. Deux d'entre eux portent des VideoTexture
 * et sont placés sur la face principale du mega-cube assemblé (face −Z, celle qui
 * regarde la caméra en fin d'animation après rotation Y ≈ π).
 */

export const SCATTERED_DIRECTIONS = [
  [-0.92, 0.7, 0.4], [0.88, -0.6, -0.5], [-0.7, -1.1, 0.7], [0.78, 1.3, 0.3],
  [0.12, 1.9, -0.6], [-0.14, -1.9, 0.5], [1, 0.3, 0.7], [-0.97, -0.3, -0.7],
]

// Indices 0–3 : face −Z (face principale en fin d'animation).
// 2 et 3 = rangée haute de cette face → vidéos bien visibles face caméra.
export const ASSEMBLED_POSITIONS = [
  [-0.27, -0.27, -0.27], // 0 back-bottom-left  → face principale, bas
  [0.27, -0.27, -0.27],  // 1 back-bottom-right → face principale, bas
  [-0.27, 0.27, -0.27],  // 2 back-top-left     → VIDEO 1
  [0.27, 0.27, -0.27],   // 3 back-top-right    → VIDEO 2
  [-0.27, -0.27, 0.27],  // 4 front-bottom-left
  [0.27, -0.27, 0.27],   // 5 front-bottom-right
  [-0.27, 0.27, 0.27],   // 6 front-top-left
  [0.27, 0.27, 0.27],    // 7 front-top-right
]

const PHOTO_PATHS = ['/dev-logiciel.jpg', '/sites-web.jpg']
const VIDEO_PATHS = ['/cube-capture-1.mp4', '/cube-capture-2.mp4']

const BLOCKS = [
  { visual: { type: 'photo', src: '/dev-logiciel.jpg' } },
  { visual: { type: 'photo', src: '/sites-web.jpg' } },
  { visual: { type: 'video', src: '/cube-capture-1.mp4' } },
  { visual: { type: 'video', src: '/cube-capture-2.mp4' } },
  { visual: { type: 'mockup', kind: 'web' } },
  { visual: { type: 'mockup', kind: 'mobile' } },
  { visual: { type: 'mockup', kind: 'code' } },
  { visual: { type: 'mockup', kind: 'dashboard' } },
]

export default function BlockCluster({ blocksRef, theme = 'dark' }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(0.54, 0.54, 0.54), [])

  const photos = useTexture(PHOTO_PATHS)
  const videos = useVideoTextures(VIDEO_PATHS)
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
    const videoBySrc = Object.fromEntries(VIDEO_PATHS.map((src, i) => [src, videos[i]]))
    return BLOCKS.map((b) => {
      if (b.visual.type === 'video') {
        return videoBySrc[b.visual.src]
      }
      if (b.visual.type === 'photo') {
        const tex = photoBySrc[b.visual.src]
        tex.colorSpace = THREE.SRGBColorSpace
        tex.needsUpdate = true
        return tex
      }
      return mockups[b.visual.kind]
    })
  }, [photos, videos, mockups])

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
          <meshStandardMaterial
            map={textures[i]}
            roughness={BLOCKS[i].visual.type === 'video' ? 0.55 : 0.38}
            metalness={0.06}
            envMapIntensity={BLOCKS[i].visual.type === 'video' ? 0.6 : 1.1}
          />
        </mesh>
      ))}
    </group>
  )
}
