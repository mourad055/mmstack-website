import { useMemo } from 'react'
import * as THREE from 'three'
import { useVideoTextures } from './useVideoTextures'

/**
 * 8 blocs qui s'assemblent en mega-cube — chaque face est une VideoTexture.
 * 5 captures distinctes ; 3 reprises désynchronisées pour couvrir les 8 cubes
 * sans alourdir davantage le bundle.
 *
 * Indices 0–3 = face −Z (face principale face caméra en fin d'animation).
 */

export const SCATTERED_DIRECTIONS = [
  [-0.92, 0.7, 0.4], [0.88, -0.6, -0.5], [-0.7, -1.1, 0.7], [0.78, 1.3, 0.3],
  [0.12, 1.9, -0.6], [-0.14, -1.9, 0.5], [1, 0.3, 0.7], [-0.97, -0.3, -0.7],
]

export const ASSEMBLED_POSITIONS = [
  [-0.27, -0.27, -0.27],
  [0.27, -0.27, -0.27],
  [-0.27, 0.27, -0.27],
  [0.27, 0.27, -0.27],
  [-0.27, -0.27, 0.27],
  [0.27, -0.27, 0.27],
  [-0.27, 0.27, 0.27],
  [0.27, 0.27, 0.27],
]

/** Une entrée par cube (8). Les 3 derniers réutilisent des captures avec offset. */
const VIDEO_PATHS = [
  '/cube-capture-1.mp4',
  '/cube-capture-2.mp4',
  '/cube-capture-3.mp4',
  '/cube-capture-4.mp4',
  '/cube-capture-5.mp4',
  '/cube-capture-1.mp4',
  '/cube-capture-3.mp4',
  '/cube-capture-5.mp4',
]

const VIDEO_OFFSETS = [0, 0.4, 0.8, 1.2, 0.2, 1.6, 2.0, 0.9]

export default function BlockCluster({ blocksRef }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(0.54, 0.54, 0.54), [])
  const videos = useVideoTextures(VIDEO_PATHS, VIDEO_OFFSETS)

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
            map={videos[i]}
            roughness={0.55}
            metalness={0.06}
            envMapIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}
