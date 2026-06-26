import { Github, Linkedin, MessageCircle, ArrowUpRight } from 'lucide-react'

const WA = '237697074455'

const cols = [
  {
    title: 'Services',
    links: [
      { label: 'Développement logiciel', href: '#services' },
      { label: 'Création de sites web', href: '#services' },
      { label: 'Formation IT', href: '#services' },
      { label: 'Prestation à distance', href: '#services' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos', href: '#about' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'nkwanemourad50@gmail.com', href: 'mailto:nkwanemourad50@gmail.com' },
      { label: 'WhatsApp', href: `https://wa.me/${WA}` },
      { label: 'Ambam, Cameroun 🇨🇲', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" aria-label="MMstack — retour en haut" className="inline-flex items-center gap-2 mb-3">
              <img
                src="/logo-icon-light.png"
                alt="Logo MMstack — cygne origami"
                width="461" height="331"
                className="h-7 w-auto object-contain"
              />
              <span className="text-xl font-normal text-white">MMstack</span>
            </a>
            <p className="text-[#8A8A8A] text-sm leading-relaxed mb-5">
              Digital solutions from Cameroon to the world.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: MessageCircle, href: `https://wa.me/${WA}`, label: 'WhatsApp' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors duration-200">
                  <s.icon size={15} className="text-[#8A8A8A]" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {cols.map(col => (
            <div key={col.title}>
              <div className="text-xs font-semibold text-white uppercase tracking-widest mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href}
                      className="text-sm text-[#8A8A8A] hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8A8A8A] text-xs">© 2025 MMstack. All rights reserved.</p>
          <p className="text-[#8A8A8A] text-xs">Made with ❤️ in 🇨🇲 Cameroon</p>
        </div>
      </div>
    </footer>
  )
}
