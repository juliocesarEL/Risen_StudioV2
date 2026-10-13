import type { ContactRequest } from '@/core/contact/domain/contact-request'

/**
 * Porta de saída: entrega a solicitação ao estúdio.
 *
 * O caso de uso só conhece esta interface. Trocar o provedor (Resend, outro
 * serviço de e-mail, CRM, webhook) significa criar um novo adaptador em
 * infrastructure, sem tocar no caso de uso.
 */
export interface ContactNotifier {
  notify(request: ContactRequest): Promise<void>
}

/** O canal de entrega não está configurado ou rejeitou a configuração atual. */
export class NotifierUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotifierUnavailableError'
  }
}

/** A entrega falhou (rede, limite do provedor...). Uma nova tentativa pode funcionar. */
export class NotificationDeliveryError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotificationDeliveryError'
  }
}
