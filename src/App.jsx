import { useDarkMode } from './hooks/useDarkMode'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  const [dark, setDark] = useDarkMode()

  return (
    <div className="min-h-screen">
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <Services />
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A]" />
        <About />
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A]" />
        <Testimonials />
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A]" />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
