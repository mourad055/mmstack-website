import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const ENDPOINT = 'https://formspree.io/f/xqeogeng'
const WA = '237697074455'

const SERVICE_OPTIONS = ['Développement logiciel', 'Création de site web', 'Installation & config', 'Conseil IT', 'Autre']

const FIELD = 'w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm text-[#0A0A0A] dark:text-[#F5F5F5] outline-none transition-all duration-200 focus:border-[#38BDF8] focus:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]'

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const service = params.get('service')
    if (service && SERVICE_OPTIONS.includes(service)) {
      setForm((p) => ({ ...p, service }))
    }
  }, [])

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
    <div id="contact" className="scroll-mt-24">
      <ScrollReveal direction="right" className="mb-14">
        <h2 className="section-title">On discute de votre projet ?</h2>
        <p className="section-sub mt-4">Réponse garantie sous 24h.</p>
      </ScrollReveal>

      <div className="flex flex-col gap-10">
        <ScrollReveal direction="right">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 gap-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-[#F5F5F5] dark:bg-[#1A1A1A]"
            >
              <div className="w-16 h-16 rounded-full bg-[#38BDF8]/10 flex items-center justify-center text-[#0284C7] dark:text-[#38BDF8]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
              </div>
              <h3 className="font-bold text-[#0A0A0A] dark:text-white text-xl">Message envoyé !</h3>
              <p className="text-[#6B6B6B] dark:text-[#A0A0A0] text-sm">Nous vous répondrons dans les 24 heures.</p>
              <button
                onClick={() => {
                  setStatus('idle')
                  setForm({ name: '', email: '', service: '', message: '' })
                }}
                className="btn-outline text-sm mt-2"
              >
                Envoyer un autre message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-8 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#6B6B6B] dark:text-[#A0A0A0] uppercase tracking-wider mb-1.5">Votre nom</label>
                  <input required value={form.name} onChange={set('name')} placeholder="Jean Dupont" className={FIELD} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6B6B6B] dark:text-[#A0A0A0] uppercase tracking-wider mb-1.5">Email</label>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="jean@email.com" className={FIELD} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B6B6B] dark:text-[#A0A0A0] uppercase tracking-wider mb-1.5">Service souhaité</label>
                <select required value={form.service} onChange={set('service')} className={FIELD}>
                  <option value="">Sélectionner un service...</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B6B6B] dark:text-[#A0A0A0] uppercase tracking-wider mb-1.5">Votre message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Décrivez votre projet ou votre besoin..."
                  className={`${FIELD} resize-none`}
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileTap={reduce ? {} : { scale: 0.95 }}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-70 overflow-hidden"
              >
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
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoCards.map((c, i) => {
            const Icon = c.icon
            const inner = (
              <motion.div
                whileHover={reduce ? {} : { y: -6, boxShadow: '0 12px 30px rgba(10,10,10,0.10)' }}
                className="group flex items-start gap-4 p-5 rounded-xl border border-[#E5E5E5] dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-sm h-full"
              >
                <motion.div
                  whileHover={reduce ? {} : { scale: 1.15 }}
                  className="w-10 h-10 rounded-lg bg-[#0A0A0A] dark:bg-white flex items-center justify-center flex-shrink-0"
                >
                  <Icon size={16} className="text-white dark:text-[#0A0A0A]" />
                </motion.div>
                <div>
                  <div className="text-xs font-semibold text-[#6B6B6B] dark:text-[#A0A0A0] uppercase tracking-wider mb-1">{c.label}</div>
                  <p className="text-sm text-[#0A0A0A] dark:text-white whitespace-pre-line group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8] transition-colors">
                    {c.value}
                  </p>
                </div>
              </motion.div>
            )
            return (
              <ScrollReveal key={c.label} direction="right" delay={reduce ? 0 : i * 0.08}>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" className="block h-full">{inner}</a>
                ) : (
                  <div className="h-full">{inner}</div>
                )}
              </ScrollReveal>
            )
          })}

          <ScrollReveal direction="up" className="sm:col-span-2">
            <div className="rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#EFF6FF] dark:bg-[#0F172A]">
              <iframe
                title="Carte OpenStreetMap — Ambam, Cameroun"
                src="https://www.openstreetmap.org/export/embed.html?bbox=11.2200%2C2.3600%2C11.2800%2C2.4100&layer=mapnik&marker=2.3833%2C11.2500"
                className="w-full h-40 border-0 grayscale-[30%] contrast-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.openstreetmap.org/?mlat=2.3833&mlon=11.2500#map=14/2.3833/11.2500"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-4 py-3 text-xs text-[#6B6B6B] dark:text-[#A0A0A0] hover:text-[#0284C7] dark:hover:text-[#38BDF8] border-t border-[#E5E5E5] dark:border-[#2A2A2A] transition-colors"
              >
                <span>Ambam · Région du Sud · Cameroun 🇨🇲</span>
                <span className="font-semibold">Ouvrir la carte →</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
