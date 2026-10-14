/** Limite do corpo: links muito longos são cortados por alguns programas de e-mail. */
export const MAILTO_BODY_MAX = 1500

/**
 * Link "mailto:" com assunto e texto já preenchidos. Só funciona quando o
 * aparelho tem um programa de e-mail configurado; por isso o endereço também
 * deve aparecer escrito na tela, com opção de copiar.
 */
export function buildMailtoUrl(to: string, { subject, body }: { subject: string; body?: string }) {
  const params = [`subject=${encodeURIComponent(subject)}`]
  const text = body?.trim().slice(0, MAILTO_BODY_MAX)
  if (text) params.push(`body=${encodeURIComponent(text)}`)
  return `mailto:${to}?${params.join('&')}`
}
