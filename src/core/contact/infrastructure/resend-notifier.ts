import 'server-only'

import { Resend } from 'resend'

import {
  type ContactNotifier,
  NotificationDeliveryError,
  NotifierUnavailableError,
} from '@/core/contact/application/contact-notifier'
import type { ContactRequest } from '@/core/contact/domain/contact-request'

export interface ResendNotifierConfig {
  apiKey: string
  /** Quem recebe as solicitações. */
  to: string
  /** Remetente (domínio verificado no Resend). */
  from: string
}

/** Erros do Resend que indicam configuração inválida, e não falha momentânea. */
const CONFIGURATION_ERRORS = new Set([
  'missing_api_key',
  'invalid_api_key',
  'restricted_api_key',
  'invalid_from_address',
  'invalid_access',
])

/** Adaptador: entrega a solicitação por e-mail usando o Resend. */
export class ResendNotifier implements ContactNotifier {
  private readonly client: Resend
  private readonly config: ResendNotifierConfig

  constructor(config: ResendNotifierConfig, client: Resend = new Resend(config.apiKey)) {
    this.config = config
    this.client = client
  }

  async notify(request: ContactRequest): Promise<void> {
    // Import sob demanda: a renderização do e-mail (React Email + Prettier) é
    // pesada e só deve ser carregada quando um envio real acontece.
    const { renderContactEmail } = await import('@/core/contact/infrastructure/contact-email')
    const { subject, html, text } = await renderContactEmail(request)

    const { error } = await this.client.emails.send({
      from: this.config.from,
      to: this.config.to,
      replyTo: request.email,
      subject,
      html,
      text,
      tags: [
        { name: 'origem', value: 'formulario-site' },
        { name: 'tipo_projeto', value: request.projectType.id },
      ],
    })

    if (!error) return

    if (CONFIGURATION_ERRORS.has(error.name)) {
      throw new NotifierUnavailableError(`Resend recusou a configuração (${error.name}).`)
    }
    throw new NotificationDeliveryError(`Resend falhou (${error.name}): ${error.message}`)
  }
}
