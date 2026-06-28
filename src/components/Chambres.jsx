import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, MapPin, Phone, User, School, Wallet, MessageSquare, CheckCircle2, Building2 } from 'lucide-react'

const WA = '237697074455'

const listings = [
  {
    img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=75',
    quartier: 'Centre-ville',
    prix: '15 000',
    desc: 'Chambre meublée, eau courante, proche du marché central. Calme et sécurisée.',
    phone: '697000001',
  },
  {
    img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=75',
    quartier: 'Quartier Nkang',
    prix: '10 000',
    desc: 'Studio indépendant avec kitchenette, idéal pour étudiants. Proche établissements scolaires.',
    phone: '677000002',
  },
  {
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=75',
    quartier: 'Zone résidentielle',
    prix: '20 000',
    desc: 'Grande chambre en villa, clôturée, électricité 24h. Accès internet disponible.',
    phone: '655000003',
  },
]

function buildWaMsg(data, type) {
  if (type === 'etudiant') {
    return encodeURIComponent(
      `Bonjour MMstack 👋\nJe cherche une chambre à Ambam.\n\nNom: ${data.nom}\nUniversité: ${data.universite}\nBudget max: ${data.budget} XAF/mois\nDate d'arrivée: ${data.date}\n\n${data.message}`
    )
  }
  return encodeURIComponent(
    `Bonjour MMstack 👋\nJe souhaite publier une annonce de chambre.\n\nNom: ${data.nom}\nTéléphone: ${data.tel}\nQuartier: ${data.quartier}\nPrix: ${data.prix} XAF/mois\nChambres dispo: ${data.nbr}\n\nDescription: ${data.desc}`
  )
}

function EtudiantForm() {
  const [f, setF] = useState({ nom: '', universite: '', budget: '', date: '', message: '' })
  const set = k => e => setF(p => ({ ...p, [k]: e.target.value }))
  const submit = e => {
    e.preventDefault()
    window.open(`https://wa.me/${WA}?text=${buildWaMsg(f, 'etudiant')}`, '_blank')
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Nom complet</label>
          <input required value={f.nom} onChange={set('nom')} placeholder="Jean Dupont"
            className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Université / École</label>
          <input required value={f.universite} onChange={set('universite')} placeholder="ESTLC, Université d'Ébolowa..."
            className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Budget max (XAF/mois)</label>
          <input required type="number" value={f.budget} onChange={set('budget')} placeholder="15000"
            className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Date d'arrivée</label>
          <input required type="date" value={f.date} onChange={set('date')}
            className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Message (optionnel)</label>
        <textarea rows={3} value={f.message} onChange={set('message')} placeholder="Précisez vos besoins..."
          className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors resize-none" />
      </div>
      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
        <MessageSquare size={16} /> Envoyer ma demande via WhatsApp
      </button>
    </form>
  )
}

function BailleurForm() {
  const [f, setF] = useState({ nom: '', tel: '', quartier: '', prix: '', nbr: '', desc: '' })
  const [sent, setSent] = useState(false)
  const set = k => e => setF(p => ({ ...p, [k]: e.target.value }))
  const submit = e => {
    e.preventDefault()
    window.open(`https://wa.me/${WA}?text=${buildWaMsg(f, 'bailleur')}`, '_blank')
    setSent(true)
  }
  if (sent) return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
        <CheckCircle2 size={28} className="text-green-600" />
      </div>
      <p className="font-semibold text-[#0A0A0A] dark:text-white text-lg">Annonce envoyée !</p>
      <p className="text-[#8A8A8A] text-sm text-center">Nous vous contacterons sous 24h pour publier votre chambre.</p>
      <button onClick={() => setSent(false)} className="btn-outline mt-2 text-sm">Publier une autre chambre</button>
    </div>
  )
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { k: 'nom', label: 'Nom complet', ph: 'Paul Biya' },
          { k: 'tel', label: 'WhatsApp', ph: '697 000 000' },
          { k: 'quartier', label: 'Quartier', ph: 'Centre-ville, Nkang...' },
          { k: 'prix', label: 'Prix par mois (XAF)', ph: '15000', type: 'number' },
          { k: 'nbr', label: 'Chambres disponibles', ph: '2', type: 'number' },
        ].map(({ k, label, ph, type = 'text' }) => (
          <div key={k}>
            <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">{label}</label>
            <input required type={type} value={f[k]} onChange={set(k)} placeholder={ph}
              className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors" />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5">Description</label>
        <textarea required rows={3} value={f.desc} onChange={set('desc')} placeholder="Décrivez la chambre : équipements, commodités, règles..."
          className="w-full border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] dark:focus:border-white transition-colors resize-none" />
      </div>
      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
        <Building2 size={16} /> Publier ma chambre via WhatsApp
      </button>
    </form>
  )
}

export default function Chambres() {
  const [tab, setTab] = useState('etudiant')

  return (
    <section id="chambres" className="section-pad bg-[#F5F5F5] dark:bg-[#0D0D0D]">
      <div className="container-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-xs font-semibold tracking-widest text-[#8A8A8A] uppercase">Service communautaire</div>
            <span className="text-xs bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] font-bold px-2.5 py-0.5 rounded-full">Nouveau ✨</span>
          </div>
          <h2 className="section-title">Trouve ta chambre à Ambam</h2>
          <p className="section-sub mb-12">Mise en relation gratuite entre étudiants et bailleurs locaux.</p>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-2xl overflow-hidden mb-12">
          <div className="flex border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            {[
              { key: 'etudiant', label: '🎓 Je cherche une chambre', icon: User },
              { key: 'bailleur', label: '🏠 Je suis bailleur', icon: Home },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 ${
                  tab === t.key
                    ? 'bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A]'
                    : 'text-[#8A8A8A] hover:text-[#0A0A0A] dark:hover:text-white'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}>
                {tab === 'etudiant' ? <EtudiantForm /> : <BailleurForm />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Listings */}
        <h3 className="text-xl font-bold text-[#0A0A0A] dark:text-white mb-6">Chambres disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((l, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img src={l.img} alt={l.quartier} loading="lazy" crossOrigin="anonymous" className="w-full h-full object-cover grayscale-[20%] hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-[#8A8A8A] text-xs">
                    <MapPin size={12} />{l.quartier}
                  </div>
                  <span className="font-extrabold text-[#0A0A0A] dark:text-white text-sm">{l.prix} XAF<span className="font-normal text-[#8A8A8A]">/mois</span></span>
                </div>
                <p className="text-xs text-[#8A8A8A] leading-relaxed mb-4">{l.desc}</p>
                <a href={`https://wa.me/237${l.phone}?text=${encodeURIComponent('Bonjour, je suis intéressé par votre chambre à ' + l.quartier + ' (via MMstack).')}`}
                  target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg py-2.5 text-xs font-semibold hover:bg-[#0A0A0A] hover:text-white dark:hover:bg-white dark:hover:text-[#0A0A0A] transition-all duration-200">
                  <Phone size={13} /> Contacter le bailleur
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
