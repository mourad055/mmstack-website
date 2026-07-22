import * as THREE from 'three'

/**
 * Mini maquettes d'UI dessinées procéduralement sur un <canvas> 2D (aucun asset externe) —
 * pour incarner littéralement "We Build Digital Solutions" sur les faces des cubes : une
 * interface web, une appli mobile, un éditeur de code, un dashboard. Style volontairement
 * simplifié/abstrait ("wireframe"), lisible même à petite taille sur un cube low-poly.
 *
 * Chaque maquette existe en variante sombre et claire (`theme`) : bonus créatif — les cubes
 * montrent littéralement "l'app en mode sombre" quand le site est en sombre, et "l'app en
 * mode clair" quand le site est en clair. L'accent #38BDF8 reste identique dans les deux
 * variantes (charte de marque).
 */

const SIZE = 256

const PALETTES = {
  dark: {
    bg: '#0F172A', bgAlt: '#0B1220', bar: '#1E293B', chip: '#334155',
    line: '#94A3B8', pill: '#F5F5F5', pillText: '#1E293B', dot: '#475569',
  },
  light: {
    bg: '#FFFFFF', bgAlt: '#F8FAFC', bar: '#F1F5F9', chip: '#E2E8F0',
    line: '#94A3B8', pill: '#0F172A', pillText: '#F5F5F5', dot: '#CBD5E1',
  },
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function paintWeb(ctx, c) {
  ctx.fillStyle = c.bg
  ctx.fillRect(0, 0, SIZE, SIZE)

  ctx.fillStyle = c.bar
  ctx.fillRect(0, 0, SIZE, 34)
  ;['#F87171', '#FBBF24', '#34D399'].forEach((color, i) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(18 + i * 16, 17, 5, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.fillStyle = c.chip
  roundRect(ctx, 74, 8, SIZE - 90, 18, 9)
  ctx.fill()

  ctx.fillStyle = '#38BDF8'
  roundRect(ctx, 16, 50, SIZE - 32, 64, 8)
  ctx.fill()

  ctx.fillStyle = c.line
  ;[128, 144, 160].forEach((y, i) => {
    roundRect(ctx, 16, y, SIZE - 32 - i * 40, 8, 4)
    ctx.fill()
  })

  ctx.fillStyle = c.pill
  roundRect(ctx, 16, 184, 78, 26, 13)
  ctx.fill()

  ;[0, 1, 2].forEach((i) => {
    ctx.fillStyle = c.bar
    roundRect(ctx, 16 + i * 78, 224, 68, 20, 5)
    ctx.fill()
  })
}

function paintMobile(ctx, c) {
  ctx.fillStyle = c.bg
  ctx.fillRect(0, 0, SIZE, SIZE)

  ctx.strokeStyle = c.chip
  ctx.lineWidth = 6
  roundRect(ctx, 60, 10, SIZE - 120, SIZE - 20, 28)
  ctx.stroke()

  ctx.fillStyle = c.chip
  roundRect(ctx, SIZE / 2 - 16, 20, 32, 6, 3)
  ctx.fill()

  ctx.fillStyle = '#38BDF8'
  roundRect(ctx, 76, 44, SIZE - 152, 40, 8)
  ctx.fill()

  ctx.fillStyle = c.bar
  ;[96, 140, 184].forEach((y) => {
    roundRect(ctx, 76, y, SIZE - 152, 34, 6)
    ctx.fill()
  })

  ;[0, 1, 2].forEach((i) => {
    ctx.fillStyle = i === 1 ? '#38BDF8' : c.dot
    ctx.beginPath()
    ctx.arc(96 + i * 32, 228, 7, 0, Math.PI * 2)
    ctx.fill()
  })
}

function paintCode(ctx, c, theme) {
  ctx.fillStyle = c.bgAlt
  ctx.fillRect(0, 0, SIZE, SIZE)
  ctx.fillStyle = c.bar
  ctx.fillRect(0, 0, 34, SIZE)

  const colors = theme === 'light'
    ? ['#0284C7', '#334155', '#64748B', '#059669', '#334155', '#7C3AED', '#64748B', '#0284C7']
    : ['#38BDF8', '#F5F5F5', '#94A3B8', '#34D399', '#F5F5F5', '#A78BFA', '#94A3B8', '#38BDF8']
  let y = 20
  colors.forEach((color, i) => {
    ctx.fillStyle = color
    const w = 60 + ((i * 37) % 130)
    const x = 46 + (i % 3) * 12
    roundRect(ctx, x, y, w, 10, 4)
    ctx.fill()
    y += 26
  })
}

function paintDashboard(ctx, c) {
  ctx.fillStyle = c.bg
  ctx.fillRect(0, 0, SIZE, SIZE)

  ctx.strokeStyle = c.chip
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(30, 20)
  ctx.lineTo(30, 220)
  ctx.lineTo(230, 220)
  ctx.stroke()

  const bars = [60, 100, 70, 140, 110, 170]
  const colors = ['#38BDF8', c.dot, '#38BDF8', '#34D399', c.dot, '#38BDF8']
  bars.forEach((h, i) => {
    ctx.fillStyle = colors[i]
    roundRect(ctx, 44 + i * 30, 220 - h, 20, h, 4)
    ctx.fill()
  })
}

const PAINTERS = { web: paintWeb, mobile: paintMobile, code: paintCode, dashboard: paintDashboard }
export const MOCKUP_KINDS = ['web', 'mobile', 'code', 'dashboard']

export function createMockupTexture(kind, theme = 'dark') {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')
  const palette = PALETTES[theme] || PALETTES.dark
  ;(PAINTERS[kind] || paintWeb)(ctx, palette, theme)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  texture.needsUpdate = true
  return texture
}
