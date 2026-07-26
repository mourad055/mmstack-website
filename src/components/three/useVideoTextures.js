import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

/**
 * Crée des THREE.VideoTexture à partir de chemins publics.
 * Vidéos muettes + loop + playsInline pour l’autoplay.
 * `startOffsets` (secondes) décale le début pour désynchroniser les reprises du même fichier.
 */
export function useVideoTextures(srcs, startOffsets = []) {
  const key = srcs.join('|') + '::' + startOffsets.join(',')

  const entries = useMemo(() => {
    return srcs.map((src, i) => {
      const video = document.createElement('video')
      video.src = src
      video.crossOrigin = 'anonymous'
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.setAttribute('playsinline', '')
      video.preload = 'auto'
      video.autoplay = true

      const texture = new THREE.VideoTexture(video)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = false

      return { video, texture, offset: startOffsets[i] || 0 }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  useEffect(() => {
    entries.forEach(({ video, offset }) => {
      const play = () => {
        try {
          if (offset > 0 && Number.isFinite(video.duration) && video.duration > 0) {
            video.currentTime = offset % video.duration
          }
        } catch {
          /* ignore seek errors */
        }
        video.play().catch(() => {})
      }
      if (video.readyState >= 1) play()
      else video.addEventListener('loadedmetadata', play, { once: true })
    })

    return () => {
      entries.forEach(({ video, texture }) => {
        video.pause()
        video.removeAttribute('src')
        video.load()
        texture.dispose()
      })
    }
  }, [entries])

  return entries.map((e) => e.texture)
}
