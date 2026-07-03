import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react'

const ENDPOINT = 'https://formspree.io/f/xqeogeng'
const WA = '237697074455'

const services = ['Développement logiciel', 'Création de site web', 'Installation & config', 'Conseil IT', 'DocForge', 'Autre']

const FIELD = 'w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#38BDF8] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]'

const infoCards = [
  { icon: MapPin, label: 'Adresse', value: 'Ambam, Région du Sud\nCameroun 🇨🇲' },
  { icon: Phone, label: 'WhatsApp', value: '+237 697 074 455', href: `https://wa.me/${WA}?text=${encodeURIComponent("Bonjour MMstack 👋 Je souhaite discuter d'un projet.")}` },
  { icon: Mail, label: 'Email', value: 'nkwanemourad50@gmail.com', href: 'mailto:nkwanemourad50@gmail.com' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const reduce = useReducedMotion()
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-pad bg-white dark:bg-[#0A0A0A]">
      <div className="container-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs font-semibold tracking-widest text-[#8A8A8A] uppercase mb-3">Contact</div>
          <h2 className="section-title">On discute de votre projet ?</h2>
          <p className="section-sub mb-14">Réponse garantie sous 24h.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Formulaire */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 gap-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-[#F5F5F5] dark:bg-[#1A1A1A]">
                <div className="w-16 h-16 rounded-full bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <motion.path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0A0A0A] dark:text-white text-xl">Message envoyé !</h3>
                <p className="text-[#8A8A8A] text-sm">Nous vous répondrons dans les 24 heures.</p>
                <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', service: '', message: '' }) }} className="btn-outline text-sm mt-2">Envoyer un autre message</button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-8 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Votre nom</label>
                    <input required value={form.name} onChange={set('name')} placeholder="Jean Dupont" className={FIELD} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Email</label>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="jean@email.com" className={FIELD} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Service souhaité</label>
                  <select required value={form.service} onChange={set('service')} className={FIELD}>
                    <option value="">Sélectionner un service...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Votre message</label>
                  <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="Décrivez votre projet ou votre besoin..." className={`${FIELD} resize-none`} />
                </div>
                <motion.button type="submit" disabled={status === 'sending'}
                  whileTap={reduce ? {} : { scale: 0.95 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-70 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {status === 'sending' ? (
                      <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Loader2 size={15} className="animate-spin" /> Envoi en cours...
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Send size={15} /> Envoyer le message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                {status === 'error' && <p className="text-red-500 text-sm text-center">Erreur. Contactez-nous sur WhatsApp.</p>}
              </form>
            )}
          </motion.div>

          {/* Info cards — stagger depuis la droite */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="lg:col-span-2 space-y-4">
            {infoCards.map((c) => {
              const Icon = c.icon
              const inner = (
                <motion.div
                  variants={{ hidden: reduce ? { opacity: 1 } : { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                  whileHover={reduce ? {} : { y: -6, boxShadow: '0 12px 30px rgba(10,10,10,0.10)' }}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-[#E5E5E5] bg-[#F5F5F5] dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10">
                  <motion.div whileHover={reduce ? {} : { scale: 1.15 }} className="w-10 h-10 rounded-lg bg-[#0A0A0A] dark:bg-white flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-white dark:text-[#0A0A0A]" />
                  </motion.div>
                  <div>
                    <div className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1">{c.label}</div>
                    <p className="text-sm text-[#0A0A0A] dark:text-white whitespace-pre-line group-hover:text-[#38BDF8] transition-colors">{c.value}</p>
                  </div>
                </motion.div>
              )
              return c.href
                ? <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="block">{inner}</a>
                : <div key={c.label}>{inner}</div>
            })}

            {/* Carte stylisée Ambam */}
            <motion.div
              whileHover={reduce ? {} : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-xl h-48 border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#0F172A] relative overflow-hidden flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="contact-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#contact-grid)" />
              </svg>
              <div className="relative z-10 text-center">
                <div className="text-3xl mb-2">📍</div>
                <p className="text-white font-bold text-sm">Ambam</p>
                <p className="text-white/40 text-xs">Région du Sud · Cameroun</p>
                <p className="text-[#38BDF8] text-xs mt-2 font-mono">2.3833° N, 11.2500° E</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
