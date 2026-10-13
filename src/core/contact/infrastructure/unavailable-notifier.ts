import {
  type ContactNotifier,
  NotifierUnavailableError,
} from '@/core/contact/application/contact-notifier'

/**
 * Usado quando não há provedor configurado. Sempre falha de forma explícita:
 * o formulário mostra um erro honesto em vez de simular um envio.
 */
export class UnavailableNotifier implements ContactNotifier {
  private readonly reason: string

  constructor(reason: string) {
    this.reason = reason
  }

  async notify(): Promise<void> {
    throw new NotifierUnavailableError(this.reason)
  }
}
