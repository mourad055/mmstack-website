const PALETTES = [
  ['#0F172A', '#38BDF8'],
  ['#0C1A12', '#34D399'],
  ['#1E1B4B', '#A78BFA'],
]

export default function InitialsAvatar({ name, size = 40 }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const [bg, fg] = PALETTES[name.charCodeAt(0) % PALETTES.length]
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: bg, color: fg, border: `1.5px solid ${fg}30` }}>
      {initials}
    </div>
  )
}
