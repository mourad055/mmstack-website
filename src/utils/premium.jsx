import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
  useReducedMotion,
} from 'framer-motion'

/* ── Desktop detection (pour désactiver les effets souris sur mobile) ── */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isDesktop
}

/* ── A. Mouse-reactive 3D tilt wrapper ── */
export function MouseTiltWrapper({ children, max = 3, className = '' }) {
  const reduce = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [max, -max])
  const rotateY = useTransform(mouseX, [-300, 300], [-max, max])
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 })

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1200 }}
      className={className}>
      {children}
    </motion.div>
  )
}

/* ── D. Animated counter (compte de 0 → target au scroll) ── */
export function AnimatedCounter({ target, suffix = '', className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 50, damping: 20 })
  const display = useTransform(spring, (v) => Math.round(v) + suffix)

  useEffect(() => {
    if (isInView) {
      if (reduce) count.jump(target)
      else count.set(target)
    }
  }, [isInView, target, reduce, count])

  return <motion.span ref={ref} className={className}>{display}</motion.span>
}

/* ── B (Services). Spotlight card — un halo radial suit la souris DANS la card ── */
export function SpotlightCard({ children, className = '', spotColor = 'rgba(56,189,248,0.10)', ...rest }) {
  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)
  const background = useTransform(
    [x, y],
    ([lx, ly]) => `radial-gradient(320px circle at ${lx}px ${ly}px, ${spotColor}, transparent 70%)`
  )
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
      }}
      onMouseLeave={() => { x.set(-9999); y.set(-9999) }}
      className={`group relative ${className}`}
      {...rest}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }} />
      {children}
    </div>
  )
}

/* ── Global cursor glow (desktop only) ── */
export function CursorGlow() {
  const isDesktop = useIsDesktop()
  const reduce = useReducedMotion()
  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)
  const sx = useSpring(x, { stiffness: 50, damping: 25 })
  const sy = useSpring(y, { stiffness: 50, damping: 25 })

  useEffect(() => {
    if (!isDesktop || reduce) return
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isDesktop, reduce, x, y])

  if (!isDesktop || reduce) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-0 h-[350px] w-[350px] rounded-full"
      style={{
        left: sx, top: sy, x: '-50%', y: '-50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.05), transparent 70%)',
      }} />
  )
}

/* ── A (Global). Scroll progress bar ── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-[#38BDF8]"
      style={{ scaleX }} />
  )
}

/* ── Section divider (gradient accent) ── */
export function SectionDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent max-w-4xl mx-auto" />
}
