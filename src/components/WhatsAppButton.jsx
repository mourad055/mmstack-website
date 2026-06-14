import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WA = '237697074455'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WA}?text=${encodeURIComponent('Bonjour MMstack 👋 Je voudrais discuter d\'un projet.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter MMstack sur WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
      <MessageCircle size={26} className="text-white fill-white" />
      {/* Pulse ring */}
      <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30" />
    </motion.a>
  )
}
