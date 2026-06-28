import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, CheckCircle2, Send } from 'lucide-react'

const ENDPOINT = 'https://formspree.io/f/xqeogeng'
const WA = '237697074455'

const services = ['Développement logiciel','Création de site web','Installation & config','Formation IT','Prestation à distance','Conseil IT','DocForge','Autre']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-pad bg-white dark:bg-[#0A0A0A]">
      <div className="container-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <div className="text-xs font-semibold tracking-widest text-[#8A8A8A] uppercase mb-3">Contact</div>
          <h2 className="section-title">On discute de votre projet ?</h2>
          <p className="section-sub mb-14">Réponse garantie sous 24h.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-[#F5F5F5] dark:bg-[#1A1A1A]">
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <CheckCircle2 size={30} className="text-green-600" />
                </div>
                <h3 className="font-bold text-[#0A0A0A] dark:text-white text-xl">Message envoyé !</h3>
                <p className="text-[#8A8A8A] text-sm">Nous vous répondrons dans les 24 heures.</p>
                <button onClick={() => { setStatus('idle'); setForm({ name:'',email:'',service:'',message:'' }) }}
                  className="btn-outline text-sm mt-2">Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-8 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Votre nom</label>
                    <input required value={form.name} onChange={set('name')} placeholder="Jean Dupont"
                      className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Email</label>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="jean@email.com"
                      className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Service souhaité</label>
                  <select required value={form.service} onChange={set('service')}
                    className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors">
                    <option value="">Sélectionner un service...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Votre message</label>
                  <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="Décrivez votre projet ou votre besoin..."
                    className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors resize-none" />
                </div>
                <button type="submit" disabled={status === 'sending'}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50">
                  <Send size={15} />
                  {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
                {status === 'error' && <p className="text-red-500 text-sm text-center">Erreur. Contactez-nous sur WhatsApp.</p>}
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4">
            {[
              {
                icon: MapPin,
                label: 'Adresse',
                value: 'Ambam, Région du Sud\nCameroun 🇨🇲',
              },
              {
                icon: Phone,
                label: 'WhatsApp',
                value: '+237 697 074 455',
                href: `https://wa.me/${WA}?text=${encodeURIComponent('Bonjour MMstack 👋 Je souhaite discuter d\'un projet.')}`,
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'nkwanemourad50@gmail.com',
                href: 'mailto:nkwanemourad50@gmail.com',
              },
            ].map(c => {
              const Icon = c.icon
              return (
                <div key={c.label}
                  className="flex items-start gap-4 p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl bg-[#F5F5F5] dark:bg-[#1A1A1A] hover:-translate-y-0.5 transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] dark:bg-white flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-white dark:text-[#0A0A0A]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noreferrer"
                        className="text-sm text-[#0A0A0A] dark:text-white hover:underline whitespace-pre-line">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm text-[#0A0A0A] dark:text-white whitespace-pre-line">{c.value}</p>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Ambam / Cameroun city image */}
            <div className="rounded-xl overflow-hidden h-48 border border-[#E5E5E5] dark:border-[#2A2A2A]">
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=700&q=75"
                alt="Ambam Cameroun — centre-ville"
                loading="lazy" crossOrigin="anonymous"
                className="w-full h-full object-cover grayscale-[30%]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
