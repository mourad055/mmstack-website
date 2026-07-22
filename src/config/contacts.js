/** Coordonnées MMstack — source unique pour Contact, Footer, WhatsApp, CTAs.
 *  Les contacts d’origine restent inchangés ; les nouveaux sont ajoutés en parallèle.
 */

const DEFAULT_MSG = 'Bonjour MMstack 👋 Je souhaite discuter d\'un projet.'

/** WhatsApp d’origine (boutons flottants / CTA) */
export const WHATSAPP_MAIN = {
  digits: '237697074455',
  display: '+237 697 074 455',
}

/** WhatsApp ajouté (oppoytron) */
export const WHATSAPP_EXTRA = {
  digits: '237678042123',
  display: '+237 678 042 123',
}

export function whatsappHref(message = DEFAULT_MSG, digits = WHATSAPP_MAIN.digits) {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

/** Email d’origine (compte Formspree / destinataire principal) */
export const EMAIL_MAIN = 'nkwanemourad50@gmail.com'

/** Email ajouté — reçoit une copie de chaque soumission via `_cc` Formspree */
export const EMAIL_CC = 'oppoytron@gmail.com'

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqeogeng'
export const FORMSPREE_CC = EMAIL_CC
