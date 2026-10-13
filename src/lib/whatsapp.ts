import { siteConfig } from '@/content/site'

const WHATSAPP_BASE_URL = 'https://wa.me/'

/** E.164 permite de 8 a 15 dígitos; números brasileiros completos têm 12 ou 13 (com DDI 55). */
const MIN_PHONE_DIGITS = 8
const MAX_PHONE_DIGITS = 15

export class InvalidWhatsAppNumberError extends Error {
  constructor(value: string) {
    super(`Número de WhatsApp inválido: "${value}". Use apenas dígitos, com DDI e DDD.`)
    this.name = 'InvalidWhatsAppNumberError'
  }
}

/**
 * Gera um link wa.me com mensagem pré-preenchida.
 * Lança erro para números inválidos, para que um número mal configurado
 * quebre o build em vez de gerar links que não funcionam.
 */
export function createWhatsAppUrl(phoneNumber: string, message?: string): string {
  const digits = phoneNumber.replace(/\D/g, '')

  if (digits.length < MIN_PHONE_DIGITS || digits.length > MAX_PHONE_DIGITS) {
    throw new InvalidWhatsAppNumberError(phoneNumber)
  }

  const text = message?.trim()
  // encodeURIComponent (e não URLSearchParams) porque o wa.me exibe "+" literalmente.
  return text
    ? `${WHATSAPP_BASE_URL}${digits}?text=${encodeURIComponent(text)}`
    : `${WHATSAPP_BASE_URL}${digits}`
}

/** Link para o WhatsApp do estúdio (número centralizado em site.ts). */
export function getStudioWhatsAppUrl(
  message: string = siteConfig.contact.whatsapp.messages.default,
): string {
  return createWhatsAppUrl(siteConfig.contact.whatsapp.number, message)
}
