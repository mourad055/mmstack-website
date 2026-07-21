import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useDarkMode } from './hooks/useDarkMode'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import About from './components/About'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Contact from './components/Contact'
import Footer, { BackToTop } from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { ScrollProgress } from './utils/premium'

function IntroOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}>
      <motion.img
        src="/logo-icon-light.png"
        alt="MMstack"
        className="h-28 w-auto object-contain"
        initial={{ scale: 0.3, opacity: 0, filter: 'blur(20px)' }}
        animate={{
          scale: [0.3, 1, 1, 0.3],
          opacity: [0, 1, 1, 0],
          y: [0, 0, 0, -200],
          filter: ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'],
        }}
        transition={{ duration: 2.3, times: [0, 0.45, 0.75, 1], ease: [0.16, 1, 0.3, 1] }} />
    </motion.div>
  )
}

export default function App() {
  useDarkMode()
  const reduce = useReducedMotion()
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), reduce ? 0 : 2500)
    return () => clearTimeout(t)
  }, [reduce])

  return (
    <div className="min-h-screen">
      <ScrollProgress />

      <AnimatePresence>{showIntro && <IntroOverlay key="intro" />}</AnimatePresence>

      <Navbar />
      <main className="relative z-10">
        <Hero introDone={!showIntro} />
        <Services />
        <Process />
        <TechStack />
        <Projects />
        <About />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </div>
  )
}
