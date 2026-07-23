import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

/**
 * Crée des THREE.VideoTexture à partir de chemins publics.
 * Vidéos muettes + loop + playsInline pour respecter l’autoplay navigateur.
 * Dispose proprement à l’unmount.
 */
export function useVideoTextures(srcs) {
  const key = srcs.join('|')

  const entries = useMemo(() => {
    return srcs.map((src) => {
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

      return { video, texture }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- key dérivé de srcs
  }, [key])

  useEffect(() => {
    entries.forEach(({ video }) => {
      const play = () => {
        video.play().catch(() => {})
      }
      if (video.readyState >= 2) play()
      else video.addEventListener('canplay', play, { once: true })
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
